const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const userRoute = require('./routes/userRoute');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err.message);
});

const server = http.createServer(app);
server.listen(process.env.PORT);
console.log("Server at:"+process.env.PORT);
