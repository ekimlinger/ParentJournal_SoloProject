myApp.factory("JournalService", ["$http", function($http){
    var data = {};
    var login = function(user){
      console.log("Attempting to login: ", user);
      $http.post("/users", user).then(function(response){
        console.log("User is logged in: ", response);
      });
    };
    var register = function(user){
      console.log("Attempting to register: ", user);
      $http.post("/register", user).then(function(response){
        console.log("Created new user: ", response);
      });
    };

    var getEntries = function(){
        $http.get("/entries/"+user.id).then(function(response){
            data.response = response.data;
        });
    };

    var postEntries = function(page){
        $http.post("/entries", page).then(function(response){
            getEntries();
        });
    };

    var deleteEntries = function(entry){
        $http.delete("/entries/" + entry._id).then(function(response){
            console.log("Deleted : ", response.data);
            getEntries();
        });
    };

    return {
        data : data,
        login : login,
        register : register,
        getEntries : getEntries,
        postEntries : postEntries,
        deleteEntries : deleteEntries
    };
}]);
