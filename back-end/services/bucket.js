const mongoose = require('mongoose')
const Bucket = require('../models/bucket')

module.exports = {
    createBucket,
    updateBucket,
    deleteBucket,
    getBucket,
    getAllBuckets
}

async function createBucket(params) {
    const bucket = new Bucket(params)
    await bucket.save()
}

async function updateBucket(id, params) {
    const bucket = await getBucket(id)
    Object.assign(bucket, params)
    await bucket.save()
}

async function deleteBucket(id) {
    const bucket = await getBucket(id)
    await bucket.remove()
}

async function getBucket(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw 'Bucket not found'
    }

    const bucket = await Bucket.findById(id)

    if (!bucket) {
        throw 'Bucket not found'
    }

    return bucket
}

async function getAllBuckets() {
    const buckets = await Bucket.find()
    return buckets
}
