var myApp = angular.module("myApp", ['ngMaterial', 'ngRoute']);


myApp.config(['$mdThemingProvider', function($mdThemingProvider){
     $mdThemingProvider.theme('default')
         .primaryPalette('green');
}]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.

      when("/home", {
          templateUrl: "/assets/views/routes/home.html",
          controller: "HomeController"
      }).
      when("/add", {
          templateUrl: "/assets/views/routes/add.html",
          controller: "AddController"
      }).
      when("/view", {
          templateUrl: "/assets/views/routes/view.html",
          controller: "ViewController"
      }).
      when("/settings", {
          templateUrl: "/assets/views/routes/settings.html",
          controller: "SettingsController"
      }).
      otherwise({
          redirectTo: '/home'
      });
}]);
