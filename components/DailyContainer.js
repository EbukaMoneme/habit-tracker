import { parse } from "@fortawesome/fontawesome-svg-core"
import styles from "../styles/DailyContainer.module.css"
import DailyHabit from "./DailyHabit"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function DailyContainer(props) {
	const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const [day, setDay] = useState(week.indexOf(props.today))

	const formatHabits = () => {
		const parsedHabits = []
		let count = 0;
		for (let habit of props.habits) {

			for (let day in habit.status) {
				if (habit.status[day] === true) {
					parsedHabits.push(<DailyHabit 
						{...habit} 
						default={true} 
						value={day}
						id={habit.id} 
						status={habit.status}
						key={count}
					/>)
				} else if (habit.status[day] === false){
					parsedHabits.push(<DailyHabit 
						{...habit} 
						default={false} 
						value={day}
						id={habit.id} 
						status={habit.status}
						key={count}
					/>)
				}
				count++;
			}
			
		}
		return parsedHabits;
	}

	
	const forward = () => { setDay(prev => prev + 1) }
	const backward = () => { setDay(prev => prev - 1) }

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