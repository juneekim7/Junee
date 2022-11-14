//처음에 들어왔을 때 레벨 로드
function levelLoad() {
    let code = "";

    for(let type in level) {
        code += `<div class="level ${type}" style="z-index: 10;" onclick="levelToggle('${type}')"><div class="level-type">${type}</div></div>`;
        for(let obj of level[type]) {
            code += 
`<div class="level ${type}" style="display: ${levelDisplay[type]}" onclick="levelPreview('${type}', ${level[type].indexOf(obj)})">
    <div class="level-difficulty">${obj.difficulty}</div>
    <div class="level-emoji">${obj.emoji}</div>
    <div class="level-name">${obj.name}</div>
</div>`;
        }
    }

    document.getElementById("level-grid").innerHTML = code;
}

//로고 애니메이션
function logoAnimation() {
    setTimeout(()=> {
        document.getElementsByTagName("h1")[1].style.animation = "logo-fill 5800ms cubic-bezier(0, 0, 0, 0.8)";
    }, 2200);
    setTimeout(()=> {
        document.getElementsByTagName("h1")[1].style.color = "transparent";
        document.getElementById("logo").style.animation = "logo-out 1500ms linear";
    }, 7500);
    setTimeout(()=> {
        pageChange(1);
    }, 9000);
}

window.onload = ()=> {
    logoAnimation();
    levelLoad();
    // pageChange(1);
}