myApp.controller("HomeController", ["$scope", "JournalService", function($scope, JournalService){
    console.log("Home Controller");
    $scope.currentUser = JournalService.currentUser;

}]);
