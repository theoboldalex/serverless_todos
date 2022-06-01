"use strict"

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const deleteTodoById = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const todoId = event.pathParameters.todoId

    try {
       const data = await dynamoDB.delete({
           TableName: 'todosTable',
           Key: {
               id: todoId
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
    handler: deleteTodoById
}
