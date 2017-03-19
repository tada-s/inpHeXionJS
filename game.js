window.onload = init;

function init(){
	setupEvents("canvasGame");
	setEventMouseMove(true);
	setupDraw();
	initBoard();
	
	drawBoard();
	
	console.log("Game Loaded!");
}

function eventMouseMove(){
	clearCanvas();
	drawMouse(mouse.x, mouse.y, 100);
	drawBoard();
}


