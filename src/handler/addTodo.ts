"use strict";

const addTodo = async (event) => {
  const name: string = 'Alex'
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello, ${name}!`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
    handler: addTodo
}
