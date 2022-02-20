$( document ).ready(function() {
  var u = navigator.userAgent;
  var isAndroid = '';
  var isiOS = '';
  var tutoria_link = '';
  var ios_link = '';
  var android_link = '';
  $.ajax({
    type: "GET",
    dataType: "json",
    url: './page_1.json?'+Date.now(),
    success: function(Jdata) {
      tutoria_link = Jdata.filter(item => item.app == 'tutorial')[0].link;
      ios_link = Jdata.filter(item => item.app == 'ios')[0].link;
      android_link = Jdata.filter(item => item.app == 'android')[0].link;
      
      $('.tutorial').attr({'href':tutoria_link, 'target':'_blank'});
      $('.ios').attr({'href':ios_link, 'target':'_blank'});
      $('.android').attr({'href':android_link, 'target':'_blank'});
      getUserAgent();
    }
  });

  function getUserAgent() {
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isAndroid) {
      $(".android").css({"display": "inline-block"});
    } else {
      $(".ios").css({"display": "inline-block"});
    }
  }
  $('#fullpage').fullpage({
    anchors: ['section_1', 'section_2', 'section_3', 'section_4', 'section_5'],
    menu: '#menu',
    navigation: true,
    slidesNavigation: true,
  });
});
