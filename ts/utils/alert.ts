export function showAlert(errMsg:string) {

  const div = document.createElement('div')
  div.classList.add('errMsg')
  div.textContent = `${errMsg}, Couldn't update!!!`

  document.body.append(div)

  setTimeout(() => {
    if(div.parentNode === null){
      return
    }
    div.parentNode.removeChild(div)
  }, 6000)

}

export function isKeyUndefined(key:any):key is undefined{
  return key===undefined
}

