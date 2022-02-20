
iapiSetCallout('Login', calloutLogin);
var GameUrl;
var GameAccount;
var GamePassword;

function login(){
	iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
	iapiLogin( GameAccount , GamePassword , 1, "zh-cn");
}

function launchMobileClient(temptoken){
	var clientUrl = GameUrl+temptoken;
	document.location = clientUrl;
}

function calloutGetTemporaryAuthenticationToken(response){
	if (response.errorCode) {
		alert("Token failed. " + response.playerMessage + " Error code: " + response.errorCode);
	}else {
		launchMobileClient(response.sessionToken.sessionToken);
	}
}

function calloutLogin(response) {
	if (response.errorCode) {
		alert("Login failed. " + response.playerMessage + " Error code: " +response.errorCode);
	} else {
		iapiSetCallout('GetTemporaryAuthenticationToken',calloutGetTemporaryAuthenticationToken);
		iapiRequestTemporaryToken(1, '424', 'GamePlay');
	}
}

function mobileCallLogin(Url, Account, Password) {
	GameUrl = Url;
	GameAccount = Account;
	GamePassword = Password;
	login();
	alert('mobileCallLogin');
} 
