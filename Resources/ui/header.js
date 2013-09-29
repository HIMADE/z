(function(){

exports.createHeaderWindow = function(){
var self = Ti.UI.createView({
	width: globals.devwidth,
	top: '0dp',
	height: '50dp',
	backgroundColor:"#930001",
	backgroundImage: '/images/header_bg.png',
	layout: 'horizontal'
});

var btn1 = Ti.UI.createButton({
	width: '50dp',
	height: '50dp',
	backgroundImage: '/images/menu_logo.png',
});

var img = Ti.UI.createImageView({
	left: '10dp',
	height: '50dp',
	image: '/images/header_logo.png'
});

var label = Ti.UI.createLabel({
	text: '•  Featured',
	color: 'white',
	font: {fontSize: '16dp', fontWeight: 'bold'},
	top: '14dp',
	left: '10dp'
});

self.add(btn1);
self.add(img);
self.add(label);


Ti.App.addEventListener('show_order_online',function(){
	label.text = '•  Order Online';
});

Ti.App.addEventListener('show_locations',function(){
	label.text = '•  Locations';
});

Ti.App.addEventListener('show_daily_specials', function(){
	label.text = '•  Specials'
})

btn1.addEventListener('click',function(e){
	Ti.App.fireEvent('toggle_slider');
});

return self;

};

})();
