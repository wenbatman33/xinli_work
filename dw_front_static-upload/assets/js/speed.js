var url = window.location.href;
var domainsSpeed = [];
var times = 0;
url = url.split(".")
if(url[0].indexOf("http://localhost") != '-1'){
  url = ''
}else{
  url = window.location.hostname;
};
$.ajax({
  type: "GET",
  dataType: "json",
  url: '../domains_json/domains.json?'+Date.now(),
  success: function(Jdata) {
    Jdata.map(function(i, index){
      var item;
      item='<li class="template m-3">';
      item+='<a class="linkATag url_name d-flex" href="'+i.domain_name+'">';
      item+='<div id="link_'+index+'" class="linkSpeed mx-3" style="margin-left: 15px">努力加载中</div>';
      item+='<div class="linkButton" style="background: url(../assets/img/button-bg.png)">'+i.name+'</div>';
      item+='</a>';
      item+='</li>';
      $('#datas').append(item);
      speedTime(i.domain_name,index);
    });
  },
  error: function() {
    //alert("ERROR!!!");
    //console.log('ERROR');
  },
});
function speedTime(link, index){
  var startTime = Date.now();
  var endTime;
  var img = new Image();
  img.src = link+'/static/img/logo.png';
  img.onload = function(){
    times += 1; 
    endTime = Date.now();
    domainsSpeed[index] = ((endTime - startTime)/1000) +' 秒';
    $('#link_'+index).html(domainsSpeed[index]);
    if(times >=5){
      sendData();
    }
  };
  img.onerror = function(){
    domainsSpeed[index] = '';
  }
}
function sendData(){
  var payload = {
    DomainSpeed:JSON.stringify(domainsSpeed)
  };
  $.ajax({
    type: 'POST',
    dataType: "json",
    data: payload,
    url: 'https://aa18tg918.tgxxstatic.me/a/Forweb/DomainSpeed/',
    success: function(res) {
      console.log('success');
    },
    error: function() {
      console.log('ERROR');
    },
  });
}