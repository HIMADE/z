function Spotlight(options){
	var self = Ti.UI.createScrollableView({
		height          : options.height  || null,
		width           : options.width   || null,
		top             : options.top     || null,
		left            : options.left    || null,
		backgroundImage : options.bgImage || null,
		backgroundColor : options.bgColor || null
	});
	
	var bottomBorder = Ti.UI.createView({
		backgroundColor: '#881000',
		height: '1dp',
		bottom: '0dp',
		width: Ti.UI.FILL
	});
	
	self.add(bottomBorder);

	if(options.showControls){
		self.showPagingControl   = true;
		self.pagingControlHeight = '20dp';
		self.pagingControlColor  = options.controlColor || null;
	}

	return {
		get : function(){
			return self;
		},
		addPromo : function(img, defaultImg, productId){
			var view = Ti.UI.createView({
					height : Ti.UI.FILL,
					width  : Ti.UI.FILL
				}),
				imgView = Ti.UI.createImageView({
					image        : img,
					defaultImage : defaultImg,
					height       : Ti.UI.FILL
				});

			imgView.addEventListener(
				"singletap",
				function(e){
					if(e.source.productId){
						self.fireEvent('PromoTap', { 'productId' : e.source.productId });
					}

				}
			);

			imgView.productId = productId;
			view.add(imgView);
			self.addView(view);
		}
	};
}

exports.create = function(options){
	return Spotlight(options);
};
