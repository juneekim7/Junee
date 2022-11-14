let selectIndex = 0;

function characterPreview(on) {
    if(on === true) {
        document.getElementById('character-display').style.setProperty('display', 'block');
        changeSelect(0);
    }
    if(on === false) {
        document.getElementById('character-display').style.setProperty('display', 'none');
    }
}

function characterSelect() {
    characterPreview(false);
    document.getElementsByTagName('option')[selectIndex].selected = true;
}

function changeSelect(index) {
    selectIndex += (character.length + index);
    selectIndex %= character.length;

    document.getElementById('character-image').style.setProperty('background-image', `url("./source/image/character/${character[selectIndex][0]}/main.png")`);
    document.getElementById('description').innerHTML = `
        <div style="font-size: 4vh;">${character[selectIndex][0]}(${character[selectIndex][1].gun})</div>
        ${character[selectIndex][1].description.info}<br/><br/>
        <font color="gold">기본 체력:</font> ${character[selectIndex][1].health}<br/>
        <font color="gold">총알당 데미지:</font> ${character[selectIndex][1].power}<br/>
        <font color="gold">기본 총알:</font> ${character[selectIndex][1].bullet}발<br/>
        <font color="gold">최대 총알:</font> ${character[selectIndex][1].bulletMax}발<br/>
        <font color="gold">패시브:</font> ${character[selectIndex][1].description.passive}<br/>
        <font color="gold">궁극기 &lt;${character[selectIndex][1].ultimateName}&gt;:</font> ${character[selectIndex][1].description.ultimate}
    `;
}

function tutorial(on) {
    if(on === true) {
        document.getElementById('tutorial-display').style.setProperty('display', 'block');
    }
    if(on === false) {
        document.getElementById('tutorial-display').style.setProperty('display', 'none');
    }
}