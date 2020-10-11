const LOGINUSER_STORAGE_KEY = 'LoggedInUserDB';
var gLoggedUser;
var gSortBy;

var gUsers = [
    {
        id: 'u101',
        userName: 'puki',
        password: 'secret',
        lastLoginTime: 0,
        isAdmin: false
    },
    {
        id: 'u102',
        userName: 'Max',
        password: '12345',
        lastLoginTime: 0,
        isAdmin: false
    },
    {
        id: 'u103',
        userName: 'Alex',
        password: 'admin',
        lastLoginTime: 0,
        isAdmin: true
    }
];

function updateModel(){
    gUsers.forEach(function (user, idx) {
        newUser = loadFromStorage(user.id)
        gUsers[idx] = newUser;
    });
}

function isRightLogin(user,pass){
    var res;
    var enteredUser = gUsers.find(i => i.userName === user);
    var enteredPass = gUsers.find(i => i.password === pass);
    if (!enteredUser || !enteredPass){
        return false;
    } else
    res = true;
    enteredUser.lastLoginTime = getTimeStamp();
    gLoggedUser = enteredUser;
    return res;
}




function setSort(sortBy) {
    if (sortBy) gSortBy = sortBy;
    if (sortBy === 'CREATED') sortUsersByLoginTime()
    if (sortBy === 'TXT') sortUsersByTxt()
}

function sortUsersByLoginTime() {
    gUsers.sort(function (a, b) {
        let dateA = a.lastLoginTime;
        let dateB = b.lastLoginTime;
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}


function sortUsersByTxt() {
    gUsers.sort(function (a, b) {
        let dateA = a.userName;
        let dateB = b.userName;
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}









// var gFilterBy = 'ALL';
// var gTodos = _createTodos();


// function getTodosForDisplay() {
//     if (gFilterBy === 'ALL') return gTodos;
//     var res = gTodos.filter(function(todo){
//         return (
//             gFilterBy === 'DONE' && todo.isDone ||
//             gFilterBy === 'ACTIVE' && !todo.isDone
//         )
//     })
//     return res;
// }

// function addTodo(txt) {
//     gTodos.unshift(_createTodo(txt))
//     saveToStorage(STORAGE_KEY, gTodos);

// }

// function removeTodo(id) {
//     var idx = gTodos.findIndex(function(todo){
//         return todo.id === id
//     })
//     gTodos.splice(idx, 1);
//     saveToStorage(STORAGE_KEY, gTodos);
// }

// function toggleTodo(id) {
//     var todo = gTodos.find(function(todo){
//         return todo.id === id
//     })
//     todo.isDone = !todo.isDone;
//     saveToStorage(STORAGE_KEY, gTodos);
// }

// function setFilter(filterBy) {
//     gFilterBy = filterBy;
// }

// function getTodosCount() {
//     return gTodos.length
// }
// function getActiveTodosCount() {
//     var count = gTodos.reduce(function(count, todo){
//         if (!todo.isDone) count +=1
//         return count;
//     }, 0)
//     return count;
// }
// function getActiveTodosCount1() {
//     var activeTodos = gTodos.filter(function(todo){
//         return !todo.isDone 
//     })
//     return activeTodos.length;
// }


// // Those functions are PRIVATE - not to be used outside this file!
// function _createTodo(txt) {
//     return {
//         id: makeId(),
//         txt: txt,
//         isDone : false
//     };
// }
// function _createTodos() {
//     var todos = loadFromStorage(STORAGE_KEY);
//     if (!todos) {
//         todos = []
//         todos.push(_createTodo('Learn HTML'))
//         todos.push(_createTodo('Master CSS'))
//         todos.push(_createTodo('Become JS Ninja'))
//     }
//     return todos;
// }



