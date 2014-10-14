/**
 * 
 */

MessageTypes = {'info': 1, 'success': 2, 'warning': 3, 'error': 4};

function showMessage(type, text){
	$("#statusmessage").addClass("alert-danger");
	$("#alert-text").text(text);
}

function showErrorMessage(text){
	showMessage(MessageTypes.error, text);
}


function getDateForUI(dt){
	return Date.parse(dt).toString(Config.DATE_FORMAT);
}

function getDateForDB(dt){
	return Date.parseExact(dt, Config.DATE_FORMAT).toString('yyyy-MM-dd');
	//return Date.parse(dt).toString(Config.DATE_FORMAT);
}

function getToday(format){
	return Date.today().toString('yyyy-MM-dd');
}