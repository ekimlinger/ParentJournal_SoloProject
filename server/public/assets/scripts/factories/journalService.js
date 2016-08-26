myApp.factory("JournalService", ["$http",'$window','$filter', function($http, $window, $filter){
    var entries = {};
    var currentUser = {};
    var randomPhrase = {};
    var randomJournal = {};

    var randomNumber = function(min,max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getName = function(){
      $http.get("/user/name").then(function(response){
        console.log("Logged in as: ", response.data);
        currentUser.data = response.data;
        if(!currentUser.data){
          $window.location.href = '/';
        }
      });
    };

    var logout = function(){
      $http.get("logout").then(function(){
        console.log("You have just logged out")
      });
    };

    var getEntries = function(date){
      console.log("Attempting to get entries from: ", date);

        var sendingDate = $filter('date')(date, 'yyyy-MM-dd');
        $http.get("/entries/" + sendingDate).then(function(response){
            entries.response = response.data;
        });

    };
    var getRandomPhrase = function(){
      $http.get("/entries/randomPhrase").then(function(response){

        randomPhrase.data = response.data;
      });
    };
    var getRandomJournal = function(){
      $http.get("/entries/randomJournal").then(function(response){

        randomJournal.data = response.data;
      });
    };
    var postEntries = function(page){
      // Attaches user to entry
      page.userID = currentUser.data.id;
      page.date = $filter('date')(page.date, 'yyyy-MM-dd');
      $http.post("/entries", page).then(function(response){
          console.log("You have just created a new entry!");
      });
    };

    var editEntries = function(page){
      // Attaches user to entry
      page.userID = currentUser.data.id;
      console.log("page.date = ", page.date);
      page.date = $filter('date')(page.date, 'yyyy-MM-dd');
      console.log("date saving factory: ", page.date);
      if(page._id){
        $http.put("/entries/" + page._id, page).then(function(response){
          console.log("You have just created a new entry!");
          getEntries(page.date);
        });
      }else{
        postEntries(page);
      }
    };

    var deleteEntries = function(entry){

        console.log("Attempting to remove entry: ", entry);

        $http.delete("/entries/" + entry._id).then(function(response){
            console.log("Deleted : ", response.data);
            getEntries(entry.date);
        });
    };

    var addChild = function(child){
      $http.post("/user/addChild", child).then(function(response){
        console.log(response);
        getName();
      });
    };
    var removeChild = function(index){
      $http.delete("/user/deleteChild/" + index).then(function(response){
        console.log("You have removed your child");
        getName();
      });
    };
    var changeEmail = function(newEmails){
      $http.put("/user/email", newEmails).then(function(response){
        console.log("Successfully changed Email adresses");
        getName();
      });
    };
    var changePassword = function(passwordPack){
      $http.put("/user/password", passwordPack).then(function(response){
        console.log("Completed password change: ", response.data);
        getName();
        return response.data;
      });
    };
    var savePreferences = function(noteArray){
      for (var i; i< noteArray.length; i++){
        if(noteArray[i] === undefined){
          noteArray[i] = false;
        }
      }
      $http.put("/user/notifications", noteArray).then(function(response){
        console.log(response);
        getName();
      });
    };
    var deactivateAccount = function(){
      console.log("deactivateAccount doesn't work yet (in factory).");
      //logout();
    };

    getName();
    getRandomPhrase();
    getRandomJournal();
    setInterval(getRandomPhrase, 10000);
    setInterval(getRandomJournal, 30000);


    return {
        logout : logout,
        entries : entries,
        randomPhrase : randomPhrase,
        randomJournal : randomJournal,
        currentUser : currentUser,
        getEntries : getEntries,
        postEntries : postEntries,
        editEntries : editEntries,
        deleteEntries : deleteEntries,
        addChild : addChild,
        removeChild : removeChild,
        changeEmail : changeEmail,
        changePassword : changePassword,
        savePreferences : savePreferences
    };
}]);
