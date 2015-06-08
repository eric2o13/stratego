var MODULE = (function(){

	var variable1 = ["private", "array"],
		variable2 = "example private variable",
		publicvar = "example public variale";

	var _privateMethod = (function(){
		console.log('this is a private method');
	});

	var publicMethod = function(){
		console.log('this is a public method');
	};

	var anotherPublicMethod = function( param1, param2 ){
		console.log('this is a another public method with parameters:' + param1, param2);
	};

	var initialize = function(){
		
	};
	
	return {

		initialize: initialize,
		publicvar: publicvar,
		publicMethod: publicMethod,
		anotherPublicMethod: anotherPublicMethod

	};

})();

console.log(MODULE);


/* 
	stel je voor je we gaan als outside programmer een AI maken,
	welke stappen moet je dan doorlopen.

	1. <script src="http://strategojs.com/stratego.js">
		
		- rendert board inc formulier en returned het publieke object
		
		return {
			
			//het (publieke) canvas d.w.z. dat alleen je eigen stukken zichtbaar zijn.
			//en de inmiddels bekende stukken van je tegenstander.
			publicBoard: publicBoard, 
			
			//een lijst met alle mogelijke opties. Deze lijst hoef je niet per se te gebruiken.
			possibleMoves: [ 
				
				[scout, from e2, to e6],
				[marshall, from b1, to b2 ] 

			],
			
			//de functie om een zet te spelen
			playMove: function(){
				
				//hierin moet de developer zelf checken wat de beste move is.
				//hij mag hier zijn eigen functies op loslaten
				//zolang de move maar in de possibleMoves lijst voorkomt,
				//default is any random move
				
				play( possibleMoves[1] );
			
			},

			arrangeArmy: function(){
				
				//hierin krijgt de developer de keuze om hardcoded
				//een beginstelling in te voeren, maar uiteraard mag het ook
				//dynamisch. De opstelling stuur je uiteindelijk door als
				//FEN string, zoals bij schaken
				
				var ARMY = "F123456/22233344/" !default;

			}

		};

	2. Voeg je eigen AI toe.

		STRATEGO.strategoJS({
			
			arrangeArmy: "F123456/22233344/"
			
			playMove: function(){
				
				ARVINs.customFunction(); //play( general, e2, e3 );

			}


		})
	

*/