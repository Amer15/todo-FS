const express = require('express');
const { getTodos, addTodo, updateTodo, deleteTodo, updateTodoState} = require('../controllers/todo.controller');
const router = express.Router();

router.get('/', getTodos);

router.post('/add-todo', addTodo);

router.put('/update-todo/:id', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);

router.put('/update-todo-state/:id', updateTodoState);

module.exports = router;