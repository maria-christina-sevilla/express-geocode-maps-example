// NOTES: It's important that you remember the async and defer attributes on the Google Maps script tag. This will wait until the page has loaded to start loading the Google Maps script.
// initMap is distinct from the $(document).ready() event. According to this Stack Overflow post, deferred scripts will execute before jQuery's $(document).ready() function.

// let's define our initMap callback
var initMap = function() {

    // Creating a map attached to map, including a center point and zoom level
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
    });

    // if brower support available, ask user for location data and set the map view
    // If the browser supports geolocation, we'll ask the user their location and recenter the map if possible
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var initialLocation = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );
            map.setCenter(initialLocation);
        });
    }

    // for each marker passed through, Add markers to the map by iterating across the array of markers (currently empty, but we'll fill the array soon)
    // add it to the map with a popup
    markers.forEach(function(marker) {
        console.log(marker);
        var position = new google.maps.LatLng(marker.lat, marker.lng);
        var googleMarker = new google.maps.Marker({
            position: position,
            title: marker.name,
            map: map
        });
        // Bind a popup to the marker, Also, we'll bind a popup to each marker, displaying the location's name
        googleMarker.addListener('click', function() {
            var infoWindow = new google.maps.InfoWindow({
                content: '<h3>' + marker.name + '</h3>'
            });
            infoWindow.open(map, googleMarker);
        });
    });
};
