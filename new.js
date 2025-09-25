const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Display Task
function displayTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

let editIndex = -1;

// Add a new task
function addOrUpdateTask() {
    let tasks = getTasks();
    const tasktext = taskInput.value.trim();
    if (tasktext === "") {
        alert("please enter a task!")
        return;
    }
    if (editIndex === -1) {
        tasks.push(tasktext);
    }
    else {
        tasks[editIndex] = taskInput.value
        editIndex = -1;
        addBtn.textContent = "Add";
    }

    saveTasks(tasks);
    taskInput.value = "";
    displayTasks();
}

// Edit a task
function editTask(index) {
    let tasks = getTasks();
    taskInput.value = tasks[index];
    editIndex = index;
    addBtn.textContent = "Edit";
    taskInput.focus();

    saveTasks(tasks);
    displayTasks();

}


// Delete a task
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
}
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addOrUpdateTask();
    }
});

addBtn.addEventListener("click", addOrUpdateTask);
displayTasks();


window.onload = () => {
    displayTasks();
}