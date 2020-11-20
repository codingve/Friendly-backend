require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const routes = require('./routes')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers ={};

io.on('connection', socket => {
	const {user} = socket.handshake.query;
	connectedUsers[user] = socket.id;
});

mongoose.connect(process.env.MONGO_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log("ERROR",err));


app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
});


app.use(cors());
app.use(express.json());
app.use(routes); 

server.listen(process.env.PORT || 3333, '0.0.0.0');























/*Essa nao é a melhor maneira de ser feito
o correto seria utilizar o conceito de chave-valor dentro do banco de dados para 
armazenar essas informações de 'qual id de usuario é qual id de socket'*/