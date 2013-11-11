(function() {
	var db = require('data/database');
	var acs = require('data/acs'), LoadingIndicator = require('ui/Indicator');
	// get loading indicator

	exports.createView = function() {

		var self = Ti.UI.createView({
			top: (globals.isiOS7) ? '70dp' : '50dp',
			backgroundColor : '#fff'

		});

		var tv = Ti.UI.createTableView({
		});

		var load_locations = function() {
			var data = [];

			var locations = db.locations();

			for (var i = 0; i < locations.length; i++) {
				var location = locations[i];
				
				//alert(location.photo);

				var tvr = Ti.UI.createTableViewRow({
					height : '150dp',
					name: location.name,
					location: location
				});
				
				var iv = Ti.UI.createImageView({
					image: location.photo,
					height: '150dp',
					width: Ti.UI.FILL
				});
				
				tvr.add(iv);

				var tvrbv = Ti.UI.createView({
					height : '30dp',
					bottom : '0dp',
					backgroundColor : '#000',
					opacity: 0.7
				});

				var label = Ti.UI.createLabel({
					left: '5dp',
					bottom: '5dp',
					text : location.name,
					color: 'white',
					font : {
						fontFamily : (globals.os == 'android') ? 'Exo-Regular' : 'Exo',
						fontSize : '14dp',
						fontWeight : 'bold'
					},
					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
				});

				
				tvr.add(tvrbv);
				tvr.add(label);
				data.push(tvr);
			};
			tv.data = data;
			self.add(tv);
			LoadingIndicator.hide();
		};
		
		tv.addEventListener('click', function(e){
			var LocationsDetail = require('/ui/locations/locationsDetail');
			var locationsDetail = new LocationsDetail(e.rowData.location);
			locationsDetail.open({animated: true});
			//alert('you clicked'+ e.rowData.name);
		});

		Ti.App.addEventListener('load_locations', function() {
			//alert('load_locations_called');
			load_locations();
		});

		if (Ti.Network.online) {
			//alert('app.js online');

			//Check if this is the first run
			if (Ti.App.Properties.getString("locations_first_run", "yes") == "yes") {
				//alert('app.js first run not seeded');
				LoadingIndicator.show({
					//bottom : "50dip"
				});
				acs.seedLocations();
				Ti.App.Properties.setString("locations_first_run", "no");
			} else {
				//Not the first run, check for update.
				LoadingIndicator.show({
					//bottom : "50dip"
				});
				acs.CheckForLocationUpdate();
			};

		} else {
			//Load orderOnlineView with from database.
			alert('app offline');
			//orderOnlineView = OrderOnlineView.createView(db.products());
			Ti.App.fireEvent('load_locations');
		};

		return self;

	};

})();
