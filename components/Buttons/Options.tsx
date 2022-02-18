import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/Options.module.css'

export default function Options(props) {
	// const { is_archived, archiveCall, toggleDetails } = props;
	const menuRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [isActive, setisActive] = useState(false);

	const toggleOptions = () => {
		setisActive(!isActive);
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
	// console.log(props.props.freq_hist)
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

	// console.log(props)
	useEffect(() => {
		document.addEventListener(`click`, clickChecker);
		return () => document.removeEventListener('click', clickChecker)
	}, [setListening, listening, setisActive, isActive]);

	return (
		<div 
				ref={menuRef}
				className={styles.options}
				onClick={toggleOptions}
			>
				<FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>

				{isActive && 
					<div className={styles.dropdown}>
						<button className={styles.dropdown_item} onClick={editHabit}>Edit</button>
						<button className={styles.delete} onClick={props.deleteHabit}>Delete</button>
					</div>
				}
			</div>
	)
};