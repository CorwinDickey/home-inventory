const mongoose = require('mongoose')
const Item = require('../models/item')

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getAllItems,
    getItemsByInventory
}

async function createItem(params) {
    const item = new Item(params)
    await item.save()
    return item
}

async function updateItem(id, params) {
    const item = await getItem(id)
    Object.assign(item, params)
    await item.save()
}

async function deleteItem(id) {
    const item = await getItem(id)
    await item.remove()
}

async function getItem(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw 'Item not found'
    }

    const item = await Item.findById(id)

    if (!item) {
        throw 'Item not found'
    }

    return item
}

async function getAllItems() {
    const items = await Item.find({})
    return items
}

async function getItemsByInventory(id) {
    const items = await Item.find({ inventory: id})
    return items
}
