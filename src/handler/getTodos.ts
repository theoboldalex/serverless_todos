"use strict";

import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const getTodos = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const res = new ServiceResponse()

    try {
       const data = await dynamoDB.scan({
           TableName: 'todosTable'
       }).promise() 

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
    handler: getTodos
}
