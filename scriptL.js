	'use strict';
		// initialize table and customer position

		var customer = document.getElementById('customer');
		var orderTable = document.getElementById('order-table');
		var cashier = document.getElementById('cashier');
		var receipt = document.getElementById("receipt");


		var intervalId;
		var cashierInterval;

		// reset();

		// function reset(){
		// 	customer.style.left = "5px";
		// 	customer.style.top = "15px";

		// 	orderTable.style.top="90px";
		// 	orderTable.style.left="250px";

		// 	cashier.style.top = "36px";
		// 	cashier.style.left = "287px";

		// }

		var orderIn = new CustomEvent('orderIn',{
			detail:{}
    		});

		///////
 
		function start() {
			intervalId = setInterval(customerTick, 50);
        }

        function customerTick() {
			customerMoveRight();
			customerEvalStop();
        }

		function customerStop(){
			clearInterval(intervalId);
		}

		function customerMoveRight() {
			customer.style.left = `${parseInt(customer.style.left.replace("px",""))+10}px`
		}


		function customerEvalStop(){
			var customerLeft = parseInt(customer.style.left.replace("px",""));
			var customerRight = customerLeft + 83;
			var tableLeft = parseInt(orderTable.style.left.replace("px",""));

			if (customerRight >= (tableLeft +2)) {
				customerStop(); //note that customerEvalStop is going to keep running
           		orderTable.dispatchEvent(orderIn);
			}
		}

	//add event listener
		orderTable.addEventListener("orderIn", function(e) {
        	audioOrder(); //add delay of .5 seconds here?
        	billAppear();
        	cashierStart();
        	cashierEvalStop();
        	
        });

        function audioOrder(){
        	var voiceOrder = document.getElementById("order-up");
			voiceOrder.play();  
        }

        function billAppear(){
        	receipt.style.display="block";
        	cashier.style.transform = "scaleX(-1)";
        }

        function cashierStart() {
			cashierInterval = setInterval(cashierTick, 50);
        }

        function cashierTick() {
			cashierWalk();
			cashierEvalStop();
			cashierEvalReturn();
			console.log("cashier tick loop")
        }

        function cashierWalk(){
        	cashier.style.left = `${parseInt(cashier.style.left.replace("px",""))+10}px`
        	receipt.style.left = `${parseInt(receipt.style.left.replace("px",""))+10}px`
        }

        function cashierStop() {
        	clearInterval(cashierInterval);
        	console.log("cashier stop fn")
        }
/// ERRORS BELOW!!!! cashierLeft isnt updating
        function cashierEvalStop(){
        	var cashierLeft = parseInt(cashier.style.left.replace("px",""));
        	
        	const cashierStopPt = 500; //change to chef meeting point once kitchen is updated

        	if (cashierLeft >= cashierStopPt) {
				cashierStop();
			}
        }

        function cashierEvalReturn(){
        	//call coordinates of interest (cashierLeft. chefRight)
        	var chef1 = document.getElementById("chef1");
        	var cashierLeft = parseInt(cashier.style.left.replace("px","")); //is this redundant? can I make this a global variable?
        	var cashierRight = cashierLeft + parseInt(cashier.style.width.replace("px",""));

        	console.log("cashier right", cashierRight)

        	var chef1Left = 580 //parseInt(chef1.style.left.replace("px",""));
        	console.log("Cashier Left: ",cashierLeft)
    

        	if (cashierRight >= (chef1Left +10)){
        		cashierReturn();
        	}
        	//when cashierRight is near chefLeft, bill disappears and cashier walks back
        }

        function cashierReturn(){
        	cashierFlip();
        	cashierWalkLeft();
        	//cashierEvalReset();
        }

        function cashierFlip(){
        	receipt.style.display = "none";
        	cashier.style.transform = "scaleX(1)";
        }
        function cashierWalkLeft(){
        	cashier.style.left = `${parseInt(cashier.style.left.replace("px",""))+10}px`
        	console.log("cashier walk left")
        	console.log(cashier.style.left)//493
        	//i think this doesn't work because cashierWalkRight is still running
        }

        function cashierEvalReset(){
        	//stop once cashierLeft is near tableRight
        	var cashierLeft = parseInt(cashier.style.left.replace("px",""));
        	console.log("eval reset cashier L", cashierLeft)
        	var tableRight = parseInt(orderTable.style.left.replace("px",""))+100; //table Lf + width
        	console.log("eval reset table R", tableRight)

        	if (cashierLeft <= tableRight) { //and bill display ==none ?
				console.log("cashier returned")
				console.log("cashierleft evalrest", cashierLeft)
				console.log("table R, eval reset", tableRight)
				
				cashierStop();
			}

        }