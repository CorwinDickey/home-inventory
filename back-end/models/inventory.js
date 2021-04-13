const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    buckets: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)
