"use strict";

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const getTodos = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    try {
       const data = await dynamoDB.scan({
           TableName: 'todosTable'
       }).promise() 

       const res = new ServiceResponse(
           200,
           data.Items,
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
    handler: getTodos
}
