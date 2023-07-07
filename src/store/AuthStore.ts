import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { API_URL } from '../http'
import { AuthResponse } from '../types/AuthResponse'
import { IUser } from '../types/IUser'
import AuthService from '../services/auth'


export class AuthStore {
    user = {} as IUser
    isAuth = false
    isLoading = false
    error = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setError(error: string) {
        this.error = error
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            if(error instanceof Error) {
                this.setError(error.message)
            }
            else this.setError('Unexpected error')
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            if(error instanceof Error) {
                this.setError(error.message)
            }
            else this.setError('Unexpected error')
        } finally {
            this.setLoading(false)
        }
    }
}

const authStore = new AuthStore()

export default authStore