import { useState } from 'react'
import { supabase } from "../utils/supabase";
import styles from '../styles/DailyHabit.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function DailyHabit(props) {
	const [isCompleted, setIsCompleted] = useState<boolean>(props.default)

	const toggleCompleted = async () => {
		// Toggle completed status
		setIsCompleted(!isCompleted)
		let newCompletion = [...props.completion]
		let habitCheck = props.completion[props.index]
		habitCheck === 0? newCompletion[props.index] = 1: newCompletion[props.index] = 0;

		const { data, error } = await supabase
		.from('habits')
		.update({ completion: newCompletion })
		.match({ title: props.title })
		if (error) {
			console.log(error)
		} else {
			console.log("Success")
			props.router.reload()
		}
	}

	return (
		<div 
			className={styles.habit} 
			// conditional style change
			style={
				isCompleted?
				{backgroundColor: props.color, color: 'white'}
				:
				{backgroundColor: 'white', color: 'black', borderLeft: `6px solid ${props.color}`, borderRadius: '0px 7px 7px 0px'}
			}
		>
			<div className={styles.title}>{props.title}</div>
			{isCompleted?
				<div className={styles.habitfooter}>
					<div >
						<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> {' '}
						Completed
					</div>
					<button className={styles.undo} onClick={toggleCompleted}>
						Undo
					</button>
				</div>
				:
				<button className={styles.completebutton} onClick={toggleCompleted}>
					Mark Complete
				</button>
			}
		</div>
	)
}