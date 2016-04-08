var myApp = angular.module("myApp", ['ngMaterial', 'ngRoute']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
  // var customPrimary = {
  //         '50': '#c0f181',
  //         '100': '#b4ef6a',
  //         '200': '#a9ec53',
  //         '300': '#9dea3c',
  //         '400': '#92e725',
  //         '500': '#85DB18',
  //         '600': '#77c415',
  //         '700': '#69ad13',
  //         '800': '#5b9610',
  //         '900': '#4d7f0e',
  //         'A100': '#cbf498',
  //         'A200': '#d7f6af',
  //         'A400': '#e2f9c6',
  //         'A700': '#3f680b'
  //     };
  //     $mdThemingProvider
  //         .definePalette('customPrimary',
  //                         customPrimary);
  //
  // //     var customAccent = {
  // //         '50': '#e19b65',
  // //         '100': '#dd8e50',
  // //         '200': '#d9803a',
  // //         '300': '#d27228',
  // //         '400': '#bc6724',
  // //         '500': '#A75B20',
  // //         '600': '#924f1c',
  // //         '700': '#7c4418',
  // //         '800': '#673814',
  // //         '900': '#512c10',
  // //         'A100': '#e6a97a',
  // //         'A200': '#eab790',
  // //         'A400': '#eec5a5',
  // //         'A700': '#3c210b'
  // //     };
  // //     $mdThemingProvider
  // //         .definePalette('customAccent',
  // //                         customAccent);
  // //
  // //     var customWarn = {
  // //         '50': '#ffb280',
  // //         '100': '#ffa266',
  // //         '200': '#ff934d',
  // //         '300': '#ff8333',
  // //         '400': '#ff741a',
  // //         '500': '#ff6400',
  // //         '600': '#e65a00',
  // //         '700': '#cc5000',
  // //         '800': '#b34600',
  // //         '900': '#993c00',
  // //         'A100': '#ffc199',
  // //         'A200': '#ffd1b3',
  // //         'A400': '#ffe0cc',
  // //         'A700': '#803200'
  // //     };
  // //     $mdThemingProvider
  // //         .definePalette('customWarn',
  // //                         customWarn);
  // //
  //             var customBackground = {
  //                 '50': '#20ba00',
  //                 '100': '#1ba100',
  //                 '200': '#178700',
  //                 '300': '#136e00',
  //                 '400': '#0e5400',
  //                 '500': '#0A3B00',
  //                 '600': '#062100',
  //                 '700': '#010800',
  //                 '800': '#000000',
  //                 '900': '#000000',
  //                 'A100': '#24d400',
  //                 'A200': '#28ed00',
  //                 'A400': '#32ff08',
  //                 'A700': '#000000'
  //             };
  //     $mdThemingProvider
  //         .definePalette('customBackground',
  //                         customBackground);

     $mdThemingProvider.theme('default')
        .dark()
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
      otherwise({
          redirectTo: '/home'
      });
}]);
