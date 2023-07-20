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
    ${task.taskValue}
  </li>`;
    })
    .join("");
};

const getTask = function (e) {
  e.preventDefault();
  const taskValue = input.value;
  const task = {
    done: false,
    taskValue,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (taskValue !== "") {
    createTask(tasks);
    input.value = "";
  }
};
const doneTask = function (e) {
  const index = e.target.dataset.index;
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

form.addEventListener("submit", getTask);
list.addEventListener("click", doneTask);
tasks.forEach((task) => createTask(tasks, task.taskValue));
