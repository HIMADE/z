(function(){
	
exports.getDate =function(){
    var currentTime = new Date();
    var hours = currentTime.getUTCHours();
    var minutes = currentTime.getUTCMinutes();
    var month = currentTime.getUTCMonth() + 1;
    var day = currentTime.getUTCDate();
    var year = currentTime.getUTCFullYear();
    return year+'-'+month+'-'+day+' '+hours+':'+minutes;
	};
	
})();
