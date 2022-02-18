import styles from '../styles/WeeklyHabit.module.css'
import Checkbox from './Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import HabitTitle from './Buttons/HabitTitle';
import { supabase } from '../utils/supabase';

export default function WeeklyHabit(props) {
	const { DateTime, Interval } = require("luxon");

	// formats checkbox for each day of the week
	const formatChecklist = (status: { [x: string]: string; }) => {
		const week: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		const inputs = [];
	
		// const start = props.monday - props.weekStart;
		const interval = new Interval({start: DateTime.fromISO(props.weekStart), end: props.monday})
		const start = Math.abs(Math.floor(interval.length('days')))
		const end = start + 7;
		for (let i = start; i < end; i++) {
			if (props.completion[i] === 0) {
				inputs.push(
					<Checkbox
						type="checkbox" 
						id={props.id} 
						// dayOfYear={props.weekStart + i}
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
						// dayOfYear={props.weekStart + i}
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
						// dayOfYear={props.weekStart + i} 
						completion={props.completion}
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

	const deleteHabit = async () => {
		const { data, error } = await supabase
  	.from('habits')
  	.delete()
  	.match({ id: props.id })
		if (error) {
			console.log(error)
		} else {
			console.log("Success")
			props.router.reload()
		}
	}

	return (
		<div className={styles.habit}>
			<div className={styles.title}>
			  {/* <FontAwesomeIcon className={styles.icon} style={{color: props.color}} icon={faCircle}></FontAwesomeIcon> 
				<div className={styles.habitName}>{props.title}</div> */}
				<HabitTitle props={props} title={props.title} color={props.color} deleteHabit={deleteHabit} />
			</div>
			<form className={styles.checklist}>
				{formatChecklist(props.status)}
			</form>
		</div>
	)
}