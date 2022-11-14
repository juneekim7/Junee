//random
function random(n1, n2) {
    return n1 < n2 ? Math.floor(Math.random() * (n2 - n1)) + n1 : Math.floor(Math.random() * (n1 - n2)) + n2;
}

//페이지
function page(n) {
    return document.getElementsByClassName("page")[n];
}

//페이지 이동
function pageChange(n) {
    for(let element of document.getElementsByClassName("page")) {
        element.style.display = "none";
    }
    page(n).style.display = "block";
}

const levelDisplay = {
    "electronic": "none",
    "utaite": "none",
    "band": "none",
    "classic": "none"
}

//종류별 레벨 토글 기능
function levelToggle(type) {
    if(levelDisplay[type] == "none") levelDisplay[type] = "block";
    else if(levelDisplay[type] == "block") levelDisplay[type] = "none";

    let first = true;
    for(let element of document.getElementsByClassName(type)) {
        if(first == true) {
            first = false;
            continue;
        }
        element.style.display = levelDisplay[type];
    }
}