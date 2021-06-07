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
            await authenticationUser(params, docs, res)

        }
        try {
            params.password = await bcrypt.hash(params.password, 7)

            const createdUser = await UserModel.create(params)
            const token = tokenGenerator(createdUser)
            return res.send(token).status(200)

        } catch (err) {
            return res.send(err).status(500)
        }
    })
}


const authenticationUser = async (params,docs,res) => {

        try {
            const pass = await bcrypt.compare(params.password, docs.password)
            if (pass) {
                const token = tokenGenerator(docs)
                return res.send(token)
            }
        } catch (err) {
            return res.status(400).send(err)
        }



}


const tokenGenerator = (id) => {

    const uid = {
        userId: id._id
    }

    return jwt.sign(uid, 'test123', {expiresIn: '600s'})
}

module.exports = {
    createNewUser,
    authenticationUser
}