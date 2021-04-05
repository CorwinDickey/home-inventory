// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')({
    origin: 'http://localhost:3000'
})
const path = require('path')

require('dotenv').config()

// ==============================================================
// SERVER CONFIGURATION
// ==============================================================
const APP = express()
const PORT = process.env.PORT || 3003
const DB_NAME = 'home-inventory'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + DB_NAME

// ==============================================================
// MIDDLEWARE
// ==============================================================
function allowCrossDomains(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

APP.use(cors)
APP.use(allowCrossDomains)
APP.use(express.json())

APP.use((error, req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    next();
})

// ==============================================================
// CONTROLLERS
// ==============================================================
const itemController = require('./controllers/item')
const userController = require('./controllers/user')

APP.use('/items', itemController)
APP.use('/user', userController)

// ==============================================================
// DATABASE CONFIGURATION
// ==============================================================
mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }, () => {
        console.log('The connection with mongod is established at:', MONGODB_URI)
    }
)

mongoose.connection.once('open', () => {
    console.log('Connected to the mongo server.')
})

// ==============================================================
// DATABASE ERROR - DISCONNECTION
// ==============================================================
mongoose.connection.on("error", err => console.log(err.message + ' is Mongod not running? '));
mongoose.connection.on("disconnected", () => console.log('mongo disconnected'));



const staticFiles = express.static(path.join(__dirname, '../../front-end/build'))
// // Serve static files from the React front-end app
// APP.use(express.static(path.join(__dirname, '../../front-end/build')))
APP.use(staticFiles)

// Anything that doesn't match the above, send back index.html
APP.get('*', staticFiles)

// ==============================================================
// LISTENER
// ==============================================================
APP.listen(PORT, () => {
    console.log(DB_NAME + ' server is up and running on port:', PORT)
})