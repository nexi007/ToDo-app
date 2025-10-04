const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const message = document.getElementById("message");

let tasks = []; // array med objekt {text: "...", done: true/false}
let messageTimeout = null;

function showMessage(text, type = "error", duration = 3000) {
  // type kan vara "error" eller "info" (vi använder bara error nu)
  clearTimeout(messageTimeout);
  message.textContent = text;
  message.className = ""; // reset
  message.classList.add(type === "error" ? "error" : "info");
  // visa
  message.classList.remove("hidden");
  // göm efter duration
  messageTimeout = setTimeout(() => {
    message.classList.add("hidden");
  }, duration);
}

function updateCounter() {
  const doneCount = tasks.filter(task => task.done).length;
  counter.textContent = `Slutförda uppgifter: ${doneCount}`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.style.flex = "1";

    if (task.done) {
      li.classList.add("done");
    }

    // toggle klar/inte klar (klick på li)
    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    });

    // delete knapp
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.setAttribute("aria-label", "Ta bort uppgift");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // hindra klick på li
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

function addTaskFromInput() {
  const text = input.value.trim();

  if (text === "") {
    showMessage("Du måste skriva något innan du lägger till.", "error", 3500);
    return;
  }

  tasks.push({ text: text, done: false });
  input.value = "";
  renderTasks();
  input.focus();
}

// Klick på knapp
addBtn.addEventListener("click", addTaskFromInput);

// Lägg till med Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskFromInput();
  }
});

// initial render
renderTasks();
