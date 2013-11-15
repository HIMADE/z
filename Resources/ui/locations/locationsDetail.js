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
		iv = null;
		headerLabel = null;
		iOS7Spacer = null;
		header = null;
		self.close({animated : true});
	});
	
	var scrollView = Ti.UI.createScrollView({
		contentHeight:'auto',
		contentWidth: globals.devwidth,
		height: Ti.UI.FILL,
		layout: 'vertical'
	});
	
	var iv = Ti.UI.createImageView({
					image: _l.photo,
					height: '150dp',
					width: Ti.UI.FILL
	});
	
	scrollView.add(iv);
	
	var midMenu = Ti.UI.createView({
		height: '50dp',
		width: Ti.UI.FILL,
		layout: 'horizontal',
		backgroundColor : "#930001"
	});
	
	var mm1 = Ti.UI.createLabel({
	color: 'white',
	text: fontawesome.icon('icon-info-sign'),
	font : { fontSize : '24dp',
		fontFamily :
		fontawesome.fontfamily()
	},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER ,
	width: '25%',
	height: Ti.UI.FILL
	});
	
	midMenu.add(mm1);
	
	var mm2 = Ti.UI.createLabel({
	color: 'white',
	text: fontawesome.icon('icon-camera'),
	font : { fontSize : '24dp',
		fontFamily :
		fontawesome.fontfamily()
	},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER ,
	width: '25%',
	height: Ti.UI.FILL
	});
	
	midMenu.add(mm2);
	
	var mm3 = Ti.UI.createLabel({
	color: 'white',
	text: fontawesome.icon('icon-map-marker'),
	font : { fontSize : '32dp',
		fontFamily :
		fontawesome.fontfamily()
	},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER ,
	width: '25%',
	height: Ti.UI.FILL
	});
	
	midMenu.add(mm3);
	
	scrollView.add(midMenu);
	
	if(globals.isiOS7) header.add(iOS7Spacer);
	header.add(cancelButtonContainer);
	header.add(headerLabel);
	self.add(header);
	self.add(scrollView);
	
	return self;
};

module.exports = CreateWindow;