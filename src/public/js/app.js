console.log('--- ./src/public/js/app.js ---');

const socket = new WebSocket(`ws://${window.location.host}`);
let userNickname = '(미정)';

socket.addEventListener('open', ()=>{
    console.log('Connected to Server');
})

const messageList = document.querySelector('ul');
socket.addEventListener('message', msg=>{
    const li = document.createElement('li');
    
    const {type, value} = JSON.parse(msg.data);
    if(type==='nickname'){
        changeNickname(value);
    }else{
        li.innerText = value;
        messageList.append(li);
    }
    
    
    
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

//닉네임 설정
const headerNickname = document.querySelector('.nickname');

function changeNickname(nickname){
    headerNickname.innerHTML=nickname;
}

function makeMessage({type, payload}){
    return JSON.stringify({type, payload});
}