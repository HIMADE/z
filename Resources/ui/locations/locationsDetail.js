var fontawesome = require('lib/IconicFont').IconicFont({
	font : 'lib/FontAwesome',
	ligature : false	// optional
});


function CreateWindow(_l){
	var self = Ti.UI.createWindow({
		modal: true,
		backgroundColor: 'white',
		layout: 'vertical'
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
		text : _l.name,
		color : 'white',
		font : {
			fontSize : '16dp',
			fontWeight : 'bold'
		},
		top : '14dp',
		left : '10dp'
	});
	
	var cancelButtonContainer = Ti.UI.createView({
		width:'50dp',
		height: '50dp'
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
		self.close({animated : true});
	});
	
	var iv = Ti.UI.createImageView({
					top: '10dp',
					image: _l.photo,
					height: '150dp',
					width: Ti.UI.FILL
	});
	
	if(globals.isiOS7) header.add(iOS7Spacer);
	header.add(cancelButtonContainer);
	header.add(headerLabel);
	self.add(header);
	self.add(iv);
	
	return self;
};

module.exports = CreateWindow;