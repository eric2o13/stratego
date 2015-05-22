var CPU = (function($, Battlefield){

	var checkOptions = function(){

		var pieces = PIECES.blue;

		for ( var x = 0, piece; x < pieces.length; x++ ) {

			piece = pieces[x];
			if (piece.canMove && piece.onBoard) {
				if (ENGAGE_ARMY.canPieceMove(piece) ) {
					
					//we moeten een goede manier hebben
					//om een stap te doen en op te slaan
					//logischerwijs iets als:
					//movePieceToField( piece, fieldid );
					//verder kunnen we ook ENGAGE_ARMY.engageToField( $field ) gebruiken om te renderen

				}
			}

		}

	};

	var knownPieces = [];

	var initiateToEngage = (function(){

		console.log('computer is to move');
		checkOptions();

	});


	return {
		move: function(){

			initiateToEngage();

		}
	}

})(jQuery, BOARD.canvas);