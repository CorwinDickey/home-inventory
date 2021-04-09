const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        required: true
    },
    room: {
        // type: mongoose.Schema.Types.ObjectId
        type: Number
    },
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
        // type: mongoose.Schema.Types.Mixed
        type: Number
    },
    documents: {
        // type: mongoose.Schema.Types.Mixed
        type: Number
    },
    categoryData: {
        // type: mongoose.Schema.Types.ObjectId
        type: Number
    }
})

module.exports = mongoose.model('Item', itemSchema)
