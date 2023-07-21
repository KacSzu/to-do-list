const input = document.querySelector(".to-do-input");
const form = document.querySelector(`.form`);
const list = document.querySelector(`.list`);
const deleteIcon = document.querySelector(".delete-task");
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

const getTask = function (e) {
  e.preventDefault();
  const taskValue = input.value;
  if (taskValue === "") return;
  const task = {
    done: false,
    taskValue,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(tasks);
  input.value = "";
};
const doneTask = function (e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const deleteTask = function (e) {
  const index = e.target.dataset.index;
  tasks.splice(index, 1);
  createTask(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


form.addEventListener("submit", getTask);
list.addEventListener("click", doneTask);
list.addEventListener("click", deleteTask);
tasks.forEach((task) => createTask(tasks, task.taskValue));
