"use strict"

import * as AWS from 'aws-sdk'

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

        return {
            statusCode: 204,
        }
    } catch (error) {
       console.log(error)
       return {
           statusCode: 400,
           body: JSON.stringify(error)
       }
    }
}

module.exports = {
    handler: updateTodoById
}
