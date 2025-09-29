// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// 1. App setup
const app = express();
const server = http.createServer(app);
// Socket.io کو HTTP سرور سے جوڑیں۔
const io = socketIo(server);

const PORT = 3000;

// Home page پر ایک سادہ HTML فائل بھیجیں
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 2. Socket.IO Connection
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // 3. جب client سے 'chat message' ملے
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        
        // یہ پیغام ہر جڑے ہوئے user کو بھیج دیں (Live Broadcast)
        io.emit('chat message', msg);
    });

    // 4. جب user disconnect ہو
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Server کو start کریں
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open this link in multiple tabs to chat live!`);
});
