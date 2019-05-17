var intervalId_chef2;
var chef2 = document.getElementById('chef2');
var pizzaTable =document.getElementById("pizza-table");
var pizzaBox = document.getElementById('pizza-box');

function startChef2() {
    intervalId_chef2 = setInterval(tickChef2, 50);
    //var audio_chef1_footsteps = document.getElementById('chef1-footsteps');
    //audio_chef1_footsteps.play();
    //setTimeout(() => audio_chef1_footsteps.pause(), 3000);
    //audio_chef1_footsteps.currentTime = 0;
}

function tickChef2(){
    chef2MoveRight();
    chef2EvalStop();
}

function chef2MoveRight(){
    chef2.style.backgroundImage = "url('static/img/pizza-man-right.gif')";
    chef2.style.left = `${parseInt(chef2.style.left.replace("px", "")) + 10}px`;
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