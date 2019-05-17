var intervalId_chef2;
var chef2 = document.getElementById('chef2');
var pizzaTable =document.getElementById("pizza-table");
var pizzaBox = document.getElementById('pizza-box');
var kitchen_bell = document.getElementById('kitchen-bell');

function startChef2() {
    kitchen_bell.play();
    setTimeout(() => kitchen_bell.pause(), 1000);
    kitchen_bell.currentTime = 0;
    intervalId_chef2 = setInterval(tickChef2, 50);
}

function tickChef2(){
    chef2MoveRight();
    chef2EvalStop();
}

function chef2MoveRight(){
    chef2.style.backgroundImage = "url('static/img/pizza-man-right.gif')";
    chef2.style.left = `${parseInt(chef2.style.left.replace("px", "")) + 10}px`;

    var audio_chef2_footsteps = document.getElementById('chef2-footsteps');
    audio_chef2_footsteps.play();
    setTimeout(() => audio_chef2_footsteps.pause(), 2000);
    audio_chef2_footsteps.currentTime = 0;
}

function chef2EvalStop(){
    var chef2Left = parseInt(chef2.style.left.replace("px",""));
        	
        	const chef2StopPt = 520; //change to chef meeting point once kitchen is updated

        	if (chef2Left >= chef2StopPt) {
				chef2Stop();
                
                //cashierReturn();
			}
}

function chef2Stop(){
    clearInterval(intervalId_chef2);
    chef2.style.backgroundImage = "url('static/img/pizza-man.gif')";
    oven.style.backgroundImage = "url('static/img/oven-open.png')";
    chef2Return();
}

function chef2Return(){
    intervalId_chef2 = setInterval(tickChef2Return, 50);
}

function tickChef2Return(){
    chef2MoveLeft();
    chef2EvalBox();
}

function chef2MoveLeft(){
    
    chef2.style.left = `${parseInt(chef2.style.left.replace("px", "")) - 10}px`;
}

function chef2EvalBox(){
    var chef2Left = parseInt(chef2.style.left.replace("px",""));
    if (chef2Left<300){
        chef2StopReturn();

    }
}

function chef2StopReturn(){
    clearInterval(intervalId_chef2);
    chef2.style.backgroundImage = "url('static/img/pizza-man-left.gif')";
    pizzaBox.style.display = "block";
}