$( document ).ready(function() {
  var initJsonNum = 0;
  var initAPINum = 0;
  var currentJson = null;
  var currentHost = null;
  
  function init(host) {
    console.log(host)
    currentHost = host;
    getAPILink(1);
    getAPILink(2);
  }
  
  function getAPILink(device_type){
    // /api/NewestAppVersion/{platform}/{device_type}
    // platform 平台[1:全站,2:體育APP,3:商城]
    // device_type裝置類型[ 1 : iOS, 2: Android]
    var apiLink = 'https://aa18ab918.'+currentHost+'/a/api/NewestAppVersion/1/';
    $.ajax({
      type: "GET",
      dataType: "json",
      url: apiLink+device_type,
      success: function(Jdata) {
        if(Jdata.data[0].appVersionDeviceType.display=="iOS"){
          $('.iosBtn').show();
          $('.iosBtn').click(function() {
            if (window.localStorage.agency) {
              copyText();
              window.location.href = Jdata.data[0].appVersionFileLocation;
              
            } else{
              window.location.href = Jdata.data[0].appVersionFileLocation;
            }
          });
        } else {
          $('.androidBtn').show();
          $('.androidBtn').click(function() {
            if (window.localStorage.agency) {
              copyText();
              window.location.href = Jdata.data[0].appVersionFileLocation;
              window.localStorage.removeItem('agency');
            } else{
              window.location.href = Jdata.data[0].appVersionFileLocation;
            }
          });
        }
      }
    });
  }

  function copyText(){
    var copyText = document.getElementById("agencyCode");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    window.localStorage.removeItem('agency');
  }
  function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
  }
  var agencyCode = getUrlVars()["agency"];
  if(agencyCode){
    // 暫存代理编号 若agency 編號時註冊同時需要送出agency'
    var $newdiv = $("<input type='text' id='agencyCode' style='position: absolute; margin-top: -9999px;'>");
    $("body").append($newdiv);
    window.localStorage.setItem('agency', agencyCode);
    $('#agencyCode').val(agencyCode);
  } else{
    window.localStorage.removeItem('agency');
  }

  function initDomainJson(num){
    var domainJsons = [
      'https://jl.tiger18.fyi:10443/dw.json',
      'https://jl.tiger18.info:10443/dw.json',
      'https://jl.tiger18.run:10443/dw.json',
      'https://jl.tiger18.cc:10443/dw.json',
    ];
    $.ajax({
      type: "GET",
      dataType: "json",
      url: domainJsons[num],
      success: function(res) {
        currentJson = res;
        checkJsonInsideHost(currentJson[initAPINum].main);
      },
      error:function(XMLHttpRequest, textStatus){
        initJsonNum += 1;
        initDomainJson(initJsonNum);
      }
    })
    
    
  }
  
  
  function checkLocalStorageMainHost(host) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: 'https://aa18ab918.'+host+'/a/api/ConnectionInfo',
      success: function(Jdata) {
        init(host);
      },
      error:function(XMLHttpRequest, textStatus){
        initDomainJson(initJsonNum);
      }
    })
  }

  function checkJsonInsideHost(host) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: 'https://aa18ab918.'+host+'/a/api/ConnectionInfo',
      success: function(Jdata) {
        init(host);
      },
      error:function(XMLHttpRequest, textStatus){
        if (initAPINum === (currentJson.length - 1)) {
          // 全失敗則 再次載入下一隻json測試
          initJsonNum += 1;
          initAPINum = 0;
          initDomainJson(initJsonNum);
        } else {
          // 若失敗 則依序再做測試
          initAPINum += 1;
          checkJsonInsideHost(currentJson[initAPINum].main);
        }
      }
    })
  }
  if (window.localStorage.MAIN_HOST) {
    // 正式機若有 window.localStorage.MAIN_HOST 使用暫存站台進入
    checkLocalStorageMainHost(window.localStorage.MAIN_HOST);
  } else {
    // 正式機若沒有 window.localStorage.MAIN_HOST 就去載入json
    // 進入載入Json循環迴圈
    initDomainJson(initJsonNum);
  }
});
