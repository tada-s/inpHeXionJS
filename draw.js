/* 
 * This javascript renders in canvas.
 */

var canvas, ctx;

/** Initialization **/

function initDraw(){
	canvas = document.getElementById("canvasGame");
	ctx = canvas.getContext("2d");
}

/** Main draw **/

function draw(){
	clearCanvas();
	drawBoardBack();
	drawBoardCells();
	drawDisks();
	drawMessage();
}

/** Main draw methods **/

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBoardBack(){
	ctx.lineJoin = "round";
	// Shadow
	ctx.lineWidth = 30;
	ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
	var shadowOrder = [0, 1, 2, 3, 0];
	var shadowX = [];
	var shadowY = [];
	for(var i = 0; i < shadowOrder.length; i++){
		shadowX.push(coordBoardPolygonX[shadowOrder[i]]);
		shadowY.push(coordBoardPolygonY[shadowOrder[i]]);
	}
	drawPolygon(shadowX, shadowY);
	ctx.stroke();
	// Edges
	ctx.lineWidth = 20;
	// Black Edge
	ctx.strokeStyle = "rgba(0, 0, 0, 1)";
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	var blackEdgeOrder = [0, 3, 1, 2, 0];
	var blackEdgeX = [];
	var blackEdgeY = [];
	for(var i = 0; i < shadowOrder.length; i++){
		blackEdgeX.push(coordBoardPolygonX[blackEdgeOrder[i]]);
		blackEdgeY.push(coordBoardPolygonY[blackEdgeOrder[i]]);
	}
	drawPolygon(blackEdgeX, blackEdgeY);
	ctx.fill();
	ctx.stroke();
	// White Edge
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	var whiteEdgeOrder = [0, 1, 3, 2, 0];
	var whiteEdgeX = [];
	var whiteEdgeY = [];
	for(var i = 0; i < shadowOrder.length; i++){
		whiteEdgeX.push(coordBoardPolygonX[whiteEdgeOrder[i]]);
		whiteEdgeY.push(coordBoardPolygonY[whiteEdgeOrder[i]]);
	}
	drawPolygon(whiteEdgeX, whiteEdgeY);
	ctx.fill();
	ctx.stroke();
}

function drawBoardCells(){
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.fillStyle = "rgba(225, 0, 0, 1)";
	ctx.lineWidth = 2;
	for(var i = 0; i < board.cellRow; i++){
		for(var j = 0; j < board.cellColumn; j++){
			var x = getCellX(i, j);
			var y = getCellY(i, j);
			pathHexagon(x, y, sizeBoardCell);
			ctx.fill();
		}
	}
	for(var i = 0; i < board.cellRow; i++){
		for(var j = 0; j < board.cellColumn; j++){
			var x = getCellX(i, j);
			var y = getCellY(i, j);
			pathHexagon(x, y, sizeBoardCell);
			ctx.stroke();
		}
	}
	ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
	if(isSelected){
		var x = getCellX(selectedCell.i, selectedCell.j);
		var y = getCellY(selectedCell.i, selectedCell.j);
		pathHexagon(x, y, sizeBoardCell);
		ctx.fill();
		ctx.stroke();
	}
}

function drawDisks(){
	var colorWhiteDisk = "rgba(255, 255, 255, 1)";
	var colorBlackDisk = "rgba(0, 0, 0, 1)";
	if(gameState == STATE_WHITE_WIN){
		colorBlackDisk = "rgba(0, 0, 0, 0.6)"
	}else if(gameState == STATE_BLACK_WIN){
		colorWhiteDisk = "rgba(255, 255, 255, 0.6)";
	}
	
	// Draw static disks
	for(var i = 0; i < board.cellRow; i++){
		for(var j = 0; j < board.cellColumn; j++){
			if(board.cell[i][j] != CELL_EMPTY && (!isMouseDragging || (isMouseDragging && !(dragStartCell.i == i && dragStartCell.j == j)))){
				var x = getCellX(i, j);
				var y = getCellY(i, j);
			
				ctx.lineWidth = 4;
				if(board.cell[i][j] == CELL_BLACK){
					ctx.fillStyle = colorBlackDisk;
				}else{
					ctx.fillStyle = colorWhiteDisk;
				}
				ctx.strokeStyle = "rgba(0, 0, 0, 0)";
				fillDisc(x, y, sizeDisk);
			}
		}
	}
	// Draw dragged disk
	if(isMouseDragging && (board.cell[dragStartCell.i][dragStartCell.j] != CELL_EMPTY)){
		var x = getCellX(dragStartCell.i, dragStartCell.j);
		var y = getCellY(dragStartCell.i, dragStartCell.j);
		if(isMovable(dragStartCell.i, dragStartCell.j)){
			x += mouse.x - dragStartMouse.x;
			y += mouse.y - dragStartMouse.y;
		}
		if(board.cell[dragStartCell.i][dragStartCell.j] == CELL_BLACK){
			ctx.fillStyle = colorBlackDisk;
		}else{
			ctx.fillStyle = colorWhiteDisk;
		}
		fillDisc(x, y, sizeDisk);
	}
}

function drawMessage(){
	ctx.font = "bold 25px Arial";
	ctx.lineWidth = 0.8;
	if(1 <= gameState && gameState <= 6){
		ctx.fillStyle = "rgba(240, 240, 240, 1)";
		ctx.strokeStyle = "rgba(0, 0, 0, 1)";
		ctx.fillText(getGameMessage(), 70, 33);
		ctx.strokeText(getGameMessage(), 70, 33);
	}else{
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.strokeStyle = "rgba(0, 0, 0, 1)";
		ctx.fillText(getGameMessage(), 70, 33);
	}
	ctx.strokeStyle = "rgba(0, 0, 0, .5)";
	ctx.lineWidth = 2;
	fillDisc(30, 25, sizeDisk);
}

function getGameMessage(){
	switch(gameState){
		case STATE_WHITE_MOVE:
			return "White player: move a Black disk";
		case STATE_WHITE_PLACE:
			return "White player: place a White disk";
		case STATE_WHITE_SURROUND_MOVE:
			return "White player: move a surrounded Black Disk";
		case STATE_WHITE_WIN:
			return "White player WIN! Click to start another game";
		case STATE_BLACK_MOVE:
			return "Black player: move a White disk";
		case STATE_BLACK_SURROUND_MOVE:
			return "Black player: move a surrounded White Disk";
		case STATE_BLACK_WIN:
			return "Black player WIN! Click to start another game";
		case STATE_DRAW:
			return "Draw Game";
		case STATE_NONE:
		default:
			return "";
	}
}

/** Auxiliar drawing methods **/

function drawPolygon(x, y){
	ctx.beginPath();
	ctx.moveTo(x[0], y[0]);
	for(var i = 1; i < x.length; i++){
		ctx.lineTo(x[i], y[i]);
	}
	ctx.closePath();
}

function fillDisc(x, y, size){
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function pathHexagon(x, y, size){
	ctx.beginPath();
	ctx.moveTo(x + coordHexagonX[5] * size, y + coordHexagonY[5] * size);
	for(var i = 0; i < 6; i++){
		ctx.lineTo(x + coordHexagonX[i] * size, y + coordHexagonY[i] * size);
	}
	ctx.closePath();
}
