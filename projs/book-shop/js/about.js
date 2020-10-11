

function onInit() {
    function boo() {
        console.log('Boo!');
    }
    boo();
}

function openPopupWindow() {
    var popup1 = window.open('', '', 'width=300,height=400')
    popup1.document.write("a Popup")
    popup1.focus()
    var popup2 = window.open('http://google.com', '', 'width=300,height=400',)
    popup2.focus()
}

function myMax(x, y) {
    console.log('ARGS:', arguments);
    var max = -Infinity;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) max = arguments[i];
    }
    return max;
}
// console.log('Expecting: -Infinity', myMax());
// console.log('Expecting: 0', myMax(0, 0));
console.log('Expecting: 11', myMax(9, 11, 7, 1));