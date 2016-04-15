myApp.controller("ViewController", ["$scope","$filter", "$mdToast", "$mdDialog", "$mdMedia", "JournalService", function($scope, $filter, $mdToast, $mdDialog, $mdMedia, JournalService){
  var currentEntry = {};

  //Sets default date to today
  $scope.date = new Date(Date.now());
  var emptyForToday = {date: $scope.date, journal: "No Entries for today!<br> Click here to add some! </br> <md-button class='md-raised md-primary' href='#add'>Add</md-button>"}
  // Runs getEntries upon changing date
  $scope.$watch("date", function(date){
    JournalService.getEntries(date);

      $scope.entries = JournalService.entries;

    refEntries = JournalService.entries;
  });

  // See factory
  $scope.deleteEntries = JournalService.deleteEntries;

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

  $scope.showToast = function(date) {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Updated Entry')
      .position('fixed')
      .hideDelay(3000)
    );
  };

  //Function to diolouge
  //requires use of partials/editEntry.tmpl.html && DialogController
  $scope.editEntries = function(entry) {
    console.log(entry.date);
    currentEntry._id = entry._id;
    currentEntry.rating = entry.rating;
    currentEntry.accomplishments = entry.accomplishments;
    currentEntry.phrases = entry.phrases;
    currentEntry.journal = entry.journal;
    currentEntry.things = entry.things;
    currentEntry.child = entry.child;
    currentEntry.date = new Date($scope.date);


    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
        controller: DialogController,
        templateUrl: '../../assets/views/partials/editEntry.tmpl.html',
        parent: angular.element(document.body),
        // targetEvent: entry,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      })
      .then(function(answer) {
        console.log("Updated: ", answer)
        $scope.showToast(answer.date);
        JournalService.getEntries($scope.date);
      }, function() {
        $scope.status = "";
      });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  // All controls with ze diolouge

  function DialogController($scope, $mdDialog) {
    $scope.entry = currentEntry;
    $scope.user = JournalService.currentUser.data;
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.saveEntry = function(entry) {
        entry.date = $filter("date")()
        JournalService.editEntries(entry);
        $mdDialog.hide(entry);
    };
  };

}]);
