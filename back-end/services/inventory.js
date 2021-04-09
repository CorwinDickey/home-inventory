const mongoose = require('mongoose')
const Inventory = require('../models/inventory')

module.exports = {
    createInventory,
    updateInventory,
    deleteInventory,
    getInventory,
    getAllInventories
}

async function createInventory(params) {
    const inventory = new Inventory(params)
    await inventory.save()
}

async function updateInventory(id, params) {
    const inventory = await getInventory(id)
    Object.assign(inventory, params)
    await inventory.save()
}

async function deleteInventory(id) {
    const inventory = await getInventory(id)
    await inventory.remove()
}

async function getInventory(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw 'Inventory not found'
    }

    const inventory = await Inventory.findById(id)

    if (!inventory) {
        throw 'Inventory not found'
    }

    return inventory
}

async function getAllInventories() {
    const inventories = await Inventory.find()
    return inventories
}
