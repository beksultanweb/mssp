import { AxiosResponse } from 'axios'

import $api from '../http'
import { AuthResponse } from '../types/AuthResponse'

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password })
    }

    static async registration(email: string, password: string, name?: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password, name })
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async resetPwd(email: string): Promise<AxiosResponse> {
        return $api.post<AuthResponse>('/password-reset', { email })
    }

    static async newPwd(userId: string, token: string, password: string): Promise<AxiosResponse> {
        return $api.post(`/password-reset/${userId}/${token}`, { password })
    }
}