(function() {

var fontawesome = require('lib/IconicFont').IconicFont({
		font: 'lib/FontAwesome',
		ligature: false	// optional
});

	exports.createHeaderWindow = function() {
		var self = Ti.UI.createView({
			width : globals.devwidth,
			top : '0dp',
			height : (globals.isiOS7) ? '70dp' : '50dp',
			backgroundColor : "#930001",
			//backgroundImage : '/images/header_bg.png',
			layout : 'horizontal'
		});
		
		var iOS7Spacer = Ti.UI.createView({
			width: globals.devwidth,
			height: '20dp'
		});
		
		var btn1 = Ti.UI.createView({
			width: '50dp',
			height: '50dp'
		});
		
		var icon = Ti.UI.createLabel({
			text: fontawesome.icon('icon-reorder'),
			font : {
			fontSize : '28dp',
			fontFamily : fontawesome.fontfamily()
			},
			color : 'white'
		});
		
		btn1.add(icon);
		
		var horizontalBar = Ti.UI.createView({
			height : '42dp',
			top: '4dp',
			width : '1dp',
			BackgroundColor : 'white', 
		});

		var img = Ti.UI.createImageView({
			left : '10dp',
			height : '50dp',
			image : '/images/header_logo.png'
		});

		var label = Ti.UI.createLabel({
			text : '•  Featured',
			color : 'white',
			font : {
				fontFamily : (globals.os == 'android') ? 'Exo-Regular' : 'Exo',
				fontSize : '16dp',
				fontWeight : 'bold'
			},
			top : '14dp',
			left : '10dp'
		});
		
		if(globals.isiOS7){
			self.add(iOS7Spacer);
		};
	
		self.add(btn1);
		self.add(horizontalBar);
		self.add(img);
		self.add(label);

		Ti.App.addEventListener('show_promotions', function() {
			label.text = '•  Promotions';
		});

		Ti.App.addEventListener('show_order_online', function() {
			label.text = '•  Order Online';
		});

		Ti.App.addEventListener('show_locations', function() {
			label.text = '•  Locations';
		});

		Ti.App.addEventListener('show_daily_specials', function() {
			label.text = '•  Specials';
		});

		btn1.addEventListener('click', function(e) {
			Ti.App.fireEvent('toggle_slider');
		});

		return self;

	};

})();
