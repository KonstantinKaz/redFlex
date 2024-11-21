import Favorites from '@/components/screens/favorites/Favorites'
import Profile from '@/components/screens/profile/Profile'
import Search from '@/components/screens/search/Search'
import Trending from '@/components/screens/trending/Trending'
import Auth from 'components/screens/auth/Auth'
import Home from 'components/screens/home/Home'
import { adminRoutes } from './admin.routes'
import { IRoute } from './navigation.types'

console.log('Auth component:', Auth)
console.log('Home component:', Home)

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name: 'Favorites',
		component: Favorites
	},
	{
		name: 'Trending',
		component: Trending
	},
	{
		name: 'Search',
		component: Search
	}
]

export const routes = [...userRoutes, ...adminRoutes]
