import { Dispatch, SetStateAction } from 'react'

import { IUser } from '@/shared/types/user.interface'

export type TypeUserState = {
	id: number
	email: string
} | null

export interface IAuthForm {
	email: string
	password: string
}

export interface IContext {
	user: TypeUserState
	setUser: React.Dispatch<React.SetStateAction<TypeUserState>>
	login: (data: IAuthForm) => Promise<void>
	logout: () => Promise<void>
}
