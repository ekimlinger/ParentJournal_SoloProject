myApp.controller("LoginController", ["$scope", "JournalService", function($scope, JournalService){
    console.log("Using Login Controller!");

    $scope.login = JournalService.login;
    $scope.register = JournalService.register;
}]);
