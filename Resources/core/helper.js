/*
    Branching logic based on OS
*/
var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
    var def = map.def||null; //default function or value
    if (map[osname]) {
        if (typeof map[osname] == 'function') { return map[osname](); }
        else { return map[osname]; }
    }
    else {
        if (typeof def == 'function') { return def(); }
        else { return def; }
    }
};