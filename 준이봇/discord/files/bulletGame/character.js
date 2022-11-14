module.exports = {
    "권총잡이": {
        gun: "glock17",
        health: 5,
        bullet: 2,
        bulletMax: 4,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "도발",
        ultType: "u",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        description: {
            info: "기본캐이다.",
            passive: "없음",
            ult: "아무런 행동도 하지 않아서 상대방이 빡친다."
        }
    },
    "돌격러": {
        gun: "hk416",
        health: 4,
        bullet: 4,
        bulletMax: 5,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "도발",
        ultType: "u",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        description: {
            info: "초보자한테 추천하는 캐릭터이다.",
            passive: "없음",
            ult: "아무런 행동도 하지 않아서 상대방이 빡친다."
        }
    },
    "기관총러": {
        gun: "mg3",
        health: 3,
        bullet: 4,
        bulletMax: 6,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            if(userData[player].skill == "s" && userData[enemy].skill == "s") {
                userData[player].damage = 0;
            }
            return;
        },
        ultName: "빠른 장전",
        ultType: "r",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            bulletObject[roomId][`user${player}`].bullet++;
            if(userData[player].damage > 0) {
                userData[player].damage++;
            }
        },
        description: {
            info: "난사충에게 추천하는 캐릭터이다.",
            passive: "상대와 동시에 난사했을 때, 본인의 HP가 닳지 않는다.",
            ult: "한 번에 2번씩 장전한다. 그러나 이 때 데미지를 입으면 체력이 추가로 1 감소한다."
        }
    },
    "스나이퍼": {
        gun: "aws",
        health: 3,
        bullet: 2,
        bulletMax: 3,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            if(userData[player].skill == "s") {
                bulletObject[roomId][`user${player}`].skill[bulletObject[roomId].index] = "f";
                userData[player].skill = "f";
            }
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "헤드샷",
        ultType: "f",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            if(bulletObject[roomId].index > 0 && bulletObject[roomId][`user${player}`].skill[bulletObject[roomId].index - 1] == "u") {
                return;
            }
            if(userData[enemy].skill == "d") {
                userData[enemy].damage = 1;
            }
        },
        description: {
            info: "명중률 100%의 저격수이다.",
            passive: "난사를 사용할 수 없다.",
            ult: "발사할 때, 총알이 방어막을 뚫는다. 연속해서 사용할 수 없다."
        }
    },
    "더블배럴": {
        gun: "beretta686",
        health: 3,
        bullet: 0,
        bulletMax: 2,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            if(userData[player].skill == "r") {
                bulletObject[roomId][`user${player}`].bullet = 2;
            }
        },
        ultName: "도발",
        ultType: "u",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        description: {
            info: "역겨운 샷건을 쓴다.",
            passive: "한 번에 장전을 두 번한다. 또한, 상대에게 연속 2번 HP를 깍을 시 2번째 데미지기 2배가 된다.",
            ult: "아무런 행동도 하지 않아서 상대방이 빡친다."
        }
    },
    "메딕": {
        gun: "g36c",
        health: 4,
        bullet: 3,
        bulletMax: 3,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "힐",
        ultType: "u",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            if(userData[player].damage > 0) {
                userData[player].damage *= 2;
                return;
            }
            bulletObject[roomId][`user${player}`].health++;
        },
        description: {
            info: "총도 쏘는데 치료까지 한다.",
            passive: "없음",
            ult: "HP를 1 회복한다. 그러나 이 때 데미지를 입으면 힐이 취소되며, 체력이 데미지의 2배만큼 깍인다."
        }
    },
    "탱커": {
        gun: "rpg7",
        health: 7,
        bullet: 0,
        bulletMax: 1,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            //BM is 1 so nothing is ok
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "도발",
        ultType: "u",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        description: {
            info: "체력이 존12나 많다.",
            passive: "난사를 사용할 수 없다.",
            ult: "아무런 행동도 하지 않아서 상대방이 빡친다."
        }
    },
    "도둑": {
        gun: "mp5k",
        health: 2,
        bullet: 3,
        bulletMax: 4,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "탄창 교환",
        ultType: "u",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            let temp = userData[enemy].bullet;
            userData[enemy].bullet = userData[player].bullet;
            userData[player].bullet = temp;
        },
        description: {
            info: "깜빵에서 탈옥했다.",
            passive: "없음",
            ult: "상대방과 총알 수를 바꾼다. 연속해서 사용할 수 없으며, 해당 턴 마지막에 바뀐다. (예를 들어 상대가 난사를 하면 말장도로묵이다.)"
        }
    },
    "존윅": {
        gun: "beretta92",
        health: 4,
        bullet: 4,
        bulletMax: 4,
        passivePreCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        passivePostCheck(userData, bulletObject, roomId,  player, enemy) {
            return;
        },
        ultName: "모잠비크 드릴",
        ultType: "f",
        ultCheck(userData, bulletObject, roomId,  player, enemy) {
            if(userData[enemy].damage > 0) userData[enemy].damage *= 2;
        },
        description: {
            info: "너가 아는 그 존 윅이 맞다.",
            passive: "없음",
            ult: "한 번에 2발씩 쏜다. (하지만 발사로 취급한다.)"
        }
    }
}