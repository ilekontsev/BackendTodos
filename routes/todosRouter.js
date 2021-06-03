const express = require('express');
const todosRouter = express.Router();

const todosController = require('../controllers/todosController')


todosRouter.post('/', todosController.createTaskInBD)
todosRouter.get('/', todosController.getAllTasked)
todosRouter.put('/', todosController.updateTaskChecked)
todosRouter.put('/all', todosController.updateTaskCheckedAll)
todosRouter.delete('/delete', todosController.delTask)
todosRouter.delete('/deleteAll', todosController.deleteAllCompleteTask)


module.exports = todosRouter;