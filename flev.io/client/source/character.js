module.exports = {
    'Jack': {
        gun: 'M9',
        health: 100,
        power: 20,
        bullet: 4,
        bulletMax: 5,
        passiveCondition(room, index, player, enemy) {
            return 0;
        },
        passive(room, index, player, enemy) {
        },
        ultimateName: 'taunt',
        ultimateCondition(room, index, player, enemy) {
            return 1;
        },
        ultimate(room, index, player, enemy) {
        },
        description: {
            info: '기본캐릭터',
            passive: '없음',
            ultimate:'아무 것도 하지 않는다. (이름이 도발인 이유 ㅋㅋ)',
        }
    },
    'Soki': {
        gun: 'L118A1',
        health: 60,
        power: 30,
        bullet: 2,
        bulletMax: 3,
        passiveCondition(room, index, player, enemy) {
            if(room[player].skill[index] === 'spray') return 1;
            else if(index >= 1 && room[player].skill[index - 1] === 'ultimate' && room[player].skill[index] === 'ultimate') return 2;
            else if(room[player].bullet === 0 && room[player].skill[index] === 'ultimate') return 3;
            else return 0;
        },
        passive(room, index, player, enemy) {
            switch(this.passiveCondition(room, index, player, enemy)) {
                //spray 불가능
                case 1:
                    room[player].skill[index] = 'fire';
                    break;
                //ultimate 연속 사용 x
                case 2:
                    room[player].skill[index] = 'fire';
                    break;
                //0발 ultimate 사용 x
                case 3:
                    room[player].skill[index] = 'reload';
                    break;
            }
        },
        ultimateName: 'H-shot',
        ultimateCondition(room, index, player, enemy) {
            return 1;
        },
        ultimate(room, index, player, enemy) {
            switch(this.ultimateCondition(room, index, player, enemy)) {
                //총알이 defend 뚫음
                case 1:
                    room[player].bullet--;
                    room[enemy].damage += this.power;
                    if(room[enemy].skill[index] === 'defend') room[enemy].damageApply = true;
                    break;
            }
        },
        description: {
            info: '최고의 명사수.',
            passive: '난사를 할 수 없다.',
            ultimate: '발사와 동일하나 상대가 방어를 해도 데미지를 입힌다. 연속해서 사용할 수 없다.',
        }
    },
    'A.M.P': {
        gun: 'M249',
        health: 120,
        power: 7,
        bullet: 5,
        bulletMax: 10,
        passiveCondition(room, index, player, enemy) {
            if(index >= 1 && room[player].skill[index - 1] === 'reload' && room[player].skill[index] === 'reload') {
                if(room[player].bullet + 5 < this.bulletMax) return 1;
                else return 2;
            }
            else if(index === 0 && room[player].skill[index] === 'reload') {
                return 3;
            }
            else if(room[player].skill[index] === 'reload') return 3;
            else return 0;
        },
        passive(room, index, player, enemy) {
            switch(this.passiveCondition(room, index, player, enemy)) {
                //연속 2번 reload 시 총알 5발 추가
                //max
                case 1:
                    room[player].bullet += 4;
                    break;
                //regular
                case 2:
                    room[player].bullet = this.bulletMax - 1;
                    break;
                //1번 reload는 아무 일도 없음
                case 3:
                    room[player].bullet--;
                    break;
            }
        },
        ultimateName: 'taunt',
        ultimateCondition(room, index, player, enemy) {
            return 1;
        },
        ultimate(room, index, player, enemy) {
        },
        description: {
            info: '기관총이다ㅏㅏ!',
            passive: '총알을 늘리려면 연속해서 장전해야 한다. 그 대신 총알이 5발 장전된다!',
            ultimate: '아무 것도 하지 않는다. (이름이 도발인 이유 ㅋㅋ)',
        }
    },
    'Iris': {
        gun: 'glock 17',
        health: 70,
        power: 20,
        bullet: 3,
        bulletMax: 5,
        passiveCondition(room, index, player, enemy) {
            if(index >= 1 && room[player].skill[index - 1] === 'ultimate' && room[player].skill[index] === 'ultimate') return 1;
            else if(index === 0 && room[player].skill[index] === 'ultimate') return 1;
            else return 0;
        },
        passive(room, index, player, enemy) {
            switch(this.passiveCondition(room, index, player, enemy)) {
                //ultimate 연속 2번 사용 x
                case 1:
                    room[player].skill[index] = 'defend';
                    break;
            }
        },
        ultimateName: 'heal',
        ultimateCondition(room, index, player, enemy) {
            return 1;
        },
        ultimate(room, index, player, enemy) {
            switch(this.ultimateCondition(room, index, player, enemy)) {
                //체력 20 회복
                case 1:
                    room[player].health += 20;
                    break;
            }
        },
        description: {
            info: '힐러',
            passive: '처음에 궁극기를 사용할 수 없다.',
            ultimate:'체력을 20 얻는다. 연속해서 사용할 수 없다.',
        }
    },
    'Liz': {
        gun: 'Python',
        health: 80,
        power: 25,
        bullet: 2,
        bulletMax: 6,
        passiveCondition(room, index, player, enemy) {
            if(room[player].skill[index] === 'spray' && room[enemy].skill[index] === 'spray') return 1;
            else if(room[player].skill[index] === 'spray') return 2;
            else if(room[enemy].skill[index] === 'spray') return 3;
            else if(room[player].skill[index] === 'ultimate' && room[player].bullet < this.bulletMax) return 4;
            else return 0;
        },
        passive(room, index, player, enemy) {
            switch(this.passiveCondition(room, index, player, enemy)) {
                //spray 불가능
                case 1:
                    room[player].skill[index] = 'fire';
                    room[enemy].skill[index] = 'fire';
                    break;
                case 2:
                    room[player].skill[index] = 'fire';
                    break;
                case 3:
                    room[enemy].skill[index] = 'fire';
                    break;
                //총알 모자르면 궁극기 불가능
                case 4:
                    room[player].skill[index] = 'reload';
                    break;
            }
        },
        ultimateName: 'Fanning',
        ultimateCondition(room, index, player, enemy) {
            return 1;
        },
        ultimate(room, index, player, enemy) {
            switch(this.ultimateCondition(room, index, player, enemy)) {
                //난사 가능
                case 1:
                    if(room[enemy].skill[index] === 'fire') {
                        let damage = room[player].bullet * room[player].power - room[enemy].power;
                        if(damage > 0) room[enemy].damage = damage;
                    }
                    else {
                        room[enemy].damage = room[player].bullet * room[player].power;
                    }
                    setTimeout(() => {room[player].bullet = 0}, 2);
                    break;
            }
        },
        description: {
            info: '파충류 보안관.',
            passive: '상대와 본인 모두 난사를 할 수 없다.',
            ultimate: '총알이 최대인 경우 사용할 수 있다. 난사를 한다.',
        }
    }
}