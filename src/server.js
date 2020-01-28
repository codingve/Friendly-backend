// require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const routes = require('./routes')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/*Essa nao é a melhor maneira de ser feito
o correto seria utilizar o conceito de chave-valor dentro do banco de dados para 
armazenar essas informações de 'qual id de usuario é qual id de socket'*/
const connectedUsers ={};



io.on('connection', socket => {
    const {user} = socket.handshake.query;

    connectedUsers[user] = socket.id;

});


mongoose.connect(
    process.env.MONGO_URL, 
    //"mongodb+srv://casis:casis@cluster0-pslzd.mongodb.net/oministack8?retryWrites=true&w=majority",
    {
    useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


app.use(cors());
app.use(express.json());
app.use(routes); //GET, POST(inserir), PUT(editar), DELETE

server.listen(process.env.PORT || 3333);