myApp.controller("register-controller",["$scope", "$http", "$window",
  function($scope, $http, $window){
    $scope.validateEmail = function (username) {
      console.log("Username: ", username);
      console.log("Running check");
      if(validateEmail(username)){
        $http.get("/register/validate/"+username).then(function(response){
          console.log("Response back from server:", response);
          $scope.validate = response.data;
          if(!response.data){
            $scope.status = "Email address already in use!";
            $scope.invalid = "md-input-invalid";
          } else{
            console.log("Valid Email");
            $scope.invalid = undefined;
            $scope.status = "";
          }
        });
      } else{
        $scope.status = "Please enter a valid email address";
        $scope.invalid = "md-input-invalid";
      }

    };
    $scope.register = function(){
      $scope.validateEmail($scope.user.username);
      if($scope.validate){
        $http.post("/register", $scope.user).success(function(data){
          window.location = "/new-user"
        });
      }
    };

}]);

//Validates the email address that user has provided
function validateEmail(email) {
  if(email.length >2){
    email.slice(0);
    email.slice(email.length-1);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } else{
    return false;
  }
}
