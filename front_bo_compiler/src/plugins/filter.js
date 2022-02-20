import Vue from 'vue';

Vue.filter('commaFormat', (value) => {
  if (!Number.isNaN(value) && value !== undefined) {
    return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
  }
  return value;
});
Vue.filter('floatFormat', () => {

});
