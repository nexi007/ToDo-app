const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = []; // array med objekt {text: "...", done: true/false}

function updateCounter() {
  const doneCount = tasks.filter(task => task.done).length;
  counter.textContent = `Done tasks: ${doneCount}`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("done");
    }

    // toggle klar/inte klar
    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    // delete knapp
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // hindra klick på li
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") {
    alert("You must write something!");
    return;
  }

  tasks.push({ text: text, done: false });
  input.value = "";
  renderTasks();
});