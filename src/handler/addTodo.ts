"use strict";

import { Todo } from '../interfaces/todo'
import {v4 as uuidv4} from 'uuid';
import * as AWS from 'aws-sdk';

const addTodo = async (event) => {
  const id: string = uuidv4()
  const { item }: { item: string } = JSON.parse(event.body)

  const todo: Todo = {
      id,
      item
  }
  
  const dynamoDB = new AWS.DynamoDB.DocumentClient()

  dynamoDB.put({
    TableName: 'todosTable',
    Item: todo
  })

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: `${todo.item} has been added to your list with id: ${todo.id}`,
        input: event,
      }
    )
  }
}

module.exports = {
    handler: addTodo
}
