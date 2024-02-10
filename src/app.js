import express from 'express';
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js';
import routerViews from './routes/views.router.js';
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io';

const app = express();
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middlewares
app.use(express.json())
app.use(express.static( __dirname + '/public'))

// Middlewares Loger
app.use(function (req, res, next){
    console.log("User active rendering - "+ req.method + " - " + req.url + " - " + req.ip)
    next()
})

// Routers
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use("", routerViews)

// Reglas
app.get('/ping', (req, res) => {
    res.send("pong")
})

const port = 8080

const httpServer = app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")

    socket.on('mensaje', data => {
        console.log(data)
    })

    socket.broadcast.emit('event', 'mensaje enviado a todos menos al usuario que se conecto')
})