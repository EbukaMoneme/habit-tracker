import styles from "../styles/DailyContainer.module.css"
import DailyHabit from "./DailyHabit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useDOY from "../hooks/useDOY";
import useValidDate from "../hooks/useValidDate";
import { supabase } from "../utils/supabase";

export default function DailyContainer(props) {
	const { DateTime } = require("luxon");

	// Find today's date
	const today = DateTime.now();
	
	const [state, setState] = useState(props.last_day[0].state || {
		year: today.year,
		month: today.month,
		day: today.day
	})

	const dayDisplay = DateTime.local(state.year, state.month, state.day).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit' })
	const thisDay = useDOY(new Date(dayDisplay))
	// console.log(thisDay)
	const currentHabits = props.habits.filter(habit => habit.weekStart <= thisDay)
	// console.log(currentHabits)

	// Set last visited date
	const setLastDay = async (day) => {
		const { data, error } = await supabase
		.from('last_day')
		.update({ state: day })
		.match({ id: 1 })
	}

	// Format habits to daily view
	const formatHabits = () => {
		const parsedHabits = []
		let count = 0;
	

		for (let habit of currentHabits) {
			const index = thisDay - habit.weekStart;
			if (habit.completion[index] === 0) {
				parsedHabits.push(<DailyHabit 
					{...habit} 
					default={false} 
					id={habit.id} 
					index={index}
					key={count}
					router={props.router}
				/>)
			} else if (habit.completion[index] === 1) {
				parsedHabits.push(
					<DailyHabit
						{...habit} 
						id={habit.id} 
						dayOfYear={habit.weekStart + index}
						index={index}
						completion={props.completion}
						default={true}
						disabled={false}
						router={props.router}
						key={Math.random()}
					/>
				)
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
				{filteredHabits}
			</div>
		</div>
	)
}