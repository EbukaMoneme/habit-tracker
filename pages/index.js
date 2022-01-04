import Head from 'next/head'
import Link from 'next/link'
import { useQuery, useMutation, queryCache } from "react-query";
import WeeklyContainer from '../components/WeeklyContainer'

import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import moment from 'moment'
import DailyContainer from '../components/dailyContainer'
import useDate from '../hooks/useDate.js';

async function fetchHabitsRequest() {
	const response = await fetch('/api/habits');
	const data = await response.json();
	const { habits } = data;
	return habits;
}

export default function Home() {
	const { date, time, wish } = useDate();

	const {data: habits} = useQuery('habits', fetchHabitsRequest)

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
						{wish} <span>Ebuka!</span>
						</h1>

						<p className={styles.description}>
							It's {' '}
							<span>
								{time}
								
							</span>
							{' '}
							on <span>{moment().format('dddd')} {moment().format('ll')}</span>
						</p>
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
					<WeeklyContainer habits={habits}/>
				</div>
				<div className={styles.dailyview}>
					<DailyContainer today={moment().format('dddd')} habits={habits}/>
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
  )
}
