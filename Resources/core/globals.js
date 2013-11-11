var globals = {};
globals.devwidth = Ti.Platform.getDisplayCaps().platformWidth;
globals.devheight = Ti.Platform.getDisplayCaps().platformHeight;
globals.dpi = Ti.Platform.getDisplayCaps().dpi;
globals.multiplier = globals.dpi / 160;
globals.loaded = false;
globals.os = Ti.Platform.osname;
globals.isiOS7;

var version = Titanium.Platform.version.split("."); 
var major = parseInt(version[0]); 
if (major == 7){globals.isiOS7 = true;
} else {globals.isiOS7 = false;} // iOS 6 

//alert(globals.multiplier);
