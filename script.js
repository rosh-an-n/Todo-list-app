const input = document.getElementById("todo-input");
const button = document.getElementById("submit");
const listContainer = document.getElementById("todo-lists");

button.addEventListener("click", () => {
  const task = input.value.trim();
  if (task === "") return;
  addTodo(task);
  input.value = "";
});

function addTodo(task) {
  const item = document.createElement("div");
  item.className = "todo-item";
  item.draggable = true;

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = task;
  textInput.setAttribute("readonly", "readonly");
  textInput.classList.add("text");

  const actionDiv = document.createElement("div");
  actionDiv.className = "action-items";


  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.className = "complete-btn";
  completeBtn.onclick = () => {
    textInput.classList.toggle("done");
  };

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "delete-btn";
  removeBtn.onclick = () => {
    listContainer.removeChild(item);
  };

  actionDiv.appendChild(completeBtn);
  actionDiv.appendChild(removeBtn);

  item.appendChild(textInput);
  item.appendChild(actionDiv);
  listContainer.appendChild(item);

  addDragEvents(item);
}

function addDragEvents(el) {
  el.addEventListener("dragstart", () => {
    el.classList.add("dragging");
  });
  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });
}

listContainer.addEventListener("dragover", e => {
  e.preventDefault();
  const afterElement = getDragAfterElement(listContainer, e.clientY);
  const dragging = document.querySelector(".dragging");
  if (afterElement == null) {
    listContainer.appendChild(dragging);
  } else {
    listContainer.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".todo-item:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
