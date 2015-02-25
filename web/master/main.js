var socket = io();

//     socket.on('location', function(loc){
// //       console.log("Got Location");
// //       $('#location').append($('<li>').text('username: ' + loc.username + ', latitude: ' + loc.latitude + ', longitude: ' + loc.longitude));
//     });
    
$(document).ready(function(){
    $(".menu-button").click(function() {
      $("#menu").animate({width:'toggle'},225);
    });
  
});

function setUser(loc) {
  $('#menu').append('');
}

function initialize() {
  var mapOptions = {
    center: { lat: -34.397, lng: 150.644},
    zoom: 4
  };
  var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
//     google.maps.event.addDomListener(window, 'click', function () {
//       map.setCenter({lat:-34.000, lng: 150.000});
//     });
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    title: 'Click to zoom'
  });

  google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });
  //sets the center of the map to the user's location
  socket.on('test', function(loc) {
      console.log(loc);
      document.getElementById('user-1').innerHTML = loc.username;
      var latlng = {lat:loc.latitude, lng:loc.longitude};
      map.setCenter(latlng);
      marker.setPosition(latlng);
    });
}



google.maps.event.addDomListener(window, 'load', initialize);

