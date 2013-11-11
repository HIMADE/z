function CreateWebView(_url){
	
	var fontawesome = require('lib/IconicFont').IconicFont({
	font : 'lib/FontAwesome',
	ligature : false	// optional
	});

	
	var self = Ti.UI.createWindow({
		modal: 'true',
		backgroundColor: 'white'
	});
	
	var wv = Ti.UI.createWebView({
		url: _url,
		top: (globals.isiOS7) ? '70dp' : '50dp',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	var header = Ti.UI.createView({
		width : globals.devwidth,
		top : '0dp',
		height : (globals.isiOS7) ? '70dp' : '50dp',
		backgroundColor : "#930001",
		layout : 'horizontal'
	});
	var iOS7Spacer = Ti.UI.createView({
		height: '20dp',
		width: globals.devwidth
	});
	var headerLabel = Ti.UI.createLabel({
		text : 'Promotion Details',
		color : 'white',
		font : {
			fontSize : '16dp',
			fontWeight : 'bold',
			fontFamily : (globals.os == 'android') ? 'Exo-Regular' : 'Exo'
		},
		top : '14dp',
		left : '10dp'
	});
	
	var cancelButtonContainer = Ti.UI.createView({
		height: '50dp',
		width: '50dp'
	});
	
	var cancelButton = Ti.UI.createLabel({
	color: 'white',
	text: fontawesome.icon('icon-remove-circle'),
	font : { fontSize : '28dp',
		fontFamily :
		fontawesome.fontfamily()
		}
	});
	
	cancelButtonContainer.add(cancelButton);

	cancelButtonContainer.addEventListener('click', function() {
		self.close({
			animated : true
		});
	});
	
	if(globals.isiOS7){
		header.add(iOS7Spacer);
	};
	
	header.add(cancelButtonContainer);
	header.add(headerLabel);
	
	self.add(header);
	self.add(wv);
	
	return self;
};

module.exports = CreateWebView;
