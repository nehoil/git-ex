'use strict';
console.log('racing!');

var gCars;
var gRaceInterval;
function resetRace() {
    gCars = [
        { id: 1, distance: 0, speed: 20 },
        { id: 2, distance: 0, speed: 15 },
        { id: 3, distance: 0, speed: 12 },
    ];
    renderCars();
    gRaceInterval = setInterval(moveCars, 1000);
}


function moveCars() {
    for (var i = 0; i < gCars.length; i++) {
        var currCar = gCars[i];
        currCar.distance += currCar.speed;
        var elCurrCar = document.querySelector('.car' + (i + 1));
        elCurrCar.style.marginLeft = currCar.distance + 'px';
        if (currCar.distance >= 200) {
            clearInterval(gRaceInterval)
            var elMsg = document.querySelector('.race-end');
            elMsg.style.display = 'block'
        }
    }
}

function speedUp(carIdxStr) {
    var carIdx = +carIdxStr;
    var car = gCars[carIdx];
    car.speed += 10;
}

function renderCars() {
    var strHtml = '';
    for (var i = 0; i < gCars.length; i++) {
        strHtml += '<div onclick="speedUp(' + i + ')" class="car car' + (i + 1) + '"></div>';
    }
    var elRoad = document.querySelector('.road');
    elRoad.innerHTML = strHtml;
}