"use strict"

const getTodoById = async (event) => {
    const todoId = event.pathParameters.todoId

    return {
        statusCode: 200,
        body: JSON.stringify({id: todoId})
    }
}

module.exports = {
    handler: getTodoById
}
