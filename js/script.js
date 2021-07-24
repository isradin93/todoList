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
                <button class="todo-remove"></button>
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

        const btnTodoDelete = document.querySelectorAll('.todo-remove');

        btnTodoDelete.forEach(function(basket, i) {
            basket.addEventListener('click', function() {
                basket.parentElement.parentElement.remove();
                todoData.value.splice(i, 1);
                render();
            });
        });
    });
    toLocalStorage();
};

todoControl.addEventListener('submit', function(e) {
    e.preventDefault();

    const newTodo = {
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