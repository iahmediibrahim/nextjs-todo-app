import Link from 'next/link'
import React from 'react'
import { useAuth } from '../store/authContext'

const Navbar = () => {
	const { user, logout, login } = useAuth()
	console.log(user)
	return (
		<div className='pt-12'>
			<ul className='flex justify-center'>
				<li>
					<Link href={'/todos'}>Todos</Link>
				</li>
				{!user && (
					<li onClick={login} className='bg-blue-500 px-2 mx-2 rounded text-cyan-50'>
						<button>Login</button>
					</li>
				)}
				{user && (
					<li onClick={logout} className='bg-blue-500 px-2 mx-2 rounded text-cyan-50'>
						<button>LogOut</button>
					</li>
				)}
			</ul>
		</div>
	)
}

export default Navbar
