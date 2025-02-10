// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
const toggleThemeBtn = document.getElementById("toggleTheme");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    addTask(taskText);
    saveTasks();
    taskInput.value = "";
});

// Add task function
function addTask(text, completed = false) {
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span class="${completed ? "completed" : ""}">${text}</span>
        <button class="edit">✏️</button>
        <button class="delete">🗑</button>
    `;

    // Mark task as completed
    li.querySelector("input").addEventListener("change", (e) => {
        li.querySelector("span").classList.toggle("completed", e.target.checked);
        saveTasks();
    });

    // Edit task
    li.querySelector(".edit").addEventListener("click", () => {
        const newText = prompt("Edit task:", text);
        if (newText) {
            li.querySelector("span").textContent = newText;
            saveTasks();
        }
    });

    // Delete task
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    document.querySelectorAll("#taskList li").forEach((li) => {
        if (li.querySelector("input").checked) {
            li.remove();
        }
    });
    saveTasks();
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input").checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTask(task.text, task.completed));
}

// Dark Mode Toggle
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
