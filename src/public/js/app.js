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

// Form 이벤트 등록하기
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(input.value);
    input.value='';
}
messageForm.addEventListener('submit', handleSubmit)