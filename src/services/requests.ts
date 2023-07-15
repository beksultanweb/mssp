import { AxiosResponse } from 'axios'

import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'
import { UserInfoResponse } from '../types/UserInfoResponse'

export default class RequestsService {
    static async createRequest(title: string, domain: string, phone: string, comments?: string): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>('/requests', { title, domain, phone, comments })
    }
    static async getMyRequests(userId: number): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>(`/requests/${userId}`)
    }
    static async getAllRequests(): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>('/requests')
    }
    static async getRequest(requestId: number): Promise<AxiosResponse<RequestsResponse>> {
        return $api.get<RequestsResponse>(`/request/${requestId}`)
    }
    static async getUser(userId: string): Promise<AxiosResponse<UserInfoResponse>> {
        return $api.get<UserInfoResponse>(`/getuser/${userId}`)
    }
    static async updateStatus(requestId: number, status: string): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>(`/request/${requestId}`, { status })
    }
    static async uploadFiles(requestId: number, data: FormData): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>(`/upload/${requestId}`, data)
    }
    static async download(requestId: number, fileName: string): Promise<AxiosResponse<RequestsResponse>> {
        return $api.get<RequestsResponse>('/download', { params: { requestId: requestId, fileName: fileName }, responseType: 'blob' })
    }
}