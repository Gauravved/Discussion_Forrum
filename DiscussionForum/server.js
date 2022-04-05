const { Socket } = require('engine.io');
const express = require('express');
const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app); 
const io = socketio(server);

const PORT = 3000 || process.env.PORT;
io.on('connection', Socket=>{
    console.log("New Ws Connection..")
});

server.listen(PORT, () =>{ console.log(`Server running of port number: ${PORT}`);});