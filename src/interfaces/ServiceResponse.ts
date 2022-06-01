import { Todo } from './todo'

export interface ServiceResponse {
    statusCode: number,
    data: Array<Todo>,
    success: boolean,
    message?: string
}
