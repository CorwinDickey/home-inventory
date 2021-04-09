// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const buckets = express.Router()
const Bucket = require('../models/bucket')

// ==============================================================
// CREATE ROUTE
// ==============================================================
buckets.post('/', (req, res) => {
    Bucket.create(req.body, (error, createdBucket) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdBucket)
    })
})

// ==============================================================
// READ ROUTES
// ==============================================================
buckets.get('/:id', (req, res) => {
    Bucket.findOne({'_id': req.params.id}, (error, foundBucket) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundBucket)
    })
})

buckets.get('/', (req, res) => {
    Bucket.find({}, (error, foundBuckets) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundBuckets)
    })
})

// ==============================================================
// DELETE ROUTE
// ==============================================================
buckets.delete('/:id', (req, res) => {
    Bucket.findByIdAndDelete(req.params.id, (error, deletedBucket) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedBucket)
    })
})

// ==============================================================
// UPDATE ROUTE
// ==============================================================
buckets.put('/:id', (req, res) => {
    Bucket.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedBucket) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedBucket)
    })
})