myApp.controller("AddController", ["$scope", "$filter", "$mdToast", "$mdDialog", "$mdMedia", "JournalService", function($scope, $filter, $mdToast, $mdDialog, $mdMedia, JournalService){

  //Function in case user has not entered child info
  $scope.addChild = function() {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
        controller: DialogController,
        templateUrl: '../../assets/views/partials/addChildOnJournal.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose: false,
        fullscreen: useFullScreen
      })
      .then(function(child) {
        $scope.entry.child = JournalService.currentUser.data.children[0].firstname;
        $scope.entry.phrases = [];
        $scope.entry.things = [];
        $scope.entry.rating = 3;
        $scope.entry.accomplishments = [];
      });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  // Declares/ clears entry form
  console.log(JournalService.currentUser.data);
  $scope.user = JournalService.currentUser.data;
  $scope.entry = {};
  $scope.entry.phrases = [];
  $scope.entry.things = [];
  $scope.entry.rating = 3;
  $scope.entry.accomplishments = [];

  $scope.$watch("user.children", function(user){
    // If the user has children entered default to first child
    if(JournalService.currentUser.data.children[0]){
      $scope.entry.child = JournalService.currentUser.data.children[0].firstname;

    } else{     // Show dialogue
      $scope.addChild();
    }
  });


  //Sets default date to today
  $scope.entry.date = new Date($filter("date")(Date.now()));

  //Shows that you have added a journal entry for that date
  $scope.showToast = function(date) {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Created New Entry')
      .position('fixed')
      .hideDelay(3000)
    );
  };

  // Sends entry form to factory
  $scope.submit = function(entry){
    JournalService.postEntries(entry);
    $scope.showToast(entry.date);
    $scope.entry = {};
    $scope.entry.phrases = [];
    $scope.entry.things = [];
    $scope.entry.accomplishments = [];
  };





  //All dialog controls
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.addChild = function(child) {
      if(child && child.dob && child.firstname && child.lastname){
        JournalService.addChild(child);
        $mdDialog.hide(child);
      } else{
        $scope.changeStatus = "Please enter all info for child!";
      }
    };

  }
}]);
