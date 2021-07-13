"use strict";
const themeBtn = document.querySelector('.themePic');
const body = document.querySelector('body');
themeBtn.addEventListener('click', () => {
    if (body.dataset.theme === 'dark') {
        body.dataset.theme = 'light';
        themeBtn.src = './moon.png';
    }
    else {
        body.dataset.theme = 'dark';
        themeBtn.src = './sun.png';
    }
});
//# sourceMappingURL=theme.js.map