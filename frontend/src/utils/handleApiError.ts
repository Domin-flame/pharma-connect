import { AxiosError } from 'axios'

export function handleApiError(error:unknown): never {
    if (error instanceof AxiosError) {
        throw error.response?.data || error.message
        
    }
    throw error
}

