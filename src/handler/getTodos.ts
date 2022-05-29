"use strict";

import { Todo } from '../interfaces/todo';

const mockTodos: Array<Todo> = [
    {id: 1, item: 'wash car'},
    {id: 2, item: 'write lambda'}
]

const getTodos = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: mockTodos,
        input: event,
      },
      null,
      2
    ),
  }
}

module.exports = {
    handler: getTodos
}
