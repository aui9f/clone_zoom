console.log('--- ./src/public/js/app.js ---');

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', ()=>{
    console.log('Connected to Server');
})

const messageList = document.querySelector('ul');
socket.addEventListener('message', msg=>{
    const li = document.createElement('li');
    
    // console.log(msg.data);
    li.innerText = msg.data;
    messageList.append(li);
})

socket.addEventListener('close', ()=>{
    console.log('Disconnected from Server');
})

// Form#nickname 이벤트 등록하기
const nicknameForm = document.querySelector('#nickname');
function handleNicknameSubmit(event){
    event.preventDefault();
    const input = nicknameForm.querySelector('input');
    socket.send(makeMessage({type: 'nickname', payload: input.value}));
    input.disabled = true;
}
nicknameForm.addEventListener('submit', handleNicknameSubmit)

// Form#message 이벤트 등록하기
const messageForm = document.querySelector('#message');
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(makeMessage({type: 'new_message', payload: input.value}));
    input.value='';
}
messageForm.addEventListener('submit', handleSubmit)


function makeMessage({type, payload}){
    
    return JSON.stringify({type, payload});
}