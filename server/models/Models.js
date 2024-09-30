const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: String,
    email: String,
    matchPwd: String
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel