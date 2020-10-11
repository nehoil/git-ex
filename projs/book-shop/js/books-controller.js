'use strict'

function onInit() {
    renderBooksTable();
}

function renderBooksTable() {
    var beginTableHTML = `
    <table>
    <thead>
        <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Price</td>
            <td>Actions</td>
        </tr>
    </thead>
    <tbody>`;
    var strHtmls = gBooks.map(function(book) {
        return `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.price}</td>
                    <td>
                        <button onclick="onReadBook('${book.id}')">Read</button>
                        <button onclick="onUpdateBook('${book.id}')">Update</button>
                        <button onclick="onRemoveBook('${book.id}')">Remove</button>
                    </td>
                </tr>        
        `
    });
    var endTableHTML = `</tbody></table>`
    document.querySelector('.books-table').innerHTML = beginTableHTML + strHtmls.join('') + endTableHTML
}


function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooksTable();
}

function onAddBook() {
    var bookName = document.querySelector('.book-name').value;
    var bookPrice = document.querySelector('.book-price').value;
    console.log(bookName, bookPrice);
    addBook(bookName, bookPrice);
    renderBooksTable();
}

function onUpdateBook(bookId) {
    var bookPrice = prompt('new price?')
    updateBook(bookId, bookPrice);
    renderBooksTable();
}

function onReadBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    renderBookModal(bookIdx)
}

function renderBookModal(bookIdx){
    var elBookDetails = document.querySelector('.book-details-container').classList.remove('hide')
    var elDetails = document.querySelector('.details-container')
    var book = gBooks[bookIdx]
    var plusMinusHTML = `
    <div class="input_div">
    <input type="button" value="-" id="moins" onclick="onMinus('${bookIdx}')">
    <input type="text" value="${book.rate}" id="count">
    <input type="button" value="+" id="plus" onclick="onPlus('${bookIdx}')">
</div>`
    elDetails.innerHTML = `
    <div class="exit-btn"><button onclick="onCloseModal()">X</button>
    <div class="book-details-headline">Book details</div>
    <div class="book-img"><img src="${book.photo}"></div>
    <div class="price-modal">Price: ${book.price}</div>
    <div class="rate-modal">Rating: ${book.rate}</div>
    ${plusMinusHTML}
    <span>Description:</span><p>${book.desc}</p>`
}


function onCloseModal(){
    var elBookDetails = document.querySelector('.book-details-container').classList.add('hide')

}



function onPlus(bookIdx){
    var count = gBooks[bookIdx].rate;
    var countEl = document.getElementById("count");
    if (count > 9) return;
    count++;
    countEl.value = count;
    gBooks[bookIdx].rate++
    _saveBooksToStorage()
    renderBookModal(bookIdx)
}
function onMinus(bookIdx){
    var count = gBooks[bookIdx].rate;
    var countEl = document.getElementById("count");
    if (count > 0) {
        count--;
        countEl.value = count;
        gBooks[bookIdx].rate--
        _saveBooksToStorage()
        renderBookModal(bookIdx)
}  
}
