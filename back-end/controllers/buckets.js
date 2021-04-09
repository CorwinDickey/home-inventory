// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const bucketService = require('../services/bucket')
const buckets = express.Router()

// ==============================================================
// ROUTES
// ==============================================================
buckets.post('/', createBucketSchema, createBucket)
buckets.get('/:id', getBucket)
buckets.get('/', getAllBuckets)
buckets.put('/:id', updateBucketSchema, updateBucket)
buckets.delete('/:id', deleteBucket)

module.exports = buckets

// ==============================================================
// CREATE
// ==============================================================
function createBucketSchema(req, res, next) {
    console.log('logging schema', req.body)
    const schema = Joi.object({
        name: Joi.string().required(),
        bucketType: Joi.string().required(),
        inventory: Joi.string().required()
        // items: Joi.array().items(Joi.string())
    })

    validateRequest(req, next, schema)
}

function createBucket(req, res, next) {
    console.log('logging create', req.body)
    bucketService.createBucket(req.body)
        .then(bucket => res.json(bucket))
        .catch(next)
}

// ==============================================================
// GET BUCKET
// ==============================================================
function getBucket(req, res, next) {
    bucketService.getBucket(req.params.id)
        .then(bucket => bucket ? res.json(bucket) : res.sendStatus(404))
        .catch(next)
}

function getAllBuckets(req, res, next) {
    bucketService.getAllBuckets()
        .then(buckets => res.json(buckets))
        .catch(next)
}

// ==============================================================
// DELETE
// ==============================================================
function deleteBucket(req, res, next) {
    bucketService.deleteBucket(req.params.id)
        .then(() => res.json({ message: 'Bucket deleted successfully'}))
        .catch(next)
}

// ==============================================================
// UPDATE
// ==============================================================
function updateBucketSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        items: Joi.array().items(Joi.string())
    })

    validateRequest(req, next, schema)
}

function updateBucket(req, res, next) {
    bucketService.updateBucket(req.params.id, req.body)
        .then(bucket => res.json(bucket))
        .catch(next)
}
