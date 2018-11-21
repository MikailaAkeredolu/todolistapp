//Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEvenetListeners();

function loadEvenetListeners(){
    //DOM load event 
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear All Tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter Tasks
    filter.addEventListener('keyup', filterTasks);

}

//Clear Tasks
function clearTasks(){
    //taskList.innerHTML = '';
    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage();

}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//Get task from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop thru task and create the dom elements
    tasks.forEach(function(task){
        //create li elelment
    const li = document.createElement('li');
    //add a class
    li.className = 'collection-item';

    //create text node
    li.appendChild(document.createTextNode(task));

    //Create new link elelment
    const link = document.createElement('a');
      //add a class
      link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    //append the link to the li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    });


}


function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    }

    //create li elelment
    const li = document.createElement('li');
    //add a class
    li.className = 'collection-item';

    //create text node
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link elelment
    const link = document.createElement('a');
      //add a class
      link.className = 'delete-item secondary-content';

//add icon html
link.innerHTML = `<i class="fa fa-remove"></i>`;

//append the link to the li
li.appendChild(link);

//append li to ul
taskList.appendChild(li);

//Store in localSorage
storeTaskInLocalStorage(taskInput.value); //comes from input box value 
taskInput.value = '';

e.preventDefault();
}


//REMOVE TASK FUNCTION
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
            if(confirm('Are you sure?')){
            }
        e.target.parentElement.parentElement.remove();

        //remove from ls
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }

}

//remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index,1);
    }
});

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Filter Task
function filterTasks(e){  //e for parameter that is inputed
    const text = e.target.value.toLowerCase(); //get what is been typed in
    //console.log(text);

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}


function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
};