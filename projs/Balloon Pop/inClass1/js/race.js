'use strict';

console.log('Racing!');


var END_OF_ROAD = 600;

var gNextId = 101;
var gCars;
var gRaceInterval;

// init(false);

function init(isToStart) {
    gCars = createCars();
    renderCars(gCars);
    if (isToStart) gRaceInterval = setInterval(play, 1000);
}

function play() {
    moveCars();
    checkVictory();
}

function renderCars(cars) {
    var htmlStr = '';
    
    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        htmlStr += '<div onclick="speedCar('+ car.id +')" id="car-'+ car.id +'" class="car car'+ (i+1) +'"></div>';
    }
    
    var elRoad = document.querySelector('.road');
    elRoad.innerHTML = htmlStr;
}

function checkVictory() {
    for (var i = 0; i < gCars.length; i++) {
        var car = gCars[i];
        if (car.distance >= END_OF_ROAD) {
            clearInterval(gRaceInterval);
            alert('car ' + car.id + ' is the winner!');
            break;
        }
    }
}


function speedCar(id) {
    var car = getCarById(id);
    car.speed += 10;
}

function moveCars() {
    for (var i = 0; i < gCars.length; i++) {
        var car = gCars[i];
        car.distance += car.speed;

        var elCar = document.querySelector('#car-'+car.id);
        elCar.style.marginLeft = car.distance + 'px';
    }
}

function getCarById(id) {
    for (var i = 0; i < gCars.length; i++) {
        var car = gCars[i];
        if (car.id === id) return car;
    }
    return null;
}

function createCars(amount = 3) {
    var cars = [];
    for (var i = 0; i < amount; i++) {
        var car = createCar();
        cars.push(car);
    }
    return cars;
}

function createCar() {
    return {
        id: gNextId++,
        speed: 10,
        distance: 10
    }
}