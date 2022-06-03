'use strict'

import Todo from '../interfaces/todo'
import { v4 as uuidv4 } from 'uuid'
import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse'

const addTodo = async (event) => {
    const id: string = uuidv4()
    const { item }: { item: string } = JSON.parse(event.body)
    const res = new ServiceResponse()
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    const todo: Todo = {
        id,
        item,
    }

    try {
        await dynamoDB
            .put({
                TableName: 'todosTable',
                Item: todo,
            })
            .promise()

        res.statusCode = 201
        res.data = todo
    } catch (error) {
        console.log(error)
        res.statusCode = error.statusCode
        res.success = false
        res.message = error.message
    }

    return res.getResponse()
}

module.exports = {
    handler: addTodo,
}
