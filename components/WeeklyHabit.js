import styles from '../styles/WeeklyHabit.module.css'
import Checkbox from './Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function WeeklyHabit(props) {
	const formatChecklist = (status) => {
		const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		
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
					updateStatus={props.updateStatus}
				/>)
			}
			if (status[day] === '') {
				inputs.push(<Checkbox
					type="checkbox" 
					id={props.id} 
					name={day} 
					value={day}
					color={props.color}
					disabled={true}
					status={props.status}
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
			  <FontAwesomeIcon style={{color: props.color}} icon={faCircle}></FontAwesomeIcon> {props.title}
			</div>
			<form className={styles.checklist}>
				{formatChecklist(props.status)}
			</form>
		</div>
	)
}