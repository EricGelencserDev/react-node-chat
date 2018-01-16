let connection = {
    onConnect: onConnect,
}

let id = 0;


function onConnect(socket) {
    let interval = 1000;
    let messageCount = 10;
    let timer = null;

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
