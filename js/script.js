const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");

const searchInput = document.querySelector("#search-input");

const filterSelect = document.querySelector("#filter-select");

const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach(todo => {
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const filterTodos = (filter) => {
    const todos = document.querySelectorAll(".todo"); 

    todos.forEach(todo => {
        const isDone = todo.classList.contains("done");
        if ((filter === "all") || (filter === "done" && isDone) || (filter === "need" && !isDone)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
}

const searchTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        
        if (todoTitle.includes(text.toLowerCase())) {
            todo.style.display = "flex"; 
        } else {
            todo.style.display = "none"; 
        }
    });
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    inputValue ? saveTodo(inputValue) : alert("Please, put something to do!")
})

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parenteEl = targetEl.closest("div");
    let todoTitle;

    if(parenteEl && parenteEl.querySelector("h3")){
        todoTitle = parenteEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parenteEl.classList.toggle("done");
    };

    if(targetEl.classList.contains("remove-todo")){
        parenteEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue);
        toggleForms();
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

filterSelect.addEventListener("change", () => {
    filterTodos(filterSelect.value);
})

searchInput.addEventListener("input", () => {
    searchTodo(searchInput.value);
})

