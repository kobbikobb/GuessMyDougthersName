app.controller("myNoteCtrl", function($scope) {
	$scope.guessedName = "";
	$scope.result = "";
	$scope.numberOfAttemts = 0;

    $scope.guessName = function(){
    	if(isCorrect()){
    		$scope.result = "Til hamingju, " + $scope.guessedName + " er rétt svar :)";
    	} else if(isFirstNameCorrect()){
    		$scope.result = "Þú ert að hitna, " + $scope.guessedName + " er að hluta rétt!";
    	}else{
    		$scope.result = "Því miður " + $scope.guessedName + " er rangt nafn, reyndu aftur :)";
    	}
    	$scope.numberOfAttemts += 1;
    	$scope.guessedName = "";
    };

    function isCorrect(){
    	var words = $scope.guessedName.split(" ");
    	return words.length == 2 && isFirstName(words[0]) && isSecondName(words[1]);
    }


    function isFirstNameCorrect(){
    	var words = $scope.guessedName.split(" ");
    	return words.length > 0 && isFirstName(words[0]);
    }

    function isFirstName(name){
    	var targetHash = "c6cb22edafd6cc08743a2bb5df9299cffef856cd";
    	return isNameMatch(name, targetHash);
    }

    function isSecondName(name){
    	var targetHash = "34903d996d807bb2d134b56dd9b3cdefa075ae56";
    	return isNameMatch(name, targetHash);
    }

    function isNameMatch(name, targetHash){
    	if(name == null)
    		return false;
    	return targetHash == getHash(name.toLowerCase())
    }

    function getHash(value){
        var salt = "sætustÍHeimi";
		var shaObj = new jsSHA(value + salt, "TEXT");
		return shaObj.getHash("SHA-1", "HEX");
    }
}); 