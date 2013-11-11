(function(){
	
var db = Ti.Database.open("Zippys1");
	db.execute("CREATE TABLE IF NOT EXISTS Products (id int, name text , price text , groupsSpotlight tinyint, groupsFeatured tinyint , groupsCategory text, descShort text, descLong text, imgsMain text, imgsThumb text, imgsSpotlight text, optionsSet int)");
	db.execute("CREATE TABLE IF NOT EXISTS Locations (id int, name text , address test , city text, state text, postal_code text, latitude float, longitude float, island text, photo text)");
	//if (db.execute("SELECT * FROM Products") === null){
	//var result = db.execute("SELECT * FROM Products");
	db.close();

//Order Online Products Database Functions	
exports.products = function(){
	//alert('products called');
	var ProductData = [];
	var products = [];
	var db = Ti.Database.open("Zippys1");
	var result = db.execute("SELECT * FROM Products");
	
	while(result.isValidRow()){
		var item = {
			"id" : result.fieldByName("id"),
			"name" : result.fieldByName("name"),
			"price" : JSON.parse(result.fieldByName("price")).oahu,
			"groups" : {
				"spotlight" : (result.fieldByName("groupsSpotlight") === 0 ) ? false : true ,
				"featured" : (result.fieldByName("groupsFeatured") === 0 ) ? false : true ,
				"category" : result.fieldByName("groupsCategory"),
			},
			"desc" : {
				"short" : result.fieldByName("descShort"),
				"long" : result.fieldByName("descLong")
			},
			"imgs" : {
				"main" : result.fieldByName("imgsMain"),
				"thumb" : result.fieldByName("imgsThumb"),
				"spotlight" : result.fieldByName("imgsSpotlight")
				}
		};
		
		
		products.push(item);
		result.next();
	};
	
	ProductData = {'products': products};
	//Ti.API.info(ProductData);
	
	result.close();
	db.close();
	
	//alert(ProductData);
	
	
	return ProductData;
	
};

exports.updateProducts = function(_id, p) {
	
	//alert('update called on '+_id);
	var db = Ti.Database.open('Zippys1');
	db.execute("UPDATE Products SET name = ?, price = ?, groupsSpotlight = ?, groupsFeatured = ?, groupsCategory = ?, descShort = ?, descLong = ?, imgsMain = ?, imgsThumb = ?, imgsSpotlight = ?, optionsSet = ? WHERE id = ?",p.name, JSON.stringify(p.price), p.groupsSpotlight, p.groupsFeatured, p.groupsCategory, p.descShort, p.descLong, p.photo.urls.small_240, p.photo.urls.square_75, p.photo.urls.medium_500, p.optionsSet, _id );
	db.close();

	//Dispatch a message to let others know the database has been updated
	Ti.App.fireEvent("databaseUpdated");
};

exports.addProduct = function(p) {
	var db = Ti.Database.open('Zippys1');
	db.execute('INSERT INTO Products (id, name, price, groupsSpotlight, groupsFeatured, groupsCategory, descShort, descLong, imgsMain, imgsThumb, imgsSpotlight, optionsSet) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', p.id, p.name, JSON.stringify(p.price), p.groupsSpotlight, p.groupsFeatured, p.groupsCategory, p.descShort, p.descLong, p.photo.urls.small_240, p.photo.urls.square_75, p.photo.urls.medium_500, p.optionsSet);
	//alert(p.id + 'was added!');
	db.close();

	//Dispatch a message to let others know the database has been updated
	//Ti.App.fireEvent("databaseUpdated");
};

//Locations Database Functions
exports.locations = function(){
	var locations = [];
	var db = Ti.Database.open("Zippys1");
	var result = db.execute("SELECT * FROM Locations");
	
	while(result.isValidRow()){
		var item = {
			"id" : result.fieldByName("id"),
			"name" : result.fieldByName("name"),
			"address" : result.fieldByName("address"),
			"city" : result.fieldByName("city"),
			"state" : result.fieldByName("state"),
			"postal_code" : result.fieldByName("postal_code"),
			"latitude" : result.fieldByName("latitude"),
			"longitude" : result.fieldByName("longitude"),
			"island" : result.fieldByName("island"),
			"photo" : result.fieldByName("photo")
		};
		
		
		locations.push(item);
		result.next();
	};
	
	return locations;
};

/*id, name, address, city, state, postal_code, latitude, longitude, island, photo */
exports.addLocation = function(l){
	var db = Ti.Database.open('Zippys1');
	db.execute('INSERT INTO Locations (id, name, address, city, state, postal_code, latitude, longitude, island, photo) VALUES (?,?,?,?,?,?,?,?,?,?)', l.id,l.name,l.address,l.city,l.state,l.postal_code,l.latitude,l.longitude,l.island,l.photo.urls.medium_500);
	//alert(l.name + 'was added!');
	db.close();
};
})();

