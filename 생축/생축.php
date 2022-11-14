<?php
    $from=$_GET["from"];
    $to=$_GET["to"];
    $date=$_GET["date"];
    $cont=$_GET["cont"];
    $from=str_replace("<","&lt;",$from);
    $from=str_replace(">","&gt;",$from);
    $to=str_replace("<","&lt;",$to);
    $to=str_replace(">","&gt;",$to);
    $date=str_replace("<","&lt;",$date);
    $date=str_replace(">","&gt;",$date);
    $cont=str_replace("<","&lt;",$cont);
    $cont=str_replace(">","&gt;",$cont);

    $cont=str_replace("(enter)","<br/>",$cont);
    $cont=str_replace("&&&","(enter)",$cont);
    $cont=str_replace("(qq)","!",$cont);
    $cont=str_replace("$$$","(qq)",$cont);

    echo "<html>
    <head>
        <meta charset=\"utf-8\">
        <title>생축</title>
        <style>
            body {
                width: 100vw;
                height: 100vh;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #f6f6f6;

                animation: bgc 100000ms ease 0ms;
            }

            @keyframes bgc {
                from{background-color: #f6f6f6;}
                10%{background-color: #f6f6f6;}
                11%{background-color: #2C3E50;}
                22%{background-color: #2C3E50;}
                23%{background-color: #f6f6f6;}
                50%{background-color: #f6f6f6;}
            }
            
            #object1 {
                width: 800px;
                height: 1000px;
                background-color: #f6f6f6;
                border-radius: 50px;
                font-size: 30px;
                font-weight: bold;
                text-align: center;
                color: black;
                text-shadow: none;

                position: relative;
                left: calc(50vw - 400px);
                top: calc(50vh - 500px - 100vh);

                animation: anime1 100000ms ease 0ms;
                z-index: 0;
            }

            @keyframes anime1 {
                from{background-color: #00adb5; color: #f6f6f6; font-size: 70px; width: 100px; height: 100px; border-radius: 50px; top: -500px; left: calc(50vw - 50px); color: transparent; text-shadow: none;}
                0.3%{height: 100px; border-radius: 50px;}
                1%{height: 30px; top: 70vh; border-radius: 15px;}
                2%{width: 100px; height: 100px; border-radius: 50px; top: calc(50vh - 50px); left: calc(50vw - 50px);}
                4%{color: transparent;}
                5%{width: 600px; left: calc(50vw - 300px); color: #f6f6f6; text-shadow: none;}
                7%{color: #f6f6f6; text-shadow: 0px 1px 1px #3797a4, 0px 2px 1px #3797a4, 0px 2px 1px #3797a4, 1px 1px 1px #3797a4, 1px 2px 1px #3797a4, 1px 2px 1px #3797a4, 2px 1px 1px #3797a4, 2px 2px 1px #3797a4, 2px 2px 1px #3797a4, 3px 1px 1px #3797a4, 3px 2px 1px #3797a4, 3px 2px 1px #3797a4, 4px 1px 1px #3797a4, 4px 2px 1px #3797a4, 4px 2px 1px #3797a4, 5px 1px 1px #3797a4, 5px 2px 1px #3797a4, 5px 2px 1px #3797a4;}
                9.9%{color: #f6f6f6; text-shadow: 0px 1px 1px #3797a4, 0px 2px 1px #3797a4, 0px 2px 1px #3797a4, 1px 1px 1px #3797a4, 1px 2px 1px #3797a4, 1px 2px 1px #3797a4, 2px 1px 1px #3797a4, 2px 2px 1px #3797a4, 2px 2px 1px #3797a4, 3px 1px 1px #3797a4, 3px 2px 1px #3797a4, 3px 2px 1px #3797a4, 4px 1px 1px #3797a4, 4px 2px 1px #3797a4, 4px 2px 1px #3797a4, 5px 1px 1px #3797a4, 5px 2px 1px #3797a4, 5px 2px 1px #3797a4;}
                10%{width: 600px; left: calc(50vw - 300px); background-color: #00adb5; color: transparent; font-size: 70px; height: 100px; top: calc(50vh - 50px); text-shadow: none;}
                11%{width: 800px; left: calc(50vw - 400px); background-color: #f6f6f6; color: transparent; font-size: 30px; height: 1000px; top: calc(50vh - 500px); text-shadow: none;}
                11.1%{color: black;}
                20%{top: calc(50vh - 500px);}
                25%{top: calc(50vh - 500px - 100vh);}
                to{background-color: #f6f6f6; font-size: 30px; text-shadow: none;}
            }

            #object4 {
                font-size: 200px;
                text-align: center;
                font-weight: bold;
                color: #2C3E50;

                position: relative;
                top: calc(50vh - 130px);

                animation: anime4 5s ease 0ms;
            }

            #object5 {
                font-size: 25px;
                text-align: center;
                font-weight: bold;
                color: #2C3E50;

                position: relative;
                top: calc(50vh - 130px);

                animation: anime4 5s ease 0ms;
            }

            @keyframes anime4 {
                from{opacity: 0;}
                to{opacity: 1;}
            }

            #hidden {
                opacity: 0;
            }

            #to{font-size: 30px; text-align: left; padding: 50px 30px;}
            #letter{font-size: 35px; text-align: left; line-height: 60px; margin: 200px 170px 200px 170px;}
            #from{font-size: 30px; text-align: right; margin: 0 30 50px 0px;}

            .balls {
                width: 103px;
                height: 103px;
                border-radius: 150px;
                background-color: orange;
                box-shadow: 0px 0px 30px #2C3E50;
                color: white;
                font-size: 80px;
                text-align: center;
                position: relative;
                top: -4000px; left: 0;
                display: inline-block;
                animation: none;
                z-index: 3;
            }

            @keyframes banime1 {
                from{top: 100vh;}
                15%{top: 100vh;}
                23%{top: -2320px;}
            }

            @keyframes banime2 {
                from{top: calc(100vh + 20px);}
                15%{top: calc(100vh + 20px);}
                23%{top: -2300px;}
            }
        </style>
        <script>
            setTimeout(function() {
                let t=\"to.$to\";
                let c=\"\";
                let i=0;
                let w1=setInterval(function() {
                    c+=t[i];
                    document.getElementById(\"object1\").textContent=c;
                    i++;
                    if(i==t.length) clearInterval(w1);
                },100);
            },7000);

            setTimeout(function() {
                document.getElementById(\"object1\").innerHTML=document.getElementById(\"hidden\").innerHTML;
                window.scrollTo(0,1);
            },11000);

            setTimeout(function() {
                document.body.innerHTML='<div id=\"object4\">$date</div><div id=\"object5\">당신의 생일을 진심으로 축하합니다.</div>';
                window.scrollTo(0,1);
            },23000);

            function start() {
                let color=[\"#E74C3C\",\"#00adb5\",\"#009393\"];
                let AA=[\"banime1 100000ms ease 0ms\",\"banime2 100000ms ease 0ms\"];
                for(let i=0;i<document.getElementsByClassName(\"balls\").length;i++) {
                    document.getElementsByClassName(\"balls\").item(i).style.backgroundColor=color[Math.floor(Math.random()*color.length)];
                    document.getElementsByClassName(\"balls\").item(i).style.animation=AA[i%2];
                    document.getElementsByClassName(\"balls\").item(i).style.left=\"calc(calc(50vw - 405px) + \"+(i*-20)+\"px)\";
                }
                window.scrollTo(0,1);
            }

            window.onload=function() {
                start();
            }
        </script>
    </head>
    <body>
        <iframe width=\"0\" height=\"0\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/715312945&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>
        <div id=\"object1\">생일축하해</div>
        <div id=\"ballbox\"></div>
            <div class=\"balls\">생</div>
            <div class=\"balls\">일</div>
            <div class=\"balls\">축</div>
            <div class=\"balls\">하</div>
            <div class=\"balls\">합</div>
            <div class=\"balls\">니</div>
            <div class=\"balls\">다</div>
            <div class=\"balls\">!</div>
            <div class=\"balls\">!</div>
        </div>
        <div id=\"hidden\">
            <div id=\"to\">to.$to</div>
            <div id=\"letter\">
                &nbsp;&nbsp;$cont
            </div>
            <div id=\"from\">from.$from</div>
        </div>
    </body></html>";
?>