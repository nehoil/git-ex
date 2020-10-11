console.log('main!')

function send(elButton){
    console.log(elButton)
    elButton.innerText = 'Sending Info...'
}

function add2ndImg(){
    var elBox = document.querySelector('.my-box')
    elBox.innerHTML = '<img class="car" src="img/2.png" />'
    //     elBox.innerText  = 'This was a box now this is a box again'
}

function hideMsg() {
    var elMsg = document.querySelector('.msg');
    console.log('before', elMsg.classList)
    elMsg.classList.toggle('hide');
    console.log('after', elMsg.classList)
    // if(elMsg.classList.contains('show')){
    //     elMsg.classList.remove('show');
    //     elMsg.classList.add('hide');
    // } else {
    //     elMsg.classList.remove('hide');
    //     elMsg.classList.add('show');
    // }
}

// var elLink = document.querySelector('a');
// console.log(elLink)
// console.dir(elLink)

// var elLinks = document.querySelectorAll('a');
// console.log(elLinks[1])
