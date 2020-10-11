function saveUsersToStorage() {
    gUsers.forEach(function (user) {
        var userId = user.id;
        saveToStorage(userId, user)
    })
}


function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str)
}
function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    return JSON.parse(str)
}