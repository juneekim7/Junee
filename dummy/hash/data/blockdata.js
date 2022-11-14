let block = [
    {
        name: "response",
        innerHTML: '메세지가 왔을 때',
        codeStart: 'function response(room="방", msg="메세지", sender="보낸사람", isGroupChat=1, replier={reply(msg){alert(msg)}}, imageDB=1, packageName=1) {\n',
        codeMid: '',
        codeEnd: '\n}\n',
        backgroundColor: "#00B400",
    },
    {
        name: "reply",
        innerHTML: '<input class="codeInput" type="text"> 보내기',
        codeStart: 'replier.reply("',
        codeMid: '");\n',
        codeEnd: '',
        backgroundColor: "#FF3A61",
    },
    {
        name: "if",
        innerHTML: '만약 <input class="codeInput" type="text"> 이라면',
        codeStart: 'if(',
        codeMid: ') {\n',
        codeEnd: '\n}\n',
        backgroundColor: "#19BAEA",
    },
    /*{
        name: "msg",
        innerHTML: '내용',
        codeStart: '',
        codeMid: 'msg',
        codeEnd: '',
        backgroundColor: "#DD47D8",
    },*/
];