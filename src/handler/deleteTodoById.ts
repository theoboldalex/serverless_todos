"use strict"

import * as AWS from 'aws-sdk'

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

       return {
           statusCode: 204,
           body: null
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
    handler: deleteTodoById
}
