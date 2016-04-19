myApp.controller("HomeController", ["$scope", "JournalService", function($scope, JournalService){
    $scope.currentUser = JournalService.currentUser;
    $scope.randomPhrase = JournalService.randomPhrase;
    $scope.randomJournal = JournalService.randomJournal;
}]);
