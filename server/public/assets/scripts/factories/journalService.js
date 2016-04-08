myApp.factory("JournalService", ["$http",'$window','$filter', function($http, $window, $filter){
    var entries = {};
    var currentUser = {};

    var getName = function(){
      $http.get("/user/name").then(function(response){
        console.log("Logged in as: ", response.data);
        currentUser.data = response.data;
        if(!currentUser.data){
          $window.location.href = '/';
        }
      });
    };

    var getEntries = function(date){
      console.log("Attempting to get entries from: ", date);
      if(!currentUser.data){
        $window.location.href = '/';
      }else{
        var sendingDate = $filter('date')(date, 'yyyy-MM-dd');
        $http.get("/entries/" + currentUser.data.id + "/" + sendingDate).then(function(response){
          console.log("Here are the entries for this day: ", response.data);
            entries.response = response.data;
        });
      }
    };

    var postEntries = function(page){
      // Attaches user to entry
      page.userID = currentUser.data.id;
      page.date = $filter('date')(page.date, 'yyyy-MM-dd');
      // Only posts entry if user is logged in
      console.log("Attempting to post: ", page);
      console.log("Current user: ", currentUser.data);
      if(!currentUser.data){
        $window.location.href = '/';
      }else{
        $http.post("/entries", page).then(function(response){
            console.log("You have just created a new entry!");
            //clear out "page"
        });
      }
    };

    var deleteEntries = function(entry){
      console.log("Current user: ", currentUser.data);
      if(!currentUser.data){
        $window.location.href = '/';
      }else{
        console.log("Attempting to remove entry: ", entry);

        $http.delete("/entries/" + entry._id).then(function(response){
            console.log("Deleted : ", response.data);
            getEntries(entry.date);
        });
      }
    };

    getName();

    return {
        entries : entries,
        currentUser : currentUser,
        getEntries : getEntries,
        postEntries : postEntries,
        deleteEntries : deleteEntries
    };
}]);
