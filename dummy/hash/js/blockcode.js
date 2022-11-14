let blockIndex;
let code='';
let codejs='';
let codeId=0;
let inputId=1.5;

function setId(event) {
    blockIndex=parseInt(event.target.id);
}

function prevent(event) {
    event.preventDefault();
}

function coding() {
    let c='';
    let s='';
    if(block[blockIndex].codeEnd.replace(/\n/g,"")=='}') {
        c+='<div class="block" id="code:'+codeId+'" name="'+block[blockIndex].name+'" style="background-color: '+block[blockIndex].backgroundColor+'; border-radius: 0 30px 0 30px;" draggable="true">'+block[blockIndex].innerHTML+'</div>\n';
        c+='<div id="in:'+codeId+'" style="width: 220px;" ondrop="dropIn(event,'+codeId+')" ondragover="prevent(event)"><!--{}'+codeId+'--><div style="height: 50px;"></div></div>\n<div class="blockEnd" style="background-color:'+block[blockIndex].backgroundColor+';"></div>\n';
        s+=block[blockIndex].codeStart;
        if(block[blockIndex].innerHTML.indexOf('class="codeInput"')!=-1) {
            s+='/*()'+inputId+'*/';
            s+='/*'+inputId+'()*/';
            inputId+=0.5;
        }
        s+=block[blockIndex].codeMid;
        s+='/*{}'+codeId+'*/';
        s+=block[blockIndex].codeEnd;
    }
    else {
        c+='<div class="block" id="code:'+codeId+'" name="'+block[blockIndex].name+'" style="background-color: '+block[blockIndex].backgroundColor+';" draggable="true">'+block[blockIndex].innerHTML+'</div>\n';
        s+=block[blockIndex].codeStart;
        if(block[blockIndex].innerHTML.indexOf('class="codeInput"')!=-1) {
            s+='/*()'+inputId+'*/';
            s+='/*'+inputId+'()*/';
            inputId+=0.5;
        }
        s+=block[blockIndex].codeMid;
    }
    return {
        code:c,
        codejs:s,
    };
}

function drop(event) {
    code+=coding().code;
    codejs+=coding().codejs;
    document.getElementById("codes").innerHTML=code;
    codeId++;
}

function dropIn(event,id) {
    event.stopPropagation();
    code=code.split('<!--{}'+id+'-->')[0]+coding().code+'<!--{}'+id+'-->'+code.split('<!--{}'+id+'-->')[1];
    codejs=codejs.split('/*{}'+id+'*/')[0]+coding().codejs+'/*{}'+id+'*/'+codejs.split('/*{}'+id+'*/')[1];
    document.getElementById("codes").innerHTML=code;
    codeId++;
}

function saveCode() {
    let copyjs = "";
    let isItNote = false;
    for(let i=0;i<codejs.length;i++) {
        if(codejs[i]=="/"&&codejs[i+1]=="*") {
            isItNote=true;
        }
        else if(codejs[i-1]=="/"&&codejs[i-2]=="*") {
            isItNote=false;
        }
        if(isItNote==false) copyjs+=codejs[i];
    }
    let codejsInput=document.createElement("input");
    codejsInput.setAttribute("type", "text");
    document.getElementById("save-code").appendChild(codejsInput);
    codejsInput.value=copyjs;
    codejsInput.select();
    document.execCommand('copy');
    document.getElementById("save-code").removeChild(codejsInput);
    alert('복사가 완료되었습니다.');
}

window.onkeydown = function() {
    for(let i=2;i<document.getElementsByClassName("codeInput").length;i++) {
        codejs=codejs.split('/*()'+i+'*/')[0]+'/*()'+i+'*/'+'/*'+i+'()*/'+codejs.split('/*'+i+'()*/')[1];
        codejs=codejs.split('/*'+i+'()*/')[0]+document.getElementsByClassName("codeInput")[i].value+'/*'+i+'()*/'+codejs.split('/*'+i+'()*/')[1];
    }
}