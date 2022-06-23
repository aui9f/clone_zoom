const socket = io();

const welcome = document.getElementById('welcome');
const roomForm = welcome.querySelector('form');

const room = document.getElementById('room');
const msgForm = room.querySelector('form');

let roomName='';
room.hidden=true;

function showRoom(){
    welcome.hidden = true;
    room.hidden=false;
    const h4 = room.querySelector('h4');
    h4.innerText= `Room ${roomName}`
}

function handleRoomSubmit(e){
    e.preventDefault();
    const input = roomForm.querySelector('input');
    socket.emit('enter_room', {payload: input.value}, showRoom);
    roomName = input.value
    input.value = '';
}
function handleMsgSubmit(e){
    e.preventDefault();
}

function addMessge(message){
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = message;
    ul.appendChild(li);
}



roomForm.addEventListener('submit', handleRoomSubmit);
msgForm.addEventListener('submit', handleMsgSubmit);


socket.on('welcome', ()=>{
    console.log("??")
    addMessge('someone joined!')
})
