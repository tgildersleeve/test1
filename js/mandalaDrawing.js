var prevX = 0,
        		currX = 0,
        		prevY = 0,
        		currY = 0;
        	
        	var widthCenter,
                heightCenter;
        		
			
    
   		function init() {
   			
        		canvas = document.getElementById("mandala");
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
                widthCenter = canvas.width / 2;
                heightCenter = canvas.height / 2;
                console.log(widthCenter + " " + heightCenter);
        		ctx = canvas.getContext("2d");
        		ctx.strokeStyle = "#55FF55";
        		ctx.lineWidth = 1;
        		
        		resetCanvas();
        		
        		canvas.addEventListener("mousemove", function(e){
        			getXY(e)
        		});
        		
        		allButtons();
        			
   	 	}
   	 		
   	 		// set up all buttons
   	 	function allButtons(){
   	 		var resetButton = document.getElementById("reset");
        		resetButton.addEventListener("click", resetCanvas);
        		
        		var colorButtons = document.getElementsByClassName("button");
        		// 		     white, 	  red, 	    orange, 	yellow,    green,      blue, 	purple,    magenta
        		var colors = ["#FFFFFF", "#FF0000", "#FFBB00", "#FFFF00", "#55FF55", "#0000FF", "#BB00FF", "#FF00FF"];
                	var startWidth = window.innerWidth / 2 - 83;
        		for (var i = 0; i < colorButtons.length; i++){
        			colorButtons[i].style.backgroundColor = colors[i];
        			colorButtons[i].addEventListener("click", setColor(i));
                   		colorButtons[i].style.left= startWidth+"px";
                    		startWidth += 20;
        		}
        		
        		function setColor(i){
        			return function(){
        				ctx.strokeStyle = colors[i];
        			};
        		}

   	 	}
   	 		
   	 		// get mouse's coordinates
   	 function getXY(e) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                drawMandala();
            }
            
            // clear the canvas
         function resetCanvas(){
            	ctx.lineWidth = 2;
            	ctx.strokeStyle = "#55FF55";
            	ctx.clearRect(0, 0, canvas.width, canvas.height);

        		
        	ctx.lineWidth = 1;
         }
			
	// senses if mouse is in a drawable screen space
    	function drawMandala(){
    		var xFromOCurr = currX - widthCenter;
    		var yFromOCurr = currY - heightCenter;
    		var xFromOPrev = prevX - widthCenter;
    		var yFromOPrev = prevY - heightCenter;
            drawCopies(prevX, prevY, currX, currY); // rotation
    		drawCopies(prevX - 2*xFromOPrev, prevY, currX - 2*xFromOCurr, currY); // mirror rotation
    	}        
            
        // draws the slices on the entire circle:
       function drawCopies(prevX, prevY, currX, currY){
       		for (var angle = 0; angle <= 2*Math.PI; angle += Math.PI/6){
        		// rotation formulas:
        		var xPrevRot = Math.cos(angle)*(prevX - widthCenter) - Math.sin(angle)*(prevY - heightCenter) + widthCenter;
        		var yPrevRot = Math.sin(angle)*(prevX - widthCenter) + Math.cos(angle)*(prevY - heightCenter) + heightCenter;
        		var xCurrRot = Math.cos(angle)*(currX - widthCenter) - Math.sin(angle)*(currY - heightCenter) + widthCenter;
        		var yCurrRot = Math.sin(angle)*(currX - widthCenter) + Math.cos(angle)*(currY - heightCenter) + heightCenter;
        		ctx.beginPath();
        		ctx.moveTo(xPrevRot, yPrevRot);
        		ctx.lineTo(xCurrRot, yCurrRot);
        		ctx.stroke();
        		ctx.closePath(); 
        	}
     	}