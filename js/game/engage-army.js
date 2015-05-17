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
				options.push( Battlefield[field.row][x] );
				if ( Battlefield[field.row][x].blocked || Battlefield[field.row][x].occupied ) {
					if ( Battlefield[field.row][x].blocked || Battlefield[field.row][x].occupiedBy.color == color ) {
						options.pop();
					}
					break;
				}
			}

			// check if piece can move right;( nog niet gechecked of t werkt )
			for ( var x = field.column +1; x < 12; x++ ) {
				options.push( Battlefield[field.row][x] );
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

			highlightOptions( field, options );

		} else {

			console.log('this piece is not allowed to move');

		}

	};

	var highlightOptions = function( field, options ) {

		console.log(options);
		field.selected = true;

		for ( var x = 0, fieldid; x < options.length; x++ ) {
			
			fieldid = options[x];
			field = BOARD.selectFieldById( fieldid );
			field.validOption = true;
		}

		BOARD.render();

	};

	var initializeArmy = (function(){

		if ( WAR.started ) {

			console.log('The war has begon. Your army may engage!');
			bindClickEvents();
		
		}

	});

	var bindClickEvents = (function(){

		$(document).on('click', '#battlefield .field figure', function () {

			if ( WAR.started) checkOptions( $(this) );

		});

		//hier gebleven:
		//klik functie maken voor de available options,
		//zodat stukken daadwerkelijk kunnen bewegen.


	});

	return {

		init: function(){

			initializeArmy();

		}

	};

})( jQuery, BOARD.canvas );