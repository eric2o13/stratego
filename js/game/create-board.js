/*=============================================================
---------------------------------------------------------------
===============================================================

	Board constructor:
	Creates and initiates the battlefield.

===============================================================	
---------------------------------------------------------------
=============================================================*/

var BOARD = (function( $ ){

	var $battlefield 	= $("#battlefield"),
		Battlefield 	= [],
		RedPieces 		= PIECES.red,
		BluePieces 		= PIECES.blue,
		selectedFieldId	= undefined;

	var Field = function( y, x, id ){

		this.row 		= y;
		this.column 	= x;
		this.id 		= String.fromCharCode(97 + y) + x;
		this.occupied	= false;
		this.blocked 	= false;
		this.occupiedBy = undefined;
		this.selected 	= false;
		this.validOption= false;

	};

	var selectFieldById = function( id ){ 

		var row = id.charAt(0).charCodeAt(0) - 97;
		var column = id.match(/\d+/)[0];

		return Battlefield[row][column];

	};

	var renderBattlefield = function(){
		
		for (var row = 0, html = ""; row < Battlefield.length; row++ ) {
			html += "<div class='row' data-rowid='"+row+"'>";
			for ( var column = 0, fieldclasses, field, content, fieldattributes; column < Battlefield[row].length; column++ ) {

				field = Battlefield[row][column];
			
				fieldclasses = "field col-sm-1 ";
				fieldclasses += (field.blocked) ? " blocked" : "";
				fieldclasses += (field.occupied) ? " occupied" : "";
				fieldclasses += (field.validOption) ? " valid-option" : "";
				fieldclasses += (field.selected) ? " selected" : "";

				fieldattributes = "data-fieldid='"+field.id+"'";

				contentattributes = (field.occupied) ? "class='"+field.occupiedBy.color+"' data-name='"+field.occupiedBy.name+"' ": "class='field-id "+field.id+"' ";
				content = (field.occupied) ? "<figure "+contentattributes+">" + field.occupiedBy.rank + "</figure>" :"<span "+contentattributes+">" + field.id + "</span>";

				html += "<div class='"+fieldclasses+"' "+fieldattributes+">" + content + "</div>";

			}

			html += "</div>";
		}

		$battlefield.html(html);

	};

	var createBattlefield = (function(){

		for ( var y = 0; y < 12; y++ ) {
			Battlefield.push( [] );
			for ( var x = 0, row; x < 12; x++) {
				Battlefield[y].push( new Field( y, x, 0 ) );
			}
		}

	})();

	var setBlockedFields = (function(){

		var a0 = selectFieldById("a0"),
			a1 = selectFieldById("a1"),
			a2 = selectFieldById("a2"),
			a3 = selectFieldById("a3"),
			a4 = selectFieldById("a4"),
			a5 = selectFieldById("a5"),
			a6 = selectFieldById("a6"),
			a7 = selectFieldById("a7"),
			a8 = selectFieldById("a8"),
			a9 = selectFieldById("a9"),
			a10 = selectFieldById("a10"),
			a11 = selectFieldById("a11");
		
			a0.blocked = true; 
			a1.blocked = true;
			a2.blocked = true;
			a3.blocked = true; 
			a4.blocked = true; 
			a5.blocked = true; 
			a6.blocked = true; 
			a7.blocked = true;
			a8.blocked = true;
			a9.blocked = true;
			a10.blocked = true;
			a11.blocked = true;

		var b0 = selectFieldById("b0"),
			c0 = selectFieldById("c0"),
			d0 = selectFieldById("d0"),
			e0 = selectFieldById("e0"),
			f0 = selectFieldById("f0"),
			g0 = selectFieldById("g0"),
			h0 = selectFieldById("h0"),
			i0 = selectFieldById("i0"),
			j0 = selectFieldById("j0"),
			k0 = selectFieldById("k0"),
			l0 = selectFieldById("l0");

			b0.blocked = true;
			c0.blocked = true;
			d0.blocked = true;
			e0.blocked = true;
			f0.blocked = true;
			g0.blocked = true;
			h0.blocked = true;
			i0.blocked = true;
			j0.blocked = true;
			k0.blocked = true;
			l0.blocked = true;			

		var l0 = selectFieldById("l0"),
			l1 = selectFieldById("l1"),
			l2 = selectFieldById("l2"),
			l3 = selectFieldById("l3"),
			l4 = selectFieldById("l4"),
			l5 = selectFieldById("l5"),
			l6 = selectFieldById("l6"),
			l7 = selectFieldById("l7"),
			l8 = selectFieldById("l8"),
			l9 = selectFieldById("l9"),
			l10 = selectFieldById("l10"),
			l11 = selectFieldById("l11");

			l0.blocked = true;
			l1.blocked = true;
			l2.blocked = true;
			l3.blocked = true;
			l4.blocked = true;
			l5.blocked = true;
			l6.blocked = true;
			l7.blocked = true;
			l8.blocked = true;
			l9.blocked = true;
			l10.blocked = true;
			l11.blocked = true;

		var a11 = selectFieldById("a11"),
		 	b11 = selectFieldById("b11"),
		 	c11 = selectFieldById("c11"),
		 	d11 = selectFieldById("d11"),
		 	e11 = selectFieldById("e11"),
		 	f11 = selectFieldById("f11"),
		 	g11 = selectFieldById("g11"),
		 	h11 = selectFieldById("h11"),
		 	i11 = selectFieldById("i11"),
		 	j11 = selectFieldById("j11"),
		 	k11 = selectFieldById("k11"),
		 	l11 = selectFieldById("l11");

			a11.blocked = true;
			b11.blocked = true;
			c11.blocked = true;
			d11.blocked = true;
			e11.blocked = true;
			f11.blocked = true;
			g11.blocked = true;
			h11.blocked = true;
			i11.blocked = true;
			j11.blocked = true;
			k11.blocked = true;
			l11.blocked = true;

		var f3 = selectFieldById("f3"),
			f4 = selectFieldById("f4"),
			g3 = selectFieldById("g3"),
			g4 = selectFieldById("g4"),
			f7 = selectFieldById("f7"),
			f8 = selectFieldById("f8"),
			g7 = selectFieldById("g7"),
			g8 = selectFieldById("g8");

			f3.blocked = true;
			f4.blocked = true;
			g3.blocked = true;
			g4.blocked = true;
			f7.blocked = true;
			f8.blocked = true;
			g7.blocked = true;
			g8.blocked = true;

	})();

	var placeRedPiecesOnBoard = (function(){

		for ( var y = 0, i = 0, field; y < 5; y++ ) {
			for ( var x = 0; x < 12; x++ ) {
				field = Battlefield[y][x];
				if (!field.blocked) {
					piece = RedPieces[i];
					field.occupied = true;
					field.occupiedBy = piece;
					i++;
				}
			}
		}

	})();

	var placeBluePiecesOnBoard = (function(){

		for ( var y = 11, i = 0, field; y > 6; y-- ) {
			for ( var x = 0; x < 12; x++ ) {
				field = Battlefield[y][x];
				if (!field.blocked) {
					piece = BluePieces[i];
					field.occupied = true;
					field.occupiedBy = piece;
					i++;
				}
			}
		}

	})();

	renderBattlefield();

	return {

		'canvas': Battlefield,
		
		'selectedFieldId' : selectedFieldId,

		selectFieldById: function(id) {

			return selectFieldById(id);

		},

		render: function(){

			renderBattlefield();
		
		}

	};

})(jQuery);

//console.log( BOARD );