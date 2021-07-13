const themebtn = document.querySelector('.themePic') as HTMLImageElement
const body = document.querySelector('body') as HTMLBodyElement

themebtn.addEventListener('click', (event) => {

  if (body.dataset.theme === 'dark') {
    body.dataset.theme = 'light'
    themebtn.src = './moon.png'

  } else {
    body.dataset.theme = 'dark'
    themebtn.src = './sun.png'
  }
})