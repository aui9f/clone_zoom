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
    //익명의 사용자
    socket['nickname'] = 'Anonymous';

    console.log('Connected to Browser');
    socket.on('close', () => {
		console.log('Disconnected from Browser');
	});

    socket.on('message', msg=>{
        const {type, payload} = JSON.parse(msg);
        switch (type) {
            case 'nickname':
                socket['nickname'] = payload; break;
            case 'new_message': 
                socketsDB.forEach(aSocket=>aSocket.send(`${socket.nickname}: ${payload}`))
                break;
        }
    })

    socket.send('hello');

});

server.listen(3000, handleListen);