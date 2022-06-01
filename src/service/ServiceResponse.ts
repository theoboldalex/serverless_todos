import IServiceResponse from '../interfaces/IServiceResponse'
import Todo from '../interfaces/todo'

class ServiceResponse implements IServiceResponse {
    public statusCode: number
    public data: Array<Todo>
    public success: boolean
    public message?: string

    constructor(statusCode: number, data = [], success = true, message = '') {
        this.statusCode = statusCode
        this.data = data
        this.success = success
        this.message = message
    }
}

module.exports = {
    ServiceResponse
}
