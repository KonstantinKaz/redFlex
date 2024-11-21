import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

const Profile: FC = () => {
	const { setUser } = useAuth()

	return (
		<View>
			<Pressable
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='opacity-40 items-center flex-row justify-end'
			>
				<AntDesign name='logout' size={18} color='white' />
				<Text className='text-white text-lg ml-2 mt-10'>Logout</Text>
			</Pressable>
		</View>
	)
}

export default Profile
