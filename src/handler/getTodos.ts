"use strict";

import { Todo } from '../interfaces/todo';

const mockTodos: Array<Todo> = [
    {id: '1', item: 'learn typescript'},
    {id: '2', item: 'write lambda'},
    {id: '3', item: 'profit'}
]

const getTodos = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: mockTodos,
        input: event,
      }
    )
  }
}

module.exports = {
    handler: getTodos
}
