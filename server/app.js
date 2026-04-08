const express= require('express');
const cors= require('cors');
require('dotenv').config();
const http= require("http");
const { initSocket } = require("./socket");

const app=express();
const server = http.createServer(app);
initSocket(server);


const routes= require('./routes');

app.use(cors({
    origin:"*",
}));
app.use(express.json());

app.use('/api',routes);
app.use('/uploads',express.static("uploads"));

app.get("/",(req,res)=>{
    res.send('API is running >>>');
});


const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});