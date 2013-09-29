/*
    Branching logic based on OS
*/
var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
    var def = map.def||null; //default function or value
    if (map[osname]) {
        if (typeof map[osname] == 'function') { return map[osname](); }
        else { return map[osname]; }
    }
    else {
        if (typeof def == 'function') { return def(); }
        else { return def; }
    }
};


exports.createView = function(){

var self = Ti.UI.createView({
	width: globals.devwidth - (50 * globals.multiplier),
	backgroundImage: '/images/zippysback_bg.jpg',
	top:'0dp',
	left:'0dp',
	layout: 'vertical'
});

var data = [];

//------------------First Row-----------------------------
var row1 = Ti.UI.createTableViewRow({
	height: Ti.UI.SIZE
});

var backtopimg = Ti.UI.createImageView({
	image: '/images/zippysback.png',
	top: '20dp',
	width: '230dp',
	height: '107dp'
});

row1.add(backtopimg);
//------------------First Row End-----------------------------

var locationsRow = Ti.UI.createTableViewRow({
	height: Ti.UI.SIZE,
	layout: 'horizontal'
});

var r2icon = Ti.UI.createLabel({
	text: "testing",
	font: {fontFamily: os({
			iphone:'Roboto',
			ipad: 'Roboto',
			ipod: 'Roboto',
			android:'Roboto-Regular'
			}), 
			fontSize: '24dp'},
	color: 'white'
});



var r2label = Ti.UI.createLabel({
	text: 'Locations',
	font: {fontSize: '24dp'},
	color: 'white'
});

locationsRow.add(r2icon,r2label);


data.push(row1,locationsRow);

var tv = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	borderColor: 'transparent',
	separatorColor: 'transparent',
	data: data
});


var featuredbtn = Ti.UI.createButton({
	top: '10dp',
	width: '213dp',
	height: '40dp',
	backgroundImage: '/images/featured_up.png',
	backgroundSelectedImage: '/images/featured_down.png',
	backgroundFocusedImage: '/images/featured_down.png'
});

featuredbtn.addEventListener('click',function(){
	Ti.App.fireEvent('toggle_slider');		
});

var dailyspecialsbtn = Ti.UI.createButton({
	top: '10dp',
	width: '213dp',
	height: '40dp',
	backgroundImage: '/images/dailyspecials_up.png',
	backgroundSelectedImage: '/images/dailyspecials_down.png',
	backgroundFocusedImage: '/images/dailyspecials_down.png'
});

dailyspecialsbtn.addEventListener('click',function(){
	Ti.App.fireEvent('show_daily_specials');
	Ti.App.fireEvent('toggle_slider');		
});

var locationsbtn = Ti.UI.createButton({
	top: '10dp',
	width: '213dp',
	height: '40dp',
	backgroundImage: '/images/locations_up.png',
	backgroundSelectedImage: '/images/locations_down.png',
	backgroundFocusedImage: '/images/locations_down.png'
});

locationsbtn.addEventListener('click',function(){
	Ti.App.fireEvent('show_locations');
	Ti.App.fireEvent('toggle_slider');		
});

var orderonlinebtn = Ti.UI.createButton({
	top: '10dp',
	width: '213dp',
	height: '40dp',
	backgroundImage: '/images/orderonline_up.png',
	backgroundSelectedImage: '/images/orderonline_down.png',
	backgroundFocusedImage: '/images/orderonline_down.png'
});
orderonlinebtn.addEventListener('click',function(){
	Ti.App.fireEvent('toggle_slider');	
	Ti.App.fireEvent('show_order_online');
});

self.add(tv);

return self;

};
