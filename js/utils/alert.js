export function showAlert(errmsg) {

  const div = document.createElement('div')
  div.classList.add('errormsg')
  div.textContent = `${errmsg}, Couldn't update!!!`

  document.body.append(div)

  setTimeout(() => {
    div.parentNode.removeChild(div)
  }, 6000)

}