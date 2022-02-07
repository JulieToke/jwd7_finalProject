//Put in the current date string 
let todaysDate = new Date();
document.getElementById("date").innerHTML = todaysDate.toDateString();
console.log(todaysDate)


// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

// Load the tasks from localStorage
taskManager.load();

// Render the tasks to the page
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#newTaskForm');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newTaskId = document.querySelector('#newTaskId');
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskStatus = document.querySelector('#newTaskStatus');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');

    const modalTitle = document.querySelector('#staticBackdropLabel');

       // Get the values of the inputs
    const newId = newTaskId.value;
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const status = newTaskStatus.value;
    const dueDate = newTaskDueDate.value;

    // Add the task to the task manager
    taskManager.addTask(name, description, assignedTo, dueDate, status, newId);

    
    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();

    // Clear the form
    newTaskId.value = '-1';
    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';

    // Dismiss modal dialogue bootstrap documentation link below
    // https://getbootstrap.com/docs/4.0/components/modal/#:~:text=modal%20when%20initialized.-,Methods,-Asynchronous%20methods%20and
    $('#staticBackdrop').modal('toggle');
    modalTitle.textContent = 'Add New Task';
});

// Select modal
const modal = document.querySelector('#staticBackdrop');

// Close form event listener to reset form values
modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('resetButton')) {
        // Get modal inputs
        const newTaskId = document.querySelector('#newTaskId');
        const newTaskNameInput = document.querySelector('#newTaskNameInput');
        const newTaskDescription = document.querySelector('#newTaskDescription');
        const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
        const newTaskDueDate = document.querySelector('#newTaskDueDate');

        const modalTitle = document.querySelector('#staticBackdropLabel');
        
        // Clear the form
        newTaskId.value = '-1';
        newTaskNameInput.value = '';
        newTaskDescription.value = '';
        newTaskAssignedTo.value = '';
        newTaskDueDate.value = '';

        modalTitle.textContent = 'Add New Task';
    }
});


// Select newTaskButton
const addTaskButton = document.querySelector('#addTaskbutton');

// Close form event listener to reset form values
addTaskButton.addEventListener('click', (event) => {
    // Get modal inputs
    const newTaskId = document.querySelector('#newTaskId');
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');

    const modalTitle = document.querySelector('#staticBackdropLabel');

    // Clear the form
    newTaskId.value = '-1';
    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';

    modalTitle.textContent = 'Add New Task';
});

// Select the Tasks List
const tasksList = document.querySelector('#tasksList');

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener('click', (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains('mark-as-done-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        task.status = 'Done';

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }

   

    // Check if an "Edit" button was clicked
    if (event.target.classList.contains('edit-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Get modal inputs
        const newTaskId = document.querySelector('#newTaskId');
        const newTaskNameInput = document.querySelector('#newTaskNameInput');
        const newTaskDescription = document.querySelector('#newTaskDescription');
        const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
        const newTaskStatus = document.querySelector('#newTaskStatus');
        const newTaskDueDate = document.querySelector('#newTaskDueDate');

        const modalTitle = document.querySelector('#staticBackdropLabel');
        
        // Fill the modal inputs with the task-to-edit's values
        newTaskId.value = task.id;
        newTaskNameInput.value = task.name;
        newTaskDescription.value = task.description;
        newTaskAssignedTo.value = task.assignedTo;
        newTaskStatus.value = task.status;
        newTaskDueDate.value = task.dueDate;

        modalTitle.textContent = 'Edit Task';

    }
    
    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
        
    }
});