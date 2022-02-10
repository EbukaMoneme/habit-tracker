import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function SignIn() {

	const [state, setState] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	})

	// Change state for all keys except status and frequency
	const changeState = (key: string, val: string) => {
		setState({...state, [key]: val })
	}

	const clearState = () => {
		setState({...state, first_name: '', last_name: '', email: '', password: ''})
	}

	async	function handleSubmit(event) {
		event.preventDefault();

		const { user, session, error } = await supabase.auth.signUp(
			{
				email: state.email,
				password: state.password,
			},
			{
				data: {
					first_name: state.first_name,
					last_name: state.last_name
				}
			}
		)

		if (error) {
			console.log(error)
		} else {
			console.log("User:", user)
		}
		// clearState()
	}

	return (
		<div>
			<h1>Sign Up</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="first_name">First Name</label>
				<input 
					type="first_name" 
					id="first_name" 
					name="first_name" 
					value={state.first_name} 
					onChange={(event) => changeState("first_name", event.target.value)}
				/>
				<label htmlFor="last_name">Last Name</label>
				<input 
					type="last_name" 
					id="last_name" 
					name="last_name" 
					value={state.last_name} 
					onChange={(event) => changeState("last_name", event.target.value)}
				/>

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
				
				<button type="submit">Sign Up</button>
			</form>
		</div>
	)
}