// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const Joi = require('joi')
const authorize = require('../middleware/authorize')
const inventoryService = require('../services/inventory')
const inventories = express.Router()
const Inventory = require('../models/inventory')

// ==============================================================
// ROUTES
// ==============================================================
inventories.post('/', createInventorySchema, createInventory)
inventories.get('/:id', authorize(), getInventory)
inventories.get('/', authorize(), getAllInventories)
inventories.put('/:id', authorize(), updateInventorySchema, updateInventory)
inventories.delete('/:id', authorize(), deleteInventory)

module.exports = inventories

// ==============================================================
// CREATE
// ==============================================================
function createInventorySchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        owner: Joi.string().required(),
        users: Joi.array().items(Joi.string()),
        buckets: Joi.array().items(Joi.string())
    })

    validateRequest(req, next, schema)
}

function createInventory(req, res, next) {
    inventoryService.createInventory(req.body)
        .then(inventory => res.json(inventory))
        .catch(next)
}

// ==============================================================
// GET INVENTORY
// ==============================================================
function getInventory(req, res, next) {
    inventoryService.getInventory(req.params.id)
        .then(inventory => inventory ? res.json(inventory) : res.sendStatus(404))
        .catch(next)
}

function getAllInventories(req, res, next) {
    inventoryService.getAllInventories()
        .then(inventories => res.json(inventories))
        .catch(next)
}

// ==============================================================
// DELETE ROUTE
// ==============================================================
function deleteInventory(req, res, next) {
    inventoryService.deleteInventory(req.params.id)
        .then(() => res.json({ message: 'Inventory deleted successfully'}))
        .catch(next)
}

// ==============================================================
// UPDATE ROUTE
// ==============================================================
function updateInventorySchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        users: Joi.array().items(Joi.string()),
        buckets: Joi.array().items(Joi.string())
    })

    validateRequest(req, next, schema)
}


function updateInventory(req, res, next) {
    inventoryService.updateInventory(req.params.id, req.body)
        .then(inventory => res.json(inventory))
        .catch(next)
}
