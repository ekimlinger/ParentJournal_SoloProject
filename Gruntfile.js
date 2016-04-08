


//------------------ GRUNT CURRENTLY UNDER REPAIR -------------------//
//                      /\/\/\/\/\/\/\/\/\/\/\                       //



// module.exports = function(grunt) {
//     grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//        uglify: {
//          options: {
//             banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//          },
//          build: {
//             src: [
//               'client/scripts/app.js',
//               'client/scripts/controllers/loginController.js',
//               'client/scripts/controllers/homeController.js',
//               'client/scripts/controllers/addController.js',
//               'client/scripts/controllers/viewController.js',
//               'client/scripts/factories/journalService.js'
//             ],
//             dest: 'server/public/assets/scripts/app.min.js'
//          }
//        },
//        copy: {
//          angular : {
//            expand: true,
//            cwd: 'node_modules',
//            src: [
//               "angular/*",
//               "angular-animate/*",
//               "angular-aria/*",
//               "angular-material/*",
//               "angular-messages/*",
//               "angular-route/*"
//             ],
//             "dest": "server/public/assets/vendors/"
//          },
//          html : {
//            expand: true,
//            cwd: 'client/views/',
//            src: [
//               "index.html",
//               "login.html",
//               "routes/home.html",
//               "routes/add.html",
//               "routes/view.html",
//               "partials/header.html",
//               "partials/nav.html",
//               "partials/footer.html"
//             ],
//             "dest": "server/public/assets/views/"
//          }
//        }
//     });
//
//     grunt.loadNpmTasks('grunt-contrib-copy');
//     grunt.loadNpmTasks('grunt-contrib-uglify');
//
//     grunt.registerTask('default', ['copy', 'uglify']);
// };
