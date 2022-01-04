import { useQuery, useMutation, queryCache, useQueryClient } from "react-query";


export default function useCreateHabitRequest(habit) {
	return useMutation(
		() => axios.post("/api/habits/create", {habit}),
		{
			onSuccess: () => {
				console.log('worked!')
			}
		}
	)
}