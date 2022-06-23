const socket = io();

const welcome = document.getElementById('welcome');
const roomForm = welcome.querySelector('form');
function handleRoomSubmit(e){
    e.preventDefault();
    const input = roomForm.querySelector('input');
    socket.emit('enter_room', {payload: input.value}, ()=>{
        console.log("===== Server is done! =====")
    });
    input.value = '';
}
roomForm.addEventListener('submit', handleRoomSubmit);