myApp.controller("SettingsController", ["$scope", "$filter", "$mdDialog", "$mdMedia", "JournalService", function($scope, $filter, $mdDialog, $mdMedia, JournalService) {
      $scope.user = JournalService.currentUser;

      $scope.reminder = {};
      if($scope.user.data.children == undefined){
        $scope.user.data.children = [];
      }
      var setReminder = function(){
        var statement;
        var daily = $scope.user.data.notifications[0];
        var weekly = $scope.user.data.notifications[1];
        if(daily && weekly){
          statement = "Daily and Weekly"
        } else if (weekly){
          statement = "Weekly"
        }else if (daily){
          statement = "Daily"
        }
        $scope.reminder.statement = statement;
      }
      $scope.$watch("user.data.notifications", function(user){
        setReminder();
      });

      //Function to diolouge
      //requires use of partials/email.tmpl.html && DialogController
      $scope.changeEmail = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../../assets/views/partials/email.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            console.log(answer);
            $scope.status = 'Changed Email Address';
          }, function() {
            $scope.status = "";
          });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };
      //Function to diolouge
      //requires use of partials/email.tmpl.html && DialogController
      $scope.changeNotifications = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../../assets/views/partials/notifications.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            console.log(answer);
            $scope.status = 'Updated Notifications';
          }, function() {
            $scope.status = "";
          });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };
      //Function to diolouge
      //requires use of partials/password.tmpl.html && DialogController
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
            console.log("Returned Answer is: ", answer);
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

      //Function to diolouge
      //requires use of partials/child.tmpl.html && DialogController
      $scope.addChild = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../../assets/views/partials/addChild.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
          .then(function(child) {
            $scope.status = 'Added: ' + child.firstname + " " +child.lastname;
          }, function() {
            $scope.status = "";
          });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };

      // Confirms that the user actually wants to remove their child
      $scope.removeChild = function(index) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
            .title('Are you REALLY sure you would like to remove your child?')
            .textContent('This action CANNOT be undone, and will delete ALL journal entries for this child.')
            .ariaLabel('Remove your child?')
            .targetEvent()
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirm).then(function() {
            JournalService.removeChild(index);
            $scope.status = 'You have removed your child.';

          }, function() {
            $scope.status = '';
          });
          // console.log("Event in removeChild: ", ev);
      };

      // Confirms that the user actually wants to delete their account
      $scope.deactivateAccount = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
            .title('Are you REALLY sure you would like deactivate your account?')
            .textContent('This action CANNOT be undone, and will delete ALL journal entries.')
            .ariaLabel('Delete your account?')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirm).then(function() {
            $scope.status = 'You have deleted your account, now logging out.';

            //  setInterval(JournalService.deactivateAccount, 3000);

          }, function() {
            $scope.status = '';
          });
      };

        // All controls with ze diolouge

        function DialogController($scope, $mdDialog) {
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.savePassword = function(password) {

            if (password.new1 == password.new2) {
              JournalService.changePassword(password)
              $mdDialog.hide();
            } else {
              $scope.changeStatus = "Passwords Not Matched!"
            }
          };

          $scope.saveEmail = function(email) {
            if (email.new1 == email.new2) {
              JournalService.changeEmail(email);
              $mdDialog.hide(email);
            } else {
              $scope.changeStatus = "Email Addresses Not Matched!"
            }
          };

          $scope.savePreferences = function(notes) {
              JournalService.savePreferences(notes);
              $mdDialog.hide(notes);
          };

          $scope.addChild = function(child) {
              JournalService.addChild(child);
              $mdDialog.hide(child);
          };

        }
      }]);
