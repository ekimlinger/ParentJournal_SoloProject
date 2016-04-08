myApp.controller("SettingsController", ["$scope", "$filter", "$mdDialog", "$mdMedia", "JournalService", function($scope, $filter, $mdDialog, $mdMedia, JournalService) {
        $scope.user = JournalService.currentUser;

        $scope.changePassword = function(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
          // Appending dialog to document.body to cover sidenav in docs app
          $mdDialog.show()
            .title('What would you name your dog?')
            .textContent('Bowser is a common name.')
            .placeholder('dog name')
            .ariaLabel('Dog name')
            .targetEvent(ev)
            .ok('Save')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function(result) {
            $scope.status = 'Changed Password';

          }, function() {
            $scope.status = 'You didn\'t name your dog.';
          });
        };





        $scope.changePassword = function(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
          $mdDialog.show({
              controller: DialogController,
              templateUrl: '../../assets/views/partials/password.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: useFullScreen
            })
            .then(function(answer) {
              $scope.status = 'Changed Password';
            }, function() {
              $scope.status = "";
            });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };

        function DialogController($scope, $mdDialog) {
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.save = function(password) {
            console.log("In DialogController:",password);
            $mdDialog.hide(password);
          };
        }
}]);
