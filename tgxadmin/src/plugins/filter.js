Vue.filter('commaFormat', (value) => {
  if (!Number.isNaN(value) && value !== undefined) {
    return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
  }
  return value;
});
Vue.filter('floatFormat', (value) => {
  var toFixedNum = Number(value).toFixed(3);
  var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
  return realVal;
});