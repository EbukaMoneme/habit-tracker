import WeeklyHabit from "./WeeklyHabit"
import styles from "../styles/WeeklyContainer.module.css"
import { Habit } from "../types";


export default function WeeklyContainer(props) {

	// parse habits into weekly view
	console.log("Weekly Habits", props.habits)
	const parsedHabits = props.habits && props.habits.map((habit: Habit, index: number) => {
		return <WeeklyHabit {...habit} key={index} router={props.router} updateStatus={props.updateStatus} monday={props.monday} sunday={props.sunday}/>
	})
	
	// map labels for the weekly checklist
	const week: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const parsedLabels = week.map((label: string, index: number) => {
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