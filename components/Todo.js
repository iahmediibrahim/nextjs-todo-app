import { useMutation, useQueryClient } from 'react-query'

const updateTodo = async ({ title, userId, isDone, id }) => {
	const res = await fetch(`http://localhost:3400/todos/${id}`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			title,
			userId,
			completed: isDone,
		}),
	})
	return res.json()
}
const deleteTodo = async (id) => {
	const res = await fetch(`http://localhost:3400/todos/${id}`, {
		method: 'DELETE',
	})
	return res.json()
}

export default function Todo(props) {
	const queryClient = useQueryClient()

	const mutation = useMutation(updateTodo, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries('todos')
		},
	})

	const deletion = useMutation(deleteTodo, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries('todos')
		},
	})

	return (
		<div className='p-4 my-4 rounded flex bg-gray-200 shadow-lg justify-end items-center'>
			<div className='flex items-center mr-auto'>
				<input
					type='checkbox'
					defaultChecked={props.isDone}
					onChange={() => {
						mutation.mutate({
							title: props.text,
							userId: props.userId,
							isDone: !props.isDone,
							id: props.id,
						})
					}}
				/>
				<p style={{ textDecoration: props.isDone ? 'line-through' : 'none' }} className='pl-2'>
					{props.text}
				</p>
			</div>

			<button
				className='bg-red-500 px-2 mx-2 rounded text-cyan-50'
				onClick={() => {
					deletion.mutate(props.id)
				}}>
				Delete
			</button>
		</div>
	)
}
