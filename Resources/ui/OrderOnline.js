
exports.createView = function(products) {
	
var acs = require('data/acs'),
	db = require('data/database'),
	ProductManager  = require('core/ProductManager'),// get product manager
	CartManager = require('core/CartManager'),// Add CartManager
	LoadingIndicator = require('ui/Indicator'),// get loading indicator
	ProductOptions = require('ui/ProductOptionsWindow');
	
	// get util library
	var Util = require('core/Util');
	
	var self = Ti.UI.createView({
		height: Ti.UI.Fill,
		top: '50dp',
		bottom: '0dp',
		width: globals.devwidth,
		backgroundColor:"#fff"
	});
	
	var bottomBar = Ti.UI.createView({
		height: '50dp',
		width: Ti.UI.FILL,
		bottom: '0dp',
		layout: 'horizontal',
		backgroundImage: '/images/header_bg.png'
	});
	
	var buttonWidth = globals.devwidth / 3 ;
	
		
	var b1 = Ti.UI.createView({
		width: buttonWidth,
		height: '30dp',
		top: '0dp'
	});
	var b1label = Ti.UI.createLabel({
		width: Ti.UI.FILL,
		text: 'Featured',
		font: {fontWeight: 'bold', fontSize: '14dp'},
		color: 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	b1.add(b1label);
	
	var b2 = Ti.UI.createView({
		width: buttonWidth,
		height: '30dp',
		top: '0dp'
	});
	var b2label = Ti.UI.createLabel({
		width: Ti.UI.FILL,
		text: 'Products',
		font: {fontWeight: 'bold', fontSize: '14dp'},
		color: 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	b2.add(b2label);
	
	var b3 = Ti.UI.createView({
		width: buttonWidth,
		height: '30dp',
		top: '0dp'
	});
	var b3label = Ti.UI.createLabel({
		width: Ti.UI.FILL,
		text: 'Cart',
		font: {fontWeight: 'bold', fontSize: '14dp'},
		color: 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	b3.add(b3label);
	
	
	var indicatorFrame = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: '10dp',
	});
	
	var indicator = Ti.UI.createView({
		width: buttonWidth-20,
		left: 10,
		height: '4dp',
		bottom: '0dp',
		backgroundColor: '#fff'
	});
	
	indicatorFrame.add(indicator);
	bottomBar.add(indicatorFrame);
	bottomBar.add(b1);
	bottomBar.add(b2);
	bottomBar.add(b3);
	self.add(bottomBar);
	
	
	
	// initiate ui components
	var	HomeWindow        = require('ui/HomeWindow').createView(),
		CartWindow        = require('ui/CartWindow').createView(),
		ProductListWindow = require('ui/ProductsListWindow').createView();
		
	//Load Store Products when TabGroup is opened
	
	Ti.App.addEventListener('APP:seeded',function(){
		alert('app.js= seeded called');
	});

var load_order_online = function(){
	//alert('load order online called');
		//alert('OrderOnline.js load_order_online called')
		self.add(CartWindow);
		CartWindow.hide();
		self.add(ProductListWindow);
		ProductListWindow.hide();
		self.add(HomeWindow);
		if (globals.loaded === false) {
			//alert('not loaded');
			load(db.products());
			globals.loaded = true;
			Ti.App.fireEvent('displayProducts');
			// assemble StoreApp UI
		
		} else {
			self.add(CartWindow);
		CartWindow.hide();
		self.add(ProductListWindow);
		ProductListWindow.hide();
		self.add(HomeWindow);
			//alert('OrderOnline.js bypassing globals.loaded');
			Ti.App.fireEvent('displayProducts');
			// assemble StoreApp UI
		}
};
		
	Ti.App.addEventListener('load_order_online',function(e){
		load_order_online();
	}); 

	
	b1.addEventListener('click',function(){
		HomeWindow.show();
		ProductListWindow.hide();
		CartWindow.hide();
		indicator.animate({
			left: 10,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			duration: 400
		});
	});
	b2.addEventListener('click',function(){
		HomeWindow.hide();
		ProductListWindow.show();
		CartWindow.hide();
		indicator.animate({
			left: buttonWidth+10,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			duration: 400
		});
	});
	b3.addEventListener('click',function(){
		HomeWindow.hide();
		ProductListWindow.hide();
		CartWindow.show();
		indicator.animate({
			left: buttonWidth*2+10,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			duration: 400
		});
	});

	/*
	 * Load products from local data or from server based on param passed in
	 * 
	 * @param {String|Object} data: the json data or url for json data to load
	*/
	function load(data){
		var _callBack = function(productList){
			if(productList){
				ProductManager.setProducts(
					productList,
					function(){
						LoadingIndicator.hide();
					}
				);
			}
		}
		if(typeof data==="string" && Util.isURL(data)){ Util.fetch(data, _callBack); }
		else if(typeof data==="object" && data.products){ _callBack(data.products); }
		else { return Ti.API.error("Store.load: Invalid url or object"); }
	}

	// show product detail window for different sections
	Ti.App.addEventListener(
		"APP:SHOW_PRODUCT",
		function(e){
			var /*sourceTab,*/
				selectedProduct = ProductManager.getProduct(e.itemId);

			/*if(e.tab=="Home"){
				sourceTab = Home;
			}
			else if(e.tab=="Products"){
				sourceTab = Products;
			}
			else if(e.tab=="Cart"){
				sourceTab = Cart;
			}*/
			var detailWindow = require('ui/ProductDetailWindow').create(selectedProduct);
			detailWindow.open({fullscreen:false,animated:true});
		}
	);
	

	Ti.App.addEventListener(
		"APP:SHOW_INFO_VIEW",
		function(e){
			Info.open(
				require('ui/WebView').create(e.title, e.url),
				{ animated : true }
			);
		}
	);

	Ti.App.addEventListener(
		CartManager.events.change,
		function(e){
			/*if(!CartManager.hasItems()){
				Cart.badge = null;
			}
			else{
				Cart.badge = CartManager.getItemCount();
			}*/
		}
	);
	
	if (Ti.Network.online) {
		//alert('app.js online');

		//Check if this is the first run
		if (Ti.App.Properties.getString("first_run", "yes") == "yes") {
			Ti.App.Properties.setString('seeded', 'no');
			//alert('app.js first run not seeded');
			LoadingIndicator.show({
				//bottom : "50dip"
			});
			acs.seedProducts();
			//db.execute('INSERT INTO Products (id, name, price, groupsSpotlight, groupsFeatured, groupsCategory, descShort, descLong, imgsMain, imgsThumb, imgsSpotlight, optionsSet) VALUES (1,"Zip Pac",10.99,1,1,"Entree","Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.","<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.</p>", "http://zippys.com/live/wp-content/uploads/2011/11/PupuPlatter_1.jpg","http://zippys.com/live/wp-content/uploads/2011/11/PupuPlatter_1.jpg","http://zippys.com/live/wp-content/uploads/2011/11/PupuPlatter_1.jpg",NULL)');
			Ti.App.Properties.setString("first_run", "no");
		} else {
			//Not the first run, check for update.
			LoadingIndicator.show({
				//bottom : "50dip"
			});
			acs.CheckForProductUpdate();
		};

	} else {
		//Load orderOnlineView with from database.
		alert('app offline');
		load_order_online();
		//orderOnlineView = OrderOnlineView.createView(db.products());
	};
	

	return self;
};
