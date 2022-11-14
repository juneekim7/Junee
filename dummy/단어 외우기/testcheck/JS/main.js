var i=JSON.parse(localStorage["i"]);
var scoreNow=JSON.parse(localStorage["scoreNow"]);
var wordNumber=JSON.parse(localStorage["wordNumber"]);
var testKind=JSON.parse(localStorage["testKind"]);

var score=JSON.parse(localStorage["score"]);
score+=scoreNow;
localStorage["score"]=JSON.stringify(score);

window.onload=function() {
    if(testKind=="EK") {
        if(i+1==wordNumber) {
            i=0-1;
            localStorage["testKind"]=JSON.stringify("KE");
        }
    }
    else if(testKind=="KE") {
        if(i+1==wordNumber) {
            resetTest();

            if(scoreNow==3) {
                document.getElementById("result").textContent="총알이 정확하게 날아갔습니다!";
                document.getElementById("hole").style.top=-265;
            }
            else if(scoreNow==0) {
                document.getElementById("result").textContent="총알이 잘 못 날아갔습니다!";
                document.getElementById("hole").style.top=0;
                document.getElementById("hole").style.left=-300;
            }
            else {
                alert("에러발생");
            }

            setTimeout( function() {
                alert("테스트가 끝났습니다!\n(확인을 누르면 결과가 표시됩니다.)");
                alert(score+"점!\n"+"("+(score/3/(wordNumber*2)*100)+"%)\n"+"(확인을 누르면 처음으로 돌아갑니다.)");
            },1000)
        }
    }

    if(testKind=="KE"&&i==wordNumber-1) {
        setTimeout( function() {
            location.href="../add/index.html";
        },1000)
    }
    else if(scoreNow==3) {
        document.getElementById("result").textContent="총알이 정확하게 날아갔습니다!";
        document.getElementById("hole").style.top=-265;
        i++;
        setTimeout( function() {
            localStorage["i"]=JSON.stringify(i);
            location.href="../test/index.html";
        },1000);
    }
    else if(scoreNow==0) {
        document.getElementById("result").textContent="총알이 잘 못 날아갔습니다!";
        document.getElementById("hole").style.top=0;
        document.getElementById("hole").style.left=-300;
        i++;
        setTimeout( function() {
            localStorage["i"]=JSON.stringify(i);
            location.href="../test/index.html";
        },1000);
    }
    else {
        alert("에러발생");
    }
}