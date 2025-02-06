const express = require('express');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/routesChat.js');
const GroupMessage = require('./models/GroupMessage');
const PrivateMessage = require('./models/PrivateMessage');
const socketio = require('socket.io');
const app = express();
app.use(express.json());
//app.use(express.static('views'))

const DB_NAME = 'ChatApp'
const DB_PASSWORD = 'S3creTR0ot'
const DB_CONNECTION = `mongodb+srv://admin:${DB_PASSWORD}@comp3123.nskbe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=COMP3123`
const db = mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

app.use(chatRoutes);

// server connection
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Chat App is running successfully. On: http://localhost:${PORT}/`)
})

const io = socketio(server)

io.on('connection', (socket) => {
    console.log(`New Socket: ${socket.id}`)

    socket.on('disconnect', ()=> {
        console.log(`User disconnect ${socket.id}`)
    })

    socket.on('message', (data)=>{
        console.log(`Message from ${socket.id}: ${data}`)
    })

    socket.on('chat_message', (data) => {
        data.clientId = socket.id
        console.log(JSON.stringify(data))
        io.emit('chat_message', data)
        PrivateMessage.create({from_user: data.clientId}, {to_user: data.clientId}, {message: data.message}, (err, success) => {
            if (!err) {
                success.save()
                console.log("Message saved to database.")
            } else {
                console.log(err)
            }
        })
    })

    socket.on('join_group', (roomName) => {
        console.log(`User ${socket.id} joined room ${roomName}`)
        socket.join(roomName)
    })

    socket.on('leave_group', (roomName) => {
        socket.leave(roomName)
    })

    socket.on('group_message', (data) => {
        console.log(`User ${socket.id} sent message to room ${data.group}`)
        data.senderId = socket.id
        io.to(data.group).emit('group_message', data)
    })

})