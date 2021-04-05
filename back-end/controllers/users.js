// ==============================================================
// DEPENDENCIES
// ==============================================================
const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users')

// ==============================================================
// NEW USER ROUTE
// ==============================================================
users.post('/register', (req, res) => {
    const body = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }
    
    User.create(body, (error, createdUser) => {
        if(error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdUser)
    })
})


module.exports = users
