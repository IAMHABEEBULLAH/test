// Check if user is already logged in on page load
window.onload = function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser && window.location.pathname === "/login.html") {
        // Redirect logged-in users to task manager
        window.location.href = "task-manager.html";
    }
};

// Register new user
function registerUser(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Save the user data in localStorage (simulating a simple user registration)
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert("Registration successful!");

    // Redirect to login page
    window.location.href = "login.html";
}

// Login user
function loginUser(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored user data
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        // Successfully logged in
        localStorage.setItem('loggedInUser', username);
        window.location.href = "task-manager.html";
    } else {
        alert("Invalid credentials!");
    }
}

// Logout user
function logout() {
    // Remove user data from localStorage
    localStorage.removeItem('loggedInUser');
    
    // Redirect to login page
    window.location.href = "login.html";
}

// Add task functionality
function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const date = document.getElementById('taskDate').value;
    const priority = document.getElementById('taskPriority').value;
    const content = document.getElementById('taskContent').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTask = {
        title: title,
        date: date,
        priority: priority,
        content: content,
        dateCreated: new Date()
    };

    // Add new task to the list and save it in localStorage
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}

// Render tasks on the page
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksGrid = document.getElementById('tasksGrid');
    tasksGrid.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('document-card');

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;
        taskCard.appendChild(titleElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = task.content;
        taskCard.appendChild(contentElement);

        const dateElement = document.createElement('small');
        dateElement.textContent = `Due: ${task.date} | Created on: ${task.dateCreated.toLocaleString()}`;
        taskCard.appendChild(dateElement);

        const priorityElement = document.createElement('div');
        priorityElement.classList.add('task-priority');
        priorityElement.textContent = `Priority: ${task.priority}`;
        taskCard.appendChild(priorityElement);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editTask(index);
        };
        taskCard.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(index);
        };
        taskCard.appendChild(deleteButton);

        tasksGrid.appendChild(taskCard);
    });
}

// Edit task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDate').value = task.date;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskContent').value = task.content;

    // Change the form to "update task" mode
    const form = document.getElementById('taskForm');
    form.onsubmit = function(event) {
        updateTask(event, index);
    };
}

// Update task
function updateTask(event, index) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const date = document.getElementById('taskDate').value;
    const priority = document.getElementById('taskPriority').value;
    const content = document.getElementById('taskContent').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks[index] = {
        title: title,
        date: date,
        priority: priority,
        content: content,
        dateCreated: tasks[index].dateCreated // Retain the original creation date
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Delete task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove the task at the specified index

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Sorting functionality (by alphabet and old/new)
document.getElementById('sortAlpha').addEventListener('click', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});

document.getElementById('sortOldNew').addEventListener('click', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});

// Filter tasks by title
document.getElementById('filter').addEventListener('input', function(event) {
    const filterText = event.target.value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(filterText)
    );
    renderFilteredTasks(filteredTasks);
});

// Render filtered tasks
function renderFilteredTasks(tasks) {
    const tasksGrid = document.getElementById('tasksGrid');
    tasksGrid.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('document-card');

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;
        taskCard.appendChild(titleElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = task.content;
        taskCard.appendChild(contentElement);

        const dateElement = document.createElement('small');
        dateElement.textContent = `Due: ${task.date} | Created on: ${task.dateCreated.toLocaleString()}`;
        taskCard.appendChild(dateElement);

        const priorityElement = document.createElement('div');
        priorityElement.classList.add('task-priority');
        priorityElement.textContent = `Priority: ${task.priority}`;
        taskCard.appendChild(priorityElement);

        tasksGrid.appendChild(taskCard);
    });
}

// Initial call to render tasks
renderTasks();
