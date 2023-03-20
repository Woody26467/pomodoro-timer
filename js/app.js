const taskContainer = document.querySelector('.task-container')
const submitButton = document.querySelector('.submit-button')
const timeLeftDisplay = document.querySelector('#time-left')
const sliderFill = document.querySelector('.fill')

const startCount = 25 * 60
let timeLeft = startCount
let timerId

let tasks = [
  {
    name: 'Practice CSS Animations',
    priority: 0,
  },
  {
    name: 'Dev Community work',
    priority: 2,
  },
  {
    name: 'Algorithm Studies',
    priority: 1,
  },
]

// Sort by priority
const descendingTasks = tasks.sort((a, b) => a.priority - b.priority)

function convertToMin(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = seconds - minutes * 60
  return minutes + ':' + (secondsLeft < 10 ? '0' : '') + secondsLeft
}

function handleClick(button) {
  switch (button.textContent) {
    case 'ACTIVE':
      button.textContent = 'PAUSED'
      clearInterval(timerId)
      break
    case 'PAUSED':
      button.textContent = 'ACTIVE'
      countDown(button)
      break
    default:
      const allButtons = document.querySelectorAll(
        '.controller-button'
      )
      allButtons.forEach(button => {
        button.textContent = 'START'
        button.classList.remove('active-button')
        clearInterval(timerId)
        timeLeft = startCount
        timeLeftDisplay.textContent = convertToMin(timeLeft)
      })

      button.textContent = 'ACTIVE'
      button.classList.add('active-button')
      countDown(button)
      break
  }
}

function countDown(button) {
  timerId = setInterval(() => {
    timeLeft--
    timeLeftDisplay.textContent = convertToMin(timeLeft)
    sliderFill.style.width = (timeLeft / startCount) * 100 + '%'
    if (timeLeft <= 0) {
      clearInterval(timerId)
      delete descendingTasks[button.id]
      button.parentNode.remove()
      timeLeft = startCount
      timeLeftDisplay.textContent = convertToMin(timeLeft)
    }
  }, 1000)
}

function render() {
  descendingTasks.forEach((task, index) => {
    const taskBlock = document.createElement('div')
    const deleteElement = document.createElement('p')
    const title = document.createElement('p')
    const controller = document.createElement('button')

    taskBlock.classList.add('task-block')
    deleteElement.classList.add('delete-icon')
    controller.classList.add('controller-button')

    deleteElement.textContent = '☒'
    title.textContent = task.name
    controller.textContent = 'START'

    controller.id = index

    deleteElement.addEventListener('click', deleteTask)
    controller.addEventListener('click', () =>
      handleClick(controller)
    )

    taskBlock.append(deleteElement, title, controller)
    taskContainer.append(taskBlock)
  })
}

render()

function deleteTask(e) {
  e.target.parentNode.remove()
  delete descendingTasks[e.target.parentNode.lastChild.id]
}

function addTask() {
  const inputElement = document.querySelector('input')
  const value = inputElement.value
  if (value) {
    taskContainer.innerHTML = ''
    inputElement.value = ''
    tasks.push({
      name: value,
      priority: tasks.length,
    })
    render()
  }
}

submitButton.addEventListener('click', addTask)
