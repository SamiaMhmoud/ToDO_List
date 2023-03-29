let input = document.querySelector(".input"),
submit = document.querySelector(".add"),
tasksDiv = document.querySelector(".tasks"),
noTask = document.querySelector(".tasks .no-task"),
tasksCount = document.querySelector(".tasks-count span"),
completedTasks = document.querySelector(".completed-tasks span"),
delAll = document.querySelector(".delete-all");

//Empty Array To Store The Tasks
let arrayOfTasks = [];
if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

window.onload = ()=> {
    input.focus()
}
//Add Task
submit.onclick = function() {
    if(input.value !== ''){
        addTaskToArray(input.value) //Task To Array Of Tasks
        input.value = "";
        input.focus();
    }else {
        noTask.innerHTML = "Please Enter Task To Show..!"
    }
}

tasksDiv.addEventListener('click',function(e) {
    if(e.target.className === 'del') {
        //Remove From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
        //Remove Task
        e.target.parentElement.remove(e.target.parentElement.getAttribute('data-id'));
    }
    //Toggle Done Class
    if(e.target.classList.contains('task')){
        //Toggle Complated For The Task
        toggleStatus(e.target.getAttribute('data-id'));
        //Toggle Done Class
        e.target.classList.toggle('done');
        calculateTasks(arrayOfTasks);
    }
});
//Add Task
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);
    //Add Task To Page
    addElementsToPageFrom(arrayOfTasks);
    //Add Tasks To LocalStorage
    addDataTolocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    //Empty Div Tasks
    tasksDiv.innerHTML = "";
    //Looping On Array Of Task 
    arrayOfTasks.forEach(task => {
        //Creat Main Div
        let div = document.createElement('div');
        div.className = 'task';
        //Check If Done
        if(task.completed){
            div.className = 'task done';
        }
        div.setAttribute('data-id', task.id);
        div.appendChild(document.createTextNode(task.title));
        //Create Delete Button
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('Delete'));
        //Append Button To main Div
        div.appendChild(span)
        //Append main Div To Tasks Div
        tasksDiv.appendChild(div);
    })
    calculateTasks(arrayOfTasks);
};

function addDataTolocalStorage(arrayOfTasks) {
    window.localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
};

function getDataFromLocalStorage() {
    let data = localStorage.getItem('tasks');
    if(data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task)=>task.id != taskId);
    addDataTolocalStorage(arrayOfTasks);
    calculateTasks(arrayOfTasks);
}

function toggleStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true):(arrayOfTasks[i].completed = false);
        }
    }
    addDataTolocalStorage(arrayOfTasks);
}

//Function To Calcl
function calculateTasks(arrayOfTasks) {
    //calculate All Tasks
    tasksCount.innerHTML = arrayOfTasks.length;
    //calculate All Complated Tasks
    completedTasks.innerHTML = document.querySelectorAll(".task.done").length;
}


delAll.onclick = ()=> {
    tasksDiv.innerHTML = '';
    window.localStorage.removeItem('tasks');
    arrayOfTasks = [];
    calculateTasks(arrayOfTasks);
    input.focus();
}
