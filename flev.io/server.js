const express = require('express');
const fs = require('fs');
const wss = require('ws').Server;
const bodyParser = require('body-parser');
const { request } = require('http');
const { WebSocketServer } = require('ws');
const { send } = require('process');
require('dotenv').config();

//const mongoClient = require('mongodb').MongoClient;
const ws = new WebSocketServer({port: 3000});
const app = express();
let db;

/*mongoClient.connect(process.env.DBCODE, (error, client) => {
    if(error) return console.log(error);
    db = client.db('Feb17');*/

    app.listen(80, () => {
        console.log('server started!');
    });
//})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

//page
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

//--------------------------------------------
//basic functions
function random(n1, n2 = 0) {
    return n1 < n2 ? Math.floor(Math.random() * (n2 - n1)) + n1 : Math.floor(Math.random() * (n1 - n2)) + n2;
}

function setRandomString() {
    const tokenString = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let string = new String();
    for(let i = 0; i < 7; i++) {
        string += tokenString[random(tokenString.length)];
    }
    return string;
}

function deepClone(object) {
    if(object === null || typeof object !== 'object') return object;
    const result = Array.isArray(object) ? [] : {};
    for(let key of Object.keys(object)) {
        result[key] = deepClone(object[key]);
    }
    return result;
}

//-------------------------------------------
const character = require('./client/source/character.js');
//-------------------------------------------
const tokenArray = new Array();

function setToken() {
    let token;
    do {
        token = setRandomString();
    } while(tokenArray.indexOf(token) != -1)
    tokenArray.push(token);
    return token;
}

function deleteToken(token) {
    delete tokenArray[tokenArray.indexOf(token)];
}

function deleteSocket(socket, playerId) {
    deleteToken(playerId);
    socket.send('failed');
    socket.close();
}

const roomArray = new Object();
const gameInterval = new Object();

//make a new room
function setRoom(user1, user2) {
    let roomId;
    do {
        roomId = setRandomString();
    } while(roomArray[roomId] !== undefined)
    roomArray[roomId] = {
        phase: 'ready',
        index: 0,
        reset() {
            this.index = 0;
            this.user1 = {
                score: this.user1 === undefined ? 0 : this.user1.score,
                playerId: this.user1 === undefined ? null : this.user1.playerId,
                socket: this.user1 === undefined ? null : this.user1.socket,
                name: user1.name,
                character: user1.character,
                health: character[user1.character].health,
                power: character[user1.character].power,
                bullet: character[user1.character].bullet,
                bulletMax: character[user1.character].bulletMax,
                passive: character[user1.character].passive.bind(character[user1.character]),
                ultimate: character[user1.character].ultimate.bind(character[user1.character]),
                skillPossible: ['reload', 'fire', 'spray', 'defend', 'ultimate'],
                skill: ['reload'],
                damage: 0,
                damageApply: true
            };
            this.user2 = {
                score: this.user2 === undefined ? 0 : this.user2.score,
                playerId: this.user2 === undefined ? null : this.user2.playerId,
                socket: this.user2 === undefined ? null : this.user2.socket,
                name: user2.name,
                character: user2.character,
                health: character[user2.character].health,
                power: character[user2.character].power,
                bullet: character[user2.character].bullet,
                bulletMax: character[user2.character].bulletMax,
                passive: character[user2.character].passive.bind(character[user2.character]),
                ultimate: character[user2.character].ultimate.bind(character[user2.character]),
                skillPossible: ['reload', 'fire', 'spray', 'defend', 'ultimate'],
                skill: ['reload'],
                damage: 0,
                damageApply: true
            };
        },
        gameStart() {
            this.phase = 'skillSelect';
            let time = 0;
            gameInterval[roomId] = setInterval(() => {
                time += 1000;
                if(time % 6000 === 0) {
                    this.phase = 'battle';
                    game(roomId);
                }
                else {
                    this.user1.socket.send(`time: ${6 - (time % 6000) / 1000}`);
                    setTimeout(() => { this.user2.socket.send(`time: ${6 - (time % 6000) / 1000}`) }, 1);
                }
            }, 1000);
        }
    };
    roomArray[roomId].reset();
    roomArray[roomId].user1.skillPossible = skillPossible(roomId, 0, 'user1');
    roomArray[roomId].user2.skillPossible = skillPossible(roomId, 0, 'user2');
    return roomId;
}

const roomFind = new Object();

setInterval(() => {
    while(queue.length >= 2) {
        const roomId = setRoom(queue[0], queue[1]);
        roomFind[queue.shift().playerId] = { roomId: roomId, user: 1 };
        roomFind[queue.shift().playerId] = { roomId: roomId, user: 2 };
    }
}, 100);

const queue = new Array();

//---------------------------------------
function game(roomId) {
    const index = roomArray[roomId].index;

    skillReplace(roomArray[roomId], index);

    //calc damage
    calcDamage(roomId, 'user1', 'user2');
    calcDamage(roomId, 'user2', 'user1');

    //ultimate
    if(roomArray[roomId].user1.skill[index] === 'ultimate') roomArray[roomId].user1.ultimate(roomArray[roomId], index, 'user1', 'user2');
    if(roomArray[roomId].user2.skill[index] === 'ultimate') roomArray[roomId].user2.ultimate(roomArray[roomId], index, 'user2', 'user1');

    //give damage
    if(roomArray[roomId].user1.damageApply === true) roomArray[roomId].user1.health -= roomArray[roomId].user1.damage;
    if(roomArray[roomId].user2.damageApply === true) roomArray[roomId].user2.health -= roomArray[roomId].user2.damage;

    //skillPossible
    roomArray[roomId].user1.skillPossible = skillPossible(roomId, index + 1, 'user1');
    roomArray[roomId].user2.skillPossible = skillPossible(roomId, index + 1, 'user2');

    //index++
    roomArray[roomId].index++;

    //초기화
    roomArray[roomId].user1.skill.push('reload');
    roomArray[roomId].user2.skill.push('reload');
    roomArray[roomId].phase = 'skillSelect';

    //만약 이기거나 짐
    if(roomArray[roomId].user1.health <= 0 || roomArray[roomId].user2.health <= 0) {
        roomArray[roomId].user1.health > roomArray[roomId].user2.health ? roomArray[roomId].user1.score++ : roomArray[roomId].user2.score++;
        setTimeout(() => {
             //게임 끝 (3판 2선제)
            if(roomArray[roomId].user1.score >= 2 || roomArray[roomId].user2.score >= 2) {
                clearInterval(gameInterval[roomId]);
                delete roomFind[ roomArray[roomId].user1.playerId ];
                delete roomFind[ roomArray[roomId].user2.playerId ];
                delete roomArray[roomId];
            }
            else {
                clearInterval(gameInterval[roomId]);
                roomArray[roomId].reset();
                roomArray[roomId].user1.skillPossible = skillPossible(roomId, 0, 'user1');
                roomArray[roomId].user2.skillPossible = skillPossible(roomId, 0, 'user2');
                setTimeout(() => {
                    roomArray[roomId].gameStart();
                    roomArray[roomId].user1.socket.send( JSON.stringify(roomArray[roomId]) );
                    setTimeout(() => { roomArray[roomId].user2.socket.send( JSON.stringify(roomArray[roomId]) ) }, 1);
                }, 1000);
            }
        }, 6);
    }

    //send data
    setTimeout(() => { roomArray[roomId].user1.socket.send( JSON.stringify(roomArray[roomId]) ) }, 3);
    setTimeout(() => { roomArray[roomId].user2.socket.send( JSON.stringify(roomArray[roomId]) ) }, 4);

    //초기화
    setTimeout(() => {
        roomArray[roomId].user1.damage = 0;
        roomArray[roomId].user2.damage = 0;
        roomArray[roomId].user1.damageApply = true;
        roomArray[roomId].user2.damageApply = true;
    }, 5);
}

function skillPossible(roomId, index, player) {
    const room = deepClone(roomArray[roomId]);
    room.user1.skill.push('reload');
    room.user2.skill.push('reload');
    const skillArray = ['reload', 'fire', 'spray', 'defend', 'ultimate'];

    for(let i = 0; i < skillArray.length; ) {
        room[player].skill[index] = skillArray[i];
        if(room[player].skill[index] !== skillReplace(room, index, true)[player].skill[index]) {
            skillArray.splice(i, 1);
        }
        else {
            i++;
        }
    }

    return skillArray;
}

function skillReplace(room, index, deep = false) {
    if(deep === true) room = deepClone(room);

    skillCheck(room, index, 'user1');
    skillCheck(room, index, 'user2');

    //passive
    room.user1.passive(room, index, 'user1', 'user2');
    room.user2.passive(room, index, 'user2', 'user1');

    skillCheck(room, index, 'user1');
    skillCheck(room, index, 'user2');

    return room;
}

function skillCheck(room, index, player) {
    //3연 defend => reload
    if(index >= 2 && room[player].skill[index - 2] === 'defend' && room[player].skill[index - 1] === 'defend' && room[player].skill[index] === 'defend') {
        room[player].skill[index] = 'reload';
    }
    //bulletMax && reload => fire
    if(room[player].bullet >= room[player].bulletMax && room[player].skill[index] === 'reload') {
        room[player].skill[index] = 'fire';
    }
    //1발 spray => fire
    if(room[player].bullet === 1 && room[player].skill[index] === 'spray') {
        room[player].skill[index] = 'fire';
    }
    //0발 fire || spray => reload
    if(room[player].bullet === 0 && (room[player].skill[index] === 'fire' || room[player].skill[index] === 'spray')) {
        room[player].skill[index] = 'reload';
    }
}

function calcDamage(roomId, player, enemy) {
    const skill = roomArray[roomId][player].skill[roomArray[roomId].index];
    const enemySkill = roomArray[roomId][enemy].skill[roomArray[roomId].index];
    if(skill === 'reload') {
        roomArray[roomId][player].bullet++;
    }
    else if(skill === 'spray') {
        if(enemySkill === 'spray') {
            let damage = roomArray[roomId][player].bullet * roomArray[roomId][player].power - roomArray[roomId][enemy].bullet * roomArray[roomId][enemy].power;
            if(damage > 0) roomArray[roomId][enemy].damage = damage;
        }
        else if(enemySkill === 'fire') {
            let damage = roomArray[roomId][player].bullet * roomArray[roomId][player].power - roomArray[roomId][enemy].power;
            if(damage > 0) roomArray[roomId][enemy].damage = damage;
        }
        else {
            roomArray[roomId][enemy].damage = roomArray[roomId][player].bullet * roomArray[roomId][player].power;
        }

        setTimeout(() => {roomArray[roomId][player].bullet = 0}, 2);
    }
    else if(skill === 'fire') {
        if(enemySkill === 'spray') {
            let damage = roomArray[roomId][player].power - roomArray[roomId][enemy].bullet * roomArray[roomId][enemy].power;
            if(damage > 0) roomArray[roomId][enemy].damage = damage;
        }
        else if(enemySkill === 'fire') {
            //동시 발사일 경우 서로 데미지 입음
            let damage = roomArray[roomId][player].power;
            if(roomArray[roomId][player].power != roomArray[roomId][enemy].power) roomArray[roomId][enemy].damage = damage;
        }
        else {
            roomArray[roomId][enemy].damage = roomArray[roomId][player].power;
        }

        roomArray[roomId][player].bullet--;
    }
    else if(skill === 'defend') {
        roomArray[roomId][player].damageApply = false;
    }
}

//---------------------------------------------------
//socket
ws.on('connection', (socket, request) => {
    let connection = true;
    const playerId = setToken();
    socket.on('message', (msg) => {
        msg = JSON.parse(msg.toString('utf-8'));

        if(msg.type === 'reply') {
            connection = true;
        }
        else if(msg.type === 'character') {
            socket.send(JSON.stringify(character));
        }
        else if(msg.type === 'queue') {
            if(msg.content.name.length > 4 || typeof msg.content.name !== 'string' || character[msg.content.character] === undefined || roomFind[playerId] !== undefined) {
                deleteSocket(socket, playerId);
                return;
            }
            queue.push({
                playerId: playerId,
                name: msg.content.name,
                character: msg.content.character
            });
            let count = 0;
            const queueLoad = setInterval(() => {
                //find people
                if(roomFind[playerId] !== undefined) {
                    socket.send('matched: ' + roomFind[playerId].user);
                    clearInterval(queueLoad);
                }
                //check connection
                else if(connection === false) {
                    delete queue.splice(queue.findIndex((object) => {return object.playerId == playerId}), 1);
                    delete roomFind[playerId];
                    deleteSocket(socket, playerId);
                    clearInterval(queueLoad);
                }
                else {
                    connection = false;
                    socket.send('connected?');
                }

                //timeover
                count++;
                if(count === 100) {
                    delete queue.splice(queue.findIndex((object) => {return object.playerId == playerId}), 1);
                    delete roomFind[playerId];
                    socket.send('notFound');
                    clearInterval(queueLoad);
                }
            }, 200);
        }
        //game start
        else if(msg.type === 'gameStart') {
            if(roomFind[playerId] === undefined) {
                deleteSocket(socket, playerId);
                return;
            }
            if(roomArray[roomFind[playerId].roomId].phase === 'ready') {
                roomArray[roomFind[playerId].roomId].phase = 'start';
                roomArray[roomFind[playerId].roomId][`user${roomFind[playerId].user}`].playerId = playerId;
                roomArray[roomFind[playerId].roomId][`user${roomFind[playerId].user}`].socket = socket;

                socket.send(JSON.stringify(roomArray[roomFind[playerId].roomId]));
            }
            else if(roomArray[roomFind[playerId].roomId].phase === 'start') {
                roomArray[roomFind[playerId].roomId][`user${roomFind[playerId].user}`].playerId = playerId;
                roomArray[roomFind[playerId].roomId][`user${roomFind[playerId].user}`].socket = socket;
                roomArray[roomFind[playerId].roomId].gameStart();

                socket.send(JSON.stringify(roomArray[roomFind[playerId].roomId]));
            }
        }
        //select skill
        else if(msg.type === 'skill') {
            if(roomFind[playerId] === undefined) {
                deleteSocket(socket, playerId);
                return;
            }
            let roomId = roomFind[playerId].roomId;
            let player = `user${roomFind[playerId].user}`;
            if(msg.content === 'reload') {
                roomArray[roomId][player].skill[roomArray[roomId].index] = 'reload';
            }
            else if(msg.content === 'defend') {
                roomArray[roomId][player].skill[roomArray[roomId].index] = 'defend';
            }
            else if(msg.content === 'fire') {
                roomArray[roomId][player].skill[roomArray[roomId].index] = 'fire';
            }
            else if(msg.content === 'spray') {
                roomArray[roomId][player].skill[roomArray[roomId].index] = 'spray';
            }
            else if(msg.content === 'ultimate') {
                roomArray[roomId][player].skill[roomArray[roomId].index] = 'ultimate';
            }
        }
    })
})