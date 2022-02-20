import Vue from 'vue';

Vue.filter('commaFormat', (value) => {
  if (!Number.isNaN(value) && value !== undefined) {
    return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
  }
  return value;
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
