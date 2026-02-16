const STORAGE_KEY = "my-simple-todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");

let todos = loadTodos();

render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  saveTodos();
  render();
  form.reset();
  input.focus();
});

list.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) return;

  if (target.matches(".todo-item__delete")) {
    const id = target.dataset.id;
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    render();
  }
});

list.addEventListener("change", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) return;

  if (target.matches(".todo-item__checkbox")) {
    const id = target.dataset.id;
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: target.checked } : todo
    );
    saveTodos();
    render();
  }
});

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    list.innerHTML = `<li class="todo-item"><p class="todo-item__text">まだタスクはありません。追加してみましょう！</p></li>`;
  } else {
    const html = todos
      .map(
        (todo) => `
        <li class="todo-item ${todo.completed ? "completed" : ""}">
          <input
            class="todo-item__checkbox"
            type="checkbox"
            data-id="${todo.id}"
            ${todo.completed ? "checked" : ""}
            aria-label="${todo.text}を完了にする"
          />
          <p class="todo-item__text">${escapeHtml(todo.text)}</p>
          <button class="todo-item__delete" type="button" data-id="${todo.id}">削除</button>
        </li>
      `
      )
      .join("");

    list.innerHTML = html;
  }

  const remaining = todos.filter((todo) => !todo.completed).length;
  count.textContent = `全${todos.length}件（未完了 ${remaining}件）`;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
