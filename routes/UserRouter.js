const express = require('express');
const UserRouter = express.Router();

const UserController = require('../controllers/UsersController')

UserRouter.post('/createUser', UserController.createNewUser)
UserRouter
UserRouter.post('/refreshToken', UserController.refreshToken)

module.exports = UserRouter

