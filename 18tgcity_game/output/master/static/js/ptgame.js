var PTID;
var PTPASSWORD;
var PTURL;
iapiSetCallout('Login', calloutLogin);
iapiSetCallout('Logout', calloutLogout);
function login(){
	iapiLogin(PTID , PTPASSWORD , "1" , "zh-cn");
}

function logout(allSessions, realMode){
	iapiLogout(allSessions, realMode);
}

function calloutLogin(response){
	// errorCode=6 错误在登录时可能会发生，但游戏可以正常进入。可以忽略
	// var code = response.errorCode;
	// if (code && code != 6) {
	//	alert("Login failed, " + code);
	//	return;
  // }  
  // console.log(URL);
	var iframe = document.getElementById("PTGAME")
	iframe.src = PTURL
	//location.href = URL;
}

function calloutLogout(response){
	if (response.errorCode) {
		alert("Logout failed, " + response.errorCode);
	}else {
		alert("Logout OK");
	}
}
