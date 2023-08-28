const textoInput = document.querySelector('[texto]')
const btnAll = document.querySelector('[all]')
const btnPending = document.querySelector('[pending]')
const btnCompleted = document.querySelector('[completed]')
const btnClear = document.querySelector('[clear]')
const resultado = document.querySelector('[results-area]')

let emptyTask = true
const listTask = []
const listCompleted = []
const listPending = []

function addTask(input) {
    let li = ''
    listTask.push(input)
    input == '' ? emptyTask : emptyTask = false
    if(!emptyTask) {
        listTask.forEach((element, id) => {
            li += `<li class="task" fullTask>
            <span class="left-area"> 
            <input type="checkbox" onclick="updateStatus(this)" id="${id}">
            <p class="name-task" task>${element}</p>
            </span>
            <i class="fa-solid fa-ellipsis" id="reticencias" reticencias></i>
            </li>`
        })
        resultado.innerHTML = li
        listPending.push(li)
    } else {
        resultado.innerHTML = '<span>You dont have any task here!</span>'
    }
}

function clearList() {
    emptyTask = true
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
}

function updateStatus(task) {
    const textTask = document.querySelectorAll('[task]')
    const fullTask = document.querySelector('[fullTask]')
    const arrTask = Array.from(textTask)
    arrTask[task.id].classList.toggle('active')
    if(arrTask[task.id].classList.contains('active')){
        listCompleted.push(fullTask)
    } else {
        listCompleted.pop()
    }
}

function showStatus(e) {
   const conteudo = e.target.textContent
   switch(conteudo) {
        case 'All':
            resultado.innerHTML = "All"
            break
        case 'Pending':
            constructBody(listPending)
            break
        case 'Completed':
            resultado.innerHTML = "Completed"
            break
        default:
            resultado.innerHTML = 'error 404'
   }
   // TODO
}

function constructBody(list) {
    list.forEach((e, i) => {
        resultado.innerHTML = e[i]
    })
    // TODO
}

textoInput.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        const listItem = textoInput.value
        addTask(listItem)
        textoInput.value = ''
    }
})

btnClear.addEventListener('click', clearList)
btnAll.addEventListener('click', showStatus)
btnPending.addEventListener('click', showStatus)
btnCompleted.addEventListener('click', showStatus)