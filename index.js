// index.js (Backend Server - Heroku/Railway پر deploy ہوگا)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Deployment کے لیے ضروری: PORT کو Environment Variable سے لیں۔
const PORT = process.env.PORT || 3000; 

// Socket.IO کو HTTP سرور کے ساتھ جوڑیں
const io = socketIo(server);

// جب کوئی user 'http://yourdomain.com/' پر آئے تو index.html فائل بھیج دیں
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO Connection Logic
io.on('connection', (socket) => {
    console.log('New user connected: ' + socket.id);

    // جب client سے 'chat message' ملے
    socket.on('chat message', (msg) => {
        // یہ پیغام تمام جڑے ہوئے صارفین کو بھیج دیں
        io.emit('chat message', msg);
    });

    // جب user disconnect ہو
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Server کو start کریں
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
