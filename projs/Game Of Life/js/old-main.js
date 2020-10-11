'use strict';

var gGameInterval = 0;
var gIsGameOn = false;
var gIsWin = false;
var gQuests;
var gCurrQtsNum = 1;
var gCurrClickedIdx


function init() {
    playGame()
    var isPlayingGame = true;
    // while(isPlayingGame){
    // }
}

function playGame() {
    createQuests()
    renderQuests(gQuests, gCurrQtsNum)
}

function resetGame() {
    var elResetBtn = document.querySelector('.restart')
    elResetBtn.style.display = 'none'
    var elBtns = document.querySelectorAll('button')
    changeBtnsColors(elBtns)
    gIsWin = false;
    gQuests;
    gCurrQtsNum = 1;
    gCurrClickedIdx
    init()
}

function changeBtnsColors(btns){
    for (var i = 0; i < btns.length; i++) {
        var currBtn = btns[i];
        currBtn.style.background = 'rgb(72, 255, 26)';
    }
}

function btnClicked(elBtn, id) {
    var newId = +id
    gCurrClickedIdx = newId
    var currAnwsrIdx = gCurrClickedIdx
    if (checkAnswer(currAnwsrIdx, gQuests)) {
        gCurrQtsNum++
        if (gCurrQtsNum > 3) {
            winMsg(elBtn)
            return
        }
        renderQuests(gQuests, gCurrQtsNum)
    }
    return newId
}

function winMsg(elBtn) {
    var elCurrBtn = elBtn;
    var elResetBtn = document.querySelector('.restart')
    elResetBtn.style.display = 'block'
    elCurrBtn.style.background = 'rgb(242, 98, 73)';
    var winmsg = 'Congrats! You have won!';
    var elWinningMsg = document.querySelector('.winning-message');
    elWinningMsg.innerHTML = '' + winmsg;
}

function checkAnswer(optIdx, qts) {
    if (optIdx === qts[gCurrQtsNum - 1].correctOptIndex) return true
    console.log('works');
}

function createQuests() {
    var opts = [
        { id: 1, opts: ['United Kingdom', 'USA'], correctIdx: 1 },
        { id: 2, opts: ['Argentina', 'Peru'], correctIdx: 0 },
        { id: 3, opts: ['Bolivia', 'Indonesia'], correctIdx: 1 },]
    gQuests = [ // build the game main quests object/modal
        { id: 0, opts: [], correctOptIndex: 0 },
        { id: 0, opts: [], correctOptIndex: 0 },
        { id: 0, opts: [], correctOptIndex: 0 }
    ]
    // adding the opts data and correctOptIndex to the main object/model from the opts array
    for (var i = 0; i < gQuests.length; i++) {
        var currQuest = gQuests[i];
        var currOpts = opts[i];
        var currInnerOps = currOpts.opts;
        // console.log(currInnerOps);
        currQuest.id = i;
        currQuest.opts = currInnerOps
        currQuest.correctOptIndex = currOpts.correctIdx
        // for (var j = 0; j < 2; j++) {
        // }
    }
}

function renderQuests(quests, currQtsNum) {
    // render main pic
    var elCurrImage = document.querySelector('.qts-image');
    elCurrImage.innerHTML = `<img src="img/${currQtsNum}.jpg" class="imgs">`
    // render btns
    var elFirstbtn = document.querySelector('.first-opt')
    elFirstbtn.innerText = quests[currQtsNum - 1].opts[0]
    var elFirstbtn = document.querySelector('.second-opt')
    elFirstbtn.innerText = quests[currQtsNum - 1].opts[1]
}
