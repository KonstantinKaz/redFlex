import Auth from 'components/screens/auth/Auth'
import Home from 'components/screens/home/Home'
import { IRoute } from './navigation.types'

console.log('Auth component:', Auth)
console.log('Home component:', Home)

export const userRoutes: IRoute[] = [
	{
		name: 'Auth',
		component: Auth
	},
	{
		name: 'Home',
		component: Home
	}
]
