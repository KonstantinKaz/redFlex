import Layout from '@/components/ui/layout/Layout'
import Loader from '@/components/ui/Loader'
import { FC } from 'react'
import MovieBackground from './MovieBackground'
import MovieHeader from './MovieHeader'
import MovieInfo from './movie-content/MovieInfo'
import { useMovie } from './useMovie'

const Movie: FC = () => {
	const { movie, isLoading } = useMovie()

	if (isLoading) return <Loader />
	if (!movie) return null

	return (
		<Layout style={{ paddingTop: 0 }}>
			<MovieHeader movie={movie} />
			<MovieBackground movie={movie} />
			<MovieInfo movie={movie} />
		</Layout>
	)
}

export default Movie
