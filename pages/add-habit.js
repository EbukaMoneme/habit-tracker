import Head from 'next/head'
import { useState } from 'react'
import Router from 'next/router';
import Link from 'next/link';

import styles from '../styles/AddHabit.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import addHabit from '../hooks/useAddHabit';

export default function AddHabit() {
	const [state, setState] = useState({
    title: "",
    color: "#000000",
    description: "",
    frequency: [],
		status: {
			'Monday': '', 
			'Tuesday': '', 
			'Wednesday': '', 
			'Thursday': '', 
			'Friday': '', 
			'Saturday': '', 
			'Sunday': ''
		},
		error: false
  })

	// Change state for all keys except status and frequency
	const changeState = (key, val) => {
		setState({...state, [key]: val })
	}

	// Returns whether frequency contains the specific value
	const selected = (val) => {
		return state.frequency.includes(val)
	}

	// change status and frequency on button click
	const changeStatusAndFrequency = (val) => {
		const newFrequency = [...state.frequency]
		const week = {...state.status}
		// If day clicked is in frequency, remove it, otherwise add it
		// similarly update status
		if (selected(val)) {
			newFrequency = newFrequency.filter(day => day !== val)
			week[val] = '';
		} else {
			newFrequency.push(val)
			week[val] = false;
		}
		setState({...state, frequency: newFrequency, status: week, error: false })
	}

	// new habit for submission
	const newHabit = {
		title: state.title,
		color: state.color,
		description: state.description,
		frequency: state.frequency,
		status: state.status
	}

	// add habit to database
	const handleSubmit = async (event) => {
		event.preventDefault()
		// If frequency is not empty, add habit to database
		if (state.frequency.length > 0) {
			try {
				await addHabit(newHabit)
			} catch (err) {
				console.log(err)
			} finally {
				Router.push('/')
			}
		} else {
			// otherwise show error
			return changeState('error', !state.error)
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
						New <span>Habit</span>
					</h1>

					<div className={styles.firstInput}>
						<div className={`${styles.inputDiv} ${styles.titleDiv}`}>
							<label htmlFor="title">Name this habit</label>
							<input 
								className={styles.textInput} 
								type="text" 
								id="title" 
								name="title" 
								value={state.title}
								onChange={(event) => changeState("title", event.target.value)}
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
							value={state.description}
							onChange={(event) => changeState("description", event.target.value)}
						/>
					</div>

					<div className={styles.inputDiv}>
						<label htmlFor="frequency">Habit Frequency</label>

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
									changeStatusAndFrequency(event.target.value)
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
									changeStatusAndFrequency(event.target.value)
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
									changeStatusAndFrequency(event.target.value)
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
									changeStatusAndFrequency(event.target.value)
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
									changeStatusAndFrequency(event.target.value)
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
									changeStatusAndFrequency(event.target.value)
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
									changeStatusAndFrequency(event.target.value)
								}}
							> Sun </button>
						</div>
						<div className={
							state.error?
							styles.message:
							styles.hidden
						}>
							Please select when you want to do this habit!
						</div>
					</div>
				  <button className={styles.submit} type="submit">Create Habit</button>
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