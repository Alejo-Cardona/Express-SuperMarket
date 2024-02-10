const socket = io()

socket.emit('mensaje', 'mensaje enviado con websocket')

socket.on('event', data => console.log(data))