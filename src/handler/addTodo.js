"use strict";

const addTodo = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello, World!",
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
