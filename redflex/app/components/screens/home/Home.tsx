import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

const Home: FC = () => {
	const { navigate } = useTypedNavigation()
	return (
		<View>
			<Text>Home</Text>
			<Pressable onPress={() => navigate('Auth')}>
				<Text className='text-white mt-10'>Go to login</Text>
			</Pressable>
		</View>
	)
}
export default Home
