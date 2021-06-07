const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskModelSchema = new Schema({
    text: String,
    checked: {
        type: Boolean,
        default: false
    },
    userId: String,
});


const TaskModel = mongoose.model('TaskModel', TaskModelSchema );

module.exports = TaskModel;