import express from "express";
import http from 'http';
import WebSocket from 'ws';

const app = express();
const cons = require('consolidate');

app.engine('html', cons.swig)
app.set('views', __dirname+'/views');
app.set('view engine', 'html');
app.use('/public', express.static(__dirname+'/public'));

app.get('/', (req, res) => res.render('home'));
const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const socketsDB = [];

wss.on('connection', socket => {	
    socketsDB.push(socket);
    console.log('Connected to Browser');
    socket.on('close', () => {
		console.log('Disconnected from Browser');
	});

    socket.on('message', msg=>{
        socketsDB.forEach(aSocket=>{
            aSocket.send(msg.toString())
        })
        // socket.send(msg.toString())
    })

    socket.send('hello');

});

server.listen(3000, handleListen);