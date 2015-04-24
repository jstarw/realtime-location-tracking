angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicLoading) {
// .controller('MainCtrl', ['$scope', function ($scope, $ionicLoading) {

  var socket = io('http://blistering-rottweiler-26-196898.use1-2.nitrousbox.com/');

  $scope.username = "Drew" //For testing

  $scope.findingLocation = false;
  var tracking = false;
  $scope.showLocation = false;
  var mapOptions = {
    zoom: 4,
    disableDefaultUI: true
  }


  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.TrackMe = function () {

    if(!tracking) {
      tracking = true;
      
      // If the map already exists, use it.
      if (!$scope.map) {
        return;
      }

      // Show loading icon
      $scope.showSpinner(); //Show the location loading spinner

      console.log("Finding Location");
      var myLocation = navigator.geolocation.watchPosition(function (pos) {
        console.log('Got pos', pos);
        

        //Send location to websocket
        console.log('emitting to socket');
        // socket.emit('loc', 'username: ' + pos.coords.latitude + ' ' + pos.coords.longitude); //True location 
        socket.emit('loc', {username: $scope.username, latitude: pos.coords.latitude, longitude: pos.coords.longitude}); //True location 

        //Center the Map
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.showLocation = true; //Show the location dot on the map.
        $scope.hideSpinner(); //Hide the location fetching spinner

        //TODO: Update UI so user knows that tracking has begun
    
      }, function (error) {
        $scope.showSpinner(); //Show the location loading spinner
        //Beam error through websocket
      }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    } else {
      tracking = false;
      $scope.showLocation = false; //Hide the location dot
      $scope.hideSpinner(); //Hide the location loading spinner

      //TODO: Change the UI so it reflects that location is not being tracked.

      console.log('stopping tracking');
      if(myLocation) {
        //If currently watching location, cancel it.
        navigator.geolocation.clearWatch(myLocation);
      }
    }



  };

  $scope.showSpinner = function() {
    console.log("Showing Spinner");
    $scope.findingLocation = true;
  };

  $scope.hideSpinner = function() {
    console.log("Hiding Spinner");
    $scope.findingLocation = false;
  };
    

});
