const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSortBy = '';
var gTodos = _createTodos();


function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTodos;
    var res = gTodos.filter(function (todo) {
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })
    // sort before i give to controller
    return res;
}

function sortTodosByDate() {
    gTodos.sort(function (a, b) {
        let dateA = a.createdAt;
        let dateB = b.createdAt;
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}


function sortTodosByTxt() {
    gTodos.sort(function (a, b) {
        let dateA = a.txt;
        let dateB = b.txt;
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}

function sortTodosByImp() {
    gTodos.sort(function (a, b) {
        let dateA = a.importance;
        let dateB = b.importance;
        if (dateA > dateB) {
            return -1;
        }
        else if (dateA < dateB) {
            return 1;
        }
        return 0;
    });
}

function addTodo(txt, imp) {
    gTodos.unshift(_createTodo(txt, imp))
    saveToStorage(STORAGE_KEY, gTodos);

}

function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gTodos);
}

function setImp(id, imp) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos[idx].importance = imp;
    saveToStorage(STORAGE_KEY, gTodos);
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    if (sortBy) gSortBy = sortBy;
    if (sortBy === 'CREATED') sortTodosByDate()
    if (sortBy === 'TXT') sortTodosByTxt()
    if (sortBy === 'IMPORTANCE') sortTodosByImp()
}


function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}




// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt, imp = '1') {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        importance: imp,
        createdAt: getTimeStamp()
    };
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML'))
        todos.push(_createTodo('Master CSS'))
        todos.push(_createTodo('Become JS Ninja'))
    }
    return todos;
}

function handleEmptyTodos(){
    strHTML = '';
    if (gFilterBy === 'ALL') strHTML = 'No Todos...'
    if (gFilterBy === 'ACTIVE') strHTML = 'No Active Todos...'
    if (gFilterBy === 'DONE') strHTML = 'No Done Todos...'
    return strHTML
}

function checkEmptyTodos(){
    var todos = getTodosForDisplay();
    if (!todos) renderTodos()
    return;
}

