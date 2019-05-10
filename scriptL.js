	'use strict';
		// initialize table and customer position

		var customer = document.getElementById('customer');
		var orderTable = document.getElementById('order-table');
		var cashier = document.getElementById('cashier');
		var receipt = document.getElementById("receipt");


		var intervalId;
		var cashierInterval;
        var cashierReturnInterval;

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
        }

        function cashierWalk(){
        	cashier.style.left = `${parseInt(cashier.style.left.replace("px",""))+10}px`
        	receipt.style.left = `${parseInt(receipt.style.left.replace("px",""))+10}px`
        }

        function cashierStop() {
        	clearInterval(cashierInterval);
        }

        function cashierEvalStop(){

        	var cashierLeft = parseInt(cashier.style.left.replace("px",""));
        	
        	const cashierStopPt = 880; //change to chef meeting point once kitchen is updated

        	if (cashierLeft >= cashierStopPt) {
				cashierStop();
                
                cashierReturn();
			}
        }


        function cashierReturn(){
            startChef1();
            //setTimeout(() => cashierFlip(), 3500);
        	cashierFlip();
            cashierReturnInterval = setInterval(cashierReturnTick, 55);

        }

        function cashierFlip(){
        	receipt.style.display = "none";
        	cashier.style.transform = "scaleX(1)";
        }

        function cashierReturnTick(){
            cashierWalkLeft();
            cashierEvalReset();

        }
        function cashierWalkLeft(){
        	cashier.style.left = `${parseInt(cashier.style.left.replace("px",""))-10}px`;
        }

        function cashierEvalReset(){
        	//stop once cashierLeft is near tableRight
        	var cashierLeft = parseInt(cashier.style.left.replace("px",""));
        	var tableRight = parseInt(orderTable.style.left.replace("px",""))+100; //table Lf + width

        	if (cashierLeft <= tableRight) { //and bill display ==none ?
				cashierReturnStop();
			}
        }

        function cashierReturnStop(){
            clearInterval(cashierReturnInterval);
        }