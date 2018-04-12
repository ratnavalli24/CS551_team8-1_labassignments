var MyApp=angular.module("starter", ["ionic","ngCordova","firebase"]);

MyApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

MyApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("firebase", {
            url: "/firebase",
            templateUrl: "templates/firebase.html",
            controller: "FirebaseController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/home.html",
            controller: "SecureController"
        });
    $urlRouterProvider.otherwise('/firebase');
});

MyApp.controller("FirebaseController", function($scope, $state, $firebaseAuth) {

    var fbAuth = $firebaseAuth();

    $scope.login = function(username, password) {
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

    $scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username,
                password);
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

});

//secure controller

MyApp.controller("SecureController", function($scope, $http, $ionicHistory, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera, $state, $window) {

    $ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];
    $scope.fb = $firebaseAuth();
    var fbAuth = $scope.fb.$getAuth();
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    if(fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs

        $scope.images = syncArray;

    }
    else {
        $state.go("firebase");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }


 $scope.analyzeg=function () {
      var gen=$scope.text;
      var words=$http.get("https://api.uclassify.com/v1/uclassify/Sentiment/classify/?readKey=7FFKx05Hlw9P&text=" +gen);
      words.success(function (data) {
        console.log(data);
        $scope.analyzelang={"positive":data.positive*100,"negative":data.negative*100};

      });

    }

    $scope.generate=function () {
      var item=$scope.images[0].image;
      var list="";


     const app = new Clarifai.App({
        apiKey: 'bb8bc6109c5e43ea8ad0c55245a816ec'
      });
      app.models.predict(Clarifai.GENERAL_MODEL, {base64: item}).then(
        function(response) {
          console.log(response);
        for (var i=0;i<10;i++){
          var temp = response.outputs[0].data.concepts[i].name;
          list = list +"<br/>" +temp;

          }
          document.getElementById("objects").innerHTML = list;
        },
        function(err) {
          // there was an error
        }
      );
    }


    $scope.logout=function () {
      $state.go("firebase");

    }
});




