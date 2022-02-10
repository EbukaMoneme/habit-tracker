import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const [authenticatedState, setAuthenticatedState] = useState(false)
	const router = useRouter();
	useEffect(()=> {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			handleAuthChange(event, session)
			if (event === 'SIGNED_IN') {
				setAuthenticatedState(true)
				router.push('/')
			}
			if (event === 'SIGNED_OUT') {
				setAuthenticatedState(false)
				router.push('sign-in')
			}
		})
		checkUser()
		return () => {
			authListener.unsubscribe()
		}
	}, [])

	async function handleAuthChange(event, session) {
		await fetch('/api/auth', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ event, session})
		})
	}

	async function checkUser() {
		const user = await supabase.auth.user()
		if (user) {
			setAuthenticatedState(true);
		}
	}

  return (
		<div>
			<nav></nav>
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
