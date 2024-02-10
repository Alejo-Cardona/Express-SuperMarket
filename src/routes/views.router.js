import express from 'express'
import manager from '../models/ProductManager.js'

const router = express.Router()

// Home
router.get('/', (req, res) => {
    res.render('index', {
        style: 'index.css',
        products: manager.getProducts(4)
    })
})

// Socket
router.get('/socket', (req, res) => {
    res.render('socket')
})

export default router