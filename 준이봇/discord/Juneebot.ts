import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";

//variables
dotenv.config({
    path: "./준이봇/discord/.env"
});

const filestream = require("fs");

const f08080: number = 15761536;

const help = new DiscordJS.MessageEmbed({
    color: f08080,
    title: "준이봇 기능들",
    description: filestream.readFileSync("./준이봇/discord/files/help.txt", "utf8")
})
const code = new DiscordJS.MessageAttachment("./준이봇/discord/Juneebot.ts");
const signed = ["준이봇", "도움말", "준이봇코드", "준이봇추가", "준이봇초대", "ㅊㅊ", "출첵", "ㅊㅊ순위", "출첵순위", "ㅊㅊ랭킹", "출첵랭킹", "명언", "내명언", "내경험치보기", "내경험치", "경험치순위", "경험치랭킹", "예약", "랜덤", "가위바위보", "참참참", "총게임", "총게임규칙", "총게임참가", "총게임취소", "캐릭터", "캐릭터목록", "캐릭터종류", "캐릭터설명", "r", "f", "s", "d", "u", "R", "F", "S", "D", "U", "장전", "발사", "난사", "방어", "궁", "궁극기", "스킬", "시간표", "가르치기", "명령어삭제", "명령어목록", "내이름", "내이름보기", "내이름이뭐야", "내이름이뭐야?", "내아이디", "내아이디보기", "내아이디가뭐야", "내아이디가뭐야?", "내태그", "내태그보기", "내태그가뭐야", "내태그가뭐야?", "삭제"];


//variables that changes everytime
let msg: string = "";
let room: string = "";
let roomId: string = "";
let sender: string = "";
let senderId: string = "";
let senderTag: string = "";
function varUpgrade(message) {
    msg = message.content.replace(/  /g, " ");
    room = message.channel.name;
    roomId = message.channel.id;
    sender = message.author.username;
    senderId = message.author.id;
    senderTag = message.author.tag;
}

//파일 로드
const user: {
    [id: string]: {
        name: string,
        exp: number,
        speach: string,
        entitle: string
    }
} = JSON.parse(filestream.readFileSync("./준이봇/discord/files/user.json", "utf8"));

const server: {
    [roomId: string]: {
        teach: {
            [command: string]: string
        },
        attendence: object[]
    }
} & {today: number} = JSON.parse(filestream.readFileSync("./준이봇/discord/files/server.json", "utf8"));
const bulletRule: string = filestream.readFileSync("./준이봇/discord/files/bulletGame/rule.txt", "utf8");
const bulletCharacter: {
    [name: string]: {
        gun: string,
        health: number,
        bullet: number,
        bulletMax: number,
        passivePreCheck: (userData: object, bulletObject: object, roomId: string, player: number, enemy: number) => {},
        passivePostCheck: (userData: object, bulletObject: object, roomId: string, player: number, enemy: number) => {},
        ultName: string,
        ultType: "u",
        ultCheck: (userData: object, bulletObject: object, roomId: string, player: number, enemy: number) => {},
        description: {
            info: string,
            passive: string,
            ult: string
        }
    }
} = require("./files/bulletGame/character.js");
for(let key in bulletCharacter) {
    signed.push(key);
    signed.push(bulletCharacter[key].gun);
}

//functions
//기본
//랜덤
function random(n1, n2 = 0) {
    return n1 < n2 ? Math.floor(Math.random() * (n2 - n1)) + n1 : Math.floor(Math.random() * (n1 - n2)) + n2;
}

//user
function userSave(id, key = "none", value = "", nameChange = true ,saveType = "change") {
    if(user[id] == undefined) {
        user[id] = {
            name: sender,
            exp: 0,
            speach: "",
            entitle: ""
        }
    }
    else if(nameChange == true && user[id].name != sender) {
        user[id].name = sender;
    }
    if(key != "none") {
        if(saveType == "change") user[id][key] = value;
        else if(saveType == "add") user[id][key] += value;
    }
    filestream.writeFileSync("./준이봇/discord/files/user.json", JSON.stringify(user, null, 4));
}

//server
function serverSave(id = "none") {
    if(id != "none" && server[id] == undefined) {
        server[id] = {
            teach: {},
            attendence: []
        }
    }
    filestream.writeFileSync("./준이봇/discord/files/server.json", JSON.stringify(server, null, 4));
}

//경험치
function addExp(id, value, reason = "") {
    userSave(id, "exp", value, false, "add");
}

function exp(message) {
    if(msg.replace(/ /g, "") == "내경험치보기" || msg.replace(/ /g, "") == "내경험치") {
        if(user[senderId] == undefined) userSave(senderId);
        message.reply(`${sender}님 경험치: ${user[senderId].exp}`);
    }
    else if( (msg.replace(/ /g, "").lastIndexOf("경험치보기") != -1 && msg.replace(/ /g, "").lastIndexOf("경험치보기") == msg.replace(/ /g, "").length - 5)
    || (msg.replace(/ /g, "").lastIndexOf("경험치") != -1 && msg.replace(/ /g, "").lastIndexOf("경험치") == msg.replace(/ /g, "").length - 3)) {
        if(message.mentions.users.first() != undefined && user[message.mentions.users.first().id] != undefined) {
            message.reply(`${message.mentions.users.first().username}님 경험치: ${user[message.mentions.users.first().id].exp}`);
        }
    }
    else if(msg.replace(/ /g, "") == "경험치순위" || msg.replace(/ /g, "") == "경험치랭킹") {
        let ranking = Object.values(user);
        ranking.sort((usr1, usr2) => {
            return usr2.exp - usr1.exp;
        })
        let string = "";
        for(let i = 0; i < ranking.length; i++) {
            if(ranking[i].exp == 0) break;
            string += `${(i + 1)}위) ${ranking[i].name}님: ${ranking[i].exp}\n\n`;
        }
        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: `💙 경험치 순위 💙`,
            description: string
        })]})
    }
}

//출첵
function attendence(message) {
    if(msg == "ㅊㅊ" || msg == "출첵") {
        let now = new Date();
        if(server[roomId] == undefined) serverSave(roomId);
        if(now.getDate() != server.today) {
            server.today = now.getDate();
            for(let key in server) {
                if(key == "today") continue;
                server[key].attendence = new Array();
            }
            serverSave();
        }
        if(server[roomId].attendence.findIndex((obj) => obj["id"] == senderId) != -1) {
            message.reply("이미 출첵을 했습니다.");
            return;
        }
        server[roomId].attendence.push({
            id: senderId,
            name: sender,
            time: `${now.getHours()}:${now.getMinutes()}`
        })
        serverSave();
        if(server[roomId].attendence.length == 1) {
            message.reply(`${sender}님 출첵 완료!\n1등ㄷㄷ 경험치 +200!!`);
            addExp(senderId, 200, "출첵");
        }
        else if(server[roomId].attendence.length == 2) {
            message.reply(`${sender}님 출첵 완료!\n2등ㄲㅂ 경험치 +100!!`);
            addExp(senderId, 100, "출첵");
        }
        else if(server[roomId].attendence.length == 3) {
            message.reply(`${sender}님 출첵 완료!\n3등ㅠㅠ 경험치 +50!!`);
            addExp(senderId, 50, "출첵");
        }
        else {
            message.reply(`${sender}님 출첵 완료!\n경험치 +15!!`);
            addExp(senderId, 15, "출첵");
        }
    }
    else if(msg.replace(/ /g,"") == "ㅊㅊ순위" || msg.replace(/ /g,"") == "출첵순위" || msg.replace(/ /g,"") == "ㅊㅊ랭킹" || msg.replace(/ /g,"") == "출첵랭킹") {
        let now = new Date();
        if(now.getDate() != server.today) {
            server.today = now.getDate();
            for(let key in server) {
                server[key].attendence = new Array();
            }
            serverSave();
        }
        let string = "";
        for(let key in server[roomId].attendence) {
            string += `${Number(key) + 1}위) ${server[roomId].attendence[key]["name"]}님: ${server[roomId].attendence[key]["time"].split(":")[0]}시 ${server[roomId].attendence[key]["time"].split(":")[1]}분\n\n`;
        }
        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: `${now.getMonth() + 1}/${now.getDate()} 출첵 순위 😆`,
            description: string == "" ? "아직 출첵한 사람이 없습니다." : string
        })]})
    }
}

//명언
function speach(message) {
    if(msg.replace(/ /g, "") == "내명언") {
        if(user[senderId] == undefined) userSave(senderId);
        if(user[senderId].speach == "") message.reply("아직 명언이 없습니다.");
        else {
            message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                color: f08080,
                title: `"${user[senderId].speach}"`,
                description: `*-${sender}-*`
            })]})
        }
    }
    else if(msg.indexOf("명언 ") == 0) {
        msg = msg.replace("명언 ", "");
        userSave(senderId, "speach", msg);
        message.reply(`${sender}님의 명언 설정 완료!`);
        varUpgrade(message);
    }
    else if(msg.replace(/ /g, "") == "명언") {
        let index;
        do{ 
            index = random(Object.keys(user).length);
        } while(user[ Object.keys(user)[index] ].speach == "")

        index = Object.keys(user)[index];

        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: `"${user[index].speach}"`,
            description: `*-${user[index].name}-*`
        })]})
    }
    else if(msg.replace(/ /g, "").lastIndexOf("명언") != -1 && msg.replace(/ /g, "").lastIndexOf("명언") == msg.replace(/ /g, "").length - 2) {
        if(message.mentions.users.first() != undefined && user[message.mentions.users.first().id] != undefined) {
            message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                color: f08080,
                title: `"${user[message.mentions.users.first().id].speach}"`,
                description: `*-${user[message.mentions.users.first().id].name}-*`
            })]})
        }
    }
}

//가위바위보
function rsp(message) {
    if(msg.indexOf("가위바위보 ") != 0) return false;
    else if(msg=="가위바위보") {
        message.reply("```가위바위보 가위\n가위바위보 바위\n가위바위보 보```셋 중에 하나로 보내");
        return;
    }

    let rspArray = ["가위", "바위", "보"];
    let rspCounter = ["바위", "보", "가위"];

    let rspUser = msg.replace("가위바위보 ", "").replace("찌", "가위").replace("묵", "바위").replace("빠", "보").replace("보자기", "보");
    let rspBotIndex = random(3);
    let rspBot = rspArray[rspBotIndex];

    if(rspArray.indexOf(rspUser) == -1) {
        message.reply("```가위바위보 가위\n가위바위보 바위\n가위바위보 보```셋 중에 하나로 보내");
        return;
    }
    message.reply({embeds: [new DiscordJS.MessageEmbed({
        color: f08080,
        title: "결과",
        description: `${sender}님: ${rspUser}\n준이봇: ${rspBot}`
    })]})
    let rspIndex = rspArray.indexOf(rspUser);
    if(rspUser == rspBot) {
        message.channel.send("비겼넹..\n한 판 더 ㄱㄱ");
    }
    else if(rspCounter[rspIndex] == rspBot) {
        message.channel.send("아싸 이겼당 ㅎㅎ");
    }
    else if(rspCounter[rspBotIndex] == rspUser) {
        message.channel.send(`내가 졌다 ㅠㅠ\n${sender}님 경험치 +10!`);
        addExp(senderId, 10, "가위바위보");
    }
}

//참참참
function chamchamcham(message) {
    if(msg.indexOf("참참참 ") != 0) return false;
    else if(msg == "참참참") {
        message.reply("```참참참 왼쪽\n참참참 오른쪽\n참참참 위\n참참참 아래```넷 중에 하나로 보내");
        return;
    }

    let chamArray = ["왼쪽", "오른쪽", "위", "아래"];
    let chamUser = msg.replace("참참참 ","").replace("왼쪽", "왼").replace("오른쪽", "오").replace("왼", "왼쪽").replace("오", "오른쪽").replace("위쪽", "위").replace("아래쪽", "아래").replace("L", "왼쪽").replace("l", "왼쪽").replace("R", "오른쪽").replace("r", "오른쪽").replace("U", "위").replace("u", "위").replace("D", "아래").replace("d", "아래");
    let chamBot = chamArray[random(4)];

    if(chamArray.indexOf(chamUser) == -1) {
        message.reply("```참참참 왼쪽\n참참참 오른쪽\n참참참 위\n참참참 아래```넷 중에 하나로 보내");
        return;
    }
    message.reply({embeds: [new DiscordJS.MessageEmbed({
        color: f08080,
        title: "결과",
        description: `${sender}님: ${chamUser}\n준이봇: ${chamBot}`
    })]})
    if(chamUser == chamBot) {
        message.channel.send(`힝 내가 졌당 ㅠㅠ\n${sender}님 경험치 +15!`);
        addExp(senderId, 15, "참참참");
    }
    else {
        message.channel.send("쉽네 ㅎ");
    }
}

//시간표
const schedule = {
    월요일: ["과학A", "한문", "국어", "체육", "수학", "창체"],
    화요일: ["체육", "영어", "국어", "과학B", "도덕", "스포츠", "수학"],
    수요일: ["영어", "수학", "국어", "역사", "과학A", "도덕"],
    목요일: ["과학A", "체육", "영어", "수학", "역사", "독서", "한문"],
    금요일: ["음악", "도덕", "역사", "영어", "미술", "미술"]
}

function scheduleCheck(message) {
    if(msg.indexOf("시간표") != 0) return;

    msg = msg.replace("요일", "").replace("교시", "");
    
    if(msg == "시간표") {
        let string = "";
        for(let key in schedule) {
            string += `${key}: ${schedule[key]}\n`;
        }
        message.channel.send({embeds:[new DiscordJS.MessageEmbed({
            color: f08080,
            title: "시간표",
            description: string,
        })]});
    }
    //시간표 (요일) (교시)
    else if(isNaN(Number(msg.split(" ")[1])) == true) {
        if(isNaN(Number(msg.split(" ")[2])) == false && schedule[msg.split(" ")[1] + "요일"][Number(msg.split(" ")[2]) - 1] != undefined) message.reply( schedule[msg.split(" ")[1] + "요일"][Number(msg.split(" ")[2]) - 1] );
        else if(isNaN(Number(msg.split(" ")[2])) == true) message.reply(`${schedule[msg.split(" ")[1] + "요일"] }`);
    }
    //시간표 (교시)
    else if(isNaN(Number(msg.split(" ")[1])) == false) {
        let now = new Date();
        let day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        let index = day[now.getDay()];
        if(now.getDay() == 0 || now.getDay() == 6) message.reply("오늘 학교 안 감");
        else if(schedule[index][Number(msg.split(" ")[1]) - 1] != undefined) message.reply( schedule[index][Number(msg.split(" ")[1]) - 1] )
    }

    varUpgrade(message);
}

//가르치기
function teach(message) {
    if(server[roomId] != undefined && server[roomId].teach[msg] != undefined) {
        message.channel.send(server[roomId].teach[msg]);
        return;
    }
    else if(msg.indexOf("명령어삭제 ") == 0) {
        let command = msg.replace("명령어삭제 ","");
        if(server[roomId] == undefined || server[roomId].teach[command] == undefined) {
            message.reply("그 명령어가 원래 없습니다");
            return;
        }
        delete server[roomId].teach[command];
        message.reply("ㅇㅋ 지웠음");
        serverSave();
        return;
    }
    else if(msg.replace(/ /g,"") == "명령어목록") {
        if(server[roomId] == undefined) message.reply("아직 이 방에는 명령어가 없습니다.");
        else {
            let string = "";
            for(let key in server[roomId].teach) {
                string += `ㆍ${key}: ${server[roomId].teach[key]}\n`;
            }
            message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                color: f08080,
                title: "명령어 목록",
                description: string
            })]})
        }
        return;
    }
    else if(msg.replace(/ /g,"") == "가르치기") {
        message.reply("```가르치기 (명령어) (대답)```으로 입력하세요.");
        return;
    }
    else if(msg.indexOf("가르치기 ") != 0) return;

    let command = msg.split(" ")[1];
    if(msg.split(" ")[2] == undefined) {
        message.reply("대답을 정해주세요.");
        return;
    }
    let reply = msg.replace(`가르치기 ${command} `,"");
    if(signed.indexOf(command) != -1) {
        message.reply("기존 준이봇 명령어는 가르칠 수 없습니다.");
        return;
    }
    if(reply == undefined) {
        message.reply("대답을 정해주세요.");
        return;
    }
    if(server[roomId] == undefined) serverSave(roomId);
    server[roomId].teach[command] = reply;
    message.reply(`지금부터 '${command}' 라고 말하면 '${reply}'라고 답합니다.`);
    serverSave();
}

//랜덤 설렉터
function randomSelector(message) {
    if(msg.indexOf("랜덤 ") != 0) return;
    msg = msg.replace("랜덤 ","").trim();
    let array = msg.split(" ");
    message.reply(array[random(array.length)]);
    varUpgrade(message);
}

//bullet game
const bulletObject: {
    [id: string]: {
        queue: any[],
        phase: string,
        index: number,
        user1: {
            id: string,
            name: string,
            score: number,
            character: string,
            health: number,
            bullet: number,
            skill: string[],
            dead: string[]
        },
        user2: {
            id: string,
            name: string,
            score: number,
            character: string,
            health: number,
            bullet: number,
            skill: string[],
            dead: string[]
        }
    }
} = {};

function bulletCheck() {
    let userData = {
        1: {
            character: bulletCharacter[bulletObject[roomId].user1.character],
            skill: bulletObject[roomId].user1.skill[bulletObject[roomId].index],
            damage: 0,
            bullet: bulletObject[roomId].user1.bullet
        },
        2: {
            character: bulletCharacter[bulletObject[roomId].user2.character],
            skill: bulletObject[roomId].user2.skill[bulletObject[roomId].index],
            damage: 0,
            bullet: bulletObject[roomId].user2.bullet
        }
    }

    //ult
    if(userData[1].skill == "u") {
        bulletObject[roomId].user1.skill[bulletObject[roomId].index] = "u";
        userData[1].skill = userData[1].character.ultType;
    }
    if(userData[2].skill == "u") {
        bulletObject[roomId].user2.skill[bulletObject[roomId].index] = "u";
        userData[2].skill = userData[2].character.ultType;
    }
    
    //defend 연속 3번일 경우 reload로
    if(bulletObject[roomId].index >= 2 && userData[1].skill == "d" && bulletObject[roomId].user1.skill[bulletObject[roomId].index - 1] == "d" && bulletObject[roomId].user1.skill[bulletObject[roomId].index - 2] == "d") {
        bulletObject[roomId].user1.skill[bulletObject[roomId].index] = "r";
        userData[1].skill = "r";
    }
    if(bulletObject[roomId].index >= 2 && userData[2].skill == "d" && bulletObject[roomId].user2.skill[bulletObject[roomId].index - 1] == "d" && bulletObject[roomId].user2.skill[bulletObject[roomId].index - 2] == "d") {
        bulletObject[roomId].user2.skill[bulletObject[roomId].index] = "r";
        userData[2].skill = "r";
    }

    //maxBullet 일 경우 reload를 fire로
    if(userData[1].skill == "r" && userData[1].bullet >= bulletCharacter[bulletObject[roomId].user1.character].bulletMax) {
        bulletObject[roomId].user1.skill[bulletObject[roomId].index] = "f";
        userData[1].skill = "f";
    }
    if(userData[2].skill == "r" && userData[2].bullet >= bulletCharacter[bulletObject[roomId].user2.character].bulletMax) {
        bulletObject[roomId].user2.skill[bulletObject[roomId].index] = "f";
        userData[2].skill = "f";
    }
    //1발 난사일 경우 spray를 fire로
    if(userData[1].skill == "s" && userData[1].bullet <= 1) {
        bulletObject[roomId].user1.skill[bulletObject[roomId].index] = "f";
        userData[1].skill = "f";
    }
    if(userData[2].skill == "s" && userData[2].bullet <= 1) {
        bulletObject[roomId].user2.skill[bulletObject[roomId].index] = "f";
        userData[2].skill = "f";
    }
    //0발 발사/난사일 경우 reload로
    if(userData[1].skill == "f" && userData[1].bullet == 0) {
        bulletObject[roomId].user1.skill[bulletObject[roomId].index] = "r";
        userData[1].skill = "r";
    }
    if(userData[2].skill == "f" && userData[2].bullet == 0) {
        bulletObject[roomId].user2.skill[bulletObject[roomId].index] = "r";
        userData[2].skill = "r";
    }

    //ult 예외
    if(bulletObject[roomId].user1.skill[bulletObject[roomId].index] == "u" && userData[1].skill != userData[1].character.ultType) {
        bulletObject[roomId].user1.skill[bulletObject[roomId].index] = userData[1].skill;
    }
    if(bulletObject[roomId].user2.skill[bulletObject[roomId].index] == "u" && userData[2].skill != userData[2].character.ultType) {
        bulletObject[roomId].user2.skill[bulletObject[roomId].index] = userData[2].skill;
    }

    //패시브전처리
    userData[1].character.passivePreCheck(userData, bulletObject, roomId, 1, 2);
    userData[2].character.passivePreCheck(userData, bulletObject, roomId, 2, 1);

    //reload
    if(userData[1].skill == "r") bulletObject[roomId].user1.bullet++;
    if(userData[2].skill == "r") bulletObject[roomId].user2.bullet++;
    //쏘는거
    if(userData[1].skill == "s" && userData[2].skill == "s") {
        userData[1].bullet > userData[2].bullet ? userData[2].damage += (userData[1].bullet - userData[2].bullet) : userData[1].damage += (userData[2].bullet - userData[1].bullet);
        bulletObject[roomId].user1.bullet = 0;
        bulletObject[roomId].user2.bullet = 0;
    }
    else if(userData[1].skill == "s") {
        bulletObject[roomId].user1.bullet = 0;
        if(userData[2].skill == "f") {
            bulletObject[roomId].user2.bullet--;
            userData[2].damage += (userData[1].bullet - 1);
        }
        else if(userData[2].skill == "r") userData[2].damage += userData[1].bullet;
    }
    else if(userData[2].skill == "s") {
        bulletObject[roomId].user2.bullet = 0;
        if(userData[1].skill == "f") {
            bulletObject[roomId].user1.bullet--;
            userData[1].damage += (userData[2].bullet - 1);
        }
        else if(userData[1].skill == "r") userData[1].damage += userData[2].bullet;
    }
    else {
        if(userData[1].skill == "f" && userData[2].skill == "f") {
            bulletObject[roomId].user1.bullet--;
            bulletObject[roomId].user2.bullet--;
            if(bulletObject[roomId].user1.health > 1 || bulletObject[roomId].user2.health > 1) {
                userData[1].damage++;
                userData[2].damage++;
            }
        }
        else if(userData[1].skill == "f") {
            bulletObject[roomId].user1.bullet--;
            userData[2].damage++;
        }
        else if(userData[2].skill == "f") {
            bulletObject[roomId].user2.bullet--;
            userData[1].damage++;
        }
    }
    //방어
    if(userData[1].skill == "d") userData[1].damage = 0;
    if(userData[2].skill == "d") userData[2].damage = 0;

    //ult 처리
    if(bulletObject[roomId].user1.skill[bulletObject[roomId].index] == "u") userData[1].character.ultCheck(userData, bulletObject, roomId, 1, 2);
    if(bulletObject[roomId].user2.skill[bulletObject[roomId].index] == "u") userData[2].character.ultCheck(userData, bulletObject, roomId, 2, 1);

    //패시브 후처리
    userData[1].character.passivePostCheck(userData, bulletObject, roomId, 1, 2);
    userData[2].character.passivePostCheck(userData, bulletObject, roomId, 2, 1);

    bulletObject[roomId].user1.health -= userData[1].damage;
    bulletObject[roomId].user2.health -= userData[2].damage;
}

function bulletGame(message, phase = "msg") {
    if(phase == "msg") {
        //사용자 총게임 참가
        if(msg.replace(/ /g, "") == "총게임참가") {
            if(bulletObject[roomId] == undefined) {
                bulletObject[roomId] = {
                    queue: [],
                    phase: "none",
                    index: 0,
                    user1: {
                        id: "",
                        name: "",
                        score: 0,
                        character: "권총잡이",
                        health: 3,
                        bullet: 2,
                        skill: [],
                        dead: []
                    },
                    user2: {
                        id: "",
                        name: "",
                        score: 0,
                        character: "권총잡이",
                        health: 3,
                        bullet: 2,
                        skill: [],
                        dead: []
                    }
                }
            }
            if(bulletObject[roomId].queue.findIndex(obj => obj.id == senderId) != -1) {
                message.reply("이미 대기열에 등록되었습니다.");
                return;
            }
            else if(user[senderId] == undefined || user[senderId].exp < 200) {
                message.reply("경험치 200 이상만 참여할 수 있습니다.");
                return;
            }
            bulletObject[roomId].queue.push({id: senderId, name: sender});
            if(bulletObject[roomId].queue.length == 2) {
                bulletObject[roomId].user1.id = bulletObject[roomId].queue[0].id;
                bulletObject[roomId].user1.name = bulletObject[roomId].queue[0].name;
                bulletObject[roomId].queue.shift();
                bulletObject[roomId].user2.id = bulletObject[roomId].queue[0].id;
                bulletObject[roomId].user2.name = bulletObject[roomId].queue[0].name;
                bulletObject[roomId].queue.shift();
                bulletObject[roomId].phase = "ready";
                bulletGame(message, "ready");
            }
            else {
                message.reply(`${sender}님이 총게임 대기열에 등록되었습니다.`);
            }
        }
        else if(msg.replace(/ /g, "") == "총게임취소") {
            if(bulletObject[roomId].queue.findIndex(obj => obj.id == senderId) != -1) {
                bulletObject[roomId].queue.splice(bulletObject[roomId].queue.findIndex(obj => obj.id == senderId), 1);
                message.reply(`${sender}님 대기열 취소 완료!`);
            }
            else {
                message.reply("대기열에 없습니다.");
            }
        }
        else if(msg.replace(/ /g, "") == "총게임규칙") {
            message.reply("```cs\n" + bulletRule + "\n```");
        }
        else if(msg.replace(/ /g, "") == "총게임규칙요약") {
            message.reply({embeds: [new DiscordJS.MessageEmbed({
                color: f08080,
                title: "총게임 규칙 (요약)",
                description: "장전: 총알 +1\n발사: 1발 쏨\n난사: 모든 총알 다 쏨\n방어: 총알 막음\n스킬: 캐릭터마다 다름"
            })]});
        }
        else if(msg.replace(/ /g, "") == "캐릭터목록") {
            let string = "";
            for(let character in bulletCharacter) {
                string += `${character}\nㆍ무기: ${bulletCharacter[character].gun}\nㆍ설명: ${bulletCharacter[character].description.info}\nㆍ기본 체력: ${bulletCharacter[character].health}\nㆍ기본 총알 수: ${bulletCharacter[character].bullet}\nㆍ최대 총알 수: ${bulletCharacter[character].bulletMax}\nㆍ패시브: ${bulletCharacter[character].description.passive}\nㆍ스킬 <${bulletCharacter[character].ultName}>: ${bulletCharacter[character].description.ult} (${bulletCharacter[character].ultType})\n\n`;
            }
            message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                color: f08080,
                title: "캐릭터 목록",
                description: string
            })]})
        }
        else if(bulletObject[roomId] == undefined) {
            return;
        }
        //사용자가 캐릭터 선택 시 반영
        else if(bulletObject[roomId].phase == "character" && (bulletObject[roomId].user1.id == senderId || bulletObject[roomId].user2.id == senderId)) {
            if(bulletCharacter[msg.replace(/ /g, "")] != undefined) {
                let character = msg.replace(/ /g, "");
                let userString = "";
                if(bulletObject[roomId].user1.id == senderId) {
                    userString = "user1";
                }
                else if(bulletObject[roomId].user2.id == senderId) {
                    userString = "user2";
                }
                else {
                    message.channel.send("버그 발생! 준이를 부르세요.");
                    return;
                }
                bulletObject[roomId][userString] = {
                    id: senderId,
                    name: sender,
                    score: 0,
                    character: character,
                    health: bulletCharacter[character].health,
                    bullet: bulletCharacter[character].bullet,
                    skill: [],
                    dead: []
                }
                message.reply("설정 되었습니다.");
            }
        }
        else if(bulletObject[roomId].phase == "game" && (bulletObject[roomId].user1.id == senderId || bulletObject[roomId].user2.id == senderId)) {
            let chosenArray = ["r", "f", "s", "d", "u"];
            let userString = "";
            if(bulletObject[roomId].user1.id == senderId) {
                userString = "user1";
            }
            else if(bulletObject[roomId].user2.id == senderId) {
                userString = "user2";
            }
            let chosen = msg.replace(/\|/g, "").replace(/ /g, "").replace("R", "r").replace("F", "f").replace("S", "s").replace("D", "d").replace("U", "u").replace("장전", "r").replace("발사", "f").replace("난사", "s").replace("방어", "d").replace("스킬", "u").replace("궁극기", "u").replace("궁", "u").replace(bulletCharacter[bulletObject[roomId][userString].character].ultName, "u");
            if(chosenArray.indexOf(chosen) == -1) return;
            message.delete();
            bulletObject[roomId][userString].skill[bulletObject[roomId].index] = chosen;
        }
    }
    //게임 시작 ui
    else if(phase == "ready") {
        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: "3",
            description: `초 뒤, 게임이 시작됩니다. <@!${bulletObject[roomId].user1.id}>, <@!${bulletObject[roomId].user2.id}>`
        })]}).then((message) => {
            let sec = 3;
            let timer = setInterval(() => {
                sec--;
                message.edit({embeds: [new DiscordJS.MessageEmbed({
                    color: f08080,
                    title: `${sec}`,
                    description: `초 뒤, 게임이 시작됩니다. <@!${bulletObject[roomId].user1.id}>, <@!${bulletObject[roomId].user2.id}>`
                })]})
                if(sec == 0) {
                    clearInterval(timer);
                    bulletObject[roomId].phase = "character";
                    bulletGame(message, "character");
                }
            }, 1000)
        })
    }
    //캐릭터 선택창 ui
    else if(phase == "character") {
        message.channel.send("-- 캐릭터 선택 --")
        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: "5",
            description: "초 뒤, 캐릭터 선택이 종료됩니다."
        })]}).then((message) => {
            let sec = 5;
            let timer = setInterval(() => {
                sec--;
                message.edit({embeds: [new DiscordJS.MessageEmbed({
                    color: f08080,
                    title: `${sec}`,
                    description: "초 뒤, 캐릭터 선택이 종료됩니다."
                })]})
                if(sec == 0) {
                    message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                        color: f08080,
                        title: "캐릭터 선택",
                        description: `${bulletObject[roomId].user1.name}님 캐릭터: ${bulletObject[roomId].user1.character}\n${bulletObject[roomId].user2.name}님 캐릭터: ${bulletObject[roomId].user2.character}`
                    })]})
                    clearInterval(timer);
                    bulletObject[roomId].phase = "game";
                    bulletGame(message, "game");
                }
            }, 1000)
        })
        message.channel.send("캐릭터를 선택해주세요. ('캐릭터 목록'이라고 말하여 캐릭터 목록을 볼 수 있습니다.)");
    }
    else if(phase == "game") {
        let gameLoop = () => {
            let score1 = bulletObject[roomId].user1.score;
            let score2 = bulletObject[roomId].user2.score;
            if(score1 > score2) {
                message.channel.send(`<@!${bulletObject[roomId].user1.id}>님이 이기고 있습니다.`)
            }
            else if(score1 < score2) {
                message.channel.send(`<@!${bulletObject[roomId].user2.id}>님이 이기고 있습니다.`)
            }

            bulletObject[roomId].user1.health = bulletCharacter[bulletObject[roomId].user1.character].health;
            bulletObject[roomId].user1.bullet = bulletCharacter[bulletObject[roomId].user1.character].bullet;
            bulletObject[roomId].user2.health = bulletCharacter[bulletObject[roomId].user2.character].health;
            bulletObject[roomId].user2.bullet = bulletCharacter[bulletObject[roomId].user2.character].bullet;

            message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                color: f08080,
                title: "기본 스탯",
                description: `${bulletObject[roomId].user1.name}님 HP: ${bulletObject[roomId].user1.health}\n${bulletObject[roomId].user1.name}님 총알: ${bulletObject[roomId].user1.bullet}\n${bulletObject[roomId].user2.name}님 HP: ${bulletObject[roomId].user2.health}\n${bulletObject[roomId].user2.name}님 총알: ${bulletObject[roomId].user2.bullet}`
            })]})

            
            let game = () => {
                bulletObject[roomId].user1.skill[bulletObject[roomId].index] = "r";
                bulletObject[roomId].user2.skill[bulletObject[roomId].index] = "r";

                message.channel.send("10초 내로 \\|\\|장전\\|\\|, \\|\\|발사\\|\\|, \\|\\|난사\\|\\|, \\|\\|방어\\|\\|, \\|\\|스킬\\|\\| 중 하나를 보내세요.").then((message) => {
                    let sec = 10;
                    let timer = setInterval(() => {
                        sec--;
                        if(sec == 3) message.channel.send("3초 남았습니다.");
                        else if(sec == 0) {
                            bulletCheck();
                            clearInterval(timer);
                            message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                                color: f08080,
                                title: `${bulletObject[roomId].user1.name}님: ${bulletObject[roomId].user1.skill[bulletObject[roomId].index].replace("r", "장전").replace("f", "발사").replace("s", "난사").replace("d", "방어").replace("u", bulletCharacter[bulletObject[roomId].user1.character].ultName)}\n${bulletObject[roomId].user2.name}님: ${bulletObject[roomId].user2.skill[bulletObject[roomId].index].replace("r", "장전").replace("f", "발사").replace("s", "난사").replace("d", "방어").replace("u", bulletCharacter[bulletObject[roomId].user2.character].ultName)}`,
                                description: `${bulletObject[roomId].user1.name}님 HP: ${bulletObject[roomId].user1.health}\n${bulletObject[roomId].user1.name}님 총알: ${bulletObject[roomId].user1.bullet}\n${bulletObject[roomId].user2.name}님 HP: ${bulletObject[roomId].user2.health}\n${bulletObject[roomId].user2.name}님 총알: ${bulletObject[roomId].user2.bullet}`
                            })]})
                            if(bulletObject[roomId].user1.health <= 0 || bulletObject[roomId].user2.health <= 0) {
                                if(bulletObject[roomId].user1.health <= 0) {
                                    score2++;
                                    bulletObject[roomId].user2.score = score2;
                                }
                                else {
                                    score1++;
                                    bulletObject[roomId].user1.score = score1;
                                }
                                if(score1 < 3 && score2 < 3){
                                    message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                                        color: f08080,
                                        title: `${bulletObject[roomId].user1.score} : ${bulletObject[roomId].user2.score}`,
                                        description: "5판 3선제입니다."
                                    })]}).then((message) => {
                                        bulletObject[roomId].index++;
                                        gameLoop();
                                    })
                                }
                                else {
                                    message.channel.send({embeds: [new DiscordJS.MessageEmbed({
                                        color: f08080,
                                        title: `${bulletObject[roomId].user1.score} : ${bulletObject[roomId].user2.score}`,
                                        description: "gg"
                                    })]})
                                    bulletObject[roomId].phase = "result";
                                    bulletGame(message, "result");
                                }
                            }
                            else {
                                game();
                            }
                        }
                    }, 1000)
                })
            }
            game();
        }
        gameLoop();
        
    }
    else if(phase == "result") {
        let score1 = bulletObject[roomId].user1.score;
        let score2 = bulletObject[roomId].user2.score;
        let winner;
        let winnerName;
        let loser;
        if(score1 > score2) {
            winner = bulletObject[roomId].user1.id;
            winnerName = bulletObject[roomId].user1.name;
            loser = bulletObject[roomId].user2.id;
        }
        else {
            winner = bulletObject[roomId].user2.id;
            winnerName = bulletObject[roomId].user2.name;
            loser = bulletObject[roomId].user1.id;
        }
        addExp(winner, 500, "총게임");
        addExp(loser, -200, "총게임");
        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: `${winnerName}님 승리!`,
            description: `<@!${winner}>님 경험치 +200!\n<@!${loser}>님 경험치 -50 ㅠㅠ`
        })]})
        bulletObject[roomId] = {
            queue: [],
            phase: "none",
            index: 0,
            user1: {
                id: "",
                name: "",
                score: 0,
                character: "권총잡이",
                health: 3,
                bullet: 2,
                skill: [],
                dead: []
            },
            user2: {
                id: "",
                name: "",
                score: 0,
                character: "권총잡이",
                health: 3,
                bullet: 2,
                skill: [],
                dead: []
            }
        }
    }
}

//잡다한 기능
function etc(message) {
    if(msg == "사랑해") {
        message.react("❤");
    }
    else if(msg.replace(/ /g, "") == "개발자정보") {
        message.channel.send({embeds: [new DiscordJS.MessageEmbed({
            color: f08080,
            title: "준이",
            url: "http://www.juneekim7.kro.kr",
            description: "가 만들었다능"
        })]})
    }
    else if(senderId == "531110549631533057" && msg.indexOf("eval:") == 0) {
        eval(msg.replace("eval:", ""));
    }
    else if(msg.replace(/ /g, "") == "내이름" || msg.replace(/ /g, "") == "내이름보기" || msg.replace(/ /g, "") == "내이름이뭐야" || msg.replace(/ /g, "") == "내이름이뭐야?") {
        message.reply(sender);
    }
    else if(msg.replace(/ /g, "") == "내아이디" || msg.replace(/ /g, "") == "내아이디보기" || msg.replace(/ /g, "") == "내아이디가뭐야" || msg.replace(/ /g, "") == "내아이디가뭐야?") {
        message.reply(senderId);
    }
    else if(msg.replace(/ /g, "") == "내태그" || msg.replace(/ /g, "") == "내태그보기" || msg.replace(/ /g, "") == "내태그가뭐야" || msg.replace(/ /g, "") == "내태그가뭐야?") {
        message.reply(senderTag);
    }
    else if(msg.indexOf("삭제 ") == 0) {
        message.reply("3초만 기다려");
        setTimeout( () => {
            message.delete();
        },3000);
    }
    else if(msg == "삭제") {
        message.delete();
    }
    else if(msg == "어쩔티비") {
        let randNum = random(5);
        if(randNum < 3) message.reply("어쩔냉장고");
        else if(randNum == 3) message.reply("어쩔전자레인지");
        else if(randNum == 4) message.reply("저쩔티비");
    }
}


//bot 실행
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.on("ready", () => {
    console.log("I M READY");
})

client.on("messageCreate", (message) => {
    if(message.author.bot == true || message.content.indexOf("undefined") != -1) return;
    if(message.guild?.me?.permissions.has("ADMINISTRATOR") != true) return;
    varUpgrade(message);

    if(msg == "준이봇") {
        message.reply("ㅎㅇ\n'도움말'이라고 말하셈");
        message.react("😊");
    }
    else if(msg == "도움말") {
        message.channel.send({embeds: [help]});
        message.react("😀");
    }
    else if(msg.replace(/ /g,"") == "준이봇코드") {
        message.channel.send({files: [code]});
    }
    else if(msg.replace(/ /g,"") == "준이봇추가" || msg.replace(/ /g,"") == "준이봇초대") {
        message.reply("https://discord.com/api/oauth2/authorize?client_id=788969749412577300&permissions=8&scope=bot%20applications.commands");
    }

    exp(message);
    attendence(message);
    speach(message);
    rsp(message);
    chamchamcham(message);
    scheduleCheck(message);
    teach(message);
    randomSelector(message);
    bulletGame(message);
    etc(message);
})

client.login(process.env.TOKEN);