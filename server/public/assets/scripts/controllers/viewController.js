myApp.controller("ViewController", ["$scope","$filter", "JournalService", function($scope, $filter, JournalService){

  //Sets default date to today
  $scope.date = new Date(Date.now());

  // Runs getEntries upon changing date
  $scope.$watch("date", function(date){
    JournalService.getEntries(date);
    $scope.entries = JournalService.entries;
  });


  //Displays rating as stars
  $scope.showStars = function(number){
    var starString;
    switch(number){
      case 1:
        starString = "★";
        break;
      case 2:
        starString = "★★";
        break;
      case 3:
        starString = "★★★";
        break;
      case 4:
        starString = "★★★★";
        break;
      case 5:
        starString = "★★★★★";
        break;
    }
    return starString;
  };

  // See factory
  $scope.deleteEntries = JournalService.deleteEntries;
}]);
