'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

// Запись в localStorage
let toLocalStorage = function() {
    let jsonTodoData = JSON.stringify(todoData);
    localStorage.setItem('data', jsonTodoData);
};
// Вытаскиваем значения из localStorage
let fromLocaleStorage = function() {
    if (localStorage.getItem('data')) {
        todoData = localStorage.getItem('data');
        todoData = JSON.parse(todoData);
    }
};

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button data-id="${item.id}" class="todo-remove"></button>
                <button class="todo-complete"></button> 
            </div>
        `;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        const btnTodoDelete = li.querySelector('.todo-remove');

        btnTodoDelete.addEventListener('click', function() {
            todoData = todoData.filter(item => {
                return item.id !== btnTodoDelete.dataset.id;
            });

            render();
        });
    });

    toLocalStorage();
};

todoControl.addEventListener('submit', function(e) {
    e.preventDefault();

    const newTodo = {
        id: Math.random().toString(36).substring(2, 8) + (+new Date()).toString(32),
        value: headerInput.value,
        completed: false
    };

    if (newTodo.value === '') {
        e.preventDefault();
    } else {
        todoData.push(newTodo);
        headerInput.value = '';
        toLocalStorage();
        render();
    }
});

fromLocaleStorage();
render();