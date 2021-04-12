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
    itemService.getItemsByInventory(req.params.id)
        .then(items => res.json(items))
        .catch(next)
}

// ==============================================================
// DELETE
// ==============================================================
function deleteItem(req, res, next) {
    itemService.deleteItem(req.params.id)
        .then(() => res.json({ message: 'Item deleted successfully'}))
        .catch(next)
}

// ==============================================================
// UPDATE ROUTE
// ==============================================================
function updateItem(req, res, next) {
    itemService.updateItem(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next)
}
