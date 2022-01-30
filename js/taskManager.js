// Create the HTML for a task
// Add an data-task-id attribute to each task
// OPTIONAL 1: Add visible or invisible class to the "Mark As Done" button depending on if the status is 'TODO'
// OPTIONAL 2: Change the styling of the status pill depending on the passed in status
// Add a Delete button with the class delete-button
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
  <li class="card list-group-item" data-task-id=${id}>
    <div class="card-header">
      <h2>Task: ${name}</h2> 
      <div class="d-flex w-100 mb-3 justify-content-end">
        <p>Due: ${dueDate}</p>
      </div>
    </div>
    <div class="card-body">
      <h4 class="card-title justify-content-center">Details: ${description}</h4>
      <p class="card-text"></p>
    </div>

    <div class="d-flex w-100 mb-3 justify-content-end">  
      <p>Assigned To: ${assignedTo}</p>
    </div>

    <div class="card-footer">
          <!-- Button trigger modal -->
      <button type="button" class="btn btn-light edit-button btn-text-dark" data-toggle="modal" data-target="#staticBackdrop">Edit</button>

      <button id="doneButton" class="btn btn-info done-button float-middle ${status === 'To Do' ? 'visible' : 'invisible'}">Mark As Done</button> 

      <button id="deleteButton" class="btn btn-danger btn-text-white delete-button float-right">Delete</button> 
    </div>
  </li>
`;           
    

// Create a TaskManager class
class TaskManager {
    // Set up the tasks and currentId property in the contructor
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Create the addTask method
    addTask(name, description, assignedTo, dueDate, status, newId) {
        // When adding a task increment the id
        // When editing the task replace the old id (and delete the old task) 
        if (newId === '-1') {
            newId = this.currentId++
        } else {
            this.deleteTask(Number(newId));
        }
        // create the new task
        const task = {
            id: Number(newId),
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };

        // Push the new task to the task list
        this.tasks.push(task);

        // sort task list by due date
        this.tasks.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date); 
        });
    }

    // Create the deleteTask method
    deleteTask(taskId) {
        const newTasks = [];

        // Loop over the tasks
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if the task id is not the task id passed in as a parameter
            if (task.id !== taskId) {
                // Push the task to the newTasks array
                newTasks.push(task);
            }
        }

        // Set this.tasks to newTasks
        this.tasks = newTasks;
    }


    getTaskById(taskId) {
        // Create a variable to store the found task
        let foundTask;

        // Loop over the tasks and find the task with the id passed as a parameter
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }

        // Return the found task
        return foundTask;
    }

    // Create the render method
    render() {
        // Create an array to store the tasks' HTML
        const tasksHtmlList = [];

        // Loop over our tasks and create the html, storing it in the array
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Format the date
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            // Create the task html
            // Pass the task id as a parameter
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);

            // Push it to the tasksHtmlList array
            tasksHtmlList.push(taskHtml);
        }

        // Create the tasksHtml by joining each item in the tasksHtmlList
        // with a new line in between each item.
        const tasksHtml = tasksHtmlList.join('\n');

        // Set the inner html of the tasksList on the page
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;
    }

    // Create the save method
    save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);

        // Store the JSON string in localStorage
        localStorage.setItem('tasks', tasksJson);

        // Convert the currentId to a string;
        const currentId = String(this.currentId);

        // Store the currentId in localStorage
        localStorage.setItem('currentId', currentId);
    }

    // Create the load method
    load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem('tasks')) {
            // Get the JSON string of tasks in localStorage
            const tasksJson = localStorage.getItem('tasks');

            // Convert it to an array and store it in our TaskManager
            this.tasks = JSON.parse(tasksJson);
        }

        // Check if the currentId is saved in localStorage
        if (localStorage.getItem('currentId')) {
            // Get the currentId string in localStorage
            const currentId = localStorage.getItem('currentId');

            // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);
        }
    }
}


