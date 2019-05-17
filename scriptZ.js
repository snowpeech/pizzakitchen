var intervalId_chef1;
var chef1 = document.getElementById('chef1');
var freezer = document.getElementById('freezer');

function startChef1() {
    intervalId_chef1 = setInterval(tickChef1, 50);
    var audio_chef1_footsteps = document.getElementById('chef1-footsteps');
    audio_chef1_footsteps.play();
    setTimeout(() => audio_chef1_footsteps.pause(), 3000);
    audio_chef1_footsteps.currentTime = 0;
}

function tickChef1() {
    moveDown();
    chef1EvalStopBottom();
}

function chef1EvalStopBottom() {
    var chef1_down = parseInt(chef1.style.top.replace("px", ""));
    chef1_down += 156;

    if (chef1_down >= (window.innerHeight - 30)){
        stopChef1Bottom();
    }
}

function moveDown() {
    chef1.style.top = `${parseInt(chef1.style.top.replace("px", "")) + 10}px`;
}

function stopChef1Bottom() {
    clearInterval(intervalId_chef1);
    swapImages();
}

function swapImages() {
    chef1.style.backgroundImage = "url('static/img/pizza-man-right.gif')";
    chef1.style.left = "960px";
    setTimeout(() => {
        var audio_freezer_open = document.getElementById('freezer-open');
        freezer.style.backgroundImage = "url('static/img/freezer-open.png')";
        audio_freezer_open.play();
    }, 1000);
    setTimeout(() => chef1.style.backgroundImage = "url('static/img/pizza-man-frozen.gif')", 1500);
    setTimeout(() => {
        var audio_freezer_close = document.getElementById('freezer-close');
        freezer.style.backgroundImage = "url('static/img/freezer-open.png')";
        audio_freezer_close.play();
        freezer.style.backgroundImage = "url('static/img/freezer-closed.png')";
        // chef1.style.transform = "rotate(360deg);"
        chef1.style.transition = ".5s ease-out";
        chef1.style.left = "900px";
    }, 2000);
    setTimeout(() => {
        oven.style.backgroundImage = "url('static/img/oven-closed.png')";
        var audio_oven_close = document.getElementById('oven-close');
        audio_oven_close.play();
    }, 3000);
    setTimeout(() => {
        chef1.style.transition = "0s";
        chef1.style.backgroundImage = "url('static/img/pizza-man-left.gif')";
    }, 3000);
    setTimeout(() => startChef1Up(), 3500);
}

function startChef1Up() {
    intervalId_chef1 = setInterval(tickUpChef1, 25);
    var audio_chef1_footsteps = document.getElementById('chef1-footsteps');
    audio_chef1_footsteps.play();
    setTimeout(() => audio_chef1_footsteps.pause(), 3000);
    audio_chef1_footsteps.currentTime = 0;
    startChef2();
}

function tickUpChef1() {
    moveUp();
    chef1EvalStopTop();
}

function chef1EvalStopTop() {
    var chef1_up = parseInt(chef1.style.top.replace("px", ""));

    if (chef1_up <= 34){
        stopChef1Top();
    }
}

function moveUp() {
    chef1.style.top = `${parseInt(chef1.style.top.replace("px", "")) - 5}px`;
}

function stopChef1Top() {
    clearInterval(intervalId_chef1);
}