const express = require('express');
const routerProducts = require('./routes/products.router');
const routerCarts = require('./routes/carts.router');
const app = express();
const port = 8080

// Middlewares
app.use(express.json())
app.use(express.static('public'))

// Middlewares Loger
app.use(function (req, res, next){
    console.log("User active rendering - "+ req.method + " - " + req.url + " - " + req.ip)
    next()
})

// Routers
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)

// Reglas
app.get('/ping', (req, res) => {
    res.send("pong")
})

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))