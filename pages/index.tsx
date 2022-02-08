import Head from 'next/head';
import Link from 'next/link';

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

export const getServerSideProps: GetServerSideProps = async () => {
	const habits: any = await prisma.habit.findMany();
	const sortedHabits: Habit[] = habits.sort((a: Habit, b: Habit) =>  a.id - b.id);

	return {
		props: { habits: sortedHabits }
	}
}

export default function Home({ habits }: any) {
	const { DateTime } = require("luxon");
	const { time, wish } = useDate();
	const router = useRouter();

	const weekStart = DateTime.now().startOf('week').toLocaleString();
	const weekStartDay = DateTime.now().startOf('week').weekdayShort;
	const weekEnd = DateTime.now().endOf('week').toLocaleString();
	const weekEndDay = DateTime.now().endOf('week').weekdayShort;

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
							It's {' '} <span>{DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)}</span>
							{' '} on <span>{DateTime.now().toLocaleString(DateTime.DATE_HUGE)}</span> 
						</p>

						<div className={styles.moverDiv}>
							<div className={styles.movers}>
								<div 
									className={styles.moverIconLeft}
									onClick={() => {}}
								>
									<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
								</div>
								<div 
									className={styles.moverIconRight}
									onClick={() => {}}
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

					<WeeklyContainer habits={habits} router={router} updateStatus={updateStatus} />
				</div>

				<div className={styles.dailyview}>
					<DailyContainer 
						today={DateTime.now().toLocaleString({ weekday: 'long' })}
						habits={habits} 
						router={router} 
						updateStatus={updateStatus}
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
  )
}

