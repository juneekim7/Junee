function saveAdd() {
    var wC=document.getElementById("wordCount").value;
    localStorage["wordCount"]=wC;
    localStorage["wordNumber"]=wC;
}

function saveWord() {
    ENG.push(document.getElementById("ENG").value);
    KOR.push(document.getElementById("KOR").value);
    if(document.getElementById("KEHint").value!="") {
        KE.push(document.getElementById("KEHint").value);
    }
    else {
        KE.push("없음");
    }
    if(document.getElementById("EKHint").value!="") {
        EK.push(document.getElementById("EKHint").value);
    }
    else {
        EK.push("없음");
    }
    color.push(document.getElementById("color").value);

    localStorage["ENG"]=JSON.stringify(ENG);
    localStorage["KOR"]=JSON.stringify(KOR);
    localStorage["KE"]=JSON.stringify(KE);
    localStorage["EK"]=JSON.stringify(EK);
    localStorage["color"]=JSON.stringify(color);

    document.getElementById("ENG").value="";
    document.getElementById("KOR").value="";
    document.getElementById("KEHint").value="";
    document.getElementById("EKHint").value="";
    document.getElementById("color").value="black";
}

function checkWord() {
    localStorage["i"]=JSON.stringify(i);
    localStorage["scoreNow"]=JSON.stringify(scoreNow);
    location.href="../testcheck/index.html";
}

function resetTest() {
    localStorage["i"]=JSON.stringify(0);
    localStorage["testKind"]=JSON.stringify("EK");
    localStorage["score"]=JSON.parse(0);
}