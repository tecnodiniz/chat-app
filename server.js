const express = require('express');
const http = require ('http');
const socketIo = require ('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket =>{
	console.log('Novo usuário conectado');

	socket.on('disconnect', () =>{
		console.log('Usuário desconectado');
	});

	socket.on('chat message', msg =>{
		io.emit('chat message', msg);
	});
});


const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1'
server.listen(PORT, HOST, () =>{
	console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
