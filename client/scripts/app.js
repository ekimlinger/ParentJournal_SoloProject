var myApp = angular.module("myApp", ['ngMaterial', 'ngRoute']);

// myApp.config(['$mdThemingProvider', function($mdThemingProvider){
//     $mdThemingProvider.theme('default')
//         .primaryPalette('lime',{
//           'default': '500',
//           'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
//       'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
//       'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
//         })
//         .accentPalette('deep-orange', {
//       'default': '200' // use shade 200 for default, and keep all other shades the same
//     });
// }]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
      when("/login",{
        templateUrl: "/assets/views/routes/login.html",
        controller: "LoginController"
      }).
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
      otherwise({
          redirectTo: '/home'
      });
}]);
