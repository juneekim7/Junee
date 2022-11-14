            /*const acc=["black","#FF500F","#630D0E","#539790"];*/

            //gameplay

            let cc=0; //노래 시간
            let g=0; //노트 index
            let s=0; //점수
            let q=0; //노트 눌렀는지 여부
            let sn; //perfect/bad/miss 여부
            let k=level[0].BPM; //노트 바뀌는 시간
            let ent=0; //엔터 여부
            let note; //interval 이름
            let x=-1; //단계 번호
            let ln=0; //long note 번째
            let wwwww=0; //초기값
            function gameStart(y) {//게임 시작
                document.body.style.backgroundColor=def;
                document.body.style.cursor="none";
                document.getElementById("notEscAndNow").style.color="#FEEFEF";
                document.getElementById("home").style.display="none";
                document.getElementById("games").style.display="block";
                document.getElementById("result").style.display="none";
                document.getElementById("notes").style.display="none";
                document.getElementById("games").innerHTML='<iframe id="music" width="0" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+level[y].Music+'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>'+document.getElementById("gamesHTML").innerHTML;
                document.getElementById("score").textContent="0";
                k=level[y].BPM;
                ent=0;
                sn=new Array(level[y].Notes.legnth);
                if(y==0) {
                    alert("화면에 나타나는 단어와 자판이 맞게 치세요.");
                }
                let widget=SC.Widget(document.getElementById("music"));
                widget.bind(SC.Widget.Events.READY, function() {
                    if(wwwww==0) {
                        widget.pause();
                        widget.setVolume(50);
                        wwwww=1;
                    }
                });
                setTimeout(function() {
                    document.getElementById("now").style.fontSize="250px";
                    document.getElementById("now").style.animation="countdown 1000ms ease";
                    document.getElementById("now").textContent="3";
                },0);
                setTimeout(function() {
                    document.getElementById("now").style.animation="countDown 1000ms ease";
                    document.getElementById("now").textContent="2";
                },1000);
                setTimeout(function() {
                    document.getElementById("now").style.animation="countdown 1000ms ease";
                    document.getElementById("now").textContent="1";
                },2000);
                setTimeout(function() {
                    cc=1;
                    g=0;
                    s=0;
                    q=0;
                    x=y;
                    ln=0;
                    document.getElementById("now").style.color="#630D0E";
                    document.getElementById("now").style.fontSize="200px";
                    document.getElementById("now").style.animation="none";
                    document.getElementById("now").textContent=level[y].Notes[0];
                    document.getElementById("next").textContent=level[y].Notes[1];
                    document.body.style.animationDuration=level[y].BPM+"ms";
                    document.body.style.overflowY="hidden";
                    //시작할때 스페이스 점수 버그
                    if(level[x].Notes[g]==" ") {
                        //same as perfect
                        s+=Math.floor(1000000/level[x].Notes.length);
                        sn[g]=1;
                        if(q==0) {
                            s+=1000000%level[x].Notes.length;
                            q=1;
                        }
                        document.getElementById("now").style.color="#539790";
                        document.getElementById("score").textContent=s;
                    }
                    gameNote();
                    widget.seekTo(1);
                    widget.play();
                },3000);
            }
            function gameNote() {//노트 변경
                if(document.getElementById("esc").style.display=="block") {
                    clearInterval(note);
                    return;
                }
                note=setInterval(function() {
                    g++;
                    cc+=k;
                    if(g==level[x].Notes.length) {
                        gameEnd();
                        clearInterval(note);
                    }

                    if((ent==0&&level[x].Notes[g]!="↵")||(ent!=0&&level[x].Notes[g]=="↵")) document.getElementById("now").style.color="#630D0E";
                    else document.getElementById("now").style.color="gainsboro";

                    if(level[x].Notes[g]=="~") {
                        if(level[x].Notes[g-1]!="~") {
                            ln=g-1;
                        }
                        document.getElementById("now").textContent=level[x].Notes[ln];
                    }
                    else document.getElementById("now").textContent=level[x].Notes[g];

                    if(level[x].Notes[g]==" ") {
                        //same as perfect
                        s+=Math.floor(1000000/level[x].Notes.length);
                        sn[g]=1;
                        if(q==0) {
                            s+=1000000%level[x].Notes.length;
                            q=1;
                        }
                        document.getElementById("now").style.color="#539790";
                        document.getElementById("score").textContent=s;
                    }
                    else if(level[x].Notes[g]=="~") {
                        if(sn[g-1]==1) {
                            s+=Math.floor(1000000/level[x].Notes.length);
                            sn[g]=1;
                            if(q==0) {
                                s+=1000000%level[x].Notes.length;
                                q=1;
                            }
                            document.getElementById("now").style.color="#539790";
                        }
                        else if(sn[g-1]==-1) {
                            s+=Math.floor(100000/level[x].Notes.length);
                            sn[g]=-1;
                            if(100000%level[x].Notes.length!=0) s+=1;
                            document.getElementById("now").style.color="#FF500F";
                        }
                        else if(sn[g-1]==-2) {
                            sn[g]=-2;
                            document.getElementById("now").style.color="black";
                        }
                        document.getElementById("score").textContent=s;
                    }
                    else if(level[x].Notes[g]=="↵") {
                        clearInterval(note);
                        enter();
                    }

                    gameNoteNext();
                    animeNext();
                },k);
            }
            function gameNoteNext() {//
                if(g+1<level[x].Notes.length) {
                    document.getElementById("next").textContent=level[x].Notes[g+1];
                }
                else {
                    document.getElementById("next").textContent="";
                }
            }
            function animeNext() {//애니메이션 변경
                if(g<level[x].Notes.length) {
                    if(anime.indexOf(level[x].Anime[g])!=-1) {
                        document.body.style.animationName=level[x].Anime[g];
                    }
                    else {
                        document.body.style.animationName="";
                    }
                }
                else {
                    document.body.style.animationName="";
                }
            }
            function game() {//점수확인
                if(x==-1||sn[g]==1||sn[g]==-1||sn[g]==-2) return;

                let correct=g;
                if(level[x].Notes[correct]=="~") {
                    correct=ln;
                }

                if(keycodes[window.event.keyCode]==level[x].Notes[correct]) {
                    s+=Math.floor(1000000/level[x].Notes.length);
                    sn[g]=1;
                    if(q==0) {
                        s+=1000000%level[x].Notes.length;
                        q=1;
                    }
                    document.getElementById("now").style.color="#539790";
                }
                else if(keycodes[window.event.keyCode]==level[x].Notes[correct-1]||keycodes[window.event.keyCode]==level[x].Notes[g+1]) {
                    s+=Math.floor(100000/level[x].Notes.length);
                    sn[g]=-1;
                    if(100000%level[x].Notes.length!=0) s+=1;
                    document.getElementById("now").style.color="#FF500F";
                }
                else if(keycodes[window.event.keyCode]!="esc"){
                    sn[g]=-2;
                    document.getElementById("now").style.color="black";
                }
                document.getElementById("score").textContent=s;
            }
            function gameEnd() {//끝
                wwwww=0;
                if(document.getElementById("esc").style.display=="block") {
                    document.getElementById("esc").style.display=="none";
                    document.getElementById("notEscAndNow").style.opacity="1";
                }
                document.body.style.backgroundColor=level[x].EnterColor;
                document.body.style.cursor="auto";
                document.getElementById("now").style.color="#630D0E";
                document.getElementById("home").style.display="none";
                document.getElementById("games").style.display="none";
                document.getElementById("result").style.display="block";
                document.getElementById("notes").style.display="none";
                document.getElementById("result-extra").innerHTML='<span style="font-weight: bold;">'+level[x].Name+'</span> score'+document.getElementById("result-extra").innerHTML;
                if(s>=1000000) {
                    s=1000000;
                    document.getElementById("perfect").style.animation="title-anime 5s ease";
                    document.getElementById("perfect").style.opacity="1";
                }
                else {
                    document.getElementById("perfect").style.animation="";
                    document.getElementById("perfect").style.opacity="0";
                }
                document.getElementsByClassName("title").item(1).textContent=s+"";
                g=0;
                s=0;
                x=-1;
                ln=" ";
            }

            //enter
            function enter() {
                if(k==level[x].BPM&&document.body.style.backgroundColor=="rgb(254, 195, 185)") {
                    k=level[x].BPM/level[x].Enter;
                    ent=level[x].Enter;
                    document.body.style.backgroundColor=level[x].EnterColor;
                    document.getElementById("notEscAndNow").style.color="gainsboro";
                    document.body.style.animationDuration=k+"ms";
                }
                else {
                    k=level[x].BPM;
                    ent=0;
                    document.body.style.backgroundColor="#FEC3B9";
                    document.getElementById("notEscAndNow").style.color="#FEEFEF";
                    document.body.style.animationDuration=k+"ms";
                }
                gameNote();
            }

            //esc
            function esc() {
                let widget=SC.Widget(document.getElementById("music"));
                document.body.style.cursor="auto";
                if(document.getElementById("esc").style.display="none") {
                    document.getElementById("esc").style.display="block";
                    document.getElementById("notEscAndNow").style.opacity="0.1";
                    document.getElementById("next").textContent="";
                    widget.pause();
                    gameNote();
                }
                else {
                    conti();
                }
            }
            function conti() {
                let widget=SC.Widget(document.getElementById("music"));
                document.body.style.cursor="none";
                setTimeout(function() {
                    document.getElementById("esc").style.display="none";
                    document.getElementById("notEscAndNow").style.opacity="1";
                    document.getElementById("now").style.fontSize="250px";
                    document.getElementById("now").style.animation="countdown 1000ms ease";
                    document.getElementById("now").textContent="3";
                },0);
                setTimeout(function() {
                    document.getElementById("now").style.animation="countDown 1000ms ease";
                    document.getElementById("now").textContent="2";
                },1000);
                setTimeout(function() {
                    document.getElementById("now").style.animation="countdown 1000ms ease";
                    document.getElementById("now").textContent="1";
                },2000);
                setTimeout(function() {
                    if(sn[g]==1) document.getElementById("now").style.color="#539790";
                    else if(sn[g]==-1) document.getElementById("now").style.color="#FF500F";
                    else if(sn[g]==-2) document.getElementById("now").style.color="black";
                    else {
                        if(k==lvBPM[x]) document.getElementById("now").style.color="#630D0E";
                        else document.getElementById("now").style.color="gainsboro";
                    }
                    document.getElementById("now").style.fontSize="200px";
                    document.getElementById("now").style.animation="none";
                    if(level[x].Notes[g]=="~") document.getElementById("now").textContent=level[x].Notes[ln];
                    else document.getElementById("now").textContent=level[x].Notes[g];
                    gameNoteNext();
                    widget.seekTo(cc);
                    widget.play();
                    gameNote();
                },3000)
            }
            function home() {
                document.body.style.backgroundColor="#FEC3B9";
                document.body.style.cursor="auto";
                wwwww=0;
                sn=new Array();
                clearInterval(note);
                result();
            }
            function restart() {
                document.body.style.backgroundColor="#FEC3B9";
                wwwww=0;
                gameStart(x);
            }
            function goSeeNote() {
                seeNote(x);
            }

            //결과
            function result() {
                if(document.getElementById("notes").style.display=="block") {
                    clearInterval(notesN);
                }
                wwwww=0;
                wwwwww=0;
                sn=new Array();
                document.body.style.overflowY="auto";
                document.body.style.backgroundColor=def;
                document.getElementById("notes-music-box").innerHTML="<!--음악 api-->";
                document.getElementById("home").style.display="block";
                document.getElementById("games").style.display="none";
                document.getElementById("result").style.display="none";
                document.getElementById("notes").style.display="none";
                document.getElementById("games").innerHTML="<!--음악 api + gamesHTML 의 코드가 들어감-->";
                document.getElementById("result-extra").innerHTML="<br/>press 'esc' to go home";
                document.getElementById("notes-extra").innerHTML="<br/>press 'esc' to go home";
            }

            //노트보기
            let wwwwww=0; //초기값
            let kk; //시간
            let notesN; //interval 이름
            function seeNote(qwer) {
                event.stopPropagation();
                window.scrollTo(0,0);
                let m=qwer;
                wwwwww=0;
                document.body.style.overflowY="auto";
                document.body.style.backgroundColor=def;
                document.body.style.cursor="auto";
                document.getElementById("home").style.display="none";
                document.getElementById("games").style.display="none";
                document.getElementById("result").style.display="none";
                document.getElementById("notes").style.display="block";
                document.getElementById("games").innerHTML="<!--음악 api + gamesHTML 의 코드가 들어감-->";
                document.getElementById("notes-extra").innerHTML='<span style="font-weight: bold;">'+level[m].Name+'</span> notes'+document.getElementById("notes-extra").innerHTML;
                document.getElementById("notes-music-box").innerHTML='<iframe id="notes-music" width="100%" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+level[m].Music+'&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"></iframe>';
                noteinf(m);
                kk=level[m].BPM;
                let widget=SC.Widget(document.getElementById("notes-music"));
                widget.bind(SC.Widget.Events.READY, function() {
                    if(wwwwww==0) {
                        widget.setVolume(50);
                        widget.pause();
                    }
                });
                setTimeout(function() {
                    notePlay(m,-1);
                },3000-kk);
                setTimeout(function() {
                    wwwwww=1;
                    widget.seekTo(1);
                    widget.play();
                },3000);
            }
            function noteinf(qwer) {
                let m=qwer;
                let c="";
                for(let i=0;i<level[m].Notes.length;i++) {
                    c+='<div id="nn'+i+'" class="nnn">'+level[m].Notes[i]+'</div>';
                    if((i+1)%4==0) {
                        c+='<div class="nnn">&nbsp;</div>';
                    }
                    if((i+1)%8==0) {
                        c+='<br/>';
                    }
                }
                for(let i=0;i<7;i++) c+='<div class="nnn">&nbsp;</div>';
                document.getElementById("notes-text").innerHTML=c;
            }
            function notePlay(qwer, j) {
                let m=qwer;
                let widget=SC.Widget(document.getElementById("notes-music"));
                notesN=setInterval(function() {
                    j++;
                    if(j==level[m].Notes.length) {
                        window.scrollTo(0,0);
                    }
                    if(j<level[m].Notes.length) document.getElementById("nn"+j).style.backgroundColor="rgba(255,255,0,0.8)";
                    if(j>0) document.getElementById("nn"+(j-1)).style.backgroundColor="transparent";
                    if(level[m].Notes[j]=="↵") {
                        if(kk==level[m].BPM) kk=level[m].BPM/level[m].Enter;
                        else if(kk==level[m].BPM/level[m].Enter) kk=level[m].BPM;
                        clearInterval(notesN);
                        notePlay(m,j);
                    }
                    if(j==level[m].Notes.length) {
                        document.getElementById("notes-music").height="300";
                        clearInterval(notesN);
                    }
                },kk);
            }

            //키보드 조작
            window.onkeydown=function() {
                if(document.getElementById("result").style.display=="block"&&(window.event.keyCode==10||window.event.keyCode==13)) return;
                else if(document.getElementById("games").style.display=="block"&&document.getElementById("now").style.fontSize=="200px"&&g>0&&window.event.keyCode==27) esc();
                else if(document.getElementById("esc").style.display=="none") game();
            }
            window.onkeyup=function() {
                if((document.getElementById("result").style.display=="block"&&window.event.keyCode==27)||(document.getElementById("notes").style.display=="block"&&window.event.keyCode==27)) result();
            }

            function levelinf() {
                let c=document.getElementById("levels").innerHTML;
                for(let i=0;i<level.length;i++) {
                    c+='<div class="lv" id="lv'+i+'" onclick="gameStart('+i+');"><div class="lvn">'+level[i].Name+'</div><div class="lvd">Difficulty: '+level[i].Difficulty+'</div><div class="lvi lvd"><div onclick="seeNote('+i+');">ⓘ</div></div></div>';
                }
                document.getElementById("levels").innerHTML=c;
            }
            function checkDevice() {
                let filter="win16|win32|win64|macintel|mac|";
                if(filter.indexOf(navigator.platform.toLowerCase())<0) {
                    location.href="mobile.html";
                }
                else if(navigator.userAgent.toLowerCase().indexOf("chrome")==-1) {
                    alert("clavis is only available in chrome");
                    document.body.innerHTML='<a href="https://www.google.com/chrome">download chrome</a>';
                }
                else if(document.getElementById("title").textContent!="ｃｌａｖｉｓ") {
                    while(1) {
                        alert("keep copyrights!");
                    }
                }
            }
            function start() {
                levelinf();
                checkDevice();
            }
            window.onload=function() {
                start();
            }