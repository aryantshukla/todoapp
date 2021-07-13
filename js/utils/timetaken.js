const modal = document.querySelector('.askTime')

export function askForTime(key) {
  return new Promise((resolve) => {

    modal.classList.toggle('modalHidden')
    modal.classList.toggle('modalShow')

    function handleClick(event) {
      const cancelbtn = modal.querySelector('.cancelTime')
      const submitbtn = modal.querySelector('.submitTime')
      if (event.target === cancelbtn) {
        modal.classList.toggle('modalHidden')
        modal.classList.toggle('modalShow')
        modal.removeEventListener('click', handleClick)
        resolve(-1);
      }
      if (event.target === submitbtn) {
        modal.classList.toggle('modalHidden')
        modal.classList.toggle('modalShow')
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


export function getSec(fLine, us_encode = 0) {
  if (us_encode)
    return fLine.slice(0, 4) * 30000 + fLine.slice(5, 7) * 300 + fLine.slice(9)
  return fLine.slice(6) * 30000 + fLine.slice(3, 5) * 300 + fLine.slice(0, 2)
}