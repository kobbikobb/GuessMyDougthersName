app.controller("guessController", function($scope, $http) {
    $scope.userName = "";
	$scope.guessedName = "";
	$scope.result = "";
	$scope.numberOfAttemts = 0;

    $scope.guessName = function(){
        var url = "http://guessnamesrestful.apphb.com/api/guesses?nameId=1" +
        "&userName=" + $scope.userName + 
        "&guessedName=" + $scope.guessedName;

        $http.post(url).success(function(data, status, headers, config) {
            processGuessResult(data);
        });
    }

    function processGuessResult(result){
        if(result == 2){
            $scope.result = "Til hamingju, " + $scope.guessedName + " er rétt svar :)";
        } 
        else if(result == 1){
            $scope.result = "Þú ert að hitna, " + $scope.guessedName + " er að hluta rétt!";
        }
        else{
            $scope.result = "Því miður " + $scope.guessedName + " er rangt nafn, reyndu aftur :)";
        }
        $scope.numberOfAttemts += 1;
        $scope.guessedName = "";
    }
}); 