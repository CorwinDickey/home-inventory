const mongoose = require('mongoose')

const bucketSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    bucketType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Bucket', bucketSchema)
