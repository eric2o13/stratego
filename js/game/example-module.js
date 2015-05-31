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
