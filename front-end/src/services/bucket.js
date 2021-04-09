import { fetchWrapper } from '../utils/fetch-wrapper'

export const bucketService = {
    createBucket,
    updateBucket,
    deleteBucket,
    getBucket,
    getAllBuckets
}

const baseUrl = process.env.REACT_APP_SERVER_URL + '/bucket'

function createBucket(params) {
    return fetchWrapper.post(baseUrl, params)
}

function updateBucket(id, params) {
    return fetchWrapper.put(baseUrl + '/' + id, params)
        .then(bucket => console.log(bucket))
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
