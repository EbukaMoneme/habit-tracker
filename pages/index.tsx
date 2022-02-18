import Head from 'next/head';
import Link from 'next/link';

import { useState, useEffect, useCallback } from 'react';

import WeeklyContainer from '../components/WeeklyContainer';
import DailyContainer from '../components/DailyContainer';

import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useDate from '../hooks/useDate.js';
import updateStatus from '../hooks/useUpdateStatus';

import { useRouter } from 'next/router';
import { prisma } from "../src/db";

import { GetServerSideProps } from 'next';
import { Habit } from '../types';

import { supabase } from '../utils/supabase';
import useDOY from '../hooks/useDOY';
import useValidDate from '../hooks/useValidDate';

export const getServerSideProps: GetServerSideProps = async () => {
	console.log("User:", supabase.auth.user())

	// Grab habits - will soon be user specific
	const { data: habits, error } = await supabase.from("habits").select('*')
	if (error) {
		console.log(error)
	}
	// grab the last visited date/week - will also be attached to the user in table
	// 		rather than it's own table
	const { data: last_visited, error: err } = await supabase
  .from('last_visited')
  .select('*')
	if (err) {
		console.log(err)
	}

	const { data: last_day, error: mistake } = await supabase
  .from('last_day')
  .select('*')
	if (err) {
		console.log(mistake)
	}
	// sort habits and return it with last_visited date
	const sortedHabits: Habit[] = habits.sort((a: Habit, b: Habit) =>  a.id - b.id);
	return {
		props: { habits: sortedHabits, last_visited, last_day }
	}
}

export default function Home({ habits, last_visited, last_day }: any) {
	const { DateTime, Interval } = require("luxon");
	const { time, wish } = useDate();
	const router = useRouter();

	// Find today's date
	const today = DateTime.now();

	const [state, setState] = useState(last_visited[0].state || {
		year: today.year,
		month: today.month,
		day: today.day
	})

	// Set last visited date
  const setLastVisited = async (day) => {
		const { data, error } = await supabase
  	.from('last_visited')
  	.update({ state: day })
  	.match({ id: 1 })
  }

	// Finds start and end of week for weekly view
	const weekStart = DateTime.local(state.year, state.month, state.day).startOf('week').toLocaleString();
	const weekStartDay = DateTime.local(state.year, state.month, state.day).startOf('week').weekdayShort;
	const weekEnd = DateTime.local(state.year, state.month, state.day).endOf('week').toLocaleString();
	const weekEndDay = DateTime.local(state.year, state.month, state.day).endOf('week').weekdayShort;
	// Finds the date of the year for start and end of week
	const monday = DateTime.local(state.year, state.month, state.day).startOf('week')
	const sunday = DateTime.local(state.year, state.month, state.day).endOf('week')

	// used with checkLength below to extend the weeks 
	// 		if there isnt a completion array for that date
	const updateWeeks = async (title, completion) => {
		const { data, error } = await supabase
		.from('habits')
		.update({ completion: completion })
		.match({ title: title })
		if (error) {
			console.log(error)
		} else {
			console.log("Success")
			router.reload()
		}
	}

	//Add an extra week onto the habit completion when it's at the end of the array
	const checkLength = () => {
		const extendedHabits = habits.map((habit) => {
			// console.log(habit)
			const extender = new Interval({start: DateTime.fromISO(habit.weekStart), end: sunday})
			const extenderLength = Math.abs(Math.ceil(extender.length('days')))
			if (habit.completion.length === extenderLength) {
				const extendedCompletion = habit.completion.concat(habit.template).concat(habit.template)
				updateWeeks(habit.title, extendedCompletion)
			}
		})
	}

	// Called to continuosly update weeks
	const extendedHabits = checkLength()

	// Moves current week forward or back while using a date validator to avoid 
	// 		non existent dates
	const changeWeek = (direction) => {
		if (direction === 'forward') {
			const { newYear, newMonth, newDay } = useValidDate(state.year, state.month, state.day + 7)
			setState({...state, year: newYear, month: newMonth,  day: newDay})
			setLastVisited({ year: newYear, month: newMonth,  day: newDay })
		}
		if (direction === 'backward') {
			const { newYear, newMonth, newDay } = useValidDate(state.year, state.month, state.day - 7)
			setState({...state, year: newYear, month: newMonth,  day: newDay})
			setLastVisited({ year: newYear, month: newMonth,  day: newDay })
		}
	}

	// Sets the view to this week/today
	const setToday = () => {
		setState({
			year: today.year,
			month: today.month,
			day: today.day
		})
		setLastVisited({
			year: today.year,
			month: today.month,
			day: today.day
		})
	}

	const filteredHabits = habits.filter((habit) => DateTime.fromISO(habit.creationDate) <= sunday)

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}

  return (
    <div className={styles.container}>
      <Head>
        <title>Flexibly - Habit Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main className={styles.main}>
				<div className={styles.weeklyview}>
					<div className={styles.header}>
						<h1 className={styles.title}>
						{wish} <span>Levon!</span>
						</h1>

						<p className={styles.description}>
							It's {' '} <span>{time}</span> {' '}
							{/* It's {' '} <span>{DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)}</span> */}
							{' '} on <span>{DateTime.now().toLocaleString(DateTime.DATE_HUGE)}</span>
						</p>

						<div className={styles.moverDiv}>
							<button 
								className={styles.today}
								onClick={setToday}
							>
								This Week
							</button>
							<div className={styles.movers}>
								<div 
									className={styles.moverIconLeft}
									onClick={() => {changeWeek('backward')}}
								>
									<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
								</div>
								<div 
									className={styles.moverIconRight}
									onClick={() => {changeWeek('forward')}}
								>
									<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
								</div>
							</div>
							<div className={styles.dates}>
								{`${weekStartDay}, ${weekStart.slice(0, weekStart.lastIndexOf('/'))}`} - {' '}
								{`${weekEndDay}, ${weekEnd.slice(0, weekEnd.lastIndexOf('/'))}`}
							</div>
						</div>
					</div>

					<div className={styles.viewheader}>
						<div className={styles.description}>Your habits for the week:</div>

						<Link href="/add-habit">
							<a className={styles.addhabit}>
								<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Habit
							</a>
						</Link>
					</div>
					<hr/>

					{/* {JSON.stringify(filteredHabits)} */}
					<WeeklyContainer habits={filteredHabits} router={router} updateStatus={updateStatus} monday={monday} sunday={sunday}/>
				</div>

				<div className={styles.dailyview}>
					<DailyContainer 
						today={state}
						habits={habits} 
						router={router} 
						updateStatus={updateStatus}
						last_day={last_day}
					/>
				</div>
      </main>
			
      <footer className={styles.footer}>
        <a
          href="https://www.flexibly.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {' '}
          <img className={styles.logo} src="/images/logo.svg" />  {' '}
					Flexibly
        </a>
      </footer>
    </div>

	
		// <>
		// 	{JSON.stringify(habits)}
		// 	<button onClick={signOut}>Sign Out</button>
		// </>
  )
}

