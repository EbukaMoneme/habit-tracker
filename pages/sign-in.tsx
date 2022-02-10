import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function SignIn() {

	const [state, setState] = useState({
		email: '',
		password: '',
		submitted: false
	})

	// Change state for all keys except status and frequency
	const changeState = (key: string, val: string | boolean) => {
		setState({...state, [key]: val })
	}

	const clearState = () => {
		setState({...state, email: '', password: ''})
	}

	async	function handleSubmit(event) {
		event.preventDefault();

		const { user, session, error } = await supabase.auth.signIn({
			email: state.email,
			password: state.password,
		}, {
			redirectTo: '/index'
		})
		if (error) {
			console.log({error})
		} else {
			changeState("submitted", true)
		}
		// console.log("User:", user)
		// clearState()
	}

	if (state.submitted) {

	}

	return (
		<div>
			<h1>Log In</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input 
					type="email" 
					id="email" 
					name="email" 
					value={state.email} 
					onChange={(event) => changeState("email", event.target.value)}
				/>

				<label htmlFor="email">Password</label>
				<input 
					type="password" 
					id="password" 
					name="password" 
					value={state.password} 
					onChange={(event) => changeState("password", event.target.value)}
				/>
				
				<button type="submit">Sign In</button>
			</form>
		</div>
	)
}