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
		this.id 		= "r" + y + "c" + x;
		this.occupied	= false;
		this.blocked 	= false;
		this.occopiedBy = undefined;

	};

	var createBattlefield = (function(){

		for ( var y = 0; y < 10; y++ ) {
			Battlefield.push( [] );
			for ( var x = 0, row; x < 10; x++) {
				Battlefield[y].push( new Field( y, x, 0 ) );
			}
		}

	})();

	var renderBattlefield = (function(){
		
		for (var row = 0, html = ""; row < Battlefield.length; row++ ) {
			html += "<div class='row'>";
			for ( var column = 0; column < Battlefield[row].length; column++ ) {
				html += "<div class='field col-sm-1'>" + Battlefield[row][column].id + "</div>";
			}
			html += "</div>";
		}

		$battlefield.html(html);

	})();

	return Battlefield;

})(jQuery);

//console.log( BOARD );