$( document ).ready(function() {
  var u = navigator.userAgent;
  var isAndroid = '';
  var isiOS = '';
  var ios_link = '';
  var android_link = '';
  var all_link = '';
  $.ajax({
    type: "GET",
    dataType: "json",
    url: './page_3.json?'+Date.now(),
    success: function(Jdata) {
      ios_link = Jdata.filter(item => item.app == 'ios')[0].link;
      android_link = Jdata.filter(item => item.app == 'android')[0].link;
      all_link = Jdata.filter(item => item.app == 'all')[0].link;
      $('.ios').attr({'href':ios_link, 'target':'_blank'});
      $('.android').attr({'href':android_link, 'target':'_blank'});
      getUserAgent();
      createQrcode();
    }
  });

  function getUserAgent() {
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  function createQrcode() {
    var QRCODE = all_link+"?adhost="+window.location.host;
    $('#qrcode').qrcode({ width: 103,height: 103,text: QRCODE });
  }

  $('#fullpage').fullpage({
    anchors: ['section_1', 'section_2', 'section_3', 'section_4', 'section_5'],
    menu: '#menu',
  });

  const mySwiper = new Swiper ('.swiper-container', {
    observer: true,
    observeParents: true,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  $('#android-container').addClass('d-none');

  $('#appleTab').click(function() {
    if (Array.from(this.classList).includes('active')) {
      return
    } else {
      this.classList.add('active');
      $('#androidTab').removeClass('active');
      $('#android-container').addClass('d-none');
      $('#ios-container').removeClass('d-none');
    }
  });

  $('#androidTab').click(function() {
    if (Array.from(this.classList).includes('active')) {
      return
    } else {
      this.classList.add('active');
      $('#appleTab').removeClass('active');
      $('#ios-container').addClass('d-none');
      $('#android-container').removeClass('d-none');
    }
  });

  $('#pcAppleTab').click(function() {
    if (Array.from(this.classList).includes('active')) {
      return
    } else {
      this.classList.add('active');
      $('#pcAndroidTab').removeClass('active');
      $('#pc-android-container').addClass('d-none');
      $('#pc-ios-container').removeClass('d-none');
    }
  });

  $('#pcAndroidTab').click(function() {
    if (Array.from(this.classList).includes('active')) {
      return
    } else {
      this.classList.add('active');
      $('#pcAppleTab').removeClass('active');
      $('#pc-ios-container').addClass('d-none');
      $('#pc-android-container').removeClass('d-none');
    }
  })

  $('#pc-download').click(function() {
    $('#download-tutorial').show();
  })

  $('#modal-bg').click(function() {
    $('#download-tutorial').hide();
  })

  $('#close-modal').click(function() {
    $('#download-tutorial').hide();
  })
});
