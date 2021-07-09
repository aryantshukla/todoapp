const themebtn = document.querySelector('.theme_pic')
const body = document.querySelector('body')

themebtn.addEventListener('click', (event) => {

  if (body.dataset.theme === 'dark') {
    body.dataset.theme = 'light'
    themebtn.src = './moon.png'

  } else {
    body.dataset.theme = 'dark'
    themebtn.src = './sun.png'
  }
})