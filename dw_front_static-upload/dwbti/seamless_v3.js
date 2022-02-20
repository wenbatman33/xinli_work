function whl() {
}

var SportsCookie = {
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; path=/; " + expires;
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
}

var myStatusLink = "https://t-game.tgcity18.info/api/Dwbti/Status/";
var myRefreshLink = "https://t-game.tgcity18.info/api/Dwbti/Refresh/";

var strUrlToken = getUrlVars("stoken");
var strCookieToken = SportsCookie.getCookie("token");
var strStoken = sessionStorage.getItem("token");
var strToken = '';

if (strUrlToken != '' && strUrlToken != undefined) {
    strToken = strUrlToken;
    SportsCookie.setCookie("token", strUrlToken, 1);
    sessionStorage.setItem("token", strUrlToken);
} else if (strCookieToken != '' && strUrlToken != undefined) {
    strToken = strCookieToken;
    sessionStorage.setItem("token", strCookieToken);
} else if (strStoken != '' && strStoken != undefined) {
    strToken = strStoken;
    SportsCookie.setCookie("token", strStoken, 1);
}



whl.prototype.login = function (username, password, callback) { alert('login!!');}
whl.prototype.logout = function () { window.location.reload(); };
whl.prototype.resetPassword = function () { }
whl.prototype.registrationForm = function () { }
whl.prototype.bank = function () { }
whl.prototype.formClose = function () { }
whl.prototype.updateProfile = function () { }
whl.prototype.showFormPanel = function () { }

// STATUS
whl.prototype.status = function (callback) {
    this.status_callback = callback;
    var that = this;

	if (strToken != "logout" && strToken != "") {
		$.ajax({
			type: 'POST',
			url: myStatusLink + "?r=" + new Date().getTime(),
			crossDomain: true,
			dataType: "jsonp",
			jsonp: false,
			jsonpCallback: 'jsoncb',
			data: { auth_token: strToken },
			success: function (data){
				that.statusCallback(data);
			}
		});
	}
}


// REFRESH SESSION
whl.prototype.refreshSession = function (callback) {
    this.refresh_callback = callback;
    var that = this;

	if (strToken != "logout" && strToken != "") {
		$.ajax({
			type: "POST",
			url: myRefreshLink + "?r=" + new Date().getTime(),
			crossDomain: true,
			dataType: "jsonp",
			contentType: "jsonp",
			jsonp: false,
			jsonpCallback: 'jsoncb',
			data: { auth_token: strToken },
			success: function (data) {
				that.refreshCallback(data);
			}
		});
	}
}

whl.prototype.statusCallback = function (data) {
    if (this.status_callback) {
        var result = new Object();
        result.uid = data.uid;
        result.token = data.token;
        result.status = data.status;
        result.balance = data.balance;
        result.message = data.message;
        this.status_callback(result);
    }
}

whl.prototype.refreshCallback = function (data) {
    if (this.refresh_callback) {
        var result = new Object();
        result.token = data.token;
        result.status = data.status;
        result.balance = data.balance;
        result.message = data.message;
        this.refresh_callback(result);
    }
}

function getUrlVars(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    var myVar = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	if (myVar != null) {if (myVar.slice(-1) == '/') myVar = myVar.slice(0, -1);} else { myVar=''; }
	return myVar;
}
