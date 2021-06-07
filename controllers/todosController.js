const TaskModel = require('../models/TaskModel')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken');

const createTaskInDb = async (req, res) => {
    try{
        const decoded = jwt.verify(req.headers.authorization, 'test123')
        const id = decoded.userId



    const task = !!req.body && req.body;

    if (!task || !task.text) {
        return res.status(400).send("no data")
    }

        task.userId = id
        const createdTask = await TaskModel.create(task)

        res.send(createdTask._id)
    } catch (err) {
        res.send(err).status(500)
    }
}

const getAllTasked = (req, res) => {
    const token = req.headers.authorization
    console.log(req.headers.authorization)

    try{
        const decoded = jwt.verify(token, "test123")
        const id = decoded.userId
        TaskModel.find({userId: id}).then((tasks) => {
            res.send(tasks);
        });
    }catch(err){
        res.status(401).send(err)
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
const updateTaskCheckedAll = async(req, res) => {
    const params = req.body
    try{
        await TaskModel.updateMany({ checked: !params.checked }, { $set: {checked: params.checked}})
        res.status(200).send('tasks update')
    }catch(err){
        res.status(400).send(err)
    }
}


const delTask = async(req, res) => {
    const params = req.query._id
    if(!params){
        return res.status(400).send("element not delete")
    }
    try{
        await TaskModel.findOneAndDelete({_id: params})
        res.status(200).send("element delete")
    }catch(err){
        res.status(400).send(err)
    }

}
const deleteAllCompleteTask = async(req, res) =>{
    try{
        await TaskModel.deleteMany({checked: true})
        res.status(200).send("clear completed")
    }catch(err){
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