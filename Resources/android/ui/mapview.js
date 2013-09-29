(function(){

exports.createMap = function(){
var MapModule = require('ti.map');
var win = Titanium.UI.createView({
	top: '50dp',
	bottom: '50dp'
});

var mountainView = MapModule.createAnnotation({
    latitude:37.390749,
    longitude:-122.081651,
    title:"Appcelerator Headquarters",
    subtitle:'Mountain View, CA',
    pincolor:MapModule.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});

var mapview = MapModule.createView({
    mapType: MapModule.NORMAL_TYPE,
    region: {latitude:21.46968, longitude:-157.9985053,
         latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations:[mountainView]
});

win.add(mapview);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    alert("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
});
return win;
};
	
})();
