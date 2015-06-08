var GAME = (function(){
	
	var mode = 1 || 2 || 3, //1: player vs player, 2: player vs comp, 3: comp vs comp 
		colorToMove = undefined,
		started = false,
		$movelist = $("#movelist"),
		moveIndex = 0,
		movehistory = [];

	var end = function(){

		alert('the war has ended.. someone won');

	};

	var saveMove = function( move ){

		movehistory.push( move );
		moveIndex++;

	};

	var renderMoveList = function( ){

		for ( var x = 0, html = '', move, piece; x < movehistory.length; x++ ) {

			move = movehistory[x];
			piece = move.movingPiece;

			html += x + ". " + piece.rank + " " + move.fromField + " " + move.indicator + " ";

			switch (move.indicator) {

				case "-+":
				case "+-":
				case "--":
					html += piece.rank + " " + move.toField + " ";
					break;

				default:
					html += move.toField + " ";
					break;
			
			}

			html +="<br><hr>";

		}

		$movelist.html(html);

	};

	var initialize = function(){
		
	};
	
	return {

		initialize: initialize,
		mode: mode,
		colorToMove: colorToMove,
		started: started,
		moveIndex: moveIndex,
		movehistory: movehistory,
		renderMoveList: renderMoveList,
		saveMove: saveMove,
		end: end

	};

})();

console.log(GAME);

