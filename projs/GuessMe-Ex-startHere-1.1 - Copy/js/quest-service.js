const STORAGE_KEY = 'questionsDB';
var gQuestsTree;
var gCurrQuest;

function createQuestsTree() {
    
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gCurrQuest = gCurrQuest[res]
    renderQuest()
}

function addGuess(newQuestTxt, newGuessTxt) {
    var wrongGuesTxt = gCurrQuest.txt
    gCurrQuest.txt = newQuestTxt;
    gCurrQuest['yes'] = createQuest(newGuessTxt);
    gCurrQuest['no'] = createQuest(wrongGuesTxt);
    saveToStorage(STORAGE_KEY, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest
}
