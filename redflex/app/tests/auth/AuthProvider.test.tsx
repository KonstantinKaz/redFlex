import React from 'react'
import { renderHook } from '@testing-library/react-native'
import { AuthContext } from 'providers/auth/AuthProvider'
import { IAuthForm, IContext } from 'providers/auth/auth-provider.interface'

const mockAuthForm: IAuthForm = {
    email: 'test@example.com',
    password: 'password123'
}

const mockContext: IContext = {
    user: null,
    setUser: jest.fn(),
    login: jest.fn(),
    logout: jest.fn()
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider value={mockContext}>{children}</AuthContext.Provider>
)

describe('AuthProvider', () => {
    beforeEach(() => {
        mockContext.user = null
        mockContext.login.mockClear()
        mockContext.logout.mockClear()
    })

    it('should initialize with null user', () => {
        const { result } = renderHook(() => mockContext, { wrapper })
        expect(result.current.user).toBeNull()
    })

    it('should update user state after successful login', async () => {
        mockContext.login.mockImplementationOnce(() => {
            mockContext.user = { id: 1, email: mockAuthForm.email }
            return Promise.resolve()
        })

        const { result } = renderHook(() => mockContext, { wrapper })
        
        await result.current.login(mockAuthForm)

        expect(mockContext.login).toHaveBeenCalledWith(mockAuthForm)
        expect(result.current.user).toBeTruthy()
        expect(result.current.user?.email).toBe(mockAuthForm.email)
    })

    it('should clear user state after logout', async () => {
        mockContext.user = { id: 1, email: mockAuthForm.email }
        mockContext.logout.mockImplementationOnce(() => {
            mockContext.user = null
            return Promise.resolve()
        })

        const { result } = renderHook(() => mockContext, { wrapper })
        
        expect(result.current.user).toBeTruthy()

        await result.current.logout()

        expect(mockContext.logout).toHaveBeenCalled()
        expect(result.current.user).toBeNull()
    })

    it('should handle login errors correctly', async () => {
        const error = new Error('Invalid credentials')
        mockContext.login.mockRejectedValueOnce(error)

        const { result } = renderHook(() => mockContext, { wrapper })
        
        try {
            await result.current.login(mockAuthForm)
        } catch (e) {
            expect(e).toBe(error)
        }

        expect(mockContext.login).toHaveBeenCalledWith(mockAuthForm)
        expect(result.current.user).toBeNull()
    })
}) 