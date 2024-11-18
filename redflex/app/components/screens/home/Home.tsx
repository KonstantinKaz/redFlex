import { FC } from 'react'
import { View, Text } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const Home: FC = () => {
	const { navigate } = useTypedNavigation()
	return (
		<View>
			<Text>Home</Text>
			{/* <Pressable onPress={() => navigate('Auth')}>
				<Text style={{ color: 'white' }}>Go to login</Text>
			</Pressable> */}
		</View>
	)
}
export default Home
