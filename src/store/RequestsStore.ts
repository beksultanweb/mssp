import { makeAutoObservable } from 'mobx'

import RequestsService from '../services/requests'
import { RequestsResponse } from '../types/RequestsResponse'
import { UserInfoResponse } from '../types/UserInfoResponse'


export class RequestsStore {
    requests: RequestsResponse[] = []
    request = {} as RequestsResponse
    user = {} as UserInfoResponse
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setRequests(requests: RequestsResponse[]) {
        this.requests = requests
    }
    setRequest(request: RequestsResponse) {
        this.request = request
    }
    setUserInfo(user: UserInfoResponse) {
        this.user = user
    }

    async getMyRequests(userId: number, status?: string) {
        try {
            const { data } = await RequestsService.getMyRequests(userId, status)
            this.setRequests(data)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async getAllRequests() {
        try {
            const { data } = await RequestsService.getAllRequests()
            this.setRequests(data)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async getRequest(requestId: number) {
        try {
            const { data } = await RequestsService.getRequest(requestId)
            this.setRequest(data)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async getUserInfo(userId: string) {
        try {
            const { data } = await RequestsService.getUser(userId)
            this.setUserInfo(data)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async updateStatus(requestId: number, status: string) {
        try {
            const { data } = await RequestsService.updateStatus(requestId, status)
            this.setRequest(data)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }
}

const requestsStore = new RequestsStore()

export default requestsStore