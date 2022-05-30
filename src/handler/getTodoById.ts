"use strict"

import * as AWS from 'aws-sdk'

const getTodoById = async (event) => {
    const todoId = event.pathParameters.todoId
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    try {
       const data = await dynamoDB.scan({
           TableName: 'todosTable',
           FilterExpression: '#todoId = :todoId',
           ExpressionAttributeNames: {
               '#todoId': 'id'
           },
           ExpressionAttributeValues: {
               ':todoId': todoId
           }
       }).promise() 

       return {
           statusCode: 200,
           body: JSON.stringify(data.Items)
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
    handler: getTodoById
}
