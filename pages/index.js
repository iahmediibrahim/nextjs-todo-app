import { useQuery } from 'react-query'
import { useAuth } from '../store/authContext'
import AddTodo from './../components/AddTodo'
import Todo from './../components/Todo'

const getTodos = async () => {
	const res = await fetch('http://localhost:3400/todos')
	return res.json()
}

export default function Home() {
	const { user } = useAuth()
	let filteredData
	const { data, isLoading, isError, error } = useQuery('todos', getTodos)
	if (isLoading)
		return (
			<div className='App'>
				<h1>isLoading...</h1>
			</div>
		)

	if (isError)
		return (
			<div className='App'>
				<h1>{error}</h1>
			</div>
		)
	if (user) {
		filteredData = data.filter((i) => i.userId === user?.id)
	}

	return (
		<div className='w-3/4 mx-auto text-center'>
			<h1 className='text-5xl pt-12'>Todos</h1>
			{!user && <h1 className='text-6xl pt-12'>Please login to view your Todo List!</h1>}

			{user && (
				<>
					<AddTodo />
					<div className='max-w-lg mx-auto '>
						{filteredData.map((todo) => (
							<Todo
								key={todo.id}
								text={todo.title}
								userId={todo.userId}
								isDone={todo.completed}
								id={todo.id}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}
