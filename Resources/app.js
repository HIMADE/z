
Ti.include('core/globals.js');

//self executing function to eliminate globals.
(function(){
var osname = Ti.Platform.osname, 
	OrderOnlineView = require('ui/OrderOnline'),
	orderOnlineview,
	acs = require('data/acs'),
	config = require('data/Config'),
	db = require('data/database'),
	LocationsView = require('ui/locations'),
	locationsView,
	DailySpecialsView = require('ui/dailyspecials'),
	dailySpecialsView,
	daily_specials_loaded = false,
	locations_view_loaded = false,
	order_online_loaded = false,
	slider_position = false;
	
var win = Ti.UI.createWindow({
	backgroundColor: 'white',
	navBarHidden: true,
	exitOnClose: true,
	activity:{
		onPrepareOptionsMenu: function(e) {
			toggle_slider();
		}
	}
});

var view2 = Ti.UI.createView({
	width: globals.devwidth,
	top:'0dp',
	backgroundColor:"white",
	left:'0dp'
});

//header view


view2.add(require('ui/header').createHeaderWindow());

function toggle_slider(){
	//alert('toggle slider called' + slider_position );
	if(slider_position){
			view2.animate({
			left: '0dp',
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			duration: 400
		});
		slider_position = false;
	}else{
		view2.animate({
			left: globals.devwidth - (50 * globals.multiplier),
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			duration: 400
		});
		slider_position = true;
	};
	
};

Ti.App.addEventListener('toggle_slider', function(){
		toggle_slider();
});

Ti.App.addEventListener('show_daily_specials', function(){
	if(daily_specials_loaded === false){
		dailySpecialsView = DailySpecialsView.createView();
		view2.add(dailySpecialsView);
		daily_specials_loaded = true;
	}
	dailySpecialsView.show();
	if(locations_view_loaded){locationsView.hide()};
	if(order_online_loaded){orderOnlineView.hide()};
	
	
});

Ti.App.addEventListener('show_order_online',function(){
		if(order_online_loaded === false){
			orderOnlineView = OrderOnlineView.createView();
			view2.add(orderOnlineView);
			order_online_loaded = true;
		};
		orderOnlineView.show();
		if(locations_view_loaded){locationsView.hide()};
		if(daily_specials_loaded){dailySpecialsView.hide()};
});

Ti.App.addEventListener('show_locations',function(){
	if(locations_view_loaded === false){
		locationsView = LocationsView.createView();
		locations_view_loaded = true;
		view2.add(locationsView);
	}
	locationsView.show();
	if(order_online_loaded){orderOnlineView.hide()};
	if(daily_specials_loaded){dailySpecialsView.hide()};
});
		
win.add(require('ui/mainmenu').createView());
win.add(view2);
win.open();

})();
