const socket = new WebSocket('ws://localhost:3000');
//const socket = new WebSocket('ws://3.37.9.134:3000');
let character;
let player;
let enemy;

socket.onopen = (event) => {
    socket.send(JSON.stringify({ type: 'character' }));
}

//캐릭터 정보 받아오기
socket.onmessage = (event) => {
    msg = event.data;
    character = Object.entries( JSON.parse(msg) );
    let string = new String();
    for(let [key, object] of character) {
        string += `<option value="${key}">${key}(${object.gun})</option>`;
    }
    document.getElementById('character-select').innerHTML = string;
}

//매칭 잡기
function setQueue() {
    socket.send(JSON.stringify({
        type: 'queue',
        content: {
            name: document.getElementById('name-select').value,
            character: document.getElementById('character-select').value
        }
    }));

    socket.onmessage = (event) => {
        const msg = event.data;
        if(msg === 'connected?') {
            socket.send(JSON.stringify({ type: 'reply' }));
        }
        else if(msg.startsWith('matched: ')) {
            player = Number(msg.replace('matched: ', ''));
            enemy = `user${player % 2 + 1}`;
            player = `user${player}`;
            playGame();
        }
        else if(msg === 'failed') {
            pageChange('main');
            alert('failed');
        }
        else if(msg === 'notFound') {
            pageChange('main');
            alert('match not found T.T')
        }
        else {
            console.log(msg);
        }
    }

    localStorage['nickname'] = document.getElementById('name-select').value;
    pageChange('loading');
}

//게임 정보 표시
function playGame() {
    socket.send(JSON.stringify({ type: 'gameStart' }));
    pageChange('game');

    socket.onmessage = (event) => {
        const msg = event.data;
        const timeAndScore = document.getElementById('time-and-score');
        if(msg == 'connected?') {
            socket.send(JSON.stringify({ type: 'reply' }));
        }
        else if(msg.startsWith('time: ')) {
            const time = Number(msg.replace('time: ', ''));
            if(time > 3) return;
            timeAndScore.style.setProperty('display', 'block');
            timeAndScore.textContent = time;
        }
        else if(msg === 'failed') {
            pageChange('main');
            alert('failed');
        }
        else {
            const room = JSON.parse(msg);
            const characterElement = document.getElementsByClassName('character');

            //time 지우기
            timeAndScore.style.setProperty('display', 'none');

            //skillpad 표시
            document.getElementById('skillpad').style.setProperty('display', 'block');
            for(let element of document.getElementsByClassName('skill')) {
                room[player].skillPossible.indexOf(element.id) != -1 ? element.style.setProperty('display', 'block') : element.style.setProperty('display', 'none');
            }

            //정보 표시
            characterElement[0].style.setProperty('background-image', `url("./source/image/character/${room[enemy].character}/enemy.png")`);
            document.getElementsByClassName('info')[0].innerHTML = `
                <font class="name" color="cyan"></font><br/>
                <font color="white">
                    ${room.index > 0 ? room[enemy].skill[room.index - 1].replace('ultimate', `<font color='gold'>${Object.fromEntries(character)[room[enemy].character].ultimateName}</font>`) : ''}
                </font><br/>
                HP: ${room[enemy].health}<br/>
                BL: ${room[enemy].bullet}/${room[enemy].bulletMax}
            `;
            document.getElementsByClassName('name')[0].textContent = room[enemy].name;

            characterElement[1].style.setProperty('background-image', `url("./source/image/character/${room[player].character}/player.png")`);
            document.getElementsByClassName('info')[1].innerHTML = `
                <font class="name" color="cyan"></font><br/>
                <font color="white">
                    ${room.index > 0 ? room[player].skill[room.index - 1].replace('ultimate', `<font color='gold'>${Object.fromEntries(character)[room[player].character].ultimateName}</font>`) : ''}
                </font><br/>
                HP: ${room[player].health}<br/>
                BL: ${room[player].bullet}/${room[player].bulletMax}
            `;
            document.getElementsByClassName('name')[1].textContent = room[player].name;

            if(room[enemy].damage > 0) {
                room[enemy].damageApply === false ?
                characterElement[0].style.setProperty('animation', 'defend 1s ease'):
                characterElement[0].style.setProperty('animation', 'damage 1s ease');
            }

            if(room[player].damage > 0) {
                room[player].damageApply === false ?
                characterElement[1].style.setProperty('animation', 'defend 1s ease'):
                characterElement[1].style.setProperty('animation', 'damage 1s ease');
            }

            setTimeout(() => {
                characterElement[0].style.setProperty('animation', 'none');
                characterElement[1].style.setProperty('animation', 'none');
            }, 1000)

            //만약 이기거나 짐
            if(room[player].health <= 0 || room[enemy].health <= 0) {
                document.getElementById('score-background').style.setProperty('display', 'block');
                timeAndScore.style.setProperty('display', 'block');
                timeAndScore.textContent = `${room[player].score} : ${room[enemy].score}`;
                setTimeout( () => {
                    document.getElementById('score-background').style.setProperty('display', 'none');
                    timeAndScore.style.setProperty('display', 'none');
                }, 1000);
                if(room[player].score >= 2) {
                    setInterval(() => {showResult('victory!')}, 1000);
                }
                else if(room[enemy].score >= 2) {
                    setInterval(() => {showResult('defeat')}, 1000);
                }
            }
        }
    }
}

//스킬 선택 서버에 전송
function skillSelect(skill) {
    socket.send(JSON.stringify( {type: 'skill', content: skill} ));
    for(let element of document.getElementsByClassName('skill')) {
        element.style.setProperty('display', 'none');
    }
    document.getElementById(skill).style.setProperty('display', 'block');
}

//결과 표시
function showResult(result) {
    pageChange('result');
    document.getElementById('result-info').textContent = result;
}