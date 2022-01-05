import WeeklyHabit from "./WeeklyHabit"
import styles from "../styles/WeeklyContainer.module.css"

export default function WeeklyContainer(props) {

	// parse habits into weekly view
	const parsedHabits = props.habits && props.habits.map((habit, index) => {
		return <WeeklyHabit {...habit} key={index} router={props.router} updateStatus={props.updateStatus} />
	})
	
	// map labels for the weekly checklist
	const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const parsedLabels = week.map((label, index) => {
		return <div className={styles.label} key={index} >{label}</div>
	})

	return (
		<div className={styles.container}>
			<div className={styles.labelcontainer}>
				{parsedLabels}
			</div>
			{parsedHabits}
		</div>
	)
}