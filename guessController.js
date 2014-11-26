app.controller("guessController", function($scope, $http) {
    $scope.userName = "";
	$scope.guessedName = "";
	$scope.result = "";
    $scope.totalTries = 0;
    $scope.partiallyCorrectTries = 0;
    $scope.correctTries = 0;

    loadStatistics();

    setInterval(loadStatistics, 60000);

    $scope.guessName = function(){
        if($scope.userName == ""){
            $scope.result = "Vinsamlegast sláðu inn nafnið þitt";
        }
        else if($scope.guessedName == ""){
            $scope.result = "Vinsamlegast sláðu inn ágiskun";
        }
        else{
            postGuessNameRequest();
        }
    }

    function postGuessNameRequest(){
          var url = "http://guessnamesrestful.apphb.com/api/guesses?nameId=1" +
        "&userName=" + $scope.userName + 
        "&guessedName=" + $scope.guessedName;

        $http.post(url)
            .success(function(data, status, headers, config) {
                processGuessResult(data);
            })
             .error(function(data, status, headers, config) {
                if(status == "401"){
                    $scope.result = "Tilraunir þínar í dag eru búnar, reyndu aftur á morgun!";
                }
                else{
                    $scope.result = "Gat ekki haft samband við netfþjón, vinsamlegast reyndu síðar!";
                }
            });
    }

    function processGuessResult(result){
        if(result == 2){
            $scope.result = "Til hamingju, " + $scope.guessedName + " er rétt svar :)";
            $scope.correctTries +=1;
        } 
        else if(result == 1){
            $scope.result = "Þú ert að hitna, " + $scope.guessedName + " er að hluta rétt!";
            $scope.partiallyCorrectTries += 1;
        }
        else{
            $scope.result = "Því miður " + $scope.guessedName + " er rangt nafn, reyndu aftur :)";
        }
        $scope.totalTries += 1;
        $scope.guessedName = "";
    }

    function loadStatistics(){
        var url = "http://guessnamesrestful.apphb.com/api/statistics?nameId=1";
    
        $http.get(url)
            .success(function(data, status, headers, config) {
                $scope.totalTries = data.TotalTries;
                $scope.partiallyCorrectTries = data.PartiallyCorrectTries;
                $scope.correctTries = data.CorrectTries;
            });
    }
}); 