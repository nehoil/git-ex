'use strict'

// Todo:
// 1. FIX if change imp then then imp selector will be with the choosen imp
// 2. Change imp selector to rounded color buttons.
// 3. Fix when add a new task keep it on the curr sort-order.
// 4. Fix On add Todo imp selector got stuck on the last imp value and not reseted to 'Normal' value.

function onInit() {
    renderTodos();
}


function convertImpToName(imp){
 if (imp === '1') return 'normal';
 if (imp === '2') return 'medium';
 if (imp === '3') return 'high';
}

function renderTodos() { 
    var strHTML = ''
    var todos = getTodosForDisplay();
    if (!todos.length) strHTML += handleEmptyTodos();
    todos.forEach(function (todo) {
        var imp = convertImpToName(todo.importance);
        // console.log(imp);
        strHTML +=
        `<li data-id="${todo.id}" class="${(todo.isDone) ? 'done' : ''} ${imp}" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
        <section class="imp-container">
        <select onclick="stopProp(event)" onchange="onSetImp(event, this.value, '${todo.id}')">
        <option value="1">Normal</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
        </select>
        </section>
        </li>  <div class="time-container"> ${(todo.createdAt) ? todo.createdAt : ''} </div>`
    })
    document.querySelector('.todo-list').innerHTML = strHTML;

    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var elNewTodoImp = document.querySelector('.new-todo-imp');
    var txt = elNewTodoTxt.value
    var imp = elNewTodoImp.value 
    if (!txt) return;
    addTodo(txt, imp);
    onSetSort()
    renderTodos();
    elNewTodoTxt.value = '';
    // elNewTodoImp.value = 'Normal';
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (!isSure) return;
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos();
}

function onSetImp(event, imp, todoId) {
    setImp(todoId, imp);
    renderTodos();
    event.value = 'imp';
    // try to fix imp selector value is getting back to normal instead of the selected imp.
    // empName = convertImpToName(imp)
    // document.querySelector(`[data-id="${todoId}"]`).classList.add(`${empName}`)
}

function stopProp(ev) {
    ev.stopPropagation();
}