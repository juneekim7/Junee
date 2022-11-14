const express = require('express');
const { WebSocketServer } = require('ws');
const fs = require("fs");

const ws = new WebSocketServer({port: 3000});
const app = express();
app.use(express.static('client'));
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

app.listen(80, () => {
    console.log(data['2023-02-17'][0]);
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

function makeDate(month, day) {
    return month > 2 ?
    `2022-${month.padStart(2, '0')}-${day.padStart(2, '0')}` :
    `2023-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

ws.on('connection', (socket, request) => {
    socket.on('message', (msg) => {
        msg = String(msg);
        if(msg.startsWith('추가 ')) {
            let date = makeDate(msg.split(' ')[1].split('/')[0], msg.split(' ')[1].split('/')[1]);
            let content = msg.replace(`추가 ${msg.split(' ')[1]} `, '');
            if(data[date] === undefined) data[date] = new Array();
            data[date].push(content);
        }
        else if(msg.startsWith('삭제 ')) {
            let date = makeDate(msg.split(' ')[1].split('/')[0], msg.split(' ')[1].split('/')[1]);
            data[date] = new Array();
        }
        else if(data[msg] !== undefined) {
            socket.send(JSON.stringify({
                '오늘': data[msg],
                '내일': []
            }));
        }
        else {
            socket.send(JSON.stringify({
                '오늘': [],
                '내일': []
            }));
        }
    })
});