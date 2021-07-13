export function showAlert(errMsg) {

  const div = document.createElement('div')
  div.classList.add('errMsg')
  div.textContent = `${errMsg}, Couldn't update!!!`

  document.body.append(div)

  setTimeout(() => {
    div.parentNode.removeChild(div)
  }, 6000)

}