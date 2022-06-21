console.log('--- ./src/public/js/app.js ---');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', ()=>{
    console.log('Connected to Server');
})

socket.addEventListener('message', msg=>{
    console.log('Just got this: ', msg, msg.data);
})

socket.addEventListener('close', ()=>{
    console.log('Disconnected from Server');
})


setTimeout(()=>{
	socket.send('hello, from brower')
}, 5000);