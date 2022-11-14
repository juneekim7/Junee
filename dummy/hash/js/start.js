function loadBlock() {
    let c="";
    for(let i=0;i<block.length;i++) {
        if(block[i].codeEnd.replace(/\n/g,"")=='}') c+='<div class="block" id="'+i+'" name="'+block[i].name+'" style="background-color: '+block[i].backgroundColor+'; border-radius: 0 30px 0 30px;" draggable="true" ondragstart="setId(event)">'+block[i].innerHTML+'</div>';
        else c+='<div class="block" id="'+i+'" name="'+block[i].name+'" style="background-color: '+block[i].backgroundColor+';" draggable="true" ondragstart="setId(event)">'+block[i].innerHTML+'</div>';
    }
    document.getElementById("blocks").innerHTML=c;
}

function start() {
    loadBlock();
}

window.onload=function() {
    start();
}