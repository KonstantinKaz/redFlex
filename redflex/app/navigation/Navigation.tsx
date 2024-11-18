import { enableScreens } from 'react-native-screens'
enableScreens();

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import { TypeRootStackParamList } from './navigation.types'
import { userRoutes } from './user.routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const Navigation: FC = () => {
	console.log('Routes:', userRoutes)
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ contentStyle: { backgroundColor: '#090909' } }}
			>
				{userRoutes.map(route => {
					console.log('Route component:', route.component)
					return (
						<Stack.Screen key={route.name} name={route.name} component={route.component} />
					)
				})}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
export default Navigation
