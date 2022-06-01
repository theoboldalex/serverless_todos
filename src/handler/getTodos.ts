"use strict";

import * as AWS from 'aws-sdk'

const getTodos = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    try {
       const data = await dynamoDB.scan({
           TableName: 'todosTable'
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
    handler: getTodos
}
