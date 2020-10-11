function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

function getRandIt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
  }
// let output = document.getElementById('stopwatch');
// let ms = 0;
// let sec = 0;
// let min = 0;

// function timer() {
//     ms++;
//     if(ms >= 100){
//         sec++
//         ms = 0
//     }
//     if(sec === 60){
//         min++
//         sec = 0
//     }
//     if(min === 60){
//         ms, sec, min = 0;
//     }

//     //Doing some string interpolation
//     let milli = ms < 10 ? `0`+ ms : ms;
//     let seconds = sec < 10 ? `0`+ sec : sec;
//     let minute = min < 10 ? `0` + min : min;

//     let timer= `${minute}:${seconds}:${milli}`;
//     output.innerHTML =timer;
// };
// //Start timer
// function start(){
//  time = setInterval(timer,10);
// }
// //stop timer
// function stop(){
//     clearInterval(time)
// }
// //reset timer
// function reset(){
//     ms = 0;
//     sec = 0;
//     min = 0;

//     output.innerHTML = `00:00:00`
// }
// const startBtn = document.getElementById('startBtn');
// const stopBtn =  document.getElementById('stopBtn');
// const resetBtn = document.getElementById('resetBtn');

// startBtn.addEventListener('click',start,false);
// stopBtn.addEventListener('click',stop,false);
// resetBtn.addEventListener('click',reset,false);