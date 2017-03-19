const CELL_EMPTY = 0;
const CELL_WHITE = 1;
const CELL_BLACK = 2;

var board = {
	cell: [],
	cellRow: 7,
	cellColumn: 7,
	cellSize: 40,
	screenOffX: 90,
	screenOffY: 120
};

function initBoard(){
	board.cell = [];
	for(var i = 0; i < board.cellRow; i++){
		board.cell.push([]);
		for(var j = 0; j < board.cellColumn; j++){
			board.cell[i].push(CELL_EMPTY);
		}
	}
}

