import { useState } from 'react'
import styles from '../styles/DailyHabit.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function DailyHabit(props) {
	// console.log(props)
	const [isCompleted, setIsCompleted] = useState(props.default? true : false)
	console.log(props.default)

	async function updateStatus(id, day, status) {
		const newStatus = {id, day, status}
		const response = await fetch('/api/habits/update', {
			method: 'PUT',
			body: JSON.stringify(newStatus)
		})

		if (!response.ok) {
			throw new Error(response.statusText)
		}

		return await response.json();
	}

	return (
		<div 
			className={styles.habit} 
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
					<button 
						className={styles.undo} 
						onClick={async () => {
							setIsCompleted(!isCompleted)
							try {
								await updateStatus(props.id, props.value, props.status)
							} catch (err) {
								console.log(err)
							}
						}}
					>Undo</button>
				</div>
				:
				<button 
				className={styles.completebutton}
				onClick={async () => {
					setIsCompleted(!isCompleted)
					try {
						await updateStatus(props.id, props.value, props.status)
					} catch (err) {
						console.log(err)
					}
				}}
			>Mark Complete</button>
			}
		</div>
	)
}