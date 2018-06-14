"use strict";

var myFunctionHolder = {};

//declaring function 1
myFunctionHolder.addPopups = function (feature, layer) {
      if (feature.properties && feature.properties.Location) {
        layer.bindPopup("<b>Address:</b>" + feature.properties.Location);
      }
    }

//declaring function 2
myFunctionHolder.pointToCircle = function (feature, latlng) {
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "yellow",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
      return circleMarker;
    }

    
    window.onload = function () {
        var mapObject = L.map('mapDivId').setView([39.9761015,-82.9966866], 11);
    //Replace the basemap link with your own
    var baseMap = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapObject)
    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 0.0001,
      "maxOpacity": .8, 
      // scales the radius based on map zoom
      "scaleRadius": true, 
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries 
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": true,
      // which field name in your data represents the latitude - default "lat"
      latField: 'LAT',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'LON',
      // which field name in your data represents the data value - default "value"
      valueField: 'VIOL'
    };
    

    
    var heatmapLayer = new HeatmapOverlay(cfg);
    heatmapLayer.setData(parkingviolations);
    mapObject.addLayer(heatmapLayer);
    
    var map = new L.Map('map-canvas', {
      center: new L.LatLng(25.6586, -80.3568),
      zoom: 4,
      layers: [baseLayer, heatmapLayer]
    });
    
    heatmapLayer.setData(parkingviolations);

    // // bikeThefts is the variable name we difined in Bike_Thefts_2011.js file. 
    // var bikesLayerGroup = L.geoJSON(bikeThefts, {
    //   onEachFeature: myFunctionHolder.addPopups,
    //   pointToLayer: myFunctionHolder.pointToCircle
    // });

    // mapObject.addLayer(bikesLayerGroup);
    // mapObject.fitBounds(bikesLayerGroup.getBounds());
};
    