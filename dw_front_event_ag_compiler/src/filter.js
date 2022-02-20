import Vue from 'vue';

Vue.filter('commaFormatDefault', (value) => {
  if (!Number.isNaN(value) && value !== undefined) {
    return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
  }
  return value;
});

Vue.filter('commaFormat', (value) => {
  const realVal = Math.floor(Number(value) * 100) / 100;
  if (!Number.isNaN(value) && value !== undefined) {
    let realVal_str = realVal.toString();    
    let rs = realVal_str.indexOf('.');    
    if (rs < 0) {    
      rs = realVal_str.length;    
      realVal_str += '.';    
    }    
    while (realVal_str.length <= rs + 2) {    
      realVal_str += '0';    
    }    
    return realVal_str.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
  }
  return realVal;
});

Vue.filter('formatSecond', (secs) => {
  let hr = Math.floor(secs / 3600);
  let min = Math.floor((secs - (hr * 3600)) / 60);
  let sec = Number(secs - (hr * 3600) - (min * 60));
  if (Number(min) >= 1 && Number(min) < 10) {
    min = `0${min}`;
  } else if (Number(min) === 0) {
    min = '0';
  }
  if (Number(sec) < 10) { sec = `0${sec}`; }
  if (hr) hr += ':';
  return `${hr + min}:${sec}`;
});
Vue.filter('upper', (value) => {
  if (!value) return '';
  return value.toUpperCase();
});


Vue.filter('noneHtmlCode', value => value.replace(/<[^<>]+>|&nbsp;/g, ''));
