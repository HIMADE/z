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
	width: (Ti.Platform.osnmae == 'android') ? globals.devwidth - (50 * globals.multiplier) : globals.devwidth - 50,
	backgroundImage: '/images/zippysback_bg.jpg',
	top:'0dp',
	left:'0dp',
	layout: 'vertical'
});
//Load Require Files-------------------------------------------
var fontawesome = require('lib/IconicFont').IconicFont({
		font: 'lib/FontAwesome',
		ligature: false	// optional
});

var MainMenuTVR = require('/ui/mainmenu/MainMenuTVR');

var data = [];

//------------------HeaderView-----------------------------
var headerView = Ti.UI.createView({
	height: '128dp',
	width: Ti.UI.FILL,
	touchEnabled: false,
	selectedBackgroundColor: 'transparent'
});

var backtopimg = Ti.UI.createImageView({
	image: '/images/zippysback.png',
	top: '20dp',
	width: '230dp',
	height: '107dp'
});

headerView.add(backtopimg);

//------------------HeaderView End-----------------------------
function createSeperatorRow(){
	var tvr = Ti.UI.createTableViewRow({
	height: '1dp'
	});
	
	var lineView = Ti.UI.createView({
	height: '1dp',
	width: self.width - 20,
	backgroundColor: 'rgba(255,255,255,40)',
	});

	tvr.add(lineView);
	return tvr;
};

data.push(new createSeperatorRow);

data.push(new MainMenuTVR('icon-tags', 'Promotions'));
data.push(new createSeperatorRow);

data.push(new MainMenuTVR('icon-map-marker', 'Locations'));
data.push(new createSeperatorRow);

data.push(new MainMenuTVR('icon-calendar', 'Daily Specials'));
data.push(new createSeperatorRow);

data.push(new MainMenuTVR('icon-credit-card', 'Order To-Go'));
data.push(new createSeperatorRow);

data.push(new MainMenuTVR('icon-info-sign', 'Information'));
data.push(new createSeperatorRow);

data.push(new MainMenuTVR('icon-phone-sign', 'Contact Us'));
data.push(new createSeperatorRow);

var createdByTVR = Ti.UI.createTableViewRow({
	height: '50dp'
});

var createdByInfo = Ti.UI.createLabel({
	text: 'Hawaii Mobile Application Development',
	color: 'white',
	font: {
		fontSize: '10dp'
	}
});

createdByTVR.add(createdByInfo);
data.push(createdByTVR);


//Create Main Table View Row
var tv = Ti.UI.createTableView({
	backgroundColor: 'transparent',
	data: data,
	width: Ti.UI.FILL,
	headerView: headerView,
	separatorColor: 'transparent'
});

tv.addEventListener('click',function(e){
	//alert(e.index);
	switch(e.index){
		case 1:
			Ti.App.fireEvent('show_promotions');
			Ti.App.fireEvent('toggle_slider');
			break;
		case 3:
			Ti.App.fireEvent('show_locations');
			Ti.App.fireEvent('toggle_slider');
			break;
		case 5:
			Ti.App.fireEvent('show_daily_specials');
			Ti.App.fireEvent('toggle_slider');
			break;	
		case 7:
			Ti.App.fireEvent('show_order_online');
			Ti.App.fireEvent('toggle_slider');
			break;
	}
});

self.add(tv);

return self;

};
