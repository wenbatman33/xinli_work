function clearAllCookie() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
function setCookie(cookie1, cookie2) {
  clearAllCookie();
  var d = new Date();
  d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000));
  let expires = 'expires='+d.toUTCString();
  document.cookie = 'S='+cookie1 +';'+expires+';path=/;domain=.18tgcity.biz';
  document.cookie = 'SelectedLanguage='+cookie2+';'+expires+';path=/;domain=.18tgcity.biz';
}
