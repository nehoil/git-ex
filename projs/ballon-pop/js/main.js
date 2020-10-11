'use strict';
console.log('Ballon Game!');
var gGameInterval;
var gBalloons;

resetGame()

function moveUp() { // change the values of the balloons inside the js model and then imploment it on live html
    for (var i = 0; i < gBalloons.length; i++) {
        var currBalloon
        var elCurrBalloons = document.querySelector('.balloon' + (i + 1))
        var currBalloon = gBalloons[i];
        currBalloon.bottom += currBalloon.speed
        elCurrBalloons.style.bottom = currBalloon.bottom + 'px';
        if (currBalloon.bottom >= 3000) {
            clearInterval(gGameInterval)
        }
    }
}

function deleteBall(currBall) {
    currBall.classList.add("hidden");
    var popSound = new Audio('sounds/pop.flac')
    popSound.play()
}

function renderBalloons() {
    var strHtml = '';
    for (var i = 0; i < gBalloons.length; i++) {
        var sky = document.querySelector('.sky')
        strHtml = '<img src="img/ball.gif" class="balloon balloon' + (1 + i) + '"" onclick="deleteBall(this)">';
        sky.innerHTML += strHtml
    }
}


function resetGame() {
    gBalloons = [
        { id: 1, bottom: 0, speed: 20 },
        { id: 2, bottom: 0, speed: 25 },
        { id: 3, bottom: 0, speed: 50 },
        { id: 4, bottom: 0, speed: 33 },
        { id: 5, bottom: 0, speed: 10 },
        { id: 6, bottom: 0, speed: 40 },
        { id: 7, bottom: 0, speed: 45 },
    ];
    renderBalloons();
    gGameInterval = setInterval(moveUp, 1000);
}

function speedUp(carIdxStr) {
    var carIdx = +carIdxStr;
    var car = gCars[carIdx];
    car.speed += 10;
}