import Toast from '@/components/ui/Toast'
import { QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from 'providers/auth/AuthProvider'
import React, { useMemo } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './app/assets/global.css'
import Navigation from './app/navigation/Navigation'
import { createQueryClient } from './app/config/queryClient'

const App = () => {
	const queryClient = useMemo(() => createQueryClient(), [])

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</AuthProvider>
			<StatusBar barStyle='light-content' />
			<Toast />
		</QueryClientProvider>
	)
}

// Игнорируем некритичные предупреждения
LogBox.ignoreLogs([
	'Warning: TRenderEngineProvider:',
	'Warning: MemoizedTNodeRenderer:',
	'Warning: TNodeChildrenRenderer:'
])

export default App
