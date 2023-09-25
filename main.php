<?php
session_start();


// Check if the user is authenticated (you should store the user's Firebase ID token in the session)
if (!isset($_SESSION['firebase_id_token'])) {
    // Redirect the user to the login page if not authenticated
    header("Location: login.php");
    exit;
}

// In a real application, you may want to validate the Firebase ID token against Firebase servers
// to ensure its validity and get user information.

// Include any necessary headers, styles, or scripts for your main page
// ...

// Display the main content here
?>

<!DOCTYPE html>
<html>
  <head>
  <title>Main Page</title>
    <title>Interactive Map</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v6.5.0/css/ol.css" type="text/css">
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
    </style>
    <script src="https://openlayers.org/en/v6.5.0/build/ol.js" type="text/javascript"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    
  </head>
  <body>
  <h1>Welcome to the Main Page</h1>
    <p>This is the main content that you want to display to authenticated users.</p>
    <div id="map" class="map"></div>
    <button onclick="addPoint()">Add Point of Interest</button>
    <script type="text/javascript">
        var firebaseConfig = {
            apiKey: "AIzaSyCW5SYNOuiNl5-TT6bsmHdZLDvSg5YAkgI",
            authDomain: "webapp-8910b.firebaseapp.com",
            projectId: "webapp-8910b",
            storageBucket: "webapp-8910b.appspot.com",
            messagingSenderId: "172402497920",
            appId: "1:172402497920:web:9ecfc5b9038e81de3e4965",
            measurementId: "G-YVZFB9GJ6R"
        };
    firebase.initializeApp(firebaseConfig);
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([43.8143266, -111.7847655]),
          zoom: 16
        })
      });

      var geolocation = new ol.Geolocation({
        tracking: true
      });

      geolocation.on('change', function() {
        map.getView().setCenter(ol.proj.fromLonLat([geolocation.getPosition()[0], geolocation.getPosition()[1]]));
      });

      function addPoint() {
  var name = prompt("Enter the name of the point of interest:");
  var description = prompt("Enter a description for the point of interest:");
  
  var point = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([geolocation.getPosition()[0], geolocation.getPosition()[1]])),
    name: name,
    description: description
  });

  var vectorSource = new ol.source.Vector({
    features: [point]
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  map.addLayer(vectorLayer);

  // Write the new point's data simultaneously in the points list.
  var pointsRef = firebase.database().ref('points');
  var newPointRef = pointsRef.push();
  newPointRef.set({
    'name': name,
    'description': description,
    'location': {
      'lat': geolocation.getPosition()[0],
      'lon': geolocation.getPosition()[1]
    }
  });
}

    </script>
    <div id="popup"></div>
  </body>
</html>


