console.log(123);
window.addEventListener('beforeunload', e => beforeunloadHandler(e))
  
  function beforeunloadHandler (e) {
    let box = document.querySelector('.close')
    box.style.display = 'block'
    e.preventDefault()
    e.returnValue = '123123'
    return false;
  }