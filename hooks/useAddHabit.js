async function addHabit(habit) {
	const response = await fetch('/api/habits/create', {
		method: 'POST',
		body: JSON.stringify(habit)
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return await response.json();
}

export default addHabit;