	'use strict';
		// initialize table and customer position

		var customer = document.getElementById('customer');
		var orderTable = document.getElementById('order-table');
		var cashier = document.getElementById('cashier');

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
			intervalId = setInterval(tick, 50);
        }

        function tick() {
			moveRight();
			customerEvalStop();
        }

		function stop(){
			clearInterval(intervalId);
		}

		function moveRight() {
			customer.style.left = `${parseInt(customer.style.left.replace("px",""))+10}px`
		}

		function customerEvalStop(){
			var customerLeft = parseInt(customer.style.left.replace("px",""));
			var customerRight = customerLeft + 83;
			var tableLeft = parseInt(orderTable.style.left.replace("px",""));

			if (customerRight >= (tableLeft +2)) {
				stop();
				console.log("Triggering the OrderIn event")
           		document.dispatchEvent(orderIn);
			}
		}

	//add event listener
		document.addEventListener("OrderIn", function(e) {
        	alert("Dog barked event!");
        	console.log("person speak")
        	goodBoy();
        	return false // this keeps the page from reloading
        });
