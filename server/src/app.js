
const express =require('express');
const socketio = require('socket.io')
const cors=require('cors')
const http =require('http');
const routes=require('./route')
const app=express();
const PORT=4000;
const server=http.createServer(app);
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/v1',routes);
const STATIC_CHANNELS = ['global_notifications', 'global_chat'];
const io=socketio(server);

io.on('connection',(socket)=>{
  
    console.log(`new client connected ${socket.id}`);
    socket.emit('connection', {
        data:"heelo"
    });
    socket.on('join_room',(data)=>{
    socket.join(data)
    })
    socket.on('send_message',(data)=>{
        console.log('message',data)
       socket.to(data.room).emit('receive_message',data)
    })
    socket.on('disconnect',()=>{
        console.log('user disconect')
    })
})


server.listen(PORT,()=>{
    console.log('my server is listing on port '+PORT)
})
