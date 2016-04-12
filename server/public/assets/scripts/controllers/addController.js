myApp.controller("AddController", ["$scope", "$filter", "JournalService", function($scope, $filter, JournalService){
  // Declares/ clears entry form
  $scope.user = JournalService.currentUser.data;
  $scope.entry = {};
  $scope.entry.phrases = [];
  $scope.entry.things = [];
  $scope.entry.accomplishments = [];

  //Sets default date to today
  $scope.entry.date = new Date($filter("date")(Date.now()));

  //Sends entry form to factory
  $scope.submit = function(entry){
    JournalService.postEntries(entry);
    $scope.entry = {};
    $scope.entry.phrases = [];
    $scope.entry.things = [];
    $scope.entry.accomplishments = [];
  };

}]);
