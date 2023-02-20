const taskContainer = document.querySelector('.task-container')
const submitButton = document.querySelector('.submit-button')

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
console.log(descendingTasks)

function render() {
  descendingTasks.forEach(task => {
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

    deleteElement.addEventListener('click', deleteTask)

    taskBlock.append(deleteElement, title, controller)
    taskContainer.append(taskBlock)
  })
}

render()

function deleteTask(e) {
  console.log(e.target.parentNode)
  e.target.parentNode.remove()
  // TODO Remove task from array after deleting
}

function addTask() {
  const inputElement = document.querySelector('input')
  const value = inputElement.value
  console.log(value)
  if (value) {
    taskContainer.innerHTML = ''
    tasks.push({
      name: value,
      priority: tasks.length,
    })
    render()
  }
}

submitButton.addEventListener('click', addTask)
