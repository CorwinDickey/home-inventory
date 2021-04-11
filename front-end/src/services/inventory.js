import { fetchWrapper } from '../utils/fetch-wrapper'

export const inventoryService = {
    createInventory,
    updateInventory,
    deleteInventory,
    getInventory,
    getAllInventories,
    getInventoryByAccount
}

const baseUrl = process.env.REACT_APP_SERVER_URL + '/inventory'

function createInventory(params) {
    return fetchWrapper.post(baseUrl, params)
}

function updateInventory(id, params) {
    return fetchWrapper.put(baseUrl + '/' + id, params)
        .then(inventory => console.log(inventory))
}

function deleteInventory(id) {
    return fetchWrapper.delete(baseUrl + '/' + id)
}

function getInventory(id) {
    return fetchWrapper.get(baseUrl + '/' + id)
}

function getAllInventories() {
    return fetchWrapper.get(baseUrl)
}

function getInventoryByAccount(id) {
    return fetchWrapper.get(baseUrl + '/account/' + id)
}
