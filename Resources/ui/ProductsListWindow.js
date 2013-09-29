// get util library
var Util          = require('core/Util'),
	ProductManager = require('core/ProductManager');

// Get Configuration Data
var config = require('data/Config');

exports.createView = function() {
	var self = Ti.UI.createView({
			title        : "Products",
			barColor     : '#000000',
			top			 : 0,
			bottom		 : '50dp'
		}),
		Table  = Ti.UI.createTableView({
			width           : Ti.UI.FILL,
			height          : Ti.UI.FILL,
			backgroundColor : "#fff"
		});

	// get product manager
	var products      = require('core/ProductManager'),
		productEvents = products.events;

	// assemble UI
	self.add(Table);

	/*
	 * Product row factory method
	 *
	 * @param {String} name: the product name to display
	 * @param {String} image: the icon image to display
	 * @param {String} desc: description of item to display in row
	 * @param {String} itemId: item id used to load product page
	 */
	function createRow(name, image, desc, itemId){
		var row = Ti.UI.createTableViewRow({
				className : "product_rows",
				height: Ti.UI.SIZE
			}),
			img  = Ti.UI.createImageView({
				image        : image,
				left         : '3dp',
				top          : '3dp',
				defaultImage : config.PRODUCTS_DEFAULT_THUMB_IMAGE
			}),
			bodyView = Ti.UI.createView({
				layout : 'vertical'
			}),
			title = Ti.UI.createLabel({
				text            : name,
				minimumFontSize : '12dp',
				color           : '#000',
				height          : Ti.UI.SIZE,
				left            : '2dp',
				top             : '4dp',
				font : {
					fontSize   : '14dp',
					fontWeight : "bold"
				}
			}),
			body = Ti.UI.createLabel({
				text   : desc,
				height : Ti.UI.SIZE,
				left   : '2dp',
				top    : '2dp',
				color  : '#000',
				font : {
					fontSize : '12dp'
				}
			});

		// assemble row
		bodyView.add(title);
		bodyView.add(body);
		row.add(img);

		if(Util.osname==='android'){
			img.width       = "75dip";
			bodyView.left   = "80dip";
			bodyView.right  = "3dip";
			bodyView.top    = '0dp';
			bodyView.bottom = '0dp';
			body.height     = Ti.UI.SIZE;
		}
		else{
			img.width       = '75dp';
			bodyView.left   = '80dp';
			bodyView.height = Ti.UI.SIZE;
		}

		row.add(bodyView);

		// handle featured item click event
		row.addEventListener(
			"click",
			function(e){
				Ti.App.fireEvent(
					"APP:SHOW_PRODUCT",
					{ "itemId" : itemId, "tab" : "Products" }
				);
			}
		);

		return row;
	}

	/*
	 * Product group factory method
	 * 
	 * @param {String} name: the name of the group/section
	 * @param {Array} products: array of products for this group/section
	 */
	function createProductGroup(name, products){
		var productGroup = Ti.UI.createTableViewSection({
			headerTitle     : name,
			backgroundColor : "#F5785A"
		});
		for(var i=0,l=products.length;i<l;i++){
			productGroup.add(
				createRow(
					products[i].name,
					products[i].imgs.thumb,
					products[i].desc.short,
					products[i].id
				)
			);
		}
		return productGroup;
	}

	/*
	 * Assemble product groups for table view
	 *
	 * @param {Object} groups: the groups object containing product arrays for each group/section
	 */
	function displayProducts(){
		var data = [],
			groups = require('core/ProductManager').getProductGroup("__ALL__");
		for(var key in groups){
			data.push(
				createProductGroup(
					key,
					groups[key]
				)
			);
		}
		Table.setData(data);
	}

	Ti.App.addEventListener(
		'displayProducts',
		displayProducts
	);

	return self;
};
