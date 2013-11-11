(function(){

exports.createView = function(){
	// Taking Screen Width
	var screenWidth = Ti.Platform.displayCaps.platformWidth/*322*/;
	var needToChangeSize = false;
	var screenWidthActual = Ti.Platform.displayCaps.platformWidth;
	
	/*if (Ti.Platform.osname === 'android') {
		if (screenWidthActual >= 641) {
			screenWidth = screenWidthActual;
			needToChangeSize = true;
		}
	};*/
	
	var holder = Ti.UI.createView({
		top: (globals.isiOS7) ? '70dp' : '50dp'
	});
	
	// Main Window of the Month View.
	var win = Ti.UI.createView({
		backgroundColor : 'white',
	});
	
	
	// Previous Button - Tool Bar
	var prevMonth = Ti.UI.createButton({
		left : '15dp',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		title : '<' 
	}); 

	// Next Button - Tool Bar 
	var nextMonth = Ti.UI.createButton({ 
		right : '15dp', 
		width : Ti.UI.SIZE, 
		height : Ti.UI.SIZE, 
		title : '>'
	});

	// Month Title - Tool Bar
	var monthTitle = Ti.UI.createLabel({
		width : '200dp',
		height : '24dp',
		textAlign : 'center',
		color : "#930001",
		font : {fontSize : '20dp',fontWeight : 'bold'}
	});

	// Tool Bar
	var toolBar = Ti.UI.createView({
		top : '0dp',
		width : '322dp',
		height : '50dp',
		backgroundColor : 'white',
		layout : 'vertical'
	});
	
	// Tool Bar - View which contain Title Prev. &amp; Next Button
	var toolBarTitle = Ti.UI.createView({
		top : '3dp',
		width : '322dp',
		height : '24dp'
	});
	
	//toolBarTitle.add(prevMonth);
	toolBarTitle.add(monthTitle);
	//toolBarTitle.add(nextMonth);
	
	// Tool Bar - Day's
	var toolBarDays = Ti.UI.createView({
		top : '2dp',
		width : screenWidth,
		height : '24dp',
		layout : 'horizontal',
		left : '0dp'
	});
	
	toolBarDays.sunday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Sun',
		width : screenWidth / 7,
		textAlign : 'center',
		font : {fontSize : '12dp',fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.monday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Mon',
		width : screenWidth / 7,
		textAlign : 'center',
		font : {fontSize : '12dp',fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.tuesday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Tue',
		width : screenWidth / 7,
		textAlign : 'center',
		font : {fontSize : '12dp',fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.wednesday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Wed',
		width : screenWidth / 7,
		textAlign : 'center',
		font : {fontSize : '12dp',fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.thursday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Thu',
		width : screenWidth / 7,
		textAlign : 'center',
		font : {fontSize : '12dp',fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.friday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Fri',
		width : screenWidth / 7,
		textAlign : 'center',
		font : {fontSize : '12dp',fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.saturday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Sat',
		width : screenWidth / 7 - 1,
		textAlign : 'center',
		font : {fontSize : '12dp', fontWeight : 'bold'},
		color : "#930001"
	});
	
	toolBarDays.bottom = Ti.UI.createView({
		height: '2dp',
		width: screenWidth,
		backgroundColor: "#930001",
		bottom: '0dp'
	});
	
	toolBarDays.add(toolBarDays.sunday);
	toolBarDays.add(toolBarDays.monday);
	toolBarDays.add(toolBarDays.tuesday);
	toolBarDays.add(toolBarDays.wednesday);
	toolBarDays.add(toolBarDays.thursday);
	toolBarDays.add(toolBarDays.friday);
	toolBarDays.add(toolBarDays.saturday);
	toolBarDays.add(toolBarDays.bottom);
	
	// Adding Tool Bar Title View &amp; Tool Bar Days View
	toolBar.add(toolBarTitle);
	toolBar.add(toolBarDays);

	// Function which create day view template
	dayView = function(e) {
		var label = Ti.UI.createView({
			current: e.current,
			width: parseFloat(screenWidth / 7),
			height: '40dp',
			//backgroundColor: 'white',
			backgroundImage: e.backgroundImage,
			borderWidth: '1dp',
			borderColor: '#930001',
			text: e.day,
			color: e.color,
			cell: true
		});
		
		label.labelb = Ti.UI.createLabel({
			current : e.current,
			top: '-1dp',
			left: '-1dp',
			width: '20dp',
			height : '20dp',
			backgroundColor : e.backgroundColor,
			//borderWidth: '2dp',
			//borderColor: "#930001",
			text : e.day,
			textAlign : 'center',
			color : e.color,
			font : {fontSize : '12dp', fontWeight : 'bold'}
		});
	/*	label.labelc = Ti.UI.createLabel({
			text: e.optionDay,
			bottom: '5dp',
			right: '5dp',
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			textAlign: 'center',
			color: 'black',
			font : {fontSize : '18dp', fontWeight: 'bold'}
		});
	*/
		
		label.add(label.labelb);
		//label.add(label.labelc);
		return label;
	};
	
	monthName = function(e) {
		switch(e) {
			case 0: e = 'January';
			break;
			case 1: e = 'February';
			break;
			case 2:	e = 'March';
			break;
			case 3:	e = 'April';
			break;
			case 4:	e = 'May';
			break;
			case 5:	e = 'June';
			break;
			case 6:	e = 'July';
			break;
			case 7:	e = 'August';
			break;
			case 8:	e = 'September';
			break;
			case 9:	e = 'October';
			break;
			case 10:e = 'November';
			break;
			case 11:e = 'December';
			break;
		};
		return e;
	};
	
	var myDate = new Date(2013,03,01).getTime();
	//alert('myDate' + myDate);
	
	
	menuOption = function(a,b,c){
	var today = new Date(a,b,c).getTime();
	var one_day = 1000 * 60 * 60 * 24;
	var daysBetween = (today - myDate) / one_day;
	//alert(daysBetween);
	var optionDay = ((daysBetween /6) % 1) * 6 ;
	//alert(optionDay);
	if (optionDay >= .50 && optionDay < 1){
		optionDay = 1;
	};
	//var optionDayR = optionDay % 1;
	var optionDayC = Math.round(optionDay);
	//alert (daysBetween);
	return optionDayC;
	};
	
	
	// Calendar Main Function
	var calView = function(a, b, c) {
		var nameOfMonth = monthName(b);
		
		//create main calendar view
		var mainView = Ti.UI.createView({
			layout : 'horizontal',
			width : screenWidth+1,
			height : Ti.UI.FILL,
			top : '50dp',
			blockCount: 0
		});
		
		//set the time
		var daysInMonth = 32 - new Date(a, b, 32).getDate();
		//alert(daysInMonth);
		var dayOfMonth = new Date(a, b, c).getDate();
		var dayOfWeek = new Date(a, b, 1).getDay();
		var daysInLastMonth = 32 - new Date(a, b - 1, 32).getDate();
		var daysInNextMonth = (new Date(a, b, daysInMonth).getDay()) - 6;
		var currentDate = new Date();
		var blockCount = 0;
		
		//set initial day number
		var dayNumber = daysInLastMonth - dayOfWeek + 1;
		
		//get last month's days
		for ( i = 0; i<dayOfWeek; i++) {
			mainView.add(new dayView({day : dayNumber,color : '#8e959f',current : 'no',dayOfMonth : ''}));
			dayNumber++;
			blockCount++;
		};
		
		// reset day number for current month
		dayNumber = 1;
		var startOptionNumber;
		var dayBg;
		var aBg = '/images/abg.png',
			bBg = '/images/bbg.png',
			cBg = '/images/cbg.png',
			dBg = '/images/dbg.png',
			eBg = '/images/ebg.png',
			fBg = '/images/fbg.png';
	
		
		//get this month's days
		
		for ( i = 0; i < daysInMonth; i++) {
		
			if (i == 0){
				var opt = menuOption(a,b,1);
			};
		
		switch(opt){
			case 0: dayBg = aBg;
			opt++;
			break;
			case 1: dayBg = bBg;
			opt++;
			break;
			case 2: dayBg = cBg;
			opt++;
			break;
			case 3: dayBg = dBg;
			opt++;
			break;
			case 4: dayBg = eBg;
			opt++;
			break;
			case 5: dayBg = fBg;
			opt = 0;
			break;
		};
		
			
			var newDay = new dayView({ day : dayNumber, color : "#930001", current : 'yes', dayOfMonth : dayOfMonth, backgroundImage : dayBg }); 
			mainView.add(newDay);
			if (newDay.text == dayOfMonth) { 
				if(b == currentDate.getMonth() && a == currentDate.getFullYear()){
				newDay.labelb.color = 'black'; // newDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png'; 
				newDay.backgroundColor = '#FFFFF000'; 
				};
				var oldDay = newDay; 
				}; 
			dayNumber++; 
			blockCount++;
		};
	 
		dayNumber = 1; //get remaining month's days 
		
		for ( i = 0; i > daysInNextMonth; i--) {
			mainView.add(new dayView({ day : dayNumber, color : '#8e959f', current : 'no', dayOfMonth : ''}));
			dayNumber++;
			blockCount++;
		};
		
	// this is the new "clicker" function, although it doesn't have a name anymore, it just is.
	mainView.addEventListener('click', function(e) {
		if (e.source.current == 'yes'  && e.source.cell == true) {
		
			// reset last day selected
			if (oldDay.labelb.text == dayOfMonth && b == currentDate.getMonth()) {
				//alert('1');
				oldDay.color = 'white';
				oldDay.labelb.color = 'white';
				// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday.png';
				oldDay.backgroundColor = '#FFFFF000';
				oldDay.labelb.backgroundColor = '#FFFFF000';
			} else {
				//alert('2');
				oldDay.color = "#930001";
				oldDay.labelb.color = '#930001';
				// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytile-Decoded.png';
				oldDay.backgroundColor = 'white'
				oldDay.labelb.backgroundColor = 'white'
			};
			oldDay.backgroundPaddingLeft = '0dp';
			oldDay.backgroundPaddingBottom = '0dp';
			
			// set window title with day selected, for testing purposes only
			//backButton.title = nameOfMonth + ' ' + e.source.text + ', ' + a;
			
			// set characteristic of the day selected
			if (e.source.labelb.text == dayOfMonth) {
				//alert('3');
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
				e.source.backgroundColor = '#FFFF00FF';
				e.source.labelb.backgroundColor = '#FFFF00FF';
			} else {
				//alert('4');
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytile_selected.png';
				e.source.backgroundColor = "#930001";
				e.source.labelb.backgroundColor = '#930001';
			};
			//alert('5');
			e.source.backgroundPaddingLeft = '1dp';
			e.source.backgroundPaddingBottom = '1dp';
			e.source.color = 'white';
			e.source.labelb.color = 'white';
			//this day becomes old :(
			oldDay = e.source;
		}
	});
		//alert(blockCount);
		mainView.blockCount = blockCount;
		return mainView;
	};
	
	// what's today's date?
	var setDate = new Date();
	a = setDate.getFullYear();
	b = setDate.getMonth();
	c = setDate.getDate();
	
	// add the three calendar views to the window for changing calendars with animation later
	
	var prevCalendarView = null;
	
	if (b == 0) {
		prevCalendarView = calView(a - 1, 11, c);
	} else {
		prevCalendarView = calView(a, b - 1, c);
	}
	prevCalendarView.left = (screenWidth * -1) + 'dp';
	
	var nextCalendarView = null;
	
	if (b == 0) {
		nextCalendarView = calView(a + 1, 0, c);
	} else {
		nextCalendarView = calView(a, b + 1, c);
	}
		nextCalendarView.left = screenWidth + 'dp';
	
	var thisCalendarView = calView(a, b, c);
	if (needToChangeSize == false) {
		thisCalendarView.left = '0dp';
	}
	
	monthTitle.text = monthName(b) + ' ' + a;
	// add everything to the window
	win.add(toolBar);
	win.add(thisCalendarView);
	win.add(nextCalendarView);
	win.add(prevCalendarView);
	
	// yeah, open the window, why not?
	/*win.open({
		modal : true
	});*/
	
	var slideNext = Titanium.UI.createAnimation({
		// left : '-322',
		duration : 400,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	
	slideNext.left = (screenWidth * -1);
	
	var slideReset = Titanium.UI.createAnimation({
		// left : '-1',
		duration : 400,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	
	if (needToChangeSize == false) {
		slideReset.left = '0';
	} else {
		slideReset.left = ((screenWidth - 644) / 2);
	}
	
	var slidePrev = Titanium.UI.createAnimation({
		// left : '322',
		duration : 500
	});
	
	slidePrev.left = screenWidth;
	
	holder.add(win);
	
	/////////////////////////////////////////////////
	var calheight = (((thisCalendarView.blockCount/7) * 40) + 125) * globals.multiplier;
	//alert(screenWidth);
	var data = [];
	
	var tvr = Ti.UI.createTableViewRow({
		title: 'test',
		height: '50dp'
	});
	
	data.push(tvr);
	
	var tv = Ti.UI.createTableView({
		height: globals.devheight - calheight,
		bottom: '0dp',
		data: data,
		backgroundColor: 'grey'
	});
	
	holder.add(tv);
	
	// Next Month Click Event
		nextMonth.addEventListener('click', function() {
			if (b == 11) {
				b = 0;
				a++;
			} else {
				b++;
			}
			
			var thiscalheight = (((nextCalendarView.blockCount/7) * 40) + 125) * globals.multiplier;
			
				tv.animate({
					height: globals.devheight - thiscalheight,
					duration: 400,
					cure: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
				});
			
			thisCalendarView.animate(slideNext);
			nextCalendarView.animate(slideReset);
			
			setTimeout(function() {
				thisCalendarView.left = (screenWidth * -1) + 'dp';
				if (needToChangeSize == false) {
					nextCalendarView.left = '0dp';
				} else {
					nextCalendarView.left = ((screenWidth - 644) / 2);
				};
				prevCalendarView = thisCalendarView;
				thisCalendarView = nextCalendarView;
				if (b == 11) {
					nextCalendarView = calView(a + 1, 0, c);
				} else {
					nextCalendarView = calView(a, b + 1, c);
				};
				monthTitle.text = monthName(b) + ' ' + a;
				nextCalendarView.left = screenWidth + 'dp';
				win.add(nextCalendarView);
			}, 500);
		});
	
	// Previous Month Click Event
		prevMonth.addEventListener('click', function() {
			if (b == 0) {
				b = 11;
				a--;
			} else {
				b--;
			};
			
			var thiscalheight = (((prevCalendarView.blockCount/7) * 40) + 125) * globals.multiplier;
			
			
				tv.animate({
					height: globals.devheight - thiscalheight,
					duration: 400,
					cure: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
				});
			
			thisCalendarView.animate(slidePrev);
			prevCalendarView.animate(slideReset);
			
			setTimeout(function() {
				thisCalendarView.left = screenWidth + '0dp';
				
				if (needToChangeSize == false) {
					prevCalendarView.left = '0dp';
				} else {
					prevCalendarView.left = ((screenWidth - 644) / 2);
				};
				
				nextCalendarView = thisCalendarView;
				thisCalendarView = prevCalendarView;
				
				if (b == 0) {
					prevCalendarView = calView(a - 1, 11, c);
				} else {
					prevCalendarView = calView(a, b - 1, c);
				};
				
				monthTitle.text = monthName(b) + ' ' + a;
				prevCalendarView.left = (screenWidth * -1) + 'dp';
				win.add(prevCalendarView);
				}, 500);
		});
	
	return holder;
	
	};

})();
