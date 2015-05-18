var ARRANGE_ARMY = (function( $ , Battlefield, selectedFieldId ){

	var checkAvailableOptions = function( $element ){

		var options = [],
			$field 	= $element.parents(".field"),
			fieldid = $field.attr("data-fieldid"),
			field 	= BOARD.selectFieldById(fieldid),
			piece 	= field.occupiedBy,
			color 	= piece.color;

		for ( var y = 0; y < 12; y++ ) {
			for ( var x = 0; x < 12; x++ ) {
				if (Battlefield[y][x].occupied) {
					if (Battlefield[y][x].occupiedBy.color == color) {
						if (Battlefield[y][x].id != fieldid) {
							options.push(Battlefield[y][x].id);
						}
					}
				}
			}
		}

		field.selected = true;
		BOARD.selectedFieldId = field.id;
		selectedFieldId = fieldid;

		highlightAvailableOptions( options );

	};

	var highlightAvailableOptions = function( options ){
		
		for (var x = 0, field, fieldid; x < options.length; x++ ) {

			fieldid = options[x];
			field = BOARD.selectFieldById(fieldid);
			field.validOption = true;
		
		}

		BOARD.render();

	};

	var switchSelectedTo = function( fieldid ){

		var originalField = BOARD.selectFieldById(selectedFieldId),
			pieceToMove   = BOARD.selectFieldById(selectedFieldId).occupiedBy,
			newField 	  = BOARD.selectFieldById(fieldid),
			pieceToTrade  = BOARD.selectFieldById(fieldid).occupiedBy;

		//console.log( pieceToMove.name + " on field " + originalField.id + " trades places with the " + pieceToTrade.name + " on field " + newField.id );
		
		/* set new values */
		originalField.occupiedBy = newField.occupiedBy;
		pieceToTrade.onField 	 = originalField.id;

		newField.occupiedBy 	 = pieceToMove;
		pieceToMove.onField 	 = newField.id;

		//console.log(pieceToMove.name + " is now on field " + pieceToMove.onField );
		//console.log(pieceToTrade.name + " is now on field " + pieceToTrade.onField)

		/* Reset active state & valid options */
		BOARD.selectFieldById(selectedFieldId).selected = false;
		for ( var y = 0; y < 12; y++ ) {
			for (var x = 0; x < 12; x++ ){
				Battlefield[y][x].validOption = false;
			}
		}

		//console.log("piece that moved: " , pieceToMove);
		//console.log("traded places with: " , pieceToTrade );
		//console.log("field piece moved to: ", newField );
		//console.log("original field: ", originalField );

		/* Re render board */
		BOARD.render();

	};

	var startGame = (function(){

		WAR.started = true;
		ENGAGE_ARMY.init();

	});

	$(document).on("ready", function(){

		$(document).on('click', '#battlefield .field figure', function () {

			var $this = $(this);

			if ( !WAR.started ) {
				if ( !$this.parents(".field").hasClass("selected") && !$(".field.selected").length ) {
					checkAvailableOptions( $this );
				}
			} 


		});

		$(document).on('click', '#battlefield .field.valid-option', function () {

			var $this = $(this),
				fieldid = $this.attr("data-fieldid");
				
			//securityChecks();
			if ( !WAR.started) switchSelectedTo( fieldid ); 

		});

		$(document).on('click', '#startGame button.btn-primary', function () {

			startGame();
			$("*[data-target='#startGame']").hide().remove();

		});

	});

})( jQuery, BOARD.canvas, BOARD.selectFieldId );