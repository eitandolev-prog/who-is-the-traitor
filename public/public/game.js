const socket = io();

function joinRoom() {
    const name = document.getElementById('name').value;
    const room = document.getElementById('room').value;

    socket.emit('join-room', {
        name,
        room
    });
}

socket.on('players', players => {
    const div = document.getElementById('players');

    div.innerHTML = `
        <h2>Players</h2>
        ${players.map(p => `<div>${p.name}</div>`).join('')}
    `;
});
