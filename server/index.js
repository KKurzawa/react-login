const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Models')
require("dotenv").config();

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@register.02gxy.mongodb.net/${process.env.DB_NAME}`)

app.post('/', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { user, email, pwd } = req.body
    UserModel.findOne({ user: user })
        .then(item => {
            if (item) {
                if (item.matchPwd === pwd && item.email === email) {
                    res.json('Success')
                    console.log('Success')
                } else if (item.email !== email) {
                    res.json('Email not found')
                } else {
                    res.json('Incorrect password')
                }
            } else {
                res.json('Username not found')
            }
        })
})

app.listen(3001, () => {
    console.log('server is running on port 3001!')
})