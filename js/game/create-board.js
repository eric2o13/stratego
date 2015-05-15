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
		Battlefield 	= [];

	var Field = function( y, x, id ){

		this.row 		= y;
		this.column 	= x;
		this.id 		= String.fromCharCode(97 + y) + x;
		this.occupied	= false;
		this.blocked 	= false;
		this.occopiedBy = undefined;

	};

	var selectFieldById = function( id ){ //moet dit in een global.js komen?

		var row = id.charAt(0).charCodeAt(0) - 97;//
		var column = id.match(/\d+/)[0];

		return Battlefield[row][column];

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
		
		a0.blocked = 
		a1.blocked =
		a2.blocked =
		a3.blocked = 
		a4.blocked = 
		a5.blocked = 
		a6.blocked = 
		a7.blocked =
		a8.blocked =
		a9.blocked =
		a10.blocked =
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


	})();

	var renderBattlefield = (function(){
		
		for (var row = 0, html = ""; row < Battlefield.length; row++ ) {
			html += "<div class='row'>";
			for ( var column = 0, classnames, field; column < Battlefield[row].length; column++ ) {

				field = Battlefield[row][column];
				classnames = (field.blocked) ? "field col-sm-1 blocked" :"field col-sm-1" ;
				html += "<div class='"+classnames+"'>" + field.id + "</div>";
			}

			html += "</div>";
		}

		$battlefield.html(html);

	})();

	return Battlefield;

})(jQuery);

console.log( BOARD );