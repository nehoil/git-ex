'use strict'


function onInit() {
    var loggedUser = loadFromStorage(LOGINUSER_STORAGE_KEY);
    var user1 = loadFromStorage(gUsers[0].id)
    if (!user1) saveUsersToStorage();
    if (!loggedUser) return;
    handleComeBack(loggedUser);
}

function onInitAdmin(){
    updateModel()
    gLoggedUser = loadFromStorage(LOGINUSER_STORAGE_KEY);
    if (!gLoggedUser.id) redirectHome();
    if (!gLoggedUser.isAdmin) redirectHome();
    renderAdminTable()
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderAdminTable();
}

function renderAdminTable(){
    var newUser;
    var strHTML = `
    <table border="0" class="db-table">
    <thead>
        <tr>
            <td>UserName</td>
            <td>Password</td>
            <td>LastLoginTime</td>
            <td>isAdmin</td>
        </tr>
    </thead>
    <tbody>`
    gUsers.forEach(function (user) {
        newUser = loadFromStorage(user.id)
        var lastlogin = (newUser.lastLoginTime) ? newUser.lastLoginTime : 'N/A'
        strHTML += `
        <tr>
        <td>${newUser.userName}</td>
        <td>${newUser.password}</td>
        <td>${lastlogin}</td>
        <td>${newUser.isAdmin}</td>
        </tr>`
    });
    strHTML += `</tbody></table>`
    document.querySelector('.users-table').innerHTML = strHTML;
}

function onLogin() {
    var elUser = document.querySelector('.username');
    var elPass = document.querySelector('.password');
    var user = elUser.value;
    var pass = elPass.value;
    (isRightLogin(user,pass)) ? handleRightLogin(user) : handleWrongLogin();
}

function onLogout(page){
    handleLogout(page)
}


function handleRightLogin(user){
    document.querySelector('.login-container').classList.add('hide');
    showSecretContent(user);
    if (gLoggedUser.isAdmin) handleAdmin();
    var loggedUserId = gLoggedUser.id
    saveToStorage(LOGINUSER_STORAGE_KEY, gLoggedUser);
    var user1 = loadFromStorage(gUsers[0].id)
    if (!user1) saveUsersToStorage();
    saveToStorage(loggedUserId, gLoggedUser)
    updateModel()
}


function handleComeBack(user){
    gLoggedUser = user;
    document.querySelector('.login-container').classList.add('hide');
    if (gLoggedUser.isAdmin) handleAdmin();
    var username = user.userName
    showSecretContent(username);
}

function showSecretContent(user){
    document.querySelector('.secret-content').classList.remove('hide');
    document.querySelector('.logged-header').classList.remove('hide');
    document.querySelector('.username-container').innerHTML = `Welcome back ${user}!`
}



function handleAdmin(){
    document.querySelector('.admin-link').classList.remove('hide');
}

function redirectHome(){
    window.location.href = 'index.html';
}

function handleLogout(page){
    localStorage.removeItem('LoggedInUserDB');
    if (page === 'admin') redirectHome();
    hideSecretContent()
    showLoginContent()
}

function showLoginContent(){
    document.querySelector('.login-container').classList.remove('hide');
}

function hideSecretContent(){
    document.querySelector('.secret-content').classList.add('hide');
    document.querySelector('.username-container').classList.add('hide')
    document.querySelector('.logged-header').classList.add('hide')
}

function handleWrongLogin(){

}






























// function renderTodos() {
//     var strHTML = ''
//     var todos = getTodosForDisplay();
//     todos.forEach(function(todo){
//         strHTML += 
//         `<li class="${(todo.isDone)? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
//             ${todo.txt}
//             <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
//         </li>`
//     })
//     document.querySelector('.todo-list').innerHTML = strHTML;

//     document.querySelector('.total').innerText = getTodosCount()
//     document.querySelector('.active').innerText = getActiveTodosCount()
// }

// function onAddTodo() {
//     var elNewTodoTxt = document.querySelector('.new-todo-txt');
//     var txt = elNewTodoTxt.value
//     addTodo(txt);
//     renderTodos();
//     elNewTodoTxt.value = '';
// }

// function onRemoveTodo(ev, todoId) {
//     ev.stopPropagation();
//     removeTodo(todoId);
//     renderTodos();
// }
// function onToggleTodo(todoId) {
//     toggleTodo(todoId);
//     renderTodos();
// }

// function onSetFilter(filterBy) {
//     setFilter(filterBy)
//     renderTodos();
// }