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

export default updateStatus;