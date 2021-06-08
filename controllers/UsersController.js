const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createNewUser = async (req, res) => {
    const params = !!req.body && req.body
    if (!params || !params.login.length || !params.password.length) {
        return res.status(400).send("no value")
    }
    await UserModel.findOne({login: params.login}, async (err, docs) => {
        if (err) {
            return res.status(400).send(err)
        }
        if (docs) {
            const token = await authenticationUser(params, docs, res)
            return res.send(token).status(200)
        }
        try {
            params.password = await bcrypt.hash(params.password, 7)
            const createdUser = await UserModel.create(params)
            const token = tokenGenerator(createdUser._id)
            return res.send(token).status(200)
        } catch (err) {
            return res.send(err).status(500)
        }
    })
}

const authenticationUser = async (params, docs, res) => {
    try {
        const pass = await bcrypt.compare(params.password, docs.password)
        if (pass) {
            return tokenGenerator(docs._id)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

const refreshToken = (req, res) => {
    const token = req.body.refToken

    try {
        const decoded = jwt.verify(token, 'refToken123')
        const refreshToken = tokenGenerator(decoded.userId)
        res.send(refreshToken).status(200)
    } catch (err) {
        res.send(err).status(400)
    }
}

const tokenGenerator = (user) => {

    const uuid = {
        userId: user
    }
    const token = jwt.sign(uuid, 'test123', {expiresIn: '10s'})
    const refToken = jwt.sign(uuid, 'refToken123', {expiresIn: '30d'})
    return {token, refToken}
}

module.exports = {
    createNewUser,
    authenticationUser,
    refreshToken,
}