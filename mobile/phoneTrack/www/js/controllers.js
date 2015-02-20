angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicLoading, $ionicModal) {
// .controller('MainCtrl', ['$scope', function ($scope, $ionicLoading) {

  var socket = io('http://blistering-rottweiler-26-196898.use1-2.nitrousbox.com/');



  $scope.username = "default" //For testing

  $scope.spinner = false;
  var tracking = false;
  $scope.showLocation = false;




  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.TrackMe = function () {

    if(!tracking) {
      $scope.toggleUI();
      tracking = true;
      
      // If the map already exists, use it.
      if (!$scope.map) {
        return;
      }

      // Show loading icon
      $scope.spinner = true; //Show the location loading spinner

      //Zoom in on the map
      $scope.map.setZoom(16);

      console.log("Finding Location");
      var myLocation = navigator.geolocation.watchPosition(function (pos) {
        console.log('Got pos', pos);
        
        //Send location to websocket
        console.log('emitting to socket');
        // socket.emit('loc', 'username: ' + pos.coords.latitude + ' ' + pos.coords.longitude); //True location 
        socket.emit('loc', {username: $scope.username, latitude: pos.coords.latitude, longitude: pos.coords.longitude}); //True location 

        //Center the Map
        $scope.map.panTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.showLocation = true; //Show the location dot on the map.
        $scope.$apply(function () {
          $scope.spinner = false; //Hide the location fetching spinner
        });

      }, function (error) {
        $scope.spinner = true; //Show the location loading spinner
        // alert("error");
        //Beam error through websocket
        stopTracking();
        alert("Unable to find location. Please try again");
      }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    } else {
      stopTracking();
    }

  };

  $scope.toggleUI = function() {
    console.log("toggleing ui");
    var button = document.getElementById("location-btn");

    if(!tracking) {
      button.style.backgroundColor = "#EF4E3A";
    } else {
      button.style.backgroundColor = "#13BE00";
    }
     
  }

  var stopTracking = function() {
    $scope.toggleUI();
    tracking = false;
    $scope.showLocation = false;
    $scope.$apply(function () {
      $scope.spinner = false; //Hide the location fetching spinner
    });

    console.log('stopping tracking');
    if( typeof myLocation !== 'undefined' && myLocation ) {
      navigator.geolocation.clearWatch(myLocation);
      console.log("clearning location watcher");
    }
  }


  //Modal Stuff
  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    duration: 1.0,
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Clean up to prevent memory leaks
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

    

})

.controller('SettingsCtrl', function($scope, $ionicModal) {
  



});
