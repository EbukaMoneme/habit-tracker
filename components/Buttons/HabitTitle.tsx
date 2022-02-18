import React, { useState, useRef, useEffect, useCallback } from 'react';
import { withRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/HabitTitle.module.css';

export default function HabitTitle(props) {
	// const { is_archived, archiveCall, toggleDetails } = props;
	const menuRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [isActive, setisActive] = useState(false);

	const toggleOptions = () => {
		setisActive(!isActive);
	}
	// console.log(props.props)
	const editHabit = () => {
		props.props.router.push({
			pathname: '/edit-habit', 
			query: {
				title: props.props.title,
				color: props.props.color,
				description: props.props.description,
				frequency: props.props.freq_hist[props.props.freq_hist.length-1].frequency,
				id: props.props.id
			}
		})
	}

	const listenForClicks = useCallback(() => {
		if (listening) return;
  	if (!menuRef.current) return;
  	setListening(true);
		
	}, [setListening, listening, isActive, setisActive]);

	const clickChecker = (evt) => {
		if (menuRef.current && menuRef.current.contains(evt.target)) return;
			setisActive(false);
	};

	useEffect(() => {
		document.addEventListener(`click`, clickChecker);
		return () => document.removeEventListener('click', clickChecker)
	}, [setListening, listening, setisActive, isActive]);

	return (
		<div 
				ref={menuRef}
				className={styles.habitTitle}
				onClick={toggleOptions}
			>
				<div className={styles.title}>
					<FontAwesomeIcon className={styles.icon} style={{color: props.color}} icon={faCircle}></FontAwesomeIcon> 
					<div className={styles.habitName}>{props.title}</div>
					<FontAwesomeIcon className={styles.chevron} icon={faAngleDown}></FontAwesomeIcon> 
				</div>

				{isActive && 
					<div className={styles.dropdown}>
						<button className={styles.dropdown_item} onClick={editHabit}>Edit</button> 
						<button className={styles.dropdown_item} onClick={props.deleteHabit}>Delete</button>
					</div>
				}
			</div>
	)
};