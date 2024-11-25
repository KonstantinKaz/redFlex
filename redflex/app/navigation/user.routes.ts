import Actor from '@/components/screens/Actor/Actor'
import Favorites from '@/components/screens/favorites/Favorites'
import Genre from '@/components/screens/genre/Genre'
import Movie from '@/components/screens/movie/Movie'
import Profile from '@/components/screens/profile/Profile'
import Search from '@/components/screens/search/Search'
import Trending from '@/components/screens/trending/Trending'
import Home from 'components/screens/home/Home'
import { adminRoutes } from './admin.routes'
import { IRoute } from './navigation.types'

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
	},
	{
		name: 'Genre',
		component: Genre
	},
	{
		name: 'Actor',
		component: Actor
	},
	{
		name: 'Movie',
		component: Movie
	}
]

export const routes = [...userRoutes, ...adminRoutes]
