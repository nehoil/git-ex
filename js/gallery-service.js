'use strict';


const gProjs = [
    {
        id: "minesweeper",
        name: "Minesweeper",
        title: "Find the mines without stepping on them!",
        desc: "A fun, dynamic and challenging web-game.",
        url: "projs/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: "touch-nums",
        name: "Touch Nums",
        title: "Better push those nums",
        desc: "Extremely fun for speedy-games lovers.",
        url: "projs/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: "game-of-life",
        name: "Game Of Life",
        title: "See those lifes",
        desc: "See who's surviving and who's not!",
        url: "projs/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: "chess",
        name: "Chess",
        title: "Win the online-chess game!",
        desc: "Play & win the famus chess game, online!",
        url: "projs/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: "in-nums",
        name: "In Nums",
        title: "Choose the right answer!",
        desc: "Get a quick check to your knowledge",
        url: "projs/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: "guessme",
        name: "Guessme",
        title: "Let our Jini guess who's on your mind.",
        desc: "Think of someone, and let our Jini do the rest!",
        url: "projs/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    }
]

function getProjs() {
    return gProjs;
}


function getProjsById(projId){
   return gProjs.find(function(proj){
        return proj.id === projId;
    })
}