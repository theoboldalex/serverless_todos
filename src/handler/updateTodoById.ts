"use strict"

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const updateTodoById = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const todoId = event.pathParameters.todoId
    const { item } = JSON.parse(event.body)

    try {
        await dynamoDB.update({
            TableName: 'todosTable',
            Key: {
                id: todoId
            },
            UpdateExpression: 'set #i = :item',
            ExpressionAttributeValues: {
                ':item': item
            },
            ExpressionAttributeNames: {
                '#i': 'item'
            }
        }).promise()

        const res = new ServiceResponse(
            204,
            null
        )

        return res.getResponse()
    } catch (error) {
       console.log(error)
       const res = new ServiceResponse(
           error.statusCode,
           null,
           false,
           error.message
       )

       return res.getResponse()
    }
}

module.exports = {
    handler: updateTodoById
}
