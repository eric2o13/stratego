var WAR = (function( $ ){

	var started = false;
	var colorToMove = undefined;

	var $movelist = $("#movelist");
	var moveIndex = 0;
	var movehistory = [];
	var saveMove = (function(move){

		movehistory.push( move );
		moveIndex++;

	});

	var renderMoveList = (function( ){

		for ( var x = 0, html = '', move, piece; x < movehistory.length; x++ ) {

			move = movehistory[x];
			piece = move.movingPiece;

			//html += x + ". "+ move.movingPiece.name + " from field " + move.fromField + " to field " + move.toField + "<br>";
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
	});

	var end = (function(){

		alert('the war has ended.. someone won');

	});

	return {
		
		started: started,
		colorToMove: colorToMove,
		moveIndex: moveIndex,
		movehistory: movehistory,

		renderMoveList: function(){
			
			renderMoveList();

		},

		saveMove: function( move ){

			saveMove(move);

		},

		end: function(){

			end();
		
		}

	};

})( jQuery );