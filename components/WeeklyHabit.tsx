import styles from '../styles/WeeklyHabit.module.css'
import Checkbox from './Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function WeeklyHabit(props) {

	// formats checkbox for each day of the week
	const formatChecklist = (status: { [x: string]: string; }) => {
		const week: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		
		const inputs = []
		for (let day of week) {
			if (status[day] !== '') {
				inputs.push(<Checkbox
					type="checkbox" 
					id={props.id} 
					name={day} 
					value={day}
					color={props.color}
					default={status[day]}
					disabled={false}
					status={status}
					router={props.router}
					key={Math.random()}
					updateStatus={props.updateStatus}
				/>)
			}
			if (status[day] === '') {
				inputs.push(<Checkbox
					type="checkbox" 
					id={props.id} 
					name={day} 
					disabled={true}
					key={Math.random()}
				/>)
			}
		}
		
		return (
			inputs
		)
	}

	return (
		<div className={styles.habit}>
			<div className={styles.title}>
			  <FontAwesomeIcon className={styles.icon} style={{color: props.color}} icon={faCircle}></FontAwesomeIcon> 
				<div className={styles.habitName}>{props.title}</div>
			</div>
			<form className={styles.checklist}>
				{formatChecklist(props.status)}
			</form>
		</div>
	)
}