window.addEventListener('load', start)

let globalName = ['um', 'dois', 'tres', 'quatro']
let inputName = null
let isEdit = false
let currentIndex

function start () {
  inputName = document.querySelector('input')
  preventFormSubmit()
  activeInputName()
  render()
}

function preventFormSubmit () {
  const form = document.querySelector('form')
  function handleFormSubmit (event) {
    event.preventDefault()
  }
  form.addEventListener('submit', handleFormSubmit)
}

function activeInputName () {
  function insertName (name) {
    globalName.push(name)
  }

  function updateName(newName) {
    globalName[currentIndex] = newName

  }


  function handleTyping (event) {
    if (event.key === 'Enter') {
      if (isEdit) {
        updateName(event.target.value)
      } else {
        insertName(event.target.value)
      }
      
      render()
      isEdit = false
      clearInput()
    }
  }

  inputName.addEventListener('keyup', handleTyping)
  inputName.focus()
}

function render () {
  const ul = document.querySelector('ul')
  ul.innerHTML = ''

  for (let i = 0; i < globalName.length; i++) {
    let currentName = globalName[i]
    const li = document.createElement('li')

    function deleteButtonName (index) {
      function deleteName () {
        globalName.splice(index, 1)
        render()
      }

      const btx = document.createElement('button')
      btx.textContent = 'x'
      btx.classList.add('buttonDelete')

      btx.addEventListener('click', deleteName)

      return btx
    }

    function createSpan (name, index) {
      function editItem () {
        inputName.value = name
        inputName.focus()
        isEdit = true
        currentIndex = index
      }

      const span = document.createElement('span')
      span.textContent = name
      span.classList.add('clickble')

      span.addEventListener('click', editItem)

      return span
    }

    const btx = deleteButtonName(i)
    const span = createSpan(currentName, i)
    li.appendChild(btx)
    li.appendChild(span)
    ul.appendChild(li)
    clearInput()
  }
}

function clearInput () {
  inputName.value = ''
  inputName.focus()
}
