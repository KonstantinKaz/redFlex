import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import Toast from 'react-native-toast-message'

import { IAuthFormData } from '@/shared/types/auth.interface'

import { UserService } from '@/services/user.service'

export const useProfile = (setValue: UseFormSetValue<IAuthFormData>) => {
	const { isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
		onSuccess({ email }) {
			setValue('email', email)
		}
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IAuthFormData) => UserService.updateProfile(data),
		onSuccess() {
			Toast.show({
				type: 'success',
				text1: 'Update profile',
				text2: 'update was successful'
			})
		}
	})

	const onSubmit: SubmitHandler<IAuthFormData> = async data => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
