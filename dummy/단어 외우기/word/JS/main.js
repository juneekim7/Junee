var wordCount=localStorage["wordCount"];

var wN=wordCount;
window.onload=function() {
    if(wordCount==1) {
        document.getElementById("next").value="확인";
    }
}

var ENG=new Array();
var KOR=new Array();
var KE=new Array();
var EK=new Array();
var color=new Array();

window.onbeforeunload=function() {
    return 0;
}

function nextword() {
    saveWord();
    wordCount--;
    if(wordCount==1) {
        document.getElementById("next").value="확인";
    }
    if(wordCount==0) {
        window.onbeforeunload=null;
        document.getElementById("next").setAttribute("type","submit");
    }
}