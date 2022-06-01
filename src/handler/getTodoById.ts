'use strict'

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const getTodoById = async (event) => {
  const todoId = event.pathParameters.todoId
  const dynamoDB = new AWS.DynamoDB.DocumentClient()
  const res = new ServiceResponse()

  try {
    const data = await dynamoDB
      .scan({
        TableName: 'todosTable',
        FilterExpression: '#todoId = :todoId',
        ExpressionAttributeNames: {
          '#todoId': 'id',
        },
        ExpressionAttributeValues: {
          ':todoId': todoId,
        },
      })
      .promise()

    if (!data.Count) {
      res.statusCode = 404
      res.success = false
      res.message = `No records found matching id ${todoId}`

      return res.getResponse()
    }

    res.data = data.Items
  } catch (error) {
    console.log(error)
    res.statusCode = error.statusCode
    res.success = false
    res.message = error.message
  }

  return res.getResponse()
}

module.exports = {
  handler: getTodoById,
}
