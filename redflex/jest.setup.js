import '@testing-library/jest-native/extend-expect'
import { jest } from '@jest/globals'

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native')
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn()
        }),
        useRoute: () => ({
            params: {}
        })
    }
})

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock')
    Reanimated.default.call = () => {}
    return Reanimated
})

// Mock React Native Screens
jest.mock('react-native-screens', () => ({
    enableScreens: jest.fn(),
    screensEnabled: jest.fn(),
    Screen: ({ children }) => children,
    ScreenContainer: ({ children }) => children,
    NativeScreen: ({ children }) => children,
    NativeScreenContainer: ({ children }) => children,
    ScreenStack: ({ children }) => children,
    ScreenStackHeaderConfig: ({ children }) => children,
    FullWindowOverlay: ({ children }) => children,
    createNativeStackNavigator: () => ({
        Navigator: ({ children }) => children,
        Screen: ({ children }) => children
    })
}))

// Mock Expo modules
jest.mock('expo-font', () => ({
    loadAsync: jest.fn(),
    isLoaded: jest.fn(() => true),
    useFonts: () => [true, null]
}))

jest.mock('@expo/vector-icons/Feather', () => 'Feather')
jest.mock('@expo/vector-icons', () => ({
    Feather: 'Feather',
    MaterialCommunityIcons: 'MaterialCommunityIcons'
}))

jest.mock('expo-modules-core', () => ({
    NativeModulesProxy: {
        ExponentFontLoader: {
            loadAsync: jest.fn()
        }
    },
    requireNativeModule: () => ({
        loadAsync: jest.fn()
    }),
    requireOptionalNativeModule: () => null,
    requireNativeViewManager: () => null,
    createPermissionHook: () => () => ({ status: 'granted' })
}))

// Mock Splash Screen
jest.mock('expo-splash-screen', () => ({
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn()
}))

// Mock Secure Store
jest.mock('expo-secure-store', () => ({
    getItemAsync: jest.fn(() => Promise.resolve(null)),
    setItemAsync: jest.fn(() => Promise.resolve()),
    deleteItemAsync: jest.fn(() => Promise.resolve())
}))

// Mock Linear Gradient
jest.mock('expo-linear-gradient', () => ({
    LinearGradient: 'LinearGradient'
}))

// Mock Expo AV
jest.mock('expo-av', () => ({
    Audio: {
        Sound: {
            createAsync: jest.fn(() => Promise.resolve({ sound: { unloadAsync: jest.fn() } }))
        }
    },
    Video: 'Video',
    ResizeMode: {
        CONTAIN: 'contain',
        COVER: 'cover',
        STRETCH: 'stretch'
    }
}))

// Mock Image Picker
jest.mock('expo-image-picker', () => ({
    MediaTypeOptions: {
        Images: 'Images'
    },
    launchImageLibraryAsync: jest.fn(() =>
        Promise.resolve({
            cancelled: false,
            assets: [{ uri: 'test-uri', type: 'image' }]
        })
    ),
    requestMediaLibraryPermissionsAsync: jest.fn(() =>
        Promise.resolve({ status: 'granted' })
    )
}))

// Mock React Native Safe Area Context
jest.mock('react-native-safe-area-context', () => {
    const inset = { top: 0, right: 0, bottom: 0, left: 0 }
    const frame = { x: 0, y: 0, width: 0, height: 0 }
    return {
        SafeAreaProvider: ({ children }) => children,
        SafeAreaView: ({ children }) => children,
        useSafeAreaInsets: () => inset,
        useSafeAreaFrame: () => frame,
        SafeAreaContext: {
            Consumer: ({ children }) => children(inset),
            Provider: ({ children }) => children
        }
    }
})

// Mock React Navigation Elements
jest.mock('@react-navigation/elements', () => {
    return {
        SafeAreaProviderCompat: ({ children }) => children,
        Screen: ({ children }) => children,
        getDefaultHeaderHeight: () => 60,
        useHeaderHeight: () => 60
    }
})

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: () => ({
        Navigator: ({ children }) => children,
        Screen: ({ children }) => children
    })
})) 