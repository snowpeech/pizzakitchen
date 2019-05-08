var intervalId_chef1;
var chef1 = document.getElementById('chef1');

function startChef1() {
    intervalId_chef1 = setInterval(tickChef1, 50);
}

function tickChef1() {
    moveDown();
    chef1EvalStopBottom();
}

function chef1EvalStopBottom() {
    chef1.style.top = `${replace() + 10}`
}

function moveDown() {

}

function stopChef1() {
    clearInterval(intervalId_chef1);
}