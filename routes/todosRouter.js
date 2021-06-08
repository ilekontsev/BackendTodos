const express = require('express');
const todosRouter = express.Router();
const todosController = require('../controllers/todosController')




todosRouter.post('/createTask', todosController.createTaskInDb)
todosRouter.get('/getTasks', todosController.getAllTasked)
todosRouter.put('/updCheckbox', todosController.updateTaskChecked)
todosRouter.put('/all', todosController.updateTaskCheckedAll)
todosRouter.delete('/delete', todosController.delTask)
todosRouter.delete('/deleteAll', todosController.deleteAllCompleteTask)



module.exports = todosRouter;