import { useState } from 'react'
import styles from '../styles/DailyHabit.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function DailyHabit(props) {
	const [isCompleted, setIsCompleted] = useState(props.default)

	const toggleCompleted = async () => {
		// Toggle completed status
		setIsCompleted(!isCompleted)

		try {
			// Update database
			await props.updateStatus(props.id, props.value, props.status)
		} catch (err) {
			console.log(err)
		} finally {
			// Reload page to re-fetch habit props
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