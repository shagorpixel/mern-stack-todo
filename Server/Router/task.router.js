const { createTask, getTask, upDateTask, singleTask, deleteTask } = require('../Controller/taskController');

const taskRouter = require('express').Router();

taskRouter.post('/',createTask);
taskRouter.get('/',getTask);
taskRouter.get('/:id',singleTask);
taskRouter.put('/:id',upDateTask);
taskRouter.delete('/:id',deleteTask);

module.exports = taskRouter