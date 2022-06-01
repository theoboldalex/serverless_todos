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

       if (!data.Count) {
           const res = new ServiceResponse(
               404,
               null,
               false,
               `No records found matching id ${todoId}`
           )

           return res.getResponse()
       }

       const res = new ServiceResponse(
           200,
           data.Items
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
    handler: getTodoById
}
