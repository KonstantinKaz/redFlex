import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useEffect } from 'react'

import { useTypedRoute } from '@/hooks/useTypedRoute'

import { IGenreEditInput } from '@/shared/types/genre.interface'

import { GenreService } from '@/services/genre.service'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { params } = useTypedRoute<'GenreEdit'>()
	const genreId = params.id

	const { isLoading, data } = useQuery({
		queryKey: ['get genre', genreId],
		queryFn: () => GenreService.getById(genreId),
		enabled: !!genreId
	})

	useEffect(() => {
		if (data) {
			Object.entries<string>(data).forEach(([key, value]) => {
				setValue(key as keyof IGenreEditInput, value)
			})
		}
	}, [data])

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update genre'],
		mutationFn: (data: IGenreEditInput) => GenreService.update(genreId, data),

		async onSuccess() {
			Toast.show({
				type: 'success',
				text1: 'Update genre',
				text2: 'update was successful'
			})

			await queryClient.invalidateQueries({ queryKey: ['search genres'] })
		}
	})

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
