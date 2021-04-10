const mongoose = require('mongoose')
const Bucket = require('../models/bucket')

module.exports = {
    createBucket,
    updateBucket,
    deleteBucket,
    getBucket,
    getAllBuckets,
    getBucketsByInventory
}

async function createBucket(params) {
    const bucket = new Bucket(params)
    await bucket.save()
    return bucket
}

async function updateBucket(id, params) {
    const bucket = await getBucket(id)
    Object.assign(bucket, params)
    await bucket.save()
    return bucket
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

async function getBucketsByInventory(id) {
    const buckets = await Bucket.find({ inventory: id})
    return buckets
}
