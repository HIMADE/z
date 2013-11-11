

function CreateTableViewRow(_icon, _label) {
	var fontawesome = require('lib/IconicFont').IconicFont({
		font: 'lib/FontAwesome',
		ligature: false	// optional
	});
	
	var self = Ti.UI.createTableViewRow({
		height : '50dp',
		selectedBackgroundColor :  (globals.os === 'android') ? 'rgba(0,0,0,30)' : 'rgba(.0,.0,.0,.30)', 
	});
	
	var holder = Ti.UI.createView({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		layout: 'horizontal'
	});

	var icon = Ti.UI.createLabel({
		top : '5dp',
		font : {
			fontSize : '28dp',
			fontFamily : fontawesome.fontfamily()
		},
		color : 'white',
		text : fontawesome.icon(_icon),
		touchEnabled: false
	});

	var label = Ti.UI.createLabel({
		top : '3dp',
		text : _label,
		left : '10dp',
		font : {
			fontFamily : (globals.os === 'android') ? 'Exo-Regular' : 'Exo', 
			fontSize : '24dp',
			fontWeight : 'bold'
		},
		color : 'white',
		touchEnabled: false
	});

	holder.add(icon);
	holder.add(label);
	self.add(holder);
	
	return self;
}

module.exports = CreateTableViewRow;
