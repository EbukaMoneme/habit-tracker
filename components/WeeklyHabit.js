import styles from '../styles/WeeklyHabit.module.css'
import Checkbox from './Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function WeeklyHabit(props) {
	const formatChecklist = (frequency) => {
		const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		
		const inputs = []
		for (let day of week) {
			if (frequency.includes(day)) {
				// inputs.push(<input style={{backgroundColor: props.color}} className="check" type="checkbox" id={day} name={day} value={day}/>)
				inputs.push(<Checkbox
					type="checkbox" 
					id={day} 
					name={day} 
					value={day}
					color={props.color}
					disabled={false}
				/>)
			}
			if (!frequency.includes(day)) {
				// inputs.push(<input style={{backgroundColor: props.color}} className="check" type="checkbox" id={day} name={day} value={day} disabled/>)
				inputs.push(<Checkbox
					type="checkbox" 
					id={day} 
					name={day} 
					value={day}
					color={props.color}
					disabled={true}
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
				{formatChecklist(props.frequency)}
			</form>
		</div>
	)
}