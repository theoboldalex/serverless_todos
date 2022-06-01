"use strict";

import Todo from '../interfaces/todo'
import {v4 as uuidv4} from 'uuid'
import * as AWS from 'aws-sdk'

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

        return {
            statusCode: 201,
            body: JSON.stringify(todo)
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify({'message': 'request failed'})
        }
    }
}

module.exports = {
    handler: addTodo
}
