const modal = document.querySelector('.askTime')

export function askForTime(key) {
  return new Promise((resolve) => {

    modal.classList.toggle('modalhidden')
    modal.classList.toggle('modalshow')

    function handleClick(event) {
      const cancelbtn = modal.querySelector('.cancelTime')
      const submitbtn = modal.querySelector('.submitTime')
      if (event.target === cancelbtn) {
        modal.classList.toggle('modalhidden')
        modal.classList.toggle('modalshow')
        modal.removeEventListener('click', handleClick)
        resolve(-1);
      }
      if (event.target === submitbtn) {
        modal.classList.toggle('modalhidden')
        modal.classList.toggle('modalshow')
        modal.removeEventListener('click', handleClick)
        let val = modal.querySelector('input').value
        if (!val)
          val = -1
        resolve(val)
      }
    }

    modal.addEventListener('click', handleClick)

  })
}


export function getsec(dline, us_encode = 0) {
  if (us_encode)
    return dline.slice(0, 4) * 30000 + dline.slice(5, 7) * 300 + dline.slice(9)
  return dline.slice(6) * 30000 + dline.slice(3, 5) * 300 + dline.slice(0, 2)
}