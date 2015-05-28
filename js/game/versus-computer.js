var CPU = (function($, Battlefield){

	var spottedPieces = []; // [ knownPiece: { rank: 2, onField: e2 } ]

	var getOptions = function(){

		var pieces = PIECES.blue;
		for ( var x = 0, piecesWithOptions = [], piece, $piece, $field; x < pieces.length; x++ ) {

			piece = pieces[x];
			if (piece.canMove && piece.onBoard) {
				if (pieceHasOptions(piece)) {
					piecesWithOptions.push( pieceHasOptions(piece) );
				} 
			}

		}

		createMovelist( piecesWithOptions );

	};

	var createMovelist = (function(piecesWithOptions){
		
		var movelist = [];
		for (var key in piecesWithOptions) {
			if (piecesWithOptions.hasOwnProperty(key)) {

				var obj = piecesWithOptions[key].options,
				piece = piecesWithOptions[key].piece;

				for (var prop in obj) {
					if(obj.hasOwnProperty(prop) ){
						movelist.push( [piece, piece.onField, obj[prop] ]); // [ piece, fromfieldid, tofieldid ];
					}
				}
			}
		}

		renderBestMove( movelist );

	});

	var renderBestMove = (function( movelist ){

		/*
			
			We verbinden voorlopig credits aan iedere move.
			Je krijgt punten voor:

				- een stuk capturen
				- naar voren bewegen

			Verder kunnen we per piece nog wat dingen bedenken
				- een scout moet alleen springen als hij ook daadwerkelijk een stuk kan capturen
				- een spion moet alles ontlopen, tenzij hij weet waar de vlag is.
 	
		*/
		
		console.log(movelist);
		var randomMove = movelist[Math.floor(Math.random()*movelist.length)];
		play( randomMove[0], randomMove[1], randomMove[2]  );

	});

	var play = (function( piece, fromfieldid, tofieldid ){
		
		var $field = $(".field[data-fieldid='"+tofieldid+"']");

		BOARD.selectedFieldId = fromfieldid;
		ENGAGE_ARMY.engageToField($field);

		//console.log("play " + piece.name + "from field " + fromfieldid + " to field " + tofieldid + " and switch turns");

	});

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
						if (x != row - 1) totalOptions.push( Battlefield[x][column].id );
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
						if (y != row + 1) totalOptions.push( Battlefield[y][column].id );
						if ( Battlefield[y][column].blocked || Battlefield[y][column].occupied ) {
							if (Battlefield[y][column].blocked || Battlefield[y][column].occupiedBy.color == color ) {
								totalOptions.pop();
							}
							break;
						}						
					}
				}

				if (canMoveLeft) {
					for ( var l = column - 1; l >= 0; l-- ) {
						if (l != column - 1) totalOptions.push( Battlefield[row][l].id );
						if ( Battlefield[row][l].blocked || Battlefield[row][l].occupied ) {
							if (Battlefield[row][l].blocked || Battlefield[row][l].occupiedBy.color == color ) {
								totalOptions.pop();
							}
							break;
						}						
					}
				}

				if (canMoveRight) {
					for ( var r = column + 1; r < Battlefield.length; r++ ) {
						if (r != column + 1) totalOptions.push( Battlefield[row][r].id );
						if ( Battlefield[row][r].blocked || Battlefield[row][r].occupied ) {
							if (Battlefield[row][r].blocked || Battlefield[row][r].occupiedBy.color == color ) {
								totalOptions.pop();
							}
							break;
						}						
					}
				}

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