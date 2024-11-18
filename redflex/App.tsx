import Navigation from './app/navigation/Navigation'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import "./app/assets/global.css"
import Header from '@/components/Header/Header'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<Navigation />
			</SafeAreaProvider>
			<StatusBar barStyle='light-content' />
		</>
	)
}
