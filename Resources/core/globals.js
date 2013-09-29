var globals = {};
globals.devwidth = Ti.Platform.getDisplayCaps().platformWidth;
globals.devheight = Ti.Platform.getDisplayCaps().platformHeight;
globals.dpi = Ti.Platform.getDisplayCaps().dpi;
globals.multiplier = globals.dpi / 160;
globals.loaded = false;
globals.os = Ti.Platform.osname;

//alert(globals.multiplier);
