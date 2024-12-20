import GenreList from '@/components/ui/movie/movie-item/GenreList'
import Rating from '@/components/ui/movie/movie-item/Rating'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { IMovie } from '@/shared/types/movie.interface'
import { getMediaSource } from '@/utils/getMediaSource'

import FavoriteButton from '@/components/ui/movie/movie-item/favorite-button/FavoriteButton'
import React, { FC } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { ITEM_SIZE, SPACING } from '../carousel.constants'
import { useItemAnimation } from './useItemAnimation'

interface ICarouselItem {
	index: number
	scrollX: Animated.Value
	movie: IMovie
}

const CarouselItem: FC<ICarouselItem> = ({ movie, index, scrollX }) => {
	const { navigate } = useTypedNavigation()

	const { rotate, opacity, scale, opacityElement } = useItemAnimation(
		index,
		scrollX
	)

	return (
		<View style={{ width: ITEM_SIZE }}>
			<Animated.View
				style={{
					padding: SPACING,
					transform: [{ scale }, { rotate }],
					opacity
				}}
				className='items-center'
			>
				<Pressable
					className='w-full relative'
					onPress={() => navigate('Movie', { slug: movie.slug })}
				>
					<View className='absolute top-2 right-2 z-1'>
						<FavoriteButton movieId={movie._id} />
					</View>

					<Image
						style={{
							height: ITEM_SIZE * 1.3,
							resizeMode: 'cover',
							borderWidth: 1,
							borderColor: 'white'
						}}
						className='w-full rounded-xl mb-2.5'
						source={getMediaSource(movie.poster)}
					/>
				</Pressable>

				<Animated.View
					style={{ opacity: opacityElement }}
					className={'items-center'}
				>
					<Rating rating={movie.rating} />

					<Pressable onPress={() => navigate('Movie', { slug: movie.slug })}>
						<Text
							className='text-white text-3xl font-semibold opacity-95 mb-2.5'
							numberOfLines={1}
						>
							{movie.title}
						</Text>
					</Pressable>

					<GenreList genres={movie.genres} />
				</Animated.View>
			</Animated.View>
		</View>
	)
}

export default CarouselItem
