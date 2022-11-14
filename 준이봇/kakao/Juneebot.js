const made_by = "Junee";
const assist_by = ["yh__.29", "dabin", "cloud723"];
const blank = "\u200b".repeat(500);

const HELP = FileStream.read("sdcard/Bots/files/help.txt");
const CODE = FileStream.read("sdcard/Bots/Juneebot/Juneebot.js");
const QUOTE = FileStream.read("sdcard/Bots/files/quote.txt");
const SEASON = Number(FileStream.read("sdcard/Bots/files/season.txt"));

const signed = ["준이봇", "도움말", "준이봇코드", "준이봇추가", "준이봇초대", "준이봇테스트", "공지", "이벤트", "로그인", "후원", "로그아웃", "회원가입", "비번변경", "ㅊㅊ", "출첵", "ㅊㅊ순위", "출첵순위", "ㅊㅊ랭킹", "출첵랭킹", "명언", "내명언", "내경험치보기", "내경험치", "경험치", "경험치순위", "경험치랭킹", "경험치선물", "내아이템보기", "내아이템", "아이템", "아이템선물", "시세", "시세보기", "시세확인", "시세목록", "아이템시세", "아이템가격", "예약", "랜덤", "가위바위보", "경험치내놔", "참참참", "계산", "계산게임", "연산게임", "계산게임시작", "연산게임시작", "계산게임끝", "연산게임끝", "계산게임종료", "연산게임종료", "가르치기", "명령어삭제", "명령어목록", "내이름", "내이름보기", "내이름이뭐야", "내이름이뭐야?", "공백", "엄청난", "개발자정보", "개발자문의"];

//파일 로드
const data = {
    login: JSON.parse(FileStream.read("sdcard/Bots/files/login.json")),
    user: JSON.parse(FileStream.read("sdcard/Bots/files/user.json")),
    room: JSON.parse(FileStream.read("sdcard/Bots/files/room.json"))
};
FileStream.write("sdcard/Bots/files/user backup.json", JSON.stringify(data.user, null, 4));

//functions
//기본
function random(n1, n2 = 0) {
    return n1 < n2 ? Math.floor(Math.random() * (n2 - n1)) + n1 : Math.floor(Math.random() * (n1 - n2)) + n2;
}

function objToEntries(obj) {
    let array = new Array();
    for(let key in obj) {
        array.push([key, obj[key]]);
    }
    return array;
}

function entriesToObj(array) {
    let obj = new Object();
    for(let ent of array) {
        obj[ent[0]] = ent[1];
    }
    return obj;
}

function checkMsg(msg, array) {
    msg = msg.replace(/ /g, "");
    if(typeof(array) == "string") array = [array];
    for(let check of array) {
        if(msg == check) return true;
    }
    return false;
}

//user
function userSave(sender = false, key = "none", value = "") {
    if(sender !== false && data.user[sender] === undefined) {
        data.user[sender] = {
            password: false,
            exp: 0,
            speach: "",
            item: {}
        }
    }
    if(sender !== false && key != "none") {
        if(key == "exp") data.user[sender].exp += value;
        else if(key == "item") data.user[sender].item[value[0]] === undefined ? data.user[sender].item[value[0]] = value[1] : data.user[sender].item[value[0]] += value[1];
        else data.user[sender][key] = value;
    }
    data.user = entriesToObj( objToEntries(data.user).sort((user1, user2) => (user2[1].exp - user1[1].exp)) );
    FileStream.write("sdcard/Bots/files/user.json", JSON.stringify(data.user, null, 4));
    return true;
}

//room
function roomSave(room = "none") {
    if(room != "none" && data.room[room] === undefined) {
        data.room[room] = {
            teach: {},
            attendence: []
        }
    }
    FileStream.write("sdcard/Bots/files/room.json", JSON.stringify(data.room, null, 4));
    return true;
}

//경험치
function addExp(sender, value, reason = "") {
    userSave(sender, "exp", value);
    Log.info(`[경험치] ${sender}: ${value} (${reason})`);
}

function exp(msg, sender, replier) {
    if(checkMsg(msg, ["내경험치보기", "내경험치"])) {
        if(data.user[sender] === undefined) userSave(sender);
        replier.reply(`${sender}님 경험치: ${data.user[sender].exp}`);
    }
    else if(checkMsg(msg, ["경험치순위", "경험치랭킹"])) {
        let ranking =  objToEntries(data.user).sort((user1, user2) => (user2[1].exp - user1[1].exp));
        let string = "";
        for(let i = 0; i < ranking.length; i++) {
            if(ranking[i][1].exp == 0) break;
            string += `\n${(i + 1)}위) ${ranking[i][0]}님: ${ranking[i][1].exp}\n`;
        }
        replier.reply(`💙 시즌 ${SEASON} 경험치 순위 💙\n${blank}${string}`);
    }
}

//아이템
function addItem(sender, value, reason = "") {
    userSave(sender, "item", value);
    Log.info(`[아이템] ${sender}: ${value[0]} ×${value[1]} (${reason})`);
}

function deleteItem(sender, value, reason = "") {
    if(data.user[sender].item[value[0]] < value[1]) return false;
    else if(data.user[sender].item[value[0]] == value[1]) delete data.user[sender].item[value[0]];
    else data.user[sender].item[value[0]] -= value[1];
    userSave(sender);
    Log.info(`[아이템 삭제] ${sender}: ${value[0]} ×${value[1]} (${reason})`);
}

function item(msg, sender, replier) {
    if(checkMsg(msg, ["내아이템보기", "내아이템"])) {
        if(data.user[sender] === undefined) {
            userSave(sender);
            replier.reply(`${sender}님 아이템: 없음`);
            return;
        }
        else if(data.user[sender].item == {}) {
            replier.reply(`${sender}님 아이템: 없음`);
            return;
        }
        let string = `${sender}님 아이템\n`;
        for(let key in data.user[sender].item) {
            string += `\n${key} ×${data.user[sender].item[key]}`;
        }
        replier.reply(string);
    }
}

//시즌 초기화
function resetSeason() {
    let now = new Date();
    if(SEASON % 12 != now.getMonth() + 1) {
        let ranking =  objToEntries(data.user).sort((user1, user2) => (user2[1].exp - user1[1].exp));
        addItem(ranking[0][0], ["금메달", 1], "시즌 초기화");
        addItem(ranking[1][0], ["은메달", 1], "시즌 초기화");
        addItem(ranking[2][0], ["동메달", 1], "시즌 초기화");
        for(let i = 0; i < ranking.length; i++) {
            if(Number(ranking[i][1].exp).length >= 4) {
                addItem(ranking[i][0], [`${Number(ranking[i][1].exp).length}자리 경험치`, 1], "시즌 초기화");
            }
            else if(ranking[i][1].exp == 0) break;
            addItem(ranking[i][0], [`시즌 ${SEASON} 유저증`, 1], "시즌 초기화");
        }
        SEASON++;
        FileStream.write("sdcard/Bots/files/season.txt", String(SEASON));
        for(let obj in data.user) {
            obj.exp = String(obj.exp).length >= 3 ? Math.floor(obj.exp/2) : 0;
        }
        userSave();
    }
}

//login
function login(msg, sender, replier, isGroupChat) {
    if(checkMsg(msg, ["로그인", "회원가입"]) || msg.startsWith("회원가입 ")) {
        replier.reply("로그인 (아이디) (비번)으로 입력하세요. 회원가입은 안해도 됩니다.");
    }
    if(msg.startsWith("로그인 ")) {
        if(isGroupChat) {
            replier.reply("로그인은 갠톡에서만 가능합니다.");
            if(data.login[sender] !== undefined) return data.login[sender];
            return sender;
        }

        let id = msg.split(" ")[1];
        let password = msg.split(" ")[2];

        if(id === undefined || id == "" || id == " ") {
            replier.reply("아이디를 입력해주세요.");
        }
        else if(password === undefined || password == "" || password == " ") {
            replier.reply("비밀번호를 입력해주세요.");
        }
        else if(data.user[id] !== undefined && data.user[id].password !== false) {
            if(data.user[id].password != password) {
                replier.reply("비밀번호가 틀립니다.");
            }
            else if(data.login[sender] == id) {
                replier.reply("이미 로그인 되었습니다.");
            }
            else {
                data.login[sender] = id;
                FileStream.write("sdcard/Bots/files/login.json", JSON.stringify(data.login, null, 4));
                replier.reply("로그인 성공!");
                return id;
            }
        }
        else if(data.user[id] === undefined) {
            userSave(id, "password", password);
            data.login[sender] = id;
            FileStream.write("sdcard/Bots/files/login.json", JSON.stringify(data.login, null, 4));
            replier.reply(`아이디: ${id}\n비번: ${password}\n\n로그인 되었습니다.`);
            replier.reply("*계정 사칭, 공동 계정 생성 등은 영구정지 대상입니다.");
            return id;
        }
        else if(data.user[id] !== undefined && data.user[id].password === false) {
            replier.reply(`이미 게스트 계정이 있습니다. 만약 본인이 ${id}라면 톡디 juneekim7로 문의 주세요.`);
        }
    }
    else if(checkMsg(msg, "로그아웃")) {
        if(data.login[sender] === undefined) {
            replier.reply("이미 로그아웃 되어있습니다.");
        }
        else {
            delete data.login[sender];
            FileStream.write("sdcard/Bots/files/login.json", JSON.stringify(data.login, null, 4));
            replier.reply("로그아웃 성공!");
        }
    }
    else if(msg.startsWith("비번변경 ")) {
        if(isGroupChat) {
            replier.reply("계정 비번은 갠톡에서만 바꿀 수 있습니다.");
            if(data.login[sender] !== undefined) return data.login[sender];
            return sender;
        }

        let id = msg.split(" ")[1];
        let password = msg.split(" ")[2];
        let newPassword = msg.split(" ")[3];

        if(id === undefined || id == "") {
            replier.reply("아이디를 입력해주세요.");
        }
        else if(password === undefined || password == "") {
            replier.reply("기존 비밀번호를 입력해주세요.");
        }
        else if(newPassword === undefined || newPassword == "") {
            replier.reply("비밀번호를 입력해주세요.");
        }
        else if(data.user[id] === undefined || data.user[id].password === false) {
            replier.reply("아이디가 잘못되었습니다.");
        }
        else if(data.user[id].password != password) {
            replier.reply("기존 비밀번호가 틀립니다.");
        }
        else {
            if(newPassword === undefined || newPassword == "" || newPassword == " ") {
                replier.reply("새 비밀번호를 입력해주세요.");
            }
            else {
                userSave(id, "password", newPassword);
                replier.reply("비밀번호가 변경되었습니다.");
            }
        }
    }
    if(data.login[sender] !== undefined) return data.login[sender];
    return sender;
}

//선물
function present(msg, sender, replier, isGroupChat) {
    if(msg.startsWith("경험치선물 ") || msg.startsWith("아이템선물 ") || msg.startsWith("경험치 선물 ") || msg.startsWith("아이템 선물 ")) {
        if(isGroupChat) {
            replier.reply("선물하기는 갠톡에서만 가능합니다.");
            return;
        }
        msg = msg.replace("경험치 선물 ", "경험치선물 ").replace("아이템 선물 ", "아이템선물 ");
        let type = msg.startsWith("경험치선물 ") ? "exp" : "item";
        //to give (num) password
        msg = msg.split(" ");
        let to = msg[1];
        let num = type == "exp" ? "" : msg[msg.length - 2];
        let password = type == "exp" ? msg[3] : msg[msg.length - 1];
        let give = type == "exp" ? msg[2] : msg.join(" ").replace("아이템선물", "").replace(to, "").replace(num, "").replace(password, "").trim();
        if(data.user[sender] === undefined) {
            userSave(sender);
        }
        if(password === undefined || password == "") {
            replier.reply("비밀번호를 입력해주세요.");
        }
        else if(data.user[sender].password === false) {
            replier.reply("로그인을 해야 사용할 수 있는 기능입니다.");
        }
        else if(data.user[sender] !== undefined) {
            if(data.user[sender].password != password) {
                replier.reply("비밀번호가 틀립니다.");
            }
            else {
                if(type == "exp") {
                    give = Number(give);
                    if(Number.isInteger(give) && give > 0) {
                        if(give > data.user[sender].exp) {
                            replier.reply("그만큼의 경험치가 없습니다.");
                        }
                        else if(data.user[to] === undefined) {
                            replier.reply("그 사람이 존재하지 않습니다.");
                        }
                        else {
                            replier.reply("선물주기 완료!");
                            addExp(sender, -1 * give, "선물 줌");
                            addExp(to, give, "선물 받음");
                        }
                    }
                    else {
                        replier.reply("경험치는 자연수만 선물할 수 있습니다.");
                    }
                }
                else if(type == "item") {
                    num = Number(num);
                    if(data.user[sender].item[give] === undefined || data.user[sender].item[give] < num) {
                        replier.reply("그 아이템이 없습니다. (띄어쓰기가 있는 아이템의 경우 띄어쓰기도 포함해 주세요.)");
                    }
                    else if(Number.isInteger(num) == false || num < 0)  {
                        replier.reply("정수 개수만 선물할 수 있습니다.");
                    }
                    else if(data.user[to] === undefined) {
                        replier.reply("그 사람이 존재하지 않습니다.");
                    }
                    else {
                        replier.reply("선물주기 완료!");
                        deleteItem(sender, [give, num], "선물 줌");
                        addItem(to, [give, num], "선물 받음");
                    }
                }
            }
        }
    }
}

//이벤트
function checkEvent(room, sender) {
    let now = new Date();
    let check = `${now.getMonth() + 1}/${now.getDate()}`;
    if(check == "1/27" || check == "1/28" || check == "1/29" || check == "1/30" || check == "1/31") {
        return "🔥준이봇 이벤트🔥\n\n-보상-\n1등: 경험치 20000\n2등: 경험치 10000\n3등: 경험치 5000\n4등: 경험치 4000\n\n-참여방법-\n톡디 jmso로 갠톡\n\n-카톡 양식-\n이름:\n아이디:\n현재경험치:\n아무말(필수):\n\n※이벤트는 2월 1일까지 진행합니다.";
    }
    else if(check == "2/1") {
        return "🌟시즌 2 시작!🌟\n\nㆍ각자의 경험치가 50%로 감소했습니다.\nㆍ경험치 순위 1~3등은 아이템 '금메달', '은메달', '동메달'을 획득하였습니다.\nㆍ아이템'시즌 1 유저증'이 발급되었습니다.";
    }
    else {
        return false;
    }
}

//출첵
function attendence(room, msg, sender, replier, isGroupChat) {
    if(isGroupChat == false) {
        if(checkMsg(msg, ["ㅊㅊ", "출첵"])) replier.reply("출첵은 단톡에서만 가능합니다.");
        return;
    }
    if(checkMsg(msg, ["ㅊㅊ", "출첵"])) {
        let now = new Date();
        if(data.room[room] == undefined) roomSave(room);
        if(now.getDate() != data.room.today) {
            data.room.today = now.getDate();
            for(let key in data.room) {
                if(key == "today") continue;
                data.room[key].attendence = new Array();
            }
            roomSave();
        }
        if(data.room[room].attendence.findIndex((obj) => obj["sender"] == sender) != -1) {
            replier.reply("이미 출첵을 했습니다.");
            return;
        }
        data.room[room].attendence.push({
            sender: sender,
            time: `${now.getHours()}:${now.getMinutes()}`
        })
        roomSave();
        if(data.room[room].attendence.length == 1) {
            replier.reply(`${sender}님 출첵 완료!\n1등ㄷㄷ 경험치 +500!!`);
            addExp(sender, 500, "출첵");
            if(checkEvent(room, sender) != false) setTimeout(() => {replier.reply(checkEvent(room, sender))}, 30000);
        }
        else if(data.room[room].attendence.length == 2) {
            replier.reply(`${sender}님 출첵 완료!\n2등ㄲㅂ 경험치 +200!!`);
            addExp(sender, 200, "출첵");
        }
        else if(data.room[room].attendence.length == 3) {
            replier.reply(`${sender}님 출첵 완료!\n3등ㅠㅠ 경험치 +100!!`);
            addExp(sender, 100, "출첵");
        }
        else {
            replier.reply(`${sender}님 출첵 완료!\n경험치 +50!!`);
            addExp(sender, 50, "출첵");
        }
    }
    else if(checkMsg(msg, ["ㅊㅊ순위", "출첵순위", "ㅊㅊ랭킹", "출첵랭킹"])) {
        let now = new Date();
        if(now.getDate() != data.room.today) {
            data.room.today = now.getDate();
            for(let key in data.room) {
                data.room[key].attendence = new Array();
            }
            roomSave();
        }
        let string = "";
        for(let key in data.room[room].attendence) {
            let obj = data.room[room].attendence[key];
            string += `\n${Number(key) + 1}위) ${obj.sender}님: ${obj.time.split(":")[0]}시 ${obj.time.split(":")[1]}분\n`;
        }
        replier.reply(`${now.getMonth() + 1}/${now.getDate()} 출첵 순위 😆\n${blank} ${string == "" ? "아직 출첵한 사람이 없습니다." : string}`);

    }
}

//명언
function speach(msg, sender, replier) {
    if(checkMsg(msg, "내명언")) {
        if(data.user[sender] === undefined) userSave(sender);
        if(data.user[sender].speach == "") replier.reply("아직 명언이 없습니다.");
        else {
            replier.reply(`"${data.user[sender].speach}"\n-${sender}-`);
        }
    }
    else if(msg.startsWith("명언 ")) {
        msg = msg.replace("명언 ", "");
        userSave(sender, "speach", msg);
        replier.reply(`${sender}님의 명언 설정 완료!`);
    }
    else if(checkMsg(msg, "명언")) {
        let index;
        do{ 
            index = random(Object.keys(data.user).length);
        } while(data.user[ Object.keys(data.user)[index] ].speach == "")

        index = Object.keys(data.user)[index];

        replier.reply(`"${data.user[index].speach}"\n-${index}-`)
    }
}

//가위바위보
function rsp(msg, sender, replier) {
    if(msg == "가위바위보") {
        replier.reply("'가위바위보 가위, 가위바위보 바위, 가위바위보 보'\n셋 중에 하나로 보내");
        return;
    }
    else if(msg.startsWith("가위바위보 ")) {
        let rspArray = ["가위", "바위", "보"];
        let rspCounter = ["바위", "보", "가위"];

        let rspUser = msg.replace("가위바위보 ", "").replace(/ /g, "").replace("찌", "가위").replace("묵", "바위").replace("주먹", "바위").replace("빠", "보").replace("보자기", "보");
        let rspBotIndex = random(3);
        let rspBot = rspArray[rspBotIndex];

        if(rspArray.indexOf(rspUser) == -1) {
            replier.reply("'가위바위보 가위, 가위바위보 바위, 가위바위보 보'\n셋 중에 하나로 보내");
            return;
        }
        replier.reply(`${sender}님: ${rspUser}\n준이봇: ${rspBot}`);
        let rspIndex = rspArray.indexOf(rspUser);
        if(rspUser == rspBot) {
            replier.reply("비겼넹..\n한 판 더 ㄱㄱ");
        }
        else if(rspCounter[rspIndex] == rspBot) {
            replier.reply("아싸 이겼당 ㅎㅎ");
        }
        else if(rspCounter[rspBotIndex] == rspUser) {
            replier.reply("내가 졌네 ㅡㅡ\n경험치 25 드림");
            addExp(sender, 25, "가위바위보");
        }
    }
}

//참참참
function chamchamcham(msg, sender, replier) {
    if(msg == "참참참") {
        replier.reply("'참참참 왼쪽, 참참참 오른쪽, 참참참 위, 참참참 아래'\n넷 중에 하나로 보내");
        return;
    }
    else if(msg.startsWith("참참참 ")) {
        let chamArray = ["왼쪽", "오른쪽", "위", "아래"];
        let chamUser = msg.replace("참참참 ","").replace("왼쪽", "왼").replace("오른쪽", "오").replace("왼", "왼쪽").replace("오", "오른쪽").replace("위쪽", "위").replace("아래쪽", "아래").replace("L", "왼쪽").replace("l", "왼쪽").replace("R", "오른쪽").replace("r", "오른쪽").replace("U", "위").replace("u", "위").replace("D", "아래").replace("d", "아래");
        let chamBot = chamArray[random(4)];

        if(chamArray.indexOf(chamUser) == -1) {
            replier.reply("'참참참 왼쪽, 참참참 오른쪽, 참참참 위, 참참참 아래'\n넷 중에 하나로 보내");
            return;
        }
        replier.reply(`${sender}님: ${chamUser}\n준이봇: ${chamBot}`);
        if(chamUser == chamBot) {
            replier.reply("힝 내가 졌당 ㅠㅠ\n경험치 30 줄게..");
            addExp(sender, 30, "참참참");
            if(random(7) == 0) {
                replier.reply("축하합니다!\n준이봇의 눈물 ×1 획득!");
                addItem(sender, ["준이봇의 눈물", 1], "참참참");
            }
        }
        else {
            replier.reply("쉽네 ㅎ");
        }
    }
}

//계산게임
const calcObj = new Object();

function calc(msg) {
    msg = msg.replace(/ /g, "").replace("계산", "").replace(/×/g, "*").replace(/x/g, "*").replace(/÷/g, "/");
    if(isNaN(Number(msg)) == false) return "";
    let check = msg.replace(/\+/g, "").replace(/-/g, "").replace(/\*/g, "").replace(/\//g, "");
    if(isNaN(Number(msg[0])) || isNaN(Number(msg[msg.length-1]))) return "";
    else if(isNaN(Number(check)) || check == "") return "";
    return eval(msg);
}

function genCalcGame(room) {
    let string;
    do {
        string = "";
        let num = [String(random(1, 10)), String(random(1, 10)), String(random(1, 10))];
        let symbol = ["+", "-", "×"];
        symbol = [symbol[random(3)], symbol[random(3)], ""];
        for(let i = 0; i < 3; i++) {
            string += `${num[i]} ${symbol[i]} `;
        }
    } while(calc(string) <= 0)
    string = string.trim();
    calcObj[room] = calc(string);
    return string;
}

function calcGame(room, msg, sender, replier, isGroupChat) {
    if(checkMsg(msg, ["계산게임", "연산게임", "계산게임시작", "연산게임시작"])) {
        replier.reply(`${genCalcGame(room)} = ?\n문제의 답을 입력해주세요!`);
    }
    else if(msg == calcObj[room]) {
        delete calcObj[room];
        addExp(sender, 100, "계산게임");
        replier.reply(`${sender}님 정답!\n경험치 100 획득!`);
        replier.reply(`${genCalcGame(room)} = ?\n문제의 답을 입력해주세요!`);
    }
    else if(checkMsg(msg, ["계산게임끝", "연산게임끝", "계산게임종료", "연산게임종료"])) {
        delete calcObj[room];
        replier.reply("게임이 종료되었습니다.");
    }
    else replier.reply(calc(msg));
}

//가르치기
function teach(room, msg, sender, replier) {
    if(data.room[room] !== undefined && data.room[room].teach[msg] !== undefined) {
        replier.reply(data.room[room].teach[msg]);
        return;
    }
    else if(msg.startsWith("명령어삭제 ")) {
        let command = msg.replace("명령어삭제 ","");
        if(data.room[room] === undefined || data.room[room].teach[command] === undefined) {
            replier.reply("그 명령어가 원래 없습니다");
            return;
        }
        delete data.room[room].teach[command];
        replier.reply("ㅇㅋ 지웠음");
        roomSave();
        return;
    }
    else if(checkMsg(msg, "명령어목록")) {
        if(data.room[room] === undefined) replier.reply("아직 이 방에는 명령어가 없습니다.");
        else {
            let string = "";
            for(let key in data.room[room].teach) {
                string += `\nㆍ${key}: ${data.room[room].teach[key]}\n`;
            }
            replier.reply(`명령어 목록\n${blank}${string}`);
        }
        return;
    }
    else if(checkMsg(msg, "가르치기")) {
        replier.reply("'가르치기 (명령어) (대답)'으로 입력하세요.");
        return;
    }
    else if(msg.startsWith("가르치기 ")) {
        let command = msg.split(" ")[1];
        if(msg.split(" ")[2] == undefined) {
            replier.reply("대답을 정해주세요.");
            return;
        }
        let reply = msg.replace(`가르치기 ${command} `,"");
        if(signed.indexOf(command) != -1) {
            replier.reply("기존 준이봇 명령어는 가르칠 수 없습니다.");
            return;
        }
        if(reply === undefined) {
            replier.reply("대답을 정해주세요.");
            return;
        }
        if(data.room[room] === undefined) roomSave(room);
        data.room[room].teach[command] = reply;
        replier.reply(`지금부터 '${command}' 라고 말하면 '${reply}'라고 답합니다.`);
        roomSave(); 
    }
}

//랜덤 설렉터
function randomSelector(msg, replier) {
    if(msg.startsWith("랜덤 ") == false) return false;
    msg = msg.replace("랜덤 ","").trim();
    let obj = msg.split(" ");
    replier.reply(obj[random(obj.length)]);
}

//잡다한 기능
function etc(room, msg, sender, replier) {
    if(checkMsg(msg, "준이봇테스트")) {
        replier.reply("https://open.kakao.com/o/ggXCMYTd");
    }
    else if(checkMsg(msg, ["준이봇추가", "준이봇초대", "개발자문의"])) {
        replier.reply("톡디 juneekim7로 문의 ㄱㄱ");
    }
    else if(checkMsg(msg, "후원")) {
        replier.reply("이름: 김준이\n\n1002559046993 우리\n7777020734464 카카오뱅크");
    }
    else if(checkMsg(msg, ["시세", "시세목록", "시세보기", "시세확인", "아이템시세", "아이템가격"])) {
        replier.reply(`🥭아이템 시세🥭\n${blank}\n${QUOTE}`);
    }
    else if(checkMsg(msg, "개발자정보")) {
        replier.reply("www.juneekim7.kro.kr");
    }
    else if(checkMsg(msg, ["내이름", "내이름보기", "내이름이뭐야", "내이름이뭐야?"])) {
        replier.reply(sender);
    }
    else if(checkMsg(msg, "공백")) {
        replier.reply("\u200d");
    }
    else if(msg.startsWith("엄청난 ") && msg.length <= 7) {
        let string = msg.replace("엄청난 ", "").replace(/ /g, "");
        for(let char of string) {
            replier.reply(`${char}\u200d`);
        }
    }
    else if(checkMsg(msg, "경험치내놔")) {
        addExp(sender, 1, "내놔")
        replier.reply("ㅇㅋ 1드림");
    }
}


//bot 실행
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    replier.reply("");
    sender = sender.replace(/ /g, "").replace(/\n/g, "");

    if(msg == "준이봇") {
        replier.reply("ㅎㅇ");
        replier.reply("'도움말'이라고 말하셈");
    }
    else if(msg == "도움말") {
        replier.reply(`🍇준이봇 기능들🍇\n${blank}${HELP}`);
    }
    else if(checkMsg(msg, "준이봇코드")) {
        replier.reply(`/*준이봇 코드*/\n${blank}${CODE}`);
    }
    else if(checkMsg(msg, ["공지", "이벤트"])) {
        checkEvent(room, sender) ? replier.reply(checkEvent(room, sender)) : replier.reply("오늘의 공지가 없습니다.");
    }

    resetSeason();
    
    sender = login(msg, sender, replier, isGroupChat);
    exp(msg, sender, replier);
    item(msg, sender, replier);
    present(msg, sender, replier, isGroupChat);
    attendence(room, msg, sender, replier, isGroupChat);
    speach(msg, sender, replier);
    rsp(msg, sender, replier);
    chamchamcham(msg, sender, replier);
    calcGame(room, msg, sender, replier, isGroupChat);
    teach(room, msg, sender, replier);
    randomSelector(msg, replier);
    etc(room, msg, sender, replier);
}