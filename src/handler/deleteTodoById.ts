'use strict'

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const deleteTodoById = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const todoId = event.pathParameters.todoId
    const res = new ServiceResponse()

    try {
        const data = await dynamoDB
            .delete({
                TableName: 'todosTable',
                Key: {
                    id: todoId,
                },
            })
            .promise()

        res.statusCode = 204
    } catch (error) {
        console.log(error)
        res.statusCode = error.statusCode
        res.success = false
        res.message = error.message
    }

    return res.getResponse()
}

module.exports = {
    handler: deleteTodoById,
}
