var wordNumber=JSON.parse(localStorage["wordNumber"]);
var ENG=JSON.parse(localStorage["ENG"]);
var KOR=JSON.parse(localStorage["KOR"]);

var KE=JSON.parse(localStorage["KE"]);
var EK=JSON.parse(localStorage["EK"]);

var color=JSON.parse(localStorage["color"]);

var i;
var testKind=JSON.parse(localStorage["testKind"]);

window.onload=function() {
    reload();
    if(testKind=="KE") {
        document.getElementById("out").textContent="한국어 뜻:";
        document.getElementById("in").textContent="영어 단어:";
    }

    if(localStorage["i"]==0&&testKind=="EK") {
        i=0;
        document.getElementById("OUTPUT").value=ENG[i];
    }
    else if(testKind=="EK"){
        i=JSON.parse(localStorage["i"]);
        document.getElementById("OUTPUT").value=ENG[i];
    }
    else if(localStorage["i"]==0&&testKind=="KE") {
        i=0;
        document.getElementById("OUTPUT").value=KOR[i];
    }
    else {
        i=JSON.parse(localStorage["i"]);
        document.getElementById("OUTPUT").value=KOR[i];
    }
}

function enter() {
    if (window.event.keyCode==13) {
        next();
    }
}

function goNext() {
    next();
}

//힌트 보기
var hintOn=-1;
function seeHint() {
    hintOn*=-1;
    if(hintOn==-1) {
        document.getElementById("HintText").value="?";
        document.getElementById("hint").value="힌트 보기";
    }
    else if(hintOn==1) {
        document.getElementById("hint").value="힌트 숨기기";
        if(testKind=="EK") {
            document.getElementById("HintText").value=EK[i];
        }
        else if(testKind=="KE") {
            document.getElementById("HintText").value=KE[i];
        }
    }
}

//다음 단어 및 시작
function next() {
    if(i>=0) {
        check();
    }
    reset();
    seeHint();
}

function reset() {
    document.getElementById("OUTPUT").value="";
    document.getElementById("INPUT").value="";
    hintOn=1;
}

var score=0;
var scoreNow=0;

function check() {
    if(testKind=="EK") {
        if(document.getElementById("INPUT").value==KOR[i]) {
            scoreNow=3;
        }
        else {
            scoreNow=0;
        }
    }
    else if(testKind=="KE") {
        if(document.getElementById("INPUT").value==ENG[i]) {
            scoreNow=3;
        }
        else {
            scoreNow=0;
        }
    }
    checkWord();
}

//재장전 애니메이션 

function reload() {
    setTimeout( function() {
        document.getElementById("struct2").style.transform="rotate(45deg)";
    },100)

    setTimeout( function() {
        document.getElementById("basicInfo").style.opacity=1;
    },2000)
}