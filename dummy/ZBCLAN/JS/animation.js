var Anc=1;

function Anavout() {
    Anc=-1;
    var nav=document.getElementById("nav");
    nav.style.animationName="navOut";
    nav.style.width="25%";
    setTimeout(function() {
        nav.innerHTML="<ul><a class='nava' href='http://www.ZBCLAN.kro.kr'><li><b>ZBヤ 클랜</b></li></a><a class='nava'; href='http://tiktok.ZBCLAN.kro.kr'><li><b>TikTok</b></li></a><a class='nava'; href='http://kakao.ZBCLAN.kro.kr'><li><b>들어가는 법</b></li></a><a class='nava'; href='https://battlegroundsmobile.kr'><li><b>배그M 다운받기</b></li></a></ul>";
    },200);
}

function AnavIn() {
    Anc=1;
    var nav=document.getElementById("nav");
    nav.innerHTML="";
    nav.style.animationName="navIn";
    nav.style.width="0px";
}

function Anav() {
    if(Anc==1) Anavout();
    else AnavIn();
}

function Atnav() {
    window.scrollTo(0,0)
    Anav();
}