var wordNumber=JSON.parse(localStorage["wordNumber"]);
var ENG=JSON.parse(localStorage["ENG"]);
var KOR=JSON.parse(localStorage["KOR"]);
var color=JSON.parse(localStorage["color"]);

var i=0;

firstWord();

function enter() {
    if (window.event.keyCode == 13) {
        nextWord();
    }
}

function nextWord() {
    var bullet=document.getElementById("bullet");
    var magazine=document.getElementById("magazine");
    bullet.style.animationName="load";
    setTimeout( function(){
        bullet.style.animationName="";
        bullet.style.color=color[i];
        document.getElementById("Def").textContent=KOR[i];
        document.getElementById("Word").textContent=ENG[i];
        i++;
        if(i-1==wordNumber) {
            resetTest();
            document.getElementById("dis").textContent="";
            document.getElementById("white").style.zIndex=2;
            bullet.style.opacity=0;
            magazine.style.left=900;
            magazine.style.top=700;
            document.getElementById("pistol").style.animationName="pistolLoad";
            document.getElementById("pistol").style.opacity=1;
            document.getElementById("slide").style.animationName="pistolLoad";
            document.getElementById("slide").style.opacity=1;
            document.getElementById("struct1").style.animationName="pistolLoad";
            document.getElementById("struct1").style.opacity=1;
            document.getElementById("struct2").style.animationName="pistolLoad";
            document.getElementById("struct2").style.opacity=1;
            setTimeout( function() {
                magazine.style.animationName="magazineLoad";
                magazine.style.left=740;
                magazine.style.top=140;
            },1000)
            setTimeout( function() {
                document.getElementById("slide").style.animationName="slideLoad";
                document.getElementById("struct2").style.transform="rotate(45deg)";
            },3000)
            setTimeout( function() {
                location.href="../test/index.html";
            },5000)
        }
    },2000);
}

function firstWord() {
    var bullet=document.getElementById("bullet");
    bullet.style.color=color[i];
    document.getElementById("Def").textContent=KOR[i];
    document.getElementById("Word").textContent=ENG[i];
    i++;
}