import express from "express";
import http from 'http';
import SocketIO from 'socket.io'

const app = express();
const cons = require('consolidate');

app.engine('html', cons.swig)
app.set('views', __dirname+'/views');
app.set('view engine', 'html');
app.use('/public', express.static(__dirname+'/public'));
app.get('/', (req, res) => res.render('home'));

const httpServer=http.createServer(app);
const wsServer = SocketIO(httpServer)

wsServer.on('connection', socket=>{ 
    socket.on('enter_room', (roomName, done) => {
        console.log(`채팅방 이름: ${JSON.stringify(roomName)}`);
        setTimeout(()=>{
            done();
        }, 5000)
    })
});

const handleListen = () => console.log('Listening on http://localhost:3000');
httpServer.listen(3000, handleListen);