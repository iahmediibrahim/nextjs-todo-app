import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
import '../styles/tailwind.css'
import Navbar from './../components/Navbar'
import { AuthProvider } from './../store/authContext'

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
	return (
		<div className='bg-gray-100 text-gray-900'>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Navbar />
					<Component {...pageProps} />
				</QueryClientProvider>
			</AuthProvider>
		</div>
	)
}

export default MyApp
