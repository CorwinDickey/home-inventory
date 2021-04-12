import { fetchWrapper } from '../utils/fetch-wrapper'

export const itemService = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getAllItems,
    getItemsByInventory
}

const baseUrl = '/items'

function createItem(params) {
    return fetchWrapper.post(baseUrl, params)
}

function updateItem(id, params) {
    return fetchWrapper.put(baseUrl + '/' + id, params)
}

function deleteItem(id) {
    return fetchWrapper.delete(baseUrl + '/' + id)
}

function getItemsByInventory(id) {
    return fetchWrapper.get(baseUrl + '/inventory/' + id)
}

function getItem(id) {
    return fetchWrapper.get(baseUrl + '/' + id)
}

function getAllItems() {
    return fetchWrapper.get(baseUrl)
}
