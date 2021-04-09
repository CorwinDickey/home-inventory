function errorHandler(error, req, res, next) {
    switch (true) {
        case typeof error === 'string':
            const is404 = error.toLowerCase().endsWith('not found')
            const statusCode = is404 ? 404 : 400
            return res.statusCode(statusCode).json({ message: error })

        case error.name === 'ValidationError':
            return res.status(401).json({ message: 'Unauthorized' })
        
        default:
            return res.status(500).json({ message: error.message })
    }
}

module.exports = errorHandler
