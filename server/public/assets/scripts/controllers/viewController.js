myApp.controller("ViewController", ["$scope","$filter", "$mdToast", "$mdDialog", "$mdMedia", "JournalService", function($scope, $filter, $mdToast, $mdDialog, $mdMedia, JournalService){
  var currentEntry = {};

  //Sets default date to today
  $scope.date = new Date(Date.now());

  // Runs getEntries upon changing date
  $scope.$watch("date", function(date){
    JournalService.getEntries(date);

    $scope.entries = JournalService.entries;
    console.log($scope.entries);
  });

  //Change move to previous date
  $scope.previousDate = function(){
    $scope.date = new Date(moment($scope.date).subtract(1,'days'));
  }
  $scope.nextDate = function(){
    $scope.date = new Date(moment($scope.date).add(1,'days'));
  }

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

    currentEntry._id = entry._id;
    currentEntry.rating = entry.rating;
    currentEntry.accomplishments = entry.accomplishments;
    currentEntry.phrases = entry.phrases;
    currentEntry.journal = entry.journal;
    currentEntry.things = entry.things;
    currentEntry.child = entry.child;
    currentEntry.date = $scope.date;
    currentEntry.images = $scope.images;

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
        JournalService.editEntries(entry);
        $mdDialog.hide(entry);
    };
  };

}]);
