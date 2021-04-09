// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const inventories = express.Router()
const Inventory = require('../models/inventory')

// ==============================================================
// CREATE ROUTE
// ==============================================================
inventories.post('/', (req, res) => {
    Inventory.create(req.body, (error, createdInventory) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdInventory)
    })
})

// ==============================================================
// READ ROUTES
// ==============================================================
inventories.get('/:id', (req, res) => {
    Inventory.findOne({'_id': req.params.id}, (error, foundInventory) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundInventory)
    })
})

inventories.get('/', (req, res) => {
    Inventory.find({}, (error, foundInventories) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundInventories)
    })
})

// ==============================================================
// DELETE ROUTE
// ==============================================================
inventories.delete('/:id', (req, res) => {
    Inventory.findByIdAndDelete(req.params.id, (error, deletedInventory) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedInventory)
    })
})

// ==============================================================
// UPDATE ROUTE
// ==============================================================
inventories.put('/:id', (req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedInventory) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedInventory)
    })
})