const themeBtn = document.querySelector('.themePic') as HTMLImageElement
const body = document.querySelector('body') as HTMLBodyElement

themeBtn.addEventListener('click', () => {

  if (body.dataset.theme === 'dark') {
    body.dataset.theme = 'light'
    themeBtn.src = './moon.png'

  } else {
    body.dataset.theme = 'dark'
    themeBtn.src = './sun.png'
  }
})