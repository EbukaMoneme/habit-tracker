import Head from 'next/head'
import { useState } from 'react'
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import styles from '../styles/AddHabit.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import addHabit from '../hooks/useAddHabit';
import useDOY from '../hooks/useDOY';
import { supabase } from '../utils/supabase';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
	// Grab habits
	const { data: habits, error } = await supabase.from("habits").select('*')
	if (error) {
		console.log(error)
	}
	
	return {
		props: { habits: habits }
	}
}

export default function EditHabit({ habits }) {
	const router = useRouter();
	const { DateTime, Interval } = require("luxon");
	const { query } = router
	const [state, setState] = useState({
    title: (query.title || ""),
    color: (query.color || "#000000"),
    description: (query.description || ""),
    frequency: (query.frequency || []),
		error: false
  })
	const targetHabit = habits.filter(habit => habit.id == query.id)
	const freq_hist = targetHabit[0].freq_hist
	const completion = targetHabit[0].completion
	// console.log(targetHabit)
	// console.log(completion)

	// Change state for all keys except status and frequency
	const changeState = (key: string, val: string | boolean) => {
		setState({...state, [key]: val })
	}

	// Returns whether frequency contains the specific value
	const selected = (val: string) => {
		return state.frequency.includes(val)
	}

	// change status and frequency on button click
	const changeStatusAndFrequency = (val: string) => {
		let newFrequency = [...state.frequency]
		// If day clicked is in frequency, remove it, otherwise add it
		// similarly update status
		if (selected(val)) {
			newFrequency = newFrequency.filter(day => day !== val)
		} else {
			newFrequency.push(val)
		}
		setState({...state, frequency: newFrequency, error: false })
	}

	const completionTemplate = () => {
		const week: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		const template = week.map((day) => {
			if (state.frequency.includes(day)) {
				return 0
			} else {
				return -1
			}
		})
		return template;
	}
	const freqChange = () => {
		return query.frequency !== state.frequency
	}
	// console.log(freqChange())

	// new habit for submission
	// const newHabit = {
	// 	title: state.title,
	// 	color: state.color,
	// 	description: state.description,
	// 	frequency: state.frequency,
	// 	template: completionTemplate(),
	// 	completion: completionTemplate(),
	// 	weekStart: DateTime.now().startOf('week'),
	// 	creationDate: DateTime.now()
	// }
	

	// add habit to database
	const handleSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault()
		// If frequency is not empty, add habit to database
		if (state.frequency.length > 0) {
			if (freqChange()) {
				// make changes in freq_hist
				freq_hist[freq_hist.length-1].end = DateTime.now()
				const newFreq = {
					start: DateTime.now(),
					end: null,
					frequency: state.frequency
				}
				freq_hist.push(newFreq)

				// make new completion
				const habitInterval = new Interval({start: DateTime.fromISO(targetHabit[0].weekStart), end: DateTime.local(DateTime.now().year, DateTime.now().month, DateTime.now().day).startOf('week')})
				const habitLength = Math.abs(Math.ceil(habitInterval.length('days')))
				const todayIndex = DateTime.now().weekday
				console.log(habitInterval)
				console.log(habitLength)
				let newCompletion = completion.slice(0, habitLength)
				let thisWeek = completion.slice(habitLength, habitLength+7)
				thisWeek = thisWeek.slice(0, todayIndex)
				let newWeek = completionTemplate().slice(todayIndex)
				thisWeek = thisWeek.concat(newWeek)
				// console.log(thisWeek)
				newCompletion = newCompletion.concat(thisWeek).concat(completionTemplate())
				// console.log(newCompletion)
				
				const { data, error } = await supabase
				.from('habits')
				.update({ color: state.color, template: completionTemplate(), completion: newCompletion, freq_hist: freq_hist})
				.match({ id: query.id })
				if (error) {
					console.log(error)
				} else {
					console.log("Success")
					Router.push('/')
				}
			} else {
				const { data, error } = await supabase
				.from('habits')
				.update({ color: state.color})
				.match({ id: query.id })
				if (error) {
					console.log(error)
				} else {
					console.log("Success")
					Router.push('/')
				}
			}
		} else {
			// otherwise show error
			return changeState('error', !state.error)
		}
	}

	const everySelected = () => {
		const everyday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		if (state.frequency.length != everyday.length) {
			return false;
		}

		for (let i = 0; i < everyday.length; i++) {
			if (state.frequency[i] !== everyday[i]) {
				return false;
			}
		}
		return true;
	}
	const weekDaySelected = () => {
		const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
		if (state.frequency.length != weekday.length) {
			return false;
		}

		for (let i = 0; i < weekday.length; i++) {
			if (state.frequency[i] !== weekday[i]) {
				return false;
			}
		}
		return true;
	}

	console.log(everySelected())
	console.log(weekDaySelected())

	const setWeekdays = () => {
		const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
		if (weekDaySelected()) {
			setState({...state, frequency: [], error: false })
		} else {
			setState({...state, frequency: weekdays, error: false })
		}
	}
	const setEveryday = () => {
		const everyday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		if (everySelected()) {
			setState({...state, frequency: [], error: false })
		} else {
			setState({...state, frequency: everyday, error: false })
		}
	}

	

	return (
		<div className={styles.container}>
      <Head>
        <title>Flexibly - Habit Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

			<main className={styles.main}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Link href="/">
						<a className={styles.backDiv}>
							<div className={styles.back}>
								<FontAwesomeIcon  icon={faChevronLeft}></FontAwesomeIcon> {' '}
							</div>
							<div className={styles.backText}>Back</div>
						</a>
					</Link>

					<h1 className={styles.title}>
						Edit <span>Habit</span>
					</h1>

					<div className={styles.firstInput}>
						<div className={`${styles.inputDiv} ${styles.titleDiv}`}>
							<label htmlFor="title">Name this habit</label>
							<input 
								className={styles.textInput} 
								type="text" 
								id="title" 
								name="title" 
								value={query.title}
								readOnly
								// onChange={(event) => changeState("title", event.target.value)}
								required
							/>
						</div>

						<div className={`${styles.inputDiv} ${styles.colorDiv}`}>
							<label htmlFor="color">Color</label>
							<input 
								className={styles.colorInput} 
								type="color" 
								id="color" 
								name="color" 
								value={state.color}
								onChange={(event) => changeState("color", event.target.value)}
							/>
						</div>
					</div>

					<div className={styles.inputDiv}>
						<label htmlFor="description">Describe this habit</label>
						<textarea
							className={styles.textArea}
							id="description" 
							name="description" 
							value={query.description}
							readOnly
							// onChange={(event) => changeState("description", event.target.value)}
						/>
					</div>

					<div className={styles.inputDiv}>
						<label htmlFor="frequency">Habit Frequency</label>

						<div className={styles.frequencyContainer}>

							<div className={styles.frequencyButtons}>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Monday")?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Monday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Mon </button>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Tuesday")?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Tuesday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Tue </button>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Wednesday")?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Wednesday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Wed </button>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Thursday")?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Thursday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Thu </button>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Friday")?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Friday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Fri </button>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Saturday")?
										styles.selected:
										styles.unselected}`
									} 
									name="frequency" 
									value="Saturday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Sat </button>
								<button 
									className={
										`${styles.frequencyOption}
										${selected("Sunday")?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Sunday"
									onClick={(event) => {
										event.preventDefault()
										changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Sun </button>
							</div>
							<div className={styles.frequencyControl}>
								<button 
									className={
										`${styles.frequencyControlOption}
										${weekDaySelected()?
										styles.selected:
										styles.unselected}`
									}
									name="frequency" 
									value="Weekdays"
									onClick={(event) => {
										event.preventDefault()
										setWeekdays()
										// changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Weekdays </button>
								<button 
									className={
										`${styles.frequencyControlOption}
										${everySelected()?
										styles.selected:
										styles.unselected}`
									}
									// name="frequency" 
									value="Every day"
									onClick={(event) => {
										event.preventDefault()
										setEveryday()
										// changeStatusAndFrequency((event.target as HTMLTextAreaElement).value)
									}}
								> Every day</button>

							</div>
						</div>
						<div className={
							state.error?
							styles.message:
							styles.hidden
						}>
							Please select when you want to do this habit!
						</div>
					</div>
				  <button className={styles.submit} type="submit">Edit Habit</button>
				</form>
			</main>

			<footer className={styles.footer}>
        <a
          href="https://www.flexibly.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {' '}
          <img className={styles.logo} src="/images/logo.svg" />  {' '}
					Flexibly
        </a>
      </footer>
		</div>
	)
}