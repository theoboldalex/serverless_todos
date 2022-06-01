"use strict"

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

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

       const res = new ServiceResponse(
           200,
           data.Items
       )
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
    handler: getTodoById
}
