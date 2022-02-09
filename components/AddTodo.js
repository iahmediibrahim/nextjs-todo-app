import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

const addTodo = async (title) => {
	const res = await fetch('https://my-json-server.typicode.com/iahmediibrahim/react-courses-json/Todos', {
		method: 'POST',
		body: JSON.stringify({
			title,
			userId: 1,
			completed: false,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
	return res.json()
}
export default function AddTodo() {
	const [todo, setTodo] = useState('')

	const queryClient = useQueryClient()

	const mutation = useMutation(addTodo, {
		onSuccess: () => {
			// Invalidate and refetch
			setTodo('')
			queryClient.invalidateQueries('todos')
		},
	})

	return (
		<div className='pt-12'>
			<input
				className='px-4 py-2 rounded my-4'
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				type='text'
			/>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 mx-4 my-4 border border-blue-700 rounded'
				onClick={() => {
					mutation.mutate(todo)
				}}>
				Add
			</button>
		</div>
	)
}
