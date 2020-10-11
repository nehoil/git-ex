'use strict';

const GAME_FREQ = 1000;
const LIFE = '🔥';
const SUPERLIFE = '🔥🔥';

// The Model
var gGameInterval;
var gBoard = []
var gBoardSize = 64;
var gIsGameOn = true;


function init() {
    // gIsGameOn = true;
    gBoard = createBoard(gBoardSize);
    renderBoard(gBoard);
    if (gGameInterval) clearInterval(gGameInterval)
    gGameInterval = setInterval(playGame, GAME_FREQ);
}

function playGame() {
    gBoard = createNextGen(gBoard);
    renderBoard(gBoard);
}


function stop(){
    var elStopBtn = document.querySelector('.stop-btn')
    if (gIsGameOn) {
        elStopBtn.innerText = 'Resume Game'
        clearInterval(gGameInterval)
        gIsGameOn = false
        return
    } else{
        elStopBtn.innerText = 'Stop Game'
        gIsGameOn = true
        init()
    }
}

function createNextGen(board){
    var newBoard = copyMat(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNeighbors = checkNegs(i, j, board);
            if ((numOfNeighbors > 2) && (numOfNeighbors < 6)) {
                if (board[i][j] === '') {
                    newBoard[i][j] = LIFE;
                } else if (board[i][j] === LIFE) newBoard[i][j] = '';
            }
        }
    }
    return newBoard
}


function checkNegs(cellI, cellJ, board) {
    var negsCounter = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length-1 ) continue
        var currRow = board[i];
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            var currCell = currRow[j];
            if (j < 0 || j >= currRow.length-1 ) continue
            if (j === cellJ && i === cellI) continue
            if (currCell === SUPERLIFE) continue
            if (currCell === LIFE) negsCounter++ 
        }
    }
    // console.log('negsCounter', negsCounter);

    return negsCounter
}

function createBoard(num) {
    var board = [];
    var newNum = Math.sqrt(num);
    for (var i = 0; i < newNum; i++) {
        var currRow = newNum[i];
        board[i] = [];
        for (var j = 0; j < newNum; j++) {
            var randNum = Math.random()
            randNum > 0.5 ? board[i][j] = '' : board[i][j] = LIFE;
        }
    }
    return board
}



function renderBoard(board) {
    // console.table(board);
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        var className = '';
        var currRow = board[i];
        var onClick = `onclick="cellClicked(this)"`
        for (var j = 0; j < currRow.length; j++) {
            var currCell = currRow[j];
            className = `cell cell-${i}-${j}`;
            strHTML += `<td class="${className}" ${onClick}>
            ${currCell}</td>`;
        }
        strHTML += `</tr>`
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}


function cellClicked(elCell) {
    elCell.style.backgroundColor = "red"; 
    var elClassNName = elCell.className
    var theNum = elClassNName.replace( /^\D+/g, '');
    var theNum2 = theNum.split('-')
    console.log(theNum2);
    makeSuperLife(theNum2[0],theNum2[1])
    elCell.style('.selected')
}

function makeSuperLife(cellI, cellJ){
    renderCell(cellI, cellJ)
// var elCurrCell = document.querySelector('.cell-0-0')
// console.log(elCurrCell);
}

function renderCell(cellI, cellJ) {
    gBoard[cellI][cellJ] = SUPERLIFE
    var cellClassStr = `.cell-${cellI}-${cellJ}`
    var elCurrCell = document.querySelector(cellClassStr)
    elCurrCell.innerText = SUPERLIFE
    // var strHTML = '';
    //     strHTML += `<tr>`
    //     var className = '';
    //     var onClick = `onclick="cellClicked(this)"`
    //     className = `cell cell-${cellI}-${cellI}`;
    //     strHTML += `<td class="${className}" ${onClick}>
    //     ${currCell}</td>`;
    //     strHTML += `</tr>`
    
    // var elTable = document.querySelector('.board');
    // elTable.innerHTML = strHTML;
}