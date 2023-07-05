import { makeAutoObservable } from 'mobx'
import { RequestsResponse } from '../types/RequestsResponse'
import RequestsService from '../services/requests'


export class RequestsStore {
    requests: RequestsResponse[] = []
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setRequest(requests: RequestsResponse[]) {
        this.requests = requests
    }

    async createRequest(title: string, domain: string, comments: string) {
        try {
            const response = await RequestsService.createRequest(title, domain, comments)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async getMyRequests() {
        try {
            const response = await RequestsService.getMyRequests()
            const requests = response.data;
            this.setRequest(requests)
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