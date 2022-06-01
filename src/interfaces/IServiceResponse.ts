import Todo from './todo'

export default interface IServiceResponse {
    statusCode: number,
    data: any,
    success: boolean,
    message?: string
}
