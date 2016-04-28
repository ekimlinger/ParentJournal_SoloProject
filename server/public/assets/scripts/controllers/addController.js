myApp.controller("AddController", ["$scope", "$filter", "$mdToast", "JournalService", function($scope, $filter, $mdToast, JournalService){
  // Declares/ clears entry form
  $scope.user = JournalService.currentUser.data;
  $scope.entry = {};
  $scope.entry.phrases = [];
  $scope.entry.things = [];
  $scope.entry.accomplishments = [];

  //Sets default date to today
  $scope.entry.date = new Date($filter("date")(Date.now()));

  //Shows that you have added a journal entry for that date
  $scope.showToast = function(date) {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Created New Entry')
      .position('fixed')
      .hideDelay(7000)
    );
  };

  //Sends entry form to factory
  $scope.submit = function(entry){
    JournalService.postEntries(entry);
    $scope.showToast(entry.date);
    $scope.entry = {};
    $scope.entry.phrases = [];
    $scope.entry.things = [];
    $scope.entry.accomplishments = [];
  };

}]);
