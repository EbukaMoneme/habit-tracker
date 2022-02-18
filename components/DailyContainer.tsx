import styles from "../styles/DailyContainer.module.css"
import DailyHabit from "./DailyHabit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useDOY from "../hooks/useDOY";
import useValidDate from "../hooks/useValidDate";
import { supabase } from "../utils/supabase";

export default function DailyContainer(props) {
	const { DateTime, Interval } = require("luxon");

	// Find today's date
	const today = DateTime.now();
	
	const [state, setState] = useState(props.last_day[0].state || {
		year: today.year,
		month: today.month,
		day: today.day
	})

	const dayDisplay = DateTime.local(state.year, state.month, state.day).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit' })
	const thisDay = DateTime.local(state.year, state.month, state.day)
	// console.log(thisDay)
	
	const currentHabits = props.habits.filter(habit => DateTime.fromISO(habit.weekStart) <= thisDay)
	// console.log("Current Habits:", currentHabits)

	// Set last visited date
	const setLastDay = async (day) => {
		const { data, error } = await supabase
		.from('last_day')
		.update({ state: day })
		.match({ id: 1 })
	}

	// used with checkLength below to extend the weeks 
	// 		if there isnt a completion array for that date
	const updateWeeks = async (title, completion) => {
		const { data, error } = await supabase
		.from('habits')
		.update({ completion: completion })
		.match({ title: title })
		if (error) {
			console.log(error)
		} else {
			console.log("Success")
			props.router.reload()
		}
	}

	//Add an extra week onto the habit completion when it's at the end of the array
	const checkLength = () => {
		const extendedHabits = props.habits.map((habit) => {
			const extender = new Interval({start: DateTime.fromISO(habit.weekStart), end: thisDay.endOf('week')})
			const extenderLength = Math.abs(Math.ceil(extender.length('days')))
			if (habit.completion.length === extenderLength) {
				const extendedCompletion = habit.completion.concat(habit.template).concat(habit.template)
				updateWeeks(habit.title, extendedCompletion)
			}
		})
	}

	// Called to continuosly update weeks
	const extendedHabits = checkLength()

	// Format habits to daily view
	const formatHabits = () => {
		const parsedHabits = []
		let count = 0;
	

		for (let habit of currentHabits) {

			const interval = new Interval({start: DateTime.fromISO(habit.weekStart), end: thisDay})
			const index = Math.abs(Math.floor(interval.length('days')))
		
			// console.log("HERE", index)
			// console.log("Week start", habit.weekStart)
			if (habit.completion[index] !== -1) {
				// console.log(habit, index, habit.completion[index])
				parsedHabits.push(<DailyHabit 
					{...habit}
					id={habit.id} 
					// dayOfYear={habit.weekStart + index}
					index={index}
					completion={habit.completion}
					default={habit.completion[index]} 
					router={props.router}
					key={count}
				/>)
			} 
			count++;
		}
		return parsedHabits;
	}

	// move daily view forward and backward
	const forward = () => { 
		const { newYear, newMonth, newDay } = useValidDate(state.year, state.month, state.day + 1)
		setState({...state, year: newYear, month: newMonth,  day: newDay})
		setLastDay({ year: newYear, month: newMonth,  day: newDay })
	}
	const backward = () => { 
		const { newYear, newMonth, newDay } = useValidDate(state.year, state.month, state.day - 1)
		setState({...state, year: newYear, month: newMonth,  day: newDay})
		setLastDay({ year: newYear, month: newMonth,  day: newDay })
	}

	// Sets the view to this week/today
	const setToday = () => {
		setState({
			year: today.year,
			month: today.month,
			day: today.day
		})
		setLastDay({
			year: today.year,
			month: today.month,
			day: today.day
		})
		// console.log(state)
	}
	
	const filteredHabits = formatHabits()

	return (
		<div className={styles.container}>
			<div className={styles.banner}>
				<div className={styles.title}>
					{dayDisplay}
				</div>
				<button 
					className={styles.today}
					onClick={setToday}
				>
					Today
				</button>
				<div className={styles.movers}>
					
					<div 
						className={styles.moverIconLeft}
						onClick={() => {backward()}}>
						<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
					</div>
					<div 
						className={styles.moverIconRight}
						onClick={() => {forward()}}>
						<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
					</div>
				</div>
			</div>
			<div className={styles.dailyhabits}>
				{/* {JSON.stringify(props.habits)} */}
				{filteredHabits}
			</div>
		</div>
	)
}