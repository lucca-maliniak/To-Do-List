const textoInput = document.querySelector('[texto]')
const btnAll = document.querySelector('[all]')
const btnPending = document.querySelector('[pending]')
const btnCompleted = document.querySelector('[completed]')
const btnClear = document.querySelector('[clear]')
const resultado = document.querySelector('[results-area]')

const inputList = []
const listCompleted = []
const listPending = []
const listTask = []

function addTask(input) {
    let li = ''
    inputList.push(input)
    if(!(resultado.innerHTML === '')) {
        inputList.forEach((element, id) => {
            li = `<li class="task" liTask>
            <span class="left-area"> 
            <input type="checkbox" onclick="updateStatus(this)" id="${id}">
            <p class="name-task" task>${element}</p>
            </span>
            <i class="fa-solid fa-ellipsis" id="reticencias" reticencias></i>
            </li>`
        })
        listTask.push(li)
        resultado.innerHTML = desconstructArray(listTask)
        listPending.push(li)
    } else { 
        resultado.innerHTML = '<span>You dont have any task here!</span>'
    }
}

function desconstructArray(array) {
    return array.join('')
}

function clearList() {
    resultado.innerHTML = ''
    listTask.forEach(e => {
        listTask.splice(0, listTask.length)
    })
    listPending.forEach(e => {
        listPending.splice(0, listPending.length)
    })
    listCompleted.forEach(e => {
        listCompleted.splice(0, listCompleted.length)
    })
    resultado.innerHTML = '<span>You dont have any task here!</span>'
}

function updateStatus(task) {
    const textTask = document.querySelectorAll('[task]')
    const arrTask = Array.from(textTask)
    listPending.push(listTask[task.id])
    arrTask[task.id].classList.toggle('active')
    if(arrTask[task.id].classList.contains('active')){
        listCompleted.push(listTask[task.id])
        // todo 
    } else {
        listCompleted.pop()
    }
}

function showStatus(e) {
   const conteudo = e.target.textContent
   switch(conteudo) {
        case 'All':
            resultado.innerHTML = desconstructArray(listTask)
            break
        case 'Pending':
            resultado.innerHTML = desconstructArray(listPending)
            break
        case 'Completed':
            resultado.innerHTML = desconstructArray(listCompleted)
            console.log(listCompleted)
            break
        default:
            resultado.innerHTML = 'Error 404'
   }
}

textoInput.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        const listItem = textoInput.value
        addTask(listItem)
        textoInput.value = ''
    }
})

window.addEventListener('load', (() => resultado.innerHTML = '<span>You dont have any task here!</span>'))
btnClear.addEventListener('click', clearList)
btnAll.addEventListener('click', showStatus)
btnPending.addEventListener('click', showStatus)
btnCompleted.addEventListener('click', showStatus)