// Create the HTML for each task list item or task
// Add an data-task-id attribute to each task
// OPTIONAL - 1: Add visible class to the 'Mark As Done' button if the status is 'To Do', 'In Progress' or 'Review' or else if the status is 'Done' set the 'Mark As Done' to 'invisible'
// OPTIONAL - 2: Add a status Badge or Button and change the styling of it depending on the passed in status
// Add a Delete button with the class delete-button
//Add an Edit button to trigger a modal in which a task can be edited 
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
<li id="task" class="card" style="max-width: 100%;" data-task-id=${id}>
<div class="card-header">
    <button id="toDoButton" class="btn todo-button ${status === 'To Do' ? 'visible' : 'invisible'}">To Do</button>
    <button id="inProgressButton" class="btn in-progress-button ${status === 'In Progress' ? 'visible' : 'invisible'}">In Progress</button>
    <button id="reviewButton" class="btn review-button ${status === 'Review' ? 'visible' : 'invisible'}">Review</button>
    <button id="doneButton" value="DONE" class="btn done-button ${status === 'Done' ? 'visible' : 'invisible'}">Done</button>
</div>
<div class="card-body">
  <h4 class="card-title">Task: ${name}</h4>
  <p class="card-text">Description: ${description}</p>
  <p class="card-text">Assigned To: ${assignedTo}</p>
  <p class="card-text">Due Date: ${dueDate}</p>
</div>
<div class="card-footer">    
    <button id="editButton" class="btn edit-button" data-toggle="modal" data-target="#staticBackdrop">Edit</button>
    <button id="markDoneButton" class="btn mark-as-done-button ${status === 'To Do' || status === 'In Progress' || status ==='Review' ? 'visible' : 'invisible'}">Mark as Done</button>
    <button id="deleteButton" class="btn delete-button">Delete</button>
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

        // Push the new task to the new task list
        this.tasks.push(task);

        // sort task list by due date
        this.tasks.sort(function(a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate); 
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


