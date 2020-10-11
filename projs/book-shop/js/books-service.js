'use strict'
const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 5;
var gNextId = 1;
var gBooks;
var gPageIdx = 0;
var gNames = ['Harry Putter 1', 'Harry Potter 2', 'The Mailbox', 'My Name', 'Winner', 'JS for Dummies', 'James Bond', 'Spines', 'The Alchemist']
var gSortBy;

_createBooks();

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !gNames.length) {
        books = []
        for (let i = 0; i < 7; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function _createBook(bookName, bookPrice, bookPhoto) {
    var name = (bookName) ? bookName : makeName();
    var price = (bookPrice) ? bookPrice : getRandomIntInclusive(1, 200);
    var photo = (bookPhoto) ? bookPhoto : makePhoto();
    return {
        id: makeId(),
        name,
        price,
        desc: makeLorem(),
        photo,
        rate: 0
    }
}

function makeName(){
    var randNum = getRandomIntInclusive(0,gNames.length-1)
    return gNames[randNum];
}


function getBookIdxById(bookId){
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    return bookIdx
}


function removeBook(bookId){
    var bookIdx = getBookIdxById(bookId)
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage()
}

function addBook(bookName, bookPrice){
    var book = _createBook(bookName, bookPrice)
    gBooks.push(book);
    _saveBooksToStorage();
}

function updateBook(bookId, price){
    var bookIdx = getBookIdxById(bookId)
    gBooks[bookIdx].price = price;
    _saveBooksToStorage()
}



























// function getCars() {
//     var fromIdx = gPageIdx * PAGE_SIZE;
//     return gCars.slice(fromIdx, fromIdx + PAGE_SIZE)
// }

// function getVendors() {
//     return gVendors;
// }

// function deleteCar(carId) {
//     var carIdx = gCars.findIndex(function (car) {
//         return carId === car.id
//     })
//     gCars.splice(carIdx, 1)
//     _saveCarsToStorage();
// }

// function addCar(vendor, maxSpeed) {
//     var car = _createCar(vendor)
//     car.maxSpeed = maxSpeed;
//     gCars.unshift(car)
//     _saveCarsToStorage();
// }

// function getCarById(carId) {
//     var car = gCars.find(function (car) {
//         return carId === car.id
//     })
//     return car
// }

// function updateCar(carId, newSpeed) {
//     var carIdx = gCars.findIndex(function(car){
//         return car.id === carId;
//     })
//     gCars[carIdx].maxSpeed = newSpeed;
//     _saveCarsToStorage();
// }

// function nextPage() {
//     gPageIdx++;
//     if (gPageIdx * PAGE_SIZE >= gCars.length) gPageIdx = 0;
// }


// function _createCar(vendor) {
//     return {
//         id: makeId(),
//         vendor: vendor,
//         maxSpeed: getRandomIntInclusive(1, 200),
//         desc: makeLorem()
//     }
// }

// function _createCars() {
//     var cars = loadFromStorage(STORAGE_KEY)
//     if (!cars || !cars.length) {
//         cars = []
//         for (let i = 0; i < 11; i++) {
//             var vendor = gVendors[getRandomIntInclusive(0, gVendors.length-1)]
//             cars.push(_createCar(vendor))
//         }
//     }
//     gCars = cars;
//     _saveCarsToStorage();
// }

// function _saveCarsToStorage() {
//     saveToStorage(STORAGE_KEY, gCars)
// }
