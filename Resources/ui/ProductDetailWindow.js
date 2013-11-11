// Get Configuration Data
var config = require('data/Config');

// Add CartManager
var CartManager = require('core/CartManager');

// get util library
var Util = require('core/Util');
var fontawesome = require('lib/IconicFont').IconicFont({
	font : 'lib/FontAwesome',
	ligature : false	// optional
});

/*
 * Create product options modal (Android)
 *
 * @param {Object} productObj: product object from ProductManager
 */
exports.create = function(productObj) {
	var scrwidth = Titanium.Platform.displayCaps.platformWidth;

	var ProductDetail = Ti.UI.createWindow({
		title : "Details",
		navBarHidden : true,
		barColor : "#930001",
		layout : "vertical",
		modal : true
	}), header = Ti.UI.createView({
		width : globals.devwidth,
		top : '0dp',
		height : (globals.isiOS7) ? '70dp' : '50dp',
		backgroundColor : "#930001",
		layout : 'horizontal'
	}), iOS7Spacer = Ti.UI.createView({
		height: '20dp',
		width: globals.devwidth
	}),headerLabel = Ti.UI.createLabel({
		text : 'Menu Item Details',
		color : 'white',
		font : {
			fontSize : '16dp',
			fontWeight : 'bold'
		},
		top : '14dp',
		left : '10dp'
	}), top = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		borderColor : "#ccc",
		borderWidth : '1dp',
		backgroundColor : "#fff"
	}), bottom = Ti.UI.createView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : "#fff",
		layout : "vertical"
	}), img = Ti.UI.createImageView({
		image : productObj.imgs.main,
		defaultImage : config.PRODUCTS_DEFAULT_MAIN_IMAGE,
		height : '100dp',
		left : '3dp',
		width : '140dp',
		top : '3dp'
	}), name = Ti.UI.createLabel({
		text : productObj.name,
		width : '170dp',
		height : '50dp',
		top : '3dp',
		left : '155dp',
		color : '#000',
		font : {
			fontSize : '16dp',
			fontWeight : "normal"
		}
	}), price = Ti.UI.createLabel({
		text : "$" + productObj.price,
		width : '100dp',
		height : '20dp',
		top : '45dp',
		left : '155dp',
		color : "#930001",
		font : {
			fontSize : '16dp',
			fontWeight : "bold"
		}
	}), info = Ti.UI.createWebView({
		visible : true,
		height : '100%',
		width : '100%',
		enableZoomControls : false,
		horizontalWrap : true,
		html : ['<htm><head><meta name="viewport" content="initial-scale=1.0, user-scalable=no" /><style>body{margin:5px;padding:0}body,p,strong', "{font-family:helvetica;font-size:12px}</style></head><body>", "<div width:" + scrwidth + ">", productObj.desc.long, "</div>", "</body></html>"].join("")
	}), description = Ti.UI.createLabel({
		text : productObj.desc.long,
		width : '90%',
		height : Ti.UI.SIZE,
		top : '120dp'
	});
	
	if(Ti.Platform.osname == 'ios') ProductDetail.statusBarStyle = (globals.isiOS7) ? Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT :  Titanium.UI.iPhone.StatusBar.DEFAULT;

	var buyButton = Ti.UI.createButton({
		title : "Add to Cart",
		backgroundColor : "#930001",
		color : "#fff",
		backgroundSelectedColor : "#F5785A",
		height : '30dp',
		width : '75dp',
		top : '75dp',
		left : '155dp',
		font : {
			fontSize : '12dp'
		}
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
	ProductDetail.close({
		animated : true
	});
});

if (Util.osname === 'iphone') {
	buyButton.style = Ti.UI.iPhone.SystemButtonStyle.PLAIN;
	cancelButton.style = Ti.UI.iPhone.SystemButtonStyle.PLAIN;
};

// assemble UI
top.add(img);
top.add(name);
top.add(price);
top.add(buyButton);
top.add(description);
if(globals.isiOS7) header.add(iOS7Spacer);
header.add(cancelButtonContainer);
header.add(headerLabel);
ProductDetail.add(header);
ProductDetail.add(top);
ProductDetail.add(bottom);

// Add webview to screen and display
function setInfoHTML() {
	bottom.add(info);
	info.show();
}

// Add item to cart or show options modal
function buyHandler() {
	if (productObj.options) {
		require('ui/ProductOptionsWindow').create(productObj).open();
	} else {
		CartManager.addItem(productObj.id);
	}
}

ProductDetail.addEventListener("focus", setInfoHTML //setInfoHTML function
);

ProductDetail.addEventListener("blur", function(e) {
	setTimeout(function() {
		ProductDetail.close({
			animated : false
		});
	}, 300);
});

buyButton.addEventListener("click", function() {
	buyHandler();
	alert('Item Added to Cart');
});

return ProductDetail;
}
