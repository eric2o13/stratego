/*=============================================================
---------------------------------------------------------------
===============================================================

	Oieces constructor:
	Creates and initiates the pieces.

===============================================================	
---------------------------------------------------------------
=============================================================*/

var PIECES = (function( $ ){

	var Piece = function( name, rank, color ){

		this.name 		= name;
		this.rank 		= rank;
		this.color		= color;
		this.onBoard	= false;		
		this.onField 	= undefined;
		this.canMove	= (rank == "B" || rank == "F") ? false: true;
		this.isScout	= (rank == 8) ? true : false;
		this.isMiner 	= (rank == 7) ? true : false;
		this.isSpy	 	= (rank == 9) ? true : false;
		this.isBomb		= (rank == "B") ? true : false;
		this.isFlag		= (rank == "F") ? true : false;

	};

	var startingpieces 	= ["Flag","Marshall","General","Colonel","Major","Captain","Sergeant","Miner","Scout","Spy","Bomb" ];
	var redPieces 		= [];
	var bluePieces 		= [];

	var createPieces	= (function(){

		for ( var x = 0, name, rank, quantity; x < startingpieces.length; x++ ) {

			name = startingpieces[x];
			quantity = 1;

			switch (name) {

				case "Flag":
					rank = "F";
					break;

				case "Marshall":
					rank = 1;
					break;

				case "General":
					rank = 2;
					break;

				case "Colonel":
					rank = 3, quantity = 2;
					break;

				case "Major":
					rank = 4, quantity = 3;
					break;

				case "Captain":
					rank = 5, quantity = 4;
					break;

				case "Sergeant":
					rank = 6, quantity = 4;
					break;

				case "Miner":
					rank = 7, quantity = 5;
					break;

				case "Scout":
					rank = 8, quantity = 8;
					break;

				case "Spy":
					rank = 9, quantity = 1;
					break;

				case "Bomb":
					rank = "B", quantity = 6;
					break;

			}

			for (i = 0; i < quantity; i++) {
				redPieces.push( new Piece(name, rank, 'red') );	
				bluePieces.push( new Piece(name, rank, 'blue') );	
			}
			
		}

	})();

	return {

		'red'  : redPieces,
		'blue' : bluePieces

	}


})(jQuery);

