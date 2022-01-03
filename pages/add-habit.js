import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/AddHabit.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function AddHabit() {
	const [state, setState] = useState({
    title: "",
    color: "",
    description: "",
    frequency: []
  })

	const selected = (val) => {
		return state.frequency.includes(val)
	}

	const changeState = (key, val) => {
		setState({...state, [key]: val })
	}

	const changeFrequency = (val) => {
		const newFrequency = [...state.frequency]
		if (selected(val)) {
			newFrequency = newFrequency.filter(day => day !== val)
		} else {
			newFrequency.push(val)
		}
		setState({...state, frequency: newFrequency })
	}

	return (
		<div className={styles.container}>
      <Head>
        <title>Flexibly - Habit Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

			<main className={styles.main}>
				<form className={styles.form} >
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
									selected("Monday")?
									styles.selected:
									styles.unselected}
								name="frequency" 
								value="Monday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Mon </button>
							<button 
								className={
									selected("Tuesday")?
									styles.selected:
									styles.unselected}
								name="frequency" 
								value="Tuesday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Tue </button>
							<button 
								className={
									selected("Wednesday")?
									styles.selected:
									styles.unselected}
								name="frequency" 
								value="Wednesday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Wed </button>
							<button 
								className={
									selected("Thursday")?
									styles.selected:
									styles.unselected}
								name="frequency" 
								value="Thursday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Thu </button>
							<button 
								className={
									selected("Friday")?
									styles.selected:
									styles.unselected}
								name="frequency" 
								value="Friday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Fri </button>
							<button 
								className={
									selected("Saturday")?
									styles.selected:
									styles.unselected} 
								name="frequency" 
								value="Saturday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Sat </button>
							<button 
								className={
									selected("Sunday")?
									styles.selected:
									styles.unselected}
								name="frequency" 
								value="Sunday"
								onClick={(event) => {
									event.preventDefault()
									changeFrequency(event.target.value)
								}}
							> Sun </button>
						</div>
					</div>
				  <button className={styles.submit} type="submit">Create Habit</button>
				</form>
			</main>
		</div>
	)
}