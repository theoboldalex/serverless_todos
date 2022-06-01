"use strict"

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const updateTodoById = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const todoId = event.pathParameters.todoId
    const { item } = JSON.parse(event.body)
    const res = new ServiceResponse()

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
    handler: updateTodoById
}
