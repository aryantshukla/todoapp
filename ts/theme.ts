const themeBtn = document.getElementsByClassName('themePic')[0] as HTMLImageElement
const body = document.getElementsByTagName('body')[0] as HTMLBodyElement

themeBtn.addEventListener('click', () => {

  if (body.dataset.theme === 'dark') {
    body.dataset.theme = 'light'
    themeBtn.src = './moon.png'

  } else {
    body.dataset.theme = 'dark'
    themeBtn.src = './sun.png'
  }
})