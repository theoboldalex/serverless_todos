import Todo from './todo'

export default interface IServiceResponse {
    statusCode: number,
    data: Array<Todo>,
    success: boolean,
    message?: string
}
