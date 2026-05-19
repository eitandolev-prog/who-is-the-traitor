const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let rooms = {};

io.on('connection', socket => {
    console.log('Player connected');

    socket.on('join-room', data => {
        const { room, name } = data;

        socket.join(room);

        if (!rooms[room]) {
            rooms[room] = [];
        }

        rooms[room].push({
            id: socket.id,
            name
        });

        io.to(room).emit('players', rooms[room]);
    });

    socket.on('disconnect', () => {
        for (const room in rooms) {
            rooms[room] = rooms[room].filter(
                p => p.id !== socket.id
            );

            io.to(room).emit('players', rooms[room]);
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});