import styles from '../styles/WeeklyHabit.module.css'
import Checkbox from './Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function WeeklyHabit(props) {

	// formats checkbox for each day of the week
	const formatChecklist = (status: { [x: string]: string; }) => {
		const week: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		const inputs = [];
	
		const start = props.monday - props.weekStart;
		const end = start + 7;
		for (let i = start; i < end; i++) {
			if (props.completion[i] === 0) {
				inputs.push(
					<Checkbox
						type="checkbox" 
						id={props.id} 
						dayOfYear={props.weekStart + i}
						index={i}
						completion={props.completion}
						title={props.title}
						color={props.color}
						default={false}
						disabled={false}
						router={props.router}
						key={Math.random()}
					/>
				)
			} else if (props.completion[i] === 1) {
				inputs.push(
					<Checkbox
						type="checkbox" 
						id={props.id} 
						dayOfYear={props.weekStart + i}
						index={i}
						completion={props.completion}
						title={props.title}
						color={props.color}
						default={true}
						disabled={false}
						router={props.router}
						key={Math.random()}
					/>
				)
			} else {
				inputs.push(
					<Checkbox
						type="checkbox" 
						id={props.id}
						dayOfYear={props.weekStart + i} 
						index={i}
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