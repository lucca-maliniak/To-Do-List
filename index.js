const textoInput = document.querySelector('[texto]')
const btnAll = document.querySelector('[all]')
const btnPending = document.querySelector('[pending]')
const btnCompleted = document.querySelector('[completed]')
const btnClear = document.querySelector('[clear]')
const resultado = document.querySelector('[results-area]')

let emptyTask = true
const listTask = []
const listCompleted = []

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
    } else {
        resultado.innerHTML = '<span>You dont have any task here!</span>'
    }
}

function clearList() {
    resultado.innerHTML = ''
    listTask.forEach(e => {
        listTask.splice(0, listTask.length)
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

textoInput.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        const listItem = textoInput.value
        addTask(listItem)
        textoInput.value = ''
    }
})

btnClear.addEventListener('click', clearList)