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

function getDate(){
	
}