import WeeklyHabit from "./WeeklyHabit"
import styles from "../styles/WeeklyContainer.module.css"

export default function WeeklyContainer(props) {
	console.log(props)
	const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const parsedHabits = props.habits && props.habits.map((habit, index) => <WeeklyHabit {...habit} key={index} router={props.router} />)
	const parsedLabels = week.map((label, index) => <div className={styles.label} key={index}>{label}</div>)
	return (
		<div className={styles.container}>
			<div className={styles.labelcontainer}>
				{parsedLabels}
			</div>
			{parsedHabits}
		</div>
	)
}