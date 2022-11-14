let chat="";

function debug() {
    ROOM="방";
    MSG=document.getElementById("Dinput").value;
    SENDER="사용자1";
    chat+='<div class="mychat">'+MSG+'</div>';
    document.getElementById("chat").innerHTML=chat;
    let debugjs = "";
    let isItNote = false;
    for(let i=0;i<codejs.length;i++) {
        if(codejs[i]=="/"&&codejs[i+1]=="*") {
            isItNote=true;
        }
        else if(codejs[i-1]=="/"&&codejs[i-2]=="*") {
            isItNote=false;
        }
        if(isItNote==false) debugjs+=codejs[i];
    }
    eval(`
    let REPLIER = {
        reply(msg) {
            chat+='<div class="botchat">'+msg+'</div>';
            document.getElementById("chat").innerHTML=chat;
        }
    }
    `
    +debugjs+
    'response(ROOM,MSG,SENDER,false,REPLIER);');
}

function debugEnter(event) {
    if(event.keyCode==13) {
        //debug();
    }
}