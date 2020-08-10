// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskCompleted = document.querySelector('.collection-x');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const timeInput = document.querySelector('#time');
const addTaskItem = document.querySelector('.add-task-action')


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  document.addEventListener('DOMContentLoaded', getCompletedTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskCompleted.addEventListener('click', removeTask);
  // Remove task and add it to completed task event
  taskList.addEventListener('click', addCompletedTask);
}

// Get Tasks from LS
function getTasks() {
    let tasks = [["Buy MacBook", "Tomorrow"], ["Pay School Fees", "TOday"]];
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks)
    tasks.forEach(function(task){
      // Create li element
      const taskItem = document.createElement('li');
      // Add class
      taskItem.className = 'collection-item';
      //Create elements and button, and embed inside li element
      const taskContent = document.createElement('span');
      taskContent.className = 'task';
      taskContent.textContent = `${task[0]}`;

      const timeContent = document.createElement('span');
      timeContent.className = 'time-frame';
      timeContent.textContent = `${task[1]}`

      const completeBtn = document.createElement('button');
      completeBtn.className = 'secondary-content';
      completeBtn.textContent = 'completed'
      // Create text node and append to li
      taskItem.appendChild(taskContent);
      taskItem.appendChild(timeContent);
      taskItem.appendChild(completeBtn);
  
      // Append li to ul
      taskList.appendChild(taskItem);
    });
    return taskList
  }


// Get Completed Tasks from LS
function getCompletedTasks() {
    let completedTasks = [];
    if(localStorage.getItem('completedTasks') === null){
      completedTasks = [];
    } else {
      completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }
    console.log(completedTasks)
  
    completedTasks.forEach(function(task){
      // Create li element
      const completedTaskItem = document.createElement('li');
      // Add class
      completedTaskItem.className = 'collection-x';
      //Create elements and button, and embed inside li element
      const completedTaskContent = document.createElement('span');
      completedTaskContent.className = 'task';
      completedTaskContent.textContent = `${task[0]}`;

      const completedTimeContent = document.createElement('span');
      completedTimeContent.className = 'time-frame';
      completedTimeContent.textContent = `${task[1]}`

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'clear-tasks';
      deleteBtn.textContent = 'delete'
      // Create text node and append to li
      completedTaskItem.appendChild(completedTaskContent);
      completedTaskItem.appendChild(completedTimeContent);
      completedTaskItem.appendChild(deleteBtn);
  
      // Append li to ul
      taskCompleted.appendChild(completedTaskItem);
      console.log(task, taskCompleted);
    });
    return taskCompleted;
  }

  // Add Task to Incomplete Tasks
function addTask(e) {
    if(taskInput.value === '') {
      alert('Add a task');
    }
    // Create li element
    const taskItem = document.createElement('li');
    // Add class
    taskItem.className = 'collection-item';
    //Create elements and button, and embed inside li element
    const taskContent = document.createElement('span');
    taskContent.className = 'task';
    taskContent.textContent = `${taskInput.value}`;

    const timeContent = document.createElement('span');
    timeContent.className = 'time-frame';
    timeContent.textContent = `${timeInput.value}`

    const completeBtn = document.createElement('button');
    completeBtn.className = 'secondary-content';
    completeBtn.textContent = 'completed'
    // Create text node and append to li
    taskItem.appendChild(taskContent);
    taskItem.appendChild(timeContent);
    taskItem.appendChild(completeBtn);

    // Append li to ul
    taskList.appendChild(taskItem);
    // Store in LS
    storeTaskInLocalStorage(taskInput.value, timeInput.value);
  
    // Clear input
    taskInput.value = '';
    timeInput.value = '';
  
    e.preventDefault();
  }

// Store Task
function storeTaskInLocalStorage(task, time) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push([task, time]);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Store Completed Task
function storeCompletedTaskInLocalStorage(tasks) {
    let completedTasks;
    if(localStorage.getItem('completedTasks') === null){
        completedTasks = [];
    } else {
        completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }
    completedTasks.push([tasks.children[0].textContent, tasks.children[1].textContent]);
  
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }

  // Remove Completed Tasks
function removeTask(e) {
    if(e.target.parentElement.classList.contains('collection-x-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.remove();
  
        // Remove from LS
        removeCompletedTaskFromLocalStorage(e.target.parentElement);
      }
    }
}


  // Remove task and add it to completed task event
function addCompletedTask(e) {
    if(e.target.parentElement.classList.contains('collection-item')) {
        e.target.parentElement.className = 'collection-x-item';
        e.target.textContent = 'delete';
        e.target.className = 'clear-task';
        taskCompleted.appendChild(e.target.parentElement);
        storeCompletedTaskInLocalStorage(e.target.parentElement); 
        // Remove from LS
        //removeCompletedTaskFromLocalStorage(e.target.parentElement);
    }
  }

  // Remove from LS
function removeCompletedTaskFromLocalStorage(taskItem) {
    let completedTasks;
    if(localStorage.getItem('completedTasks') === null){
      completedTasks = [];
    } else {
      completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }

    console.log(completedTasks)
    console.log(taskItem)

    completedTasks.forEach(function(task, index){
      if([taskItem.children[0].textContent, taskItem.children[1].textContent] === task){
        completedTasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }

  console.log(taskList.textContent);