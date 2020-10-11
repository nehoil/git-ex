'use strict';

const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GLUE = 'GLUE';
const GAMER = 'GAMER';

const GAMER_IMG = '<img src="img/gamer.png"/>';
const BALL_IMG = '<img src="img/ball.png"/>';
const GLUE_IMG = '🔵';

var gGamerPos = { i: 1, j: 1 };
var gBoard;
var gBallCollectedCount = 0;
var gBallCounter = 0;
var gRndBallInterval = 0;
var gGameOn = true;
var gCurrGluePos;

init()
function init() {
	gGamerPos = { i: 1, j: 1 };
	gBoard = buildBoard();
	if (gRndBallInterval) clearRndInterval()
	renderBoard(gBoard);
	gRndBallInterval = setInterval(playGame, 5000)
}

function playWinSound() {
	var audio = new Audio('/sounds/win.mp3');
	audio.play();
}
function playBallSound() {
	var audio = new Audio('/sounds/collected.mp3');
	audio.play();
}

function playGame(board = gBoard) {
	if (!gGameOn) clearRndInterval();
	createRandBall(board);
	// createRandGlue(board);
	ballsCounter(board);
	setTimeout(createRandGlue, 2000);//wait 2 seconds
}

function clearRndInterval() {
	clearInterval(gRndBallInterval)
}


function ballsCounter(board) {
	var counter = 0;
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j].gameElement === BALL) {
				counter++
			}
		}
	}
	gBallCounter++
}


function isWin() {
	if (gBallCounter === gBallCollectedCount) {
		var elWinMsg = document.querySelector('.win-msg');
		elWinMsg.innerText = 'Yeah! You Have Won!';
		var elResetBtn = document.querySelector('.reset-btn')
		elResetBtn.classList.remove('hide')
		console.log(elResetBtn);
		playWinSound();
		gGameOn = false;
		// return true
	}
	console.log('gBallCounter', gBallCounter);
	console.log('gBallCollectedCount', gBallCollectedCount);
}

function reset() {
	gBallCollectedCount = 0;
	gBallCounter = 0;
	var elBallsCol = document.querySelector('.balls-collected')
	var elWin = document.querySelector('.win-msg')
	elBallsCol.innerText = '';
	elWin.innerText = '';
	init()
}

function TeleportUser(i, j) { // i:0, j:5
	// console.log('i, j', i, j);
	if (i === 0) {
		i = 9
		changeUserPos(i, j)
		console.log('works');
		return
	}
	if (j === 0) {
		j = 11
		changeUserPos(i, j)
		// console.log('works');
		return
	}
	if (j === 11) {
		j = 0
		changeUserPos(i, j)
		// console.log('works');
		return
	}
	if (i === 9) {
		j = 0
		return
		// changeUserPos(i, j)
	}
}

function changeUserPos(newPosI, newPosJ) {
	// Update MODEL
	console.log(newPosI, newPosJ);
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	// Update DOM

	renderCell(gGamerPos, '');
	// console.log('gGamerPos', gGamerPos);
	// Update MODEL
	gGamerPos = { i: newPosI, j: newPosJ };
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// Update DOM

	renderCell(gGamerPos, GAMER_IMG);
}

function buildBoard() {
	var board = [];
	for (var i = 0; i < 10; i++) {
		board[i] = [];
		for (var j = 0; j < 12; j++) {
			board[i][j] = {
				gameElement: null
			}
			if (i === 0 && j === 5 || i === 9 && j === 5 || i === 4 && j === 0 || i === 4 && j === 11) {
				board[i][j].type = FLOOR;
			} else if (i === 0 || i === 9 || j === 0 || j === 11) {
				board[i][j].type = WALL;
			} else board[i][j].type = FLOOR;
		}
	}

	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	console.log(board);
	return board;
}


function createRandGlue(board = gBoard) {
	var currRandPos = { i: 0, j: 0 };
	var randNumI = getRandomInt(1, board.length - 2)
	var randNumJ = getRandomInt(1, board[0].length - 2)
	currRandPos.i = randNumI
	currRandPos.j = randNumJ
	if (board[randNumI][randNumJ].gameElement) return
	board[randNumI][randNumJ].gameElement = GLUE
	renderCell(currRandPos, GLUE_IMG);
	gCurrGluePos = currRandPos 
	setTimeout(delGlue, 3000);
}

function delGlue(){
	gCurrGluePos
		// Update MODEL
		gBoard[gCurrGluePos.i][gCurrGluePos.j].gameElement = null;
		// Update DOM
		renderCell(gCurrGluePos, '');
}

function createRandBall(board = gBoard) {
	var currRandPos = { i: 0, j: 0 };
	var randNumI = getRandomInt(1, board.length - 2)
	var randNumJ = getRandomInt(1, board[0].length - 2)
	currRandPos.i = randNumI
	currRandPos.j = randNumJ
	if (board[randNumI][randNumJ].gameElement) return
	board[randNumI][randNumJ].gameElement = BALL
	renderCell(currRandPos, BALL_IMG);
}
// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			// strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';
			strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}


// Move the player to a specific location
function moveTo(i, j) {
	if (!gGameOn) return
	if (i === gCurrGluePos.i && j === gCurrGluePos.j){
		gGameOn = false
		console.log('wait 3 sec... game is paused');
		setTimeout(function(){
			gGameOn = true
			console.log('game is resumed!');
	   }, 3000);//wait 2 seconds
	   
	}
	if (i === 0 && j === 5) {
		TeleportUser(i, j)
	}
	if (i === 9 && j === 5) TeleportUser(i, j)
	if (i === 4 && j === 0) TeleportUser(i, j)
	if (i === 4 && j === 11) TeleportUser(i, j)

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	// console.log('iAbsDiff', iAbsDiff)
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	// console.log('jAbsDiff', jAbsDiff)

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		if (targetCell.gameElement === BALL) {
			gBallCollectedCount++
			playBallSound()
			isWin();
			console.log('count', gBallCollectedCount);
			var elBallsCounter = document.querySelector('.balls-collected')
			elBallsCounter.innerText = `Balls Collected: ${gBallCollectedCount}`
		}

		// Update MODEL
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Update DOM
		renderCell(gGamerPos, '');

		// Update MODEL
		gGamerPos = { i: i, j: j };
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// Update DOM

		renderCell(gGamerPos, GAMER_IMG);


	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	// console.log('location');
	// console.log('location', value);
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(ev) {
	if (!gGameOn) return 
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (ev.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}