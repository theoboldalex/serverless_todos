import IServiceResponse from '../interfaces/IServiceResponse'

export default class ServiceResponse implements IServiceResponse {
    public statusCode: number
    public data: any
    public success: boolean
    public message?: string

    constructor(
        statusCode: number = 200,
        data = null,
        success = true,
        message = ''
    ) {
        this.statusCode = statusCode
        this.data = data
        this.success = success
        this.message = message
    }

    public getResponse() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                data: this.data,
                success: this.success,
                message: this.message,
            }),
        }
    }
}
