const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const socket = require('socket.io');
const User = require('./models/userModel').userModel; 

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoute);
app.use('/api/message', messageRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT, ()=>{
    console.log("Server at Port:"+process.env.PORT);
})

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket,
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id);
        console.log("added", userId);
    });
    socket.on("send-msg",async (data)=>{
        const user = await User.findById(data.from).select(["username"]);
        const userName = user.username;
        const sendUserSocket = [];
        console.log("sntmsg",data.message);
        for(let i=0;i<data.to.length;i++){
            console.log(data.to);
            sendUserSocket.push(onlineUsers.get(data.to[i]));
        }
        console.log(sendUserSocket);
        console.log("sentData",{data},userName);
        for(let i=0;i<sendUserSocket.length;i++){
            if(sendUserSocket[i]){
                socket.to(sendUserSocket[i]).emit("msg-receive", {message: data.message, from: userName});
                console.log("receving");
            }
        }
    })
});
async function fetchUser(id){
    const user = await User.findById(id).select(["username"]);
    const userName = user.username;
    return userName;
}

