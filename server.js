//server.js
const application = require('express')();
const server = require('http').createServer(application)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000
application.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
server.listen(PORT, "0.0.0.0",() => {
    console.log('Server is running on port: ' + PORT);
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('User is disconnected - Username: ' + socket.username);
    });
    socket.on('new message', (msg) => {
        const now = new Date();
        io.emit('send message', {message: msg, user: socket.username,time:`${now.getHours()}:${now.getMinutes()}`});
    });
    socket.on('new user', (usr) => {
        const randomNumber = Math.floor(Math.random()*10000);
        socket.username = usr+`(${randomNumber})`;
        console.log('User is connected - Username: ' + socket.username);
    });
});


