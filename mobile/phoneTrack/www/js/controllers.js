angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicLoading) {
// .controller('MainCtrl', ['$scope', function ($scope, $ionicLoading) {

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
      if (!$scope.map) {
        return;
      }

      //Show loading message
      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      console.log("Finding Location");
      var myLocation = navigator.geolocation.watchPosition(function (pos) {
        console.log('Got pos', pos);
        $scope.showLocation = true;
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
        //Beam position through web socket, include user id of some sort.
      }, function (error) {
        // alert('Unable to get location: ' + error.message);
        toggleSpinner();
        //Beam error through websocket
      }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    } else {
      tracking = false;
      console.log('stopping tracking');
      if(myLocation) {
        navigator.geolocation.clearWatch(myLocation);
      }
    }



  };

  $scope.toggleSpinner = function() {
    //Toggle the spinner here
  };

});
