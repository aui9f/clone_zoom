import express from "express";
const app = express();
const cons = require('consolidate');

app.engine('html', cons.swig)
app.set('views', __dirname+'/views');
app.set('view engine', 'html');
app.use('/public', express.static(__dirname+'/public'));

app.get('/', (req, res) => res.render('home'));


const handleListen = () => console.log('Listening on http://localhost:3000');
app.listen(3000, handleListen);