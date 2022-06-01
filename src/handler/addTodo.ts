"use strict";

import Todo from '../interfaces/todo'
import {v4 as uuidv4} from 'uuid'
import * as AWS from 'aws-sdk'
import ServiceResponse from '../service/ServiceResponse';

const addTodo = async (event) => {
    const id: string = uuidv4()
    const { item }: { item: string } = JSON.parse(event.body)

    const todo: Todo = {
        id,
        item
    }

    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    try {
        await dynamoDB.put({
            TableName: 'todosTable',
            Item: todo
        }).promise()

        const res = new ServiceResponse(
            201,
            todo
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
    handler: addTodo
}
