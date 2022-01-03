import { useState } from 'react'
import styles from '../styles/DailyHabit.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function DailyHabit(props) {
	// console.log(props)
	const [isCompleted, setIsCompleted] = useState(false)
	return (
		<div 
			className={styles.habit} 
			style={
				isCompleted?
				{backgroundColor: 'white', color: 'black', borderLeft: `6px solid ${props.color}`, borderRadius: '0px 7px 7px 0px'}
				:
				{backgroundColor: props.color, color: 'white'}
			}
		>
			<div className={styles.title}>{props.title}</div>
			{isCompleted?
				<button 
					className={styles.completebutton}
					onClick={() => setIsCompleted(!isCompleted)}
				>Mark Complete</button>
				:
				<div className={styles.habitfooter}>
					<div >
						<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> {' '}
						Completed
					</div>
					<button className={styles.undo} onClick={() => setIsCompleted(!isCompleted)}>Undo</button>
				</div>
			}
		</div>
	)
}