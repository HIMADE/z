exports.createView = function() {
	// Get Configuration Data
	var config = require('data/Config');
	var util = require('core/Util');

	var self = Ti.UI.createView({
			title           : "Home",
			backgroundColor : "#ffffff",
			layout          : "vertical",
			top				: 0,
			bottom			: '50dp',
			height			: Ti.UI.Fill
		}),
		Spotlight = require("ui/Spotlight").create({
			height       : "45%",
			width        : Ti.UI.FILL,
			showControls : true,
			bgImage      : config.SPOTLIGHT_BG_IMAGE || null,
			bgColor      : config.SPOTLIGHT_BG_COLOR,
			controlColor :  '#881000'
		}),
		Featured = require("ui/Featured").create({
			width  : Ti.UI.FILL,
			height : Ti.UI.FILL
		});

	// get product manager
	var products      = require('core/ProductManager'),
		productEvents = products.events;

	// assemble UI
	var SpotlightObj = Spotlight.get(),
		FeaturedObj  = Featured.get();

	self.add(SpotlightObj);
	self.add(FeaturedObj);

	Ti.App.addEventListener(
		productEvents.SPOTLIGHTS_READY,
		function(e){
			 assembleSpotlightViews(products.getSpotlightProducts());
		}
	);

	Ti.App.addEventListener(
		productEvents.FEATURED_READY,
		function(e){
			assembleFeaturedRows(products.getFeaturedProducts());
		}
	);

	// handle spotlight item singletap event
	SpotlightObj.addEventListener(
		"PromoTap",
		function(e){
			Ti.App.fireEvent(
				"APP:SHOW_PRODUCT",
				{ "itemId" : e.productId, "tab" : "Home" }
			);
		}
	);

	/*
	 * Assemble featured table using list of featured products
	 *
	 * @param {Array} list: array list of featured row properties
	 */
	function assembleFeaturedRows(list){
		var rows = [];
		for(var i=0, l=list.length;i<l;i++){
			rows.push(
				Featured.createRow(
					list[i].name,
					list[i].img,
					list[i].desc,
					list[i].id
				)
			);
		}
		FeaturedObj.setData(rows);
	}

	/*
	 * Assemble spotlight scrollable view using list of spotlight properties
	 *
	 * @param {Array} list: array list of spotlight view properties
	 */
	function assembleSpotlightViews(list){
		for(var i=0, l=list.length;i<l;i++){
			Ti.API.info(list[i].img);
			Spotlight.addPromo(list[i].img, null, list[i].id);
		}
	}

	return self;
};