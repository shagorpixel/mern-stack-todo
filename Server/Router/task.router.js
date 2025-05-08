const { createTask } = require('../Controller/taskController');

const taskRouter = require('express').Router();

taskRouter.post('/',createTask)

module.exports = taskRouter