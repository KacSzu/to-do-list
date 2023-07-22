const input = document.querySelector(".to-do-input");
const form = document.querySelector(`.form`);
const list = document.querySelector(`.list`);
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const createTask = function (tasks = []) {
  list.innerHTML = tasks
    .map((task, i) => {
      return `<li class="to-do">
    <input type="checkbox" data-index =${i} class="checkbox" ${
        task.done ? "checked" : ""
      } />
    ${
      task.taskValue
    } <ion-icon class="delete-task" data-index =${i} name="trash-bin-outline"></ion-icon>
  </li>`;
    })
    .join("");
};

const saveToLocalStorage = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getTask = function (e) {
  e.preventDefault();
  const taskValue = input.value;
  if (taskValue === "") return;
  const task = {
    done: false,
    taskValue,
  };
  tasks.push(task);
  saveToLocalStorage();

  createTask(tasks);
  input.value = "";
};
const handleDeleteAndDone = function (e) {
  if (e.target.matches("input")) {
    const index = e.target.dataset.index;
    tasks[index].done = !tasks[index].done;
    saveToLocalStorage();
  }
  if (e.target.matches("ion-icon")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    createTask(tasks);
    saveToLocalStorage();
  }
};

form.addEventListener("submit", getTask);
list.addEventListener("click", handleDeleteAndDone);
createTask(tasks);
