import { enableScreens } from 'react-native-screens'
enableScreens()

import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'

import BottomMenu from '@/components/ui/layout/bottom-menu/BottomMenu'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from 'providers/auth/useCheckAuth'
import PrivateNavigator from './PrivateNavigator'

const Navigation: FC = () => {
	const { user } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const navRef = useNavigationContainerRef()

	useEffect(() => {
		const unsubscribe = navRef.addListener('state', () => {
			const currentRoute = navRef.getCurrentRoute();
			setCurrentRoute(currentRoute?.name ?? 'default');
		});

		// Установка начального маршрута
		const initialRoute = navRef.getCurrentRoute();
		setCurrentRoute(initialRoute?.name ?? 'default');

		return unsubscribe;
	}, [navRef]);

	useCheckAuth(currentRoute)

	return (
		<>
			<NavigationContainer ref={navRef}>
				<PrivateNavigator />
			</NavigationContainer>
			{user && currentRoute && (
				<BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
			)}
		</>
	)
}
export default Navigation
