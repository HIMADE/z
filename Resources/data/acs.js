(function(){
var ProductData = [];
var Cloud = require('ti.cloud');
var db = require('data/database');
var date = require('core/date');
var moment = require('core/moment');

exports.seedProducts = function() {
	var productlist = [];
	Cloud.Objects.query({
		classname : 'products'
	}, function(e) {
		if (e.success) {
			//alert('acs.js Success:\n' + 'Count: ' + e.products.length);
			for (var i = 0; i < e.products.length; i++) {
				var product = e.products[i];
				db.addProduct(product);
				/*var item = {
					"id" : product.id,
					"name" : product.name,
					"price" : product.price,
					"groups" : {
						"spotlight" : product.groupsSpotlight,
						"featured" : product.groupsFeatured,
						"category" : product.groupsCategory,
					},
					"desc" : {
						'short' : product.descShort,
						'long' : product.descLong
					},
					"imgs" : {
						"main" : product.photo.urls.small_240,
						"thumb" : product.photo.urls.thumb_100,
						"spotlight" : product.photo.urls.medium_500
					}
				};
			*/
				
				
			};
			
			//ProductData = {'products' : productlist};

			//Ti.App.fireEvent('acsloaded', {payload: ProductData});
			
			//return ProductData;
			Ti.App.Properties.setString('seeded','yes');
			var date = new Date();
			Ti.App.Properties.setString('lastUpdated', moment.utc().format());
			//alert(Ti.App.Properties.getString('lastUpdated'));
			Ti.App.fireEvent('load_order_online');
			//alert('acs.js - seeded');


		} else {
			alert('Products Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
	
	
};

exports.CheckForProductUpdate = function(){
var lastUpdate = moment.utc().format(Ti.App.Properties.getString('lastUpdated'));
//alert('lastUpdate: ' + lastUpdate);

function _callback(data){
	var acsLastUpdated = data;
	//alert('last Updated: '+lastUpdate+ 'ACS:' + acsLastUpdated);
	var isAfter = moment(lastUpdate).isBefore(acsLastUpdated); // true;
	//alert(isAfter); // true);
	
			if (isAfter) {
				//alert('update available');
				Cloud.Objects.query({
					classname : 'products'
				}, function(e) {
					if (e.success) {
						//alert(e.products.length);
						for (var i = 0; i < e.products.length; i++) {
							var product = e.products[i];
							//alert('acs updated at'+ moment.utc().format(update.updated_at));
							if(moment(product.updated_at).isAfter(lastUpdate)){
								if(product.created_at == product.updated_at){
									//alert('new product');
									db.addProduct(product);
								}else{
								//alert('product exists - update');
								db.updateProducts(product.id, product);
								};
							}
							
						};
						Ti.App.Properties.setString('lastUpdated', moment.utc().format());
						//alert(lastUpdate);
						Ti.App.fireEvent('load_order_online');
					} else {
						alert('Products Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});
			} else {
				//alert('no updates available');
				Ti.App.fireEvent('load_order_online');
			}
			};

	Cloud.Objects.query({
		classname : 'update'
	}, function(e) {
		if (e.success) {
			for (var i = 0; i < e.update.length; i++) {
				var update = e.update[i];
			//alert('acs updated at'+ moment.utc().format(update.updated_at));
			_callback(moment.utc().format(update.updated_at));
			};
		}else{
			//alert('Products Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

exports.seedLocations = function() {
	Cloud.Places.query({
    /*page: 1,
    per_page: 20,
    where: {
        lnglat: {
            '$nearSphere': [-122.23,37.12],
            '$maxDistance': 0.00126
        }
    }*/
}, function (e) {
    if (e.success) {
        alert('Success:\n' +
            'Count: ' + e.places.length);
        for (var i = 0; i < e.places.length; i++) {
            var place = e.places[i];
          	db.addLocation(place);
          	alert('add location called');
        }
        Ti.App.fireEvent('load_locations');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
};

exports.CheckForLocationUpdate = function(){
	alert('checking for locations update');
	Ti.App.fireEvent('load_locations');
};

exports.getDailySpecials = function(month){
	Cloud.Objects.query({
		classname : 'products'
	}, function(e) {
		if (e.success) {
			for (var i = 0; i < e.products.length; i++) {
				var product = e.products[i];
				db.addProduct(product);
			};
		} else {
			alert('Products Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}
})();


