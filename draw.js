var canvas, ctx;

function setupDraw(){
	canvas = document.getElementById("canvasGame");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
}

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMouse(x, y){
	ctx.strokeStyle="green";
	ctx.fillRect(x, y, 10, 10);
}

function drawBoard(){
	var sqr3_2 = Math.sqrt(3) / 2;

	var deltaX = 2 * board.cellSize * sqr3_2;
	var deltaY = 3 / 2 * board.cellSize;
	
	for(var i = 0; i < board.cellRow; i++){
		for(var j = 0; j < board.cellColumn; j++){
			var x = board.screenOffX + i * deltaX + j * board.cellSize * sqr3_2;
			var y = board.screenOffY + j * deltaY;
			drawHexagon(x, y, board.cellSize);
		}
	}
}

function drawHexagon(x, y, size){
	var sqr3_2 = Math.sqrt(3) / 2;
	px = [0, sqr3_2, sqr3_2, 0, -sqr3_2, -sqr3_2];
	py = [1, 0.5, -0.5, -1, -0.5, 0.5];
	ctx.strokeStyle="black";
	ctx.beginPath();
	ctx.moveTo(x + px[5] * size, y + py[5] * size);
	for(var i = 0; i < 6; i++){
		ctx.lineTo(x + px[i] * size, y + py[i] * size);
	}
	ctx.closePath();
	ctx.stroke();
}
