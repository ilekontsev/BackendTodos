const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    login: {
        type: String,
        unique: true
    },
    password: String,
});


const UserModel = mongoose.model('UserModel', UserModelSchema );

module.exports = UserModel;