function pageChange(n) {
    const pageName = ['main', 'game', 'result', 'loading'];
    const page = document.getElementsByClassName('page');
    
    if(typeof n === 'string') n = pageName.indexOf(n);

    for(let obj of page) {
        obj.style.setProperty('display', 'none');
    }
    page[n].style.setProperty('display', 'block');
}