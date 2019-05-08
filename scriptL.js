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
        	console.log("customer ordered")
        	audioOrder();
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
        	console.log("bill Appears")
        }

        function cashierStart() {
			cashierInterval = setInterval(cashierTick, 50);
        }

        function cashierTick() {
			cashierWalk();
			cashierEvalStop();
			cashierEvalReturn();
        }

        function cashierWalk(){
        	//cashier needs to flip direction
        	cashier.style.left = `${parseInt(cashier.style.left.replace("px",""))+10}px`
        	receipt.style.left = `${parseInt(receipt.style.left.replace("px",""))+10}px`
        }

        function cashierStop() {
        	clearInterval(cashierInterval);
        }
/// ERRORS BELOW!!!! cashierLeft isnt updating
        function cashierEvalStop(){
        	var cashierLeft = parseInt(cashier.style.left.replace("px",""));
        	
        	const cashierStopPt = 500; //change once kitchen is updated
        	console.log(cashierStop); 

        	if (cashierLeft >= cashierStopPt) {
				cashierStop();

			}
        }

        function cashierEvalReturn(){
        	//call coordinates of interest
        	//when cashier is near chef, bill disappears and 
        }