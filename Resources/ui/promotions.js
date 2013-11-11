function CreatePromotionsView() {

	var scrollView = Ti.UI.createScrollView({
		layout : 'vertical',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	var special1 = Ti.UI.createImageView({
		top : '10dp',
		image : 'http://www.zippys.com/wp-content/uploads/2013/10/13-1001-chicken-scampi-960x445.jpg',
		width : globals.devwidth - 20,
		height: (globals.devwidth - 20) / 2
	});
	var special2 = Ti.UI.createImageView({
		top : '10dp',
		image : 'http://www.zippys.com/wp-content/uploads/2013/09/13-0901-ultimate-tailgate-promo-post.jpg',
		width : globals.devwidth - 20,
		height: (globals.devwidth - 20) /2
	});
	var special3 = Ti.UI.createImageView({
		top : '10dp',
		image : 'http://www.zippys.com/wp-content/uploads/2013/08/13-0901-rehab-pacific-promo-960x445.jpg',
		width : globals.devwidth - 20,
		height: (globals.devwidth - 20) /2
	});

	var special4 = Ti.UI.createImageView({
		top : '10dp',
		image : 'http://www.zippys.com/wp-content/uploads/2012/07/Chili_Shirt_web_splash.jpg',
		width : globals.devwidth - 20,
		height: (globals.devwidth - 20) /2,
		bottom: '20dp'
	});

	scrollView.add(special1);
	scrollView.addEventListener('click',function(e){
		var WebView = require('/ui/promotions/webview');
		var webView = new WebView('http://www.zippys.com/news/new-chicken-scampi-plate/');
		webView.open();
	});
	scrollView.add(special2);
	scrollView.add(special3);
	scrollView.add(special4);
	var self = Ti.UI.createView({
		top: (globals.isiOS7) ? '70dp' : '50dp',
	});
	self.add(scrollView);
	return self;
};

module.exports = CreatePromotionsView; 