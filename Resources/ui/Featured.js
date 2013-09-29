// get util library
var Util = require('core/Util');

// Get Configuration Data
var config = require('data/Config');

function Featured(options){
	var self = Ti.UI.createTableView({
			width  : Ti.UI.FILL,
			height : options.height || null
		});

	return {
		get : function(){
			return self;
		},
		/*
		 * Featured row factory method
		 *
		 * @param {String} name: the product name to display
		 * @param {String} image: the icon image to display
		 * @param {String} desc: description of item to display in row
		 * @param {String} itemId: item id used to load product page
		 */
		createRow : function(name, image, desc, itemId){
			var row = Ti.UI.createTableViewRow({
					className : "featured_rows",
					hasChild  : true,
					height: Ti.UI.SIZE
				}),
				img = Ti.UI.createImageView({
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
					color           : '#000000',
					height          : Ti.UI.SIZE,
					left            : '2dp',
					top             : '4dp',
					font            : {
						fontSize   : '14dp',
						fontWeight : "bold"
					}
				}),
				body = Ti.UI.createLabel({
					text   : desc,
					height : Ti.UI.SIZE,
					left   : '2dp',
					top    : '2dp',
					color  : '#000000',
					font   : {
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
				bodyView.bottom = '2dp';
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
						{ "itemId" : itemId, "tab" : "Home" }
					);
				}
			);

			return row;
		}
	}
}

exports.create = function(options){
	return Featured(options);
};

