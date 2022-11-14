function levelPreview(type, index) {
    pageChange(2);
    document.documentElement.style.setProperty("--type-color", color[type]);
    page(2).innerHTML = 
`<div class="background" style="width: calc(100vw / 9 * 7); left: 0; animation: preview-background 1000ms;">
    <div id="preview-difficulty" class="preview-text">${level[type][index].difficulty}</div>    
    <div id="preview-emoji" class="preview-text">${level[type][index].emoji}</div>
    <div id="back-btn" class="preview-text" onclick="pageChange(1)">⇐</div>
</div>
<div id="preview-box">
    <div id="preview-name" class="preview-text">${level[type][index].name}</div>
    <div id="preview-artist" class="preview-text">${level[type][index].artist}</div>
</div>
<div class="preview-text next-btn" style="display: ${index - 1 >= 0 ? "block" : "none"}; left: 20px;" onclick="levelPreview('${type}', ${index - 1})">&lt;</div>
<div class="preview-text next-btn" style="display: ${index + 1 < level[type].length ? "block" : "none"}; right: 20px;" onclick="levelPreview('${type}', ${index + 1})">&gt;</div>
<div id="play-btn">play</div>`;
}