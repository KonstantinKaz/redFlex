import { render } from '@testing-library/react-native'
import { useAuth } from '@/hooks/useAuth'
import Navigation from '@/navigation/Navigation'

// Моки
jest.mock('@/hooks/useAuth')
jest.mock('providers/auth/useCheckAuth', () => ({
  useCheckAuth: jest.fn()
}))

// Мок для навигации
const mockAddListener = jest.fn()
const mockGetCurrentRoute = jest.fn().mockReturnValue({ name: 'default' })
const mockNavigate = jest.fn()

// Мок для NativeStackNavigator
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children
  })
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children, ref }) => children,
  useNavigationContainerRef: () => ({
    addListener: mockAddListener,
    getCurrentRoute: mockGetCurrentRoute,
    navigate: mockNavigate
  })
}))

// Мок для PrivateNavigator
jest.mock('@/navigation/PrivateNavigator', () => {
  return function MockPrivateNavigator() {
    return null
  }
})

const mockUseAuth = useAuth as jest.Mock

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without BottomMenu when user is null', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false
    })

    const { queryByTestId } = render(<Navigation />)
    expect(queryByTestId('bottom-menu')).toBeNull()
  })

  test('renders with BottomMenu when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@test.com' },
      isLoading: false
    })

    const { getByTestId } = render(<Navigation />)
    expect(getByTestId('bottom-menu')).toBeTruthy()
  })
}) 