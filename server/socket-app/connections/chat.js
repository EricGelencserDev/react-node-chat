let connection = {
    onConnect: onConnect,
}

let id = 0;
let users = {};


function onConnect(socket) {
    let interval = 1000;
    let messageCount = 10;
    let timer = null;

    socket.on('signin', (username) => {
        let userConnection = {
            socket: socket.id,
            username: username
        }
        users[socket.id] = username;
        this.emit('userlist', Object.keys(users).map(id =>{
            return users[id]
        }));
    })

    socket.on('disconnect', () => {
        delete users[socket.id];
        this.emit('userlist', Object.keys(users).map(id =>{
            return users[id]
        }));
    })

    socket.on('send', (message) => {
        message.id = id++;
        message.timeStamp = new Date();
        this.emit('new-message', message);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing');
    })
}

module.exports = connection;
