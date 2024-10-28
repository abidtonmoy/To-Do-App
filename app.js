let tasks = [];

// Add a new task to the list
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTaskList();
    taskInput.value = ""; // Clear input after adding a task
    updateStats(); // Update progress stats after adding a task
  }
};

// Toggle task completion status
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats(); // Update progress stats after toggling a task
};

// Delete a task from the list
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats(); // Update progress stats after deleting a task
};

// Edit a task's text
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text; // Pre-fill input with the task text
  tasks.splice(index, 1); // Remove the task being edited
  updateTaskList();
  updateStats();
};

// Update the task list in the UI
const updateTaskList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = ""; // Clear the list before re-rendering

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          } />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" onclick="editTask(${index})" />
          <img src="./img/delete.png" onclick="deleteTask(${index})" />
        </div>
      </div>
    `;

    // Handle checkbox change event
    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

// Update the progress bar and stats numbers
const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  // Update the numbers (completed / total)
  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTasks}`;

  // Calculate progress percentage
  const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;

  // Update the width of the progress bar
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  if (tasks.length && completeTasks === totalTasks) {
    blastConfetti();
  }
};

// Add event listener to the form submit button
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission
  addTask();
});

const blastConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};
