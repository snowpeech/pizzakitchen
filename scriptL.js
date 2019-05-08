	'use strict';
		// initialize table and customer position

		var customer = document.getElementById('customer');
		var orderTable = document.getElementById('order-table');
		var cashier = document.getElementById('cashier');
		var receipt = document.getElementById("receipt");


		var intervalId;

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
        	
        });

        function audioOrder(){
        	var voiceOrder = document.getElementById("order-up");
			voiceOrder.play();  
        }

        function billAppear(){
        	var receipt = document.getElementById("receipt");
        	receipt.style.display="block";
        	console.log("bill Appears")
        }

        function cashierStart() {
			intervalId = setInterval(cashierTick, 50);
        }

        function cashierTick() {
			cashierWalk();
			cashierEvalStop();
        }

        function cashierWalk(){
        	
        	cashier.style.left = `${parseInt(cashier.style.left.replace("px",""))+10}px`
        	receipt.style.left = `${parseInt(receipt.style.left.replace("px",""))+10}px`
        	//console.log("cashierWalk")
        }
/// ERRORS BELOW!!!! VIEWPORT SIZE ISSUES ON STOPPING
        function cashierEvalStop(){
        	var cashierLeft = parseInt(customer.style.left.replace("px",""));
        	var cashierStop = parseInt(viewportSize.getWidth())-100;
        	console.log(cashierStop)

        	console.log("cashier stop!")

        	if (cashierLeft >= cashierStop) {
				stop();
				
				console.log("cashier stop")
			}
        }