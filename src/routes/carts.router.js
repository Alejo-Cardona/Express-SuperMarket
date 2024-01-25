const express = require("express")
const router = express.Router()
const Cart = require('../models/Cart')

// ya no necesito el /carts ya que lo instancie en app.js
router.post('/', (req, res) => {
    const dataFromBody = req.body;
    let cart = Cart.addCart(dataFromBody)

    if (cart === false) {
        res.status(400).json({ error: 'Todos los son obligatorios' });
    } else {
        res.status(200).json({ mensaje: `El carrito se creo correctamente` });
    }

})

router.get('/:cid', (req, res) => {
    let cid = parseInt(req.params.cid) 
    const cartElements = Cart.getCartElementsById(cid)

    res.status(200).send(cartElements.products)
})

router.post('/:cid/product/:pid', (req, res) => {
    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)

    const add = Cart.addElementInCartById(cid, pid)

    if(add) {
        res.status(200).json({ mensaje: `Se agrego el producto al carrito` });
    } else {
        res.status(400).json({ error: 'ERROR no se pudo agregar el producto al carrito' });
    }

})

module.exports = router