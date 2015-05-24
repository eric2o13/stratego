var CPU = (function($, Battlefield){

	var getOptions = function(){

		var pieces = PIECES.blue;
		for ( var x = 0, potentialMoves = [], piece, $piece, $field; x < pieces.length; x++ ) {

			piece = pieces[x];
			if (piece.canMove && piece.onBoard) {
				if (pieceHasOptions(piece)) {

					console.log(pieceHasOptions(piece));
				
				} 
			}

		}

		//console.log(potentialMoves);

	};

	var pieceHasOptions = (function( piece ){

		var color 	= piece.color,
			fieldid = piece.onField,
			field 	= BOARD.selectFieldById(fieldid),
			row 	= field.row,
			column 	= field.column,

			moveOption 		= {},
			totalOptions 	= [],

			fieldNorth	= Battlefield[row-1][column],
			fieldSouth	= Battlefield[row+1][column],
			fieldEast 	= Battlefield[row][column+1],
			fieldWest	= Battlefield[row][column-1],

			canMoveUp		= (!fieldNorth.blocked && !fieldNorth.occupied ) ? true: (fieldNorth.blocked) ? false : (fieldNorth.occupiedBy.color == color) ? false : true,
			canMoveDown 	= (!fieldSouth.blocked && !fieldSouth.occupied ) ? true: (fieldSouth.blocked) ? false : (fieldSouth.occupiedBy.color == color) ? false : true,
			canMoveRight 	= (!fieldEast.blocked && !fieldEast.occupied ) ? true: (fieldEast.blocked) ? false : (fieldEast.occupiedBy.color == color) ? false : true,
			canMoveLeft 	= (!fieldWest.blocked && !fieldWest.occupied ) ? true: (fieldWest.blocked) ? false : (fieldWest.occupiedBy.color == color) ? false : true;

		if (canMoveUp || canMoveDown || canMoveRight || canMoveLeft) {
			
			if (canMoveUp)		totalOptions.push( fieldNorth.id );
			if (canMoveDown)	totalOptions.push( fieldSouth.id );
			if (canMoveRight) 	totalOptions.push( fieldEast.id );
			if (canMoveLeft) 	totalOptions.push( fieldWest.id );

			if (piece.isScout) {

				if (canMoveUp) {
					for (var x = row - 1; x >= 0; x-- ) {

						//de eerste moet ie overslaan. maar is geen ramp als die 2x voorkomt
						totalOptions.push( Battlefield[x][column].id );
						if ( Battlefield[x][column].blocked || Battlefield[x][column].occupied ) {
							if (Battlefield[x][column].blocked || Battlefield[x][column].occupiedBy.color == color ) {
								totalOptions.pop();
							}
							break;
						}
					}
				}

				
				if (canMoveDown) {
					for ( var y = row + 1; y < Battlefield.length; y++ ) {
						totalOptions.push( Battlefield[y][column].id );
						if ( Battlefield[y][column].blocked || Battlefield[y][column].occupied ) {
							if (Battlefield[y][column].blocked || Battlefield[y][column].occupiedBy.color == color ) {
								totalOptions.pop();
							}
							break;
						}						
					}
				}

				/*
					rechts en links toevoegen!!
				*/

			}

			moveOption = {

				piece: piece,
				onField: fieldid,
				canMoveUp: canMoveUp,
				canMoveDown: canMoveDown,
				canMoveRight: canMoveRight,
				canMoveLeft: canMoveLeft,
				options: totalOptions

			};

			return moveOption;	
		}
		
	});
	
	var knownPieces = [];

	var initiateToEngage = (function(){

		console.log('computer is to move');
		getOptions();

	});


	return {
		move: function(){
			initiateToEngage();
		}
	}

})(jQuery, BOARD.canvas);