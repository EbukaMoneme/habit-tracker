import styles from "../styles/DailyContainer.module.css"
import DailyHabit from "./DailyHabit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function DailyContainer(props) {

	// determine current day
	const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const [day, setDay] = useState(week.indexOf(props.today))

	// Format habits to daily view
	const formatHabits = () => {
		const parsedHabits = []
		let count = 0;

		for (let habit of props.habits) {

			for (let day in habit.status) {

				if (habit.status[day] !== '') {
					parsedHabits.push(<DailyHabit 
						{...habit} 
						default={habit.status[day]} 
						value={day}
						id={habit.id} 
						status={habit.status}
						key={count}
						router={props.router}
						updateStatus={props.updateStatus}
					/>)
				} 
				count++;

			}
		}
		return parsedHabits;
	}

	// move daily view forward and backward
	const forward = () => { setDay(prev => prev + 1) }
	const backward = () => { setDay(prev => prev - 1) }
	
	// daily view query
	const query = () => {
		return week[day]
	}

	const filteredHabits = props.habits && formatHabits().filter(habit => habit.props.value === query())

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{query()}
				<div className={styles.movers}>
					<div 
						className={styles.moverIconLeft}
						onClick={() => {
							day === 0?
							setDay(6):
							backward()
						}}
					>
						<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
					</div>
					<div 
						className={styles.moverIconRight}
						onClick={() => {
							day === 6?
							setDay(0):
							forward()
						}}
					>
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