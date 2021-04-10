import { fetchWrapper } from '../utils/fetch-wrapper'

export const bucketService = {
    createBucket,
    updateBucket,
    deleteBucket,
    getBucket,
    getAllBuckets,
    getBucketsByInventory
}

const baseUrl = process.env.REACT_APP_SERVER_URL + '/buckets'

function createBucket(params) {
    return fetchWrapper.post(baseUrl, params)
}

function updateBucket(id, params) {
    return fetchWrapper.put(baseUrl + '/' + id, params)
}

function deleteBucket(id) {
    return fetchWrapper.delete(baseUrl + '/' + id)
}

function getBucket(id) {
    return fetchWrapper.get(baseUrl + '/' + id)
}

function getAllBuckets() {
    return fetchWrapper.get(baseUrl)
}

function getBucketsByInventory(id) {
    return fetchWrapper.get(baseUrl + '/inventory/' + id)
}
