app.controller("myNoteCtrl", function($scope) {
	$scope.guessedName = "";
	$scope.result = "";
	$scope.numberOfAttemts = 0;

    $scope.guessName = function(){
    	if(isCorrect()){
    		$scope.result = "Til hamingju," + $scope.guessedName + " er rétt svar :)";
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
    	var targetHash = "5e1556135952b1f4d84ad74c50f9f0a3d31c26fd";
    	return isNameMatch(name, targetHash);
    }

    function isSecondName(name){
    	var targetHash = "fe96c6ad4a0b897370b9b263f445f5a27ad788c6";
    	return isNameMatch(name, targetHash);
    }

    function isNameMatch(name, targetHash){
    	if(name == null)
    		return false;
    	return targetHash == getHash(name.toLowerCase())
    }

    function getHash(value){
		var shaObj = new jsSHA(value, "TEXT");
		return shaObj.getHash("SHA-1", "HEX");
    }
}); 