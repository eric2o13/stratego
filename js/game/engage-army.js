var ENGAGE_ARMY = (function($, Battlefield ){

	var checkOptions = function( $piece ) {

		var options = [], 
			$field 	= $piece.parents(".field"),
			fieldid = $field.attr("data-fieldid"),
			field 	= BOARD.selectFieldById(fieldid),
			piece	= field.occupiedBy,
			color   = piece.color,
			canMoveUp, 
			canMoveDown,
			canMoveRight,
			CanMoveLeft;

		if ( color != WAR.colorToMove ) {
			
			console.log('not your turn to move');
			return false;
		
		}

		if ( piece.canMove ) {

			//Check if piece can move up north
			for ( var y = field.row - 1; y >= 0; y-- ) {
				options.push( Battlefield[y][field.column].id );
				if ( Battlefield[y][field.column].blocked || Battlefield[y][field.column].occupied ) {
					if (Battlefield[y][field.column].blocked || Battlefield[y][field.column].occupiedBy.color == color ) {
						options.pop();
					}
					break;
				}
				if ( !piece.isScout ) break;
			}

			//Check if piece can move up south
			for ( var y = field.row + 1; y < 12; y++ ) {
				options.push( Battlefield[y][field.column].id );
				if ( Battlefield[y][field.column].blocked || Battlefield[y][field.column].occupied ) {
					if (Battlefield[y][field.column].blocked || Battlefield[y][field.column].occupiedBy.color == color ) {
						options.pop();
					}
					break;
				}
				if ( !piece.isScout ) break;
			}

			//check if piece can move left ( nog niet gechecked of t werkt )
			for ( var x = field.column -1; x >= 0; x-- ) {
				options.push( Battlefield[field.row][x].id );
				if ( Battlefield[field.row][x].blocked || Battlefield[field.row][x].occupied ) {
					if ( Battlefield[field.row][x].blocked || Battlefield[field.row][x].occupiedBy.color == color ) {
						options.pop();
					}
					break;
				}
			}

			// check if piece can move right;( nog niet gechecked of t werkt )
			for ( var x = field.column +1; x < 12; x++ ) {
				options.push( Battlefield[field.row][x].id );
				if ( Battlefield[field.row][x].blocked || Battlefield[field.row][x].occupied ) {
					if ( Battlefield[field.row][x].blocked || Battlefield[field.row][x].occupiedBy.color == color ) {
						options.pop();
					}
					break;
				}
			}

			/*
  				Highlight the available options
			*/

			( options.length ) ? highlightOptions( field, options ): console.log('there are no available options for this piece');

		} else {

			console.log('this piece cannot move.');

		}

	};

	var highlightOptions = function( field, options ) {

		field.selected = true;
		BOARD.selectedFieldId = field.id;

		for ( var x = 0, fieldid; x < options.length; x++ ) {
			
			fieldid = options[x];
			field = BOARD.selectFieldById( fieldid );
			field.validOption = true;
		}

		BOARD.render();

	};

	var isInt = function( n ) {

 	  return n % 1 === 0;

	};

	var engageToField = function( $field ) {

		var fieldid  = $field.attr("data-fieldid"),
			newField = BOARD.selectFieldById( fieldid ),
			selectedField = BOARD.selectFieldById( BOARD.selectedFieldId ),
			piece = selectedField.occupiedBy,
			attackingpiece,
			defendingpiece,
			winningpiece;

		if ( !newField.occupied ) {

			newField.occupied = true;
			newField.occupiedBy = piece;
			selectedField.occupied = false;
			selectedField.occupiedBy = undefined;

		} else {

			attackingpiece = piece;
			defendingpiece = newField.occupiedBy;
			winningpiece   = prepareForBattle( attackingpiece, defendingpiece );

			if ( winningpiece == 'none' ) {

				newField.occupied = false;
				newField.occupiedBy = undefined;
				selectedField.occupied = false;
				selectedField.occupiedBy = undefined;

			} else {

				newField.occupied = true;
				newField.occupiedBy = winningpiece;
				selectedField.occupied = false;
				selectedField.occupiedBy = undefined;

			}

		}

		BOARD.selectedFieldId = undefined;

		switchPlayerTurns();
		resetToDefaultState();
		BOARD.render();

	};

	var prepareForBattle = (function( attackingpiece, defendingpiece ){

		if ( isInt(attackingpiece.rank) && isInt(defendingpiece.rank) ) {
			if ( attackingpiece.rank == defendingpiece.rank ) {	
				var winningpiece = 'none';
			} else {
				var winningpiece = (attackingpiece.rank < defendingpiece.rank) ? attackingpiece : defendingpiece;
				if ( attackingpiece.rank == 10 && defendingpiece.rank == 1 ) {
					winningpiece = attackingpiece;
				}
			}

		} else {

			if ( defendingpiece.rank == "B" ) {

				var winningpiece = (attackingpiece.isMiner) ? attackingpiece : defendingpiece;
				
			} else if ( defendingpiece.rank == "F") {

				alert('je hebt gewonnen');	
				var winningpiece = attackingpiece;

			}
			
		}

		var losingpiece = (winningpiece == attackingpiece) ? defendingpiece : attackingpiece;

		return winningpiece;

	});

	var resetToDefaultState = (function(){

		for ( var y = 0; y < 12; y++ ) {
			for (var x = 0; x < 12; x++ ) {
				Battlefield[y][x].selected = false;
				Battlefield[y][x].validOption = false;
			}
		}

	});

	var initializeArmy = (function(){

		if ( WAR.started ) {

			console.log('The war has begon. Your army may engage!');
			bindClickEvents();
		
		}

	});

	var switchPlayerTurns = (function(){

		WAR.colorToMove = (WAR.colorToMove == "red") ? "blue" : "red";
		getAllOptions();

	});

	var getAllOptions = (function(){

		var redPieces = PIECES.red,
			bluePieces = PIECES.blue,
			array = (WAR.colorToMove == "red") ? redPieces : bluePieces;

		console.log(array);

	});

	var bindClickEvents = (function(){

		$(document).on('click', '#battlefield .field figure', function () {

			if ( WAR.started ) {
				if ( !$(".valid-option").length ) {
					checkOptions( $(this) );
				} else {
					resetToDefaultState();
					BOARD.render();
				}
			}

		});

		$(document).on('click', '#battlefield .field.valid-option', function () {
			if (WAR.started) {
				engageToField( $(this) );
			}
		});

	});

	return {

		init: function(){

			initializeArmy();

		}

	};

})( jQuery, BOARD.canvas );