import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'

export default class RequestsService {
    static async createRequest(title: string, domain: string, comments: string): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>('/requests', { title, domain, comments })
    }
    static async getMyRequests(): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>('/requests')
    }
}