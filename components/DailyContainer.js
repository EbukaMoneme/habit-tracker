import styles from "../styles/DailyContainer.module.css"
import DailyHabit from "./DailyHabit"

export default function DailyContainer(props) {

	const parsedHabits = props.habits && props.habits.map((habit, index) => <DailyHabit {...habit} key={index}/>)
	return (
		<div className={styles.container}>
			Sat, Jan 1
			<div className={styles.dailyhabits}>
				{parsedHabits}
			</div>
		</div>
	)
}