'use strict';

var gNumsCounter = 1;
var gBoard;
var gNums;
var gGameInterval = 0;
var gIsGameOn = false;
var gIsWin = false;
var gTimer = 0;
var gLevels = [16, 25, 36]
var gLevel = gLevels[0];

// user choosing from input which difficult level he wants
function chooseLevel() {
    document.getElementById('level-choice').addEventListener('change', function () {
        if (document.getElementById('easy').checked) {
            console.log('easy checked')
            resetGame(gLevels[0])
        }
        if (document.getElementById('hard').checked) {
            console.log('hard checked')
            resetGame(gLevels[1])
        }
        console.log('gNums after hard clicked', gNums);
        if (document.getElementById('extreme').checked) {
            console.log('extreme checked')
            resetGame(gLevels[2])
        }
    })
}

function init(num = 16) {
    generateNums(num);
    var boardNums = Math.sqrt(num)
    createBoard(boardNums);
    renderBoard(gBoard, num);
}

function winMsg() {
    stopCount()
    var winmsg = 'Congrats! You have won!, your record is: ' + gTimer
    var elWinningMsg = document.querySelector('.winning-message');
    elWinningMsg.innerHTML = '' + winmsg
}

function resetGame(num) {
    stopCount()
    gIsWin = false;
    gGameInterval = 0;
    gTimer = 0;
    gNumsCounter = 1;
    gBoard;
    gNums;
    init(num)
}

function createBoard(num) {
    gBoard = [];
    var count = 0;
    for (var i = 0; i < num; i++) {
        gBoard.push([])
        for (var j = 0; j < num; j++) {
            var newNum = drawNum(gNums)
            gBoard[i][j] = newNum
            count++
        }
    }
    console.table(gBoard);
}

function generateNums(num) {
    console.log('generateNums nums:', num);
    gNums = [];
    var count = 1;
    for (let i = 0; i < num; i++) {
        gNums.push(count)
        count++
    }

}


function drawNum(nums) {
    var randNum = getRandIt(0, nums.length - 1)
    var newNum = nums.splice(randNum, 1);

    return newNum[0]
}

function renderBoard(board, num) {
    var strHTML = '';
    var style = '';
    var cellId = 1;
    var elTable = document.querySelector('.board')
    for (var i = 0; i < board.length; i++) {
        var currRow = board[i];
        var className = '';
        var onClick = '';
        strHTML += `<tr>`
        for (var j = 0; j < currRow.length; j++) {
            className = ` cell cell-${i}-${j}`;
            onClick = ` onclick="cellClicked(this, ${i}, ${j}, ${currRow[j]})" `
            var currCell = currRow[j]
            strHTML += `<td ${onClick} 
            class="${className}">`
            strHTML += currCell;
            strHTML += `</td>`
            cellId++
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
    generateNums(num);
}

function stopCount() {
    clearInterval(gGameInterval);
    console.log('works!!');
}



function addTimer() {
    if (gGameInterval) return
    var startTime = Date.now();
    gGameInterval = setInterval(function () {
        var timer = Date.now() - startTime;
        gTimer = (timer / 1000).toFixed(3);
        document.querySelector(".counter").innerHTML = gTimer
    }, 160);
}


function cellClicked(elCell, i, j, cellId) {
    if (gNumsCounter === (gBoard.length ** 2)) {
        gIsWin = true
        winMsg()
        changeCellBg(i, j);
        return
    } else {
        if (cellId !== gNumsCounter) return;
        if (gNums.indexOf(cellId) < 0) return;
        var currIdx = gNums.indexOf(cellId);
        gNums.splice(currIdx, 1);
        changeCellBg(i, j);
        gNumsCounter++;
        if (cellId === 1) addTimer();
    }
}

function changeCellBg(rowIdx, colIdx) {
    var elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`);
    elCell.style.backgroundColor = "yellow";
}

function renderCell(i, j, val) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.innerText = val;
}
