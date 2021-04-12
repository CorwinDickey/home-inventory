const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    datePurchased: {
        type: Date
    },
    purchasePrice: {
        type: Number
    },
    replacementCost: {
        type: Number
    },
    shipping: {
        type: Number
    },
    quantity: {
        type: Number
    },
    taxRate: {
        type: Number
    },
    pictures: {
        type: mongoose.Schema.Types.Mixed
    },
    documents: {
        type: mongoose.Schema.Types.Mixed
    },
    room: {
        type: mongoose.Schema.Types.ObjectId
    },
    category: {
        type: mongoose.Schema.Types.ObjectId
    },
    categoryData: {
        type: mongoose.Schema.Types.ObjectId
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Item', itemSchema)
