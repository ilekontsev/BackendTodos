const TaskModel = require('../models/TaskModel')
const jwt = require('jsonwebtoken');

const createTaskInDb = async (req, res) => {
    const task = !!req.body && req.body;
    if (!task || !task.text) {
        return res.status(400).send("no data")
    }
    try {
        const decoded = jwt.verify(req.headers.authorization, 'test123')
        task.userId = decoded.userId
        const createdTask = await TaskModel.create(task)
        const IdTaskAndUserId = {
            _id: createdTask._id,
            userId: createdTask.userId
        }
        return res.send(IdTaskAndUserId).status(200)
    } catch (err) {
        res.send(err).status(500)
    }
}

const getAllTasked = (req, res) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(400).send("no token")
    }
    try {
        const decoded = jwt.verify(token, "test123")
        const id = decoded.userId
        TaskModel.find({userId: id}).then((tasks) => {
            res.send(tasks);
        });
    } catch (err) {
        res.status(401).send('401')
    }
}

const updateTaskChecked = async (req, res) => {
    const params = req.body
    if (!params) {
        return res.status(400).send("no value")
    }
    try {
        await TaskModel.findByIdAndUpdate({_id: params.id}, params)
        res.status(200).send('task update')
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateTaskCheckedAll = async (req, res) => {
    const params = req.body
    if(!params){
        return res.status(400).send('no params')
    }
    try {
        await TaskModel.updateMany({userId: params.userId}, {$set: {checked: params.checked}})
        res.status(200).send('tasks update')
    } catch (err) {
        res.status(400).send(err)
    }
}

const delTask = async (req, res) => {
    const params = req.query._id
    if (!params) {
        return res.status(400).send("element not delete")
    }
    try {
        await TaskModel.findOneAndDelete({_id: params})
        res.status(200).send("element delete")
    } catch (err) {
        res.status(400).send(err)
    }

}
const deleteAllCompleteTask = async (req, res) => {
    const params = req.query.userId
    if(!params){
        return res.status(400).send('no params')
    }
    try {
        await TaskModel.deleteMany({userId: params, checked: true})
        res.status(200).send("clear completed")
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    createTaskInDb,
    getAllTasked,
    delTask,
    updateTaskChecked,
    updateTaskCheckedAll,
    deleteAllCompleteTask
}