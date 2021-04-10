// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const items = express.Router()
// const Item = require('../models/item')
const itemService = require('../services/item')

// ==============================================================
// ROUTES
// ==============================================================
items.post('/', createItem)
items.get('/:id', getItem)
items.get('/', getAllItems)
items.get('/inventory/:id', getItemsByInventory)
items.put('/:id', updateItem)
items.delete('/:id', deleteItem)

module.exports = items

// ==============================================================
// CREATE
// ==============================================================

function createItem(req, res, next) {
    itemService.createItem(req.body)
        .then(item => res.json(item))
        .catch(next)
}
// items.post('/', (req, res) => {
//     Item.create(req.body, (error, createdItem) => {
//         if (error) {
//             res.status(400).json({ error: error.message })
//         }
//         res.status(200).send(createdItem)
//     })
// })

// ==============================================================
// GET ITEM
// ==============================================================
function getItem(req, res, next) {
    itemService.getItem(req.params.id)
        .then(item => item ? res.json(item) : res.sendStatus(404))
        .catch(next)
}

function getAllItems(req, res, next) {
    itemService.getAllItems()
        .then(items => res.json(items))
        .catch(next)
}

function getItemsByInventory(req, res, next) {
    itemService.geItemsByInventory(req.params.id)
        .then(items => res.json(items))
        .catch(next)
}


// items.get('/:id', (req, res) => {
//     Item.findOne({'_id': req.params.id}, (error, foundItem) => {
//         if (error) {
//             res.status(400).json({ error: error.message })
//         }
//         res.status(200).json(foundItem)
//     })
// })

// items.get('/', (req, res) => {
//     Item.find({}, (error, foundItems) => {
//         if (error) {
//             res.status(400).json({ error: error.message })
//         }
//         res.status(200).json(foundItems)
//     })
// })

// ==============================================================
// DELETE
// ==============================================================
function deleteItem(req, res, next) {
    itemService.deleteItem(req.params.id)
        .then(() => res.json({ message: 'Item deleted successfully'}))
        .catch(next)
}

// items.delete('/:id', (req, res) => {
//     Item.findByIdAndDelete(req.params.id, (error, deletedItem) => {
//         if (error) {
//             res.status(400).json({ error: error.message })
//         }
//         res.status(200).json(deletedItem)
//     })
// })

// ==============================================================
// UPDATE ROUTE
// ==============================================================
function updateItem(req, res, next) {
    itemService.updateItem(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next)
}

// items.put('/:id', (req, res) => {
//     Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedItem) => {
//         if (error) {
//             res.status(400).json({ error: error.message })
//         }
//         res.status(200).json(updatedItem)
//     })
// })

// module.exports = items
