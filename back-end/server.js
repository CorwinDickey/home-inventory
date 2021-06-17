// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error-handler')
const cors = require('cors')
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

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    headers: 'Content-Type,Origin,X-Requested-With,Accept,Authorization',
    credentials: true
}

APP.use(cors(corsOptions))
APP.use(express.json())
APP.use(express.urlencoded({ extended: true }))
APP.use(cookieParser())
APP.use(errorHandler)

// ==============================================================
// CONTROLLERS
// ==============================================================
const itemsController = require('./controllers/items')
const accountsController = require('./controllers/accounts')
const inventoriesController = require('./controllers/inventories')
const bucketsController = require('./controllers/buckets')

APP.use('/items', itemsController)
APP.use('/accounts', accountsController)
APP.use('/inventory', inventoriesController)
APP.use('/buckets', bucketsController)

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
APP.use(staticFiles)

// Anything that doesn't match the above, send back index.html
APP.get('*', staticFiles)

// ==============================================================
// LISTENER
// ==============================================================
APP.listen(PORT, () => {
    console.log(DB_NAME + ' server is up and running on port:', PORT)
})