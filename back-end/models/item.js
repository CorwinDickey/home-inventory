const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
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
    categoryData: {
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Item', itemSchema)
