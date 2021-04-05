// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const items = express.Router()
const Item = require('../models/items')

// ==============================================================
// CREATE ROUTE
// ==============================================================
items.post('/', (req, res) => {
    Item.create(req.body, (error, createdItem) => {
        if(error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdItem)
    })
})

// ==============================================================
// READ ROUTES
// ==============================================================
items.get('/:id', (req, res) => {
    Item.findOne({'_id': req.params.id}, (error, foundItem) => {
        if(error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundItem)
    })
})

items.get('/', (req, res) => {
    Item.find({}, (error, foundItems) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundItems)
    })
})

// ==============================================================
// DELETE ROUTE
// ==============================================================
items.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id, (error, deletedItem) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedItem)
    })
})

// ==============================================================
// UPDATE ROUTE
// ==============================================================
items.put('/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedItem) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedItem)
    })
})

module.exports = items
