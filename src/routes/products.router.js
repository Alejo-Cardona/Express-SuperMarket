const express = require("express")
const router = express.Router()
const manager = require('../models/ProductManager')

// ya no necesito el /products ya que lo instancie en app.js
router.get('/', (req, res) => {
    let productos = manager.getProducts()
    const limit = req.query.limit;
    
    if(limit > 0) {
        productos = productos.slice(0, limit)
    }

    res.send(productos)
})

router.get('/:pid', (req, res) => {
    let pid = parseInt(req.params.pid)
    let product = manager.getProductById(pid)

    res.send(product)
})

router.post('/', (req, res) => {
    const dataFromBody = req.body;
    let product = manager.addProduct(dataFromBody)

    if (product === false) {
        res.status(400).json({ error: 'Todos los campos excepto el thumnails, son obligatorios' });
    } else {
        res.status(200).json({ mensaje: 'El producto se agrego correctamente' });
    }
})

router.put('/:pid', (req, res) => {
    let pid = parseInt(req.params.pid)
    const dataFromBody = req.body;
    let updatedProduct = manager.updateProduct(pid, dataFromBody)

    if(updatedProduct){
        res.status(200).json({ mensaje: `Producto con ID ${pid} actualizado correctamente.` });
    } else {
        res.status(400).json({ error: 'ERROR product not found' });
    }

})

router.delete('/:pid', (req, res) => {
    let pid = parseInt(req.params.pid)
    let deleteProduct = manager.deleteProduct(pid)

    if(deleteProduct){
        res.status(200).json({ mensaje: `El producto con ID ${pid} se a eliminado correctamente.` });
    } else {
        res.status(400).json({ error: 'ERROR product not found' });
    }

})

module.exports = router