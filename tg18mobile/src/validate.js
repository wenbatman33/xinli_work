import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import VueI18n from 'vue-i18n';
import zh from 'vee-validate/dist/locale/zh_CN';
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.use(VueI18n);
const i18n = new VueI18n({ locale: 'zh' });
Vue.use(VeeValidate, { i18n, dictionary: { zh }, fieldsBagName: 'vee-fields' });

Validator.extend('PhoneV', {
  getMessage: field => `${field} 请填写正确手机格式`,
  validate: value => /^(\+86+(13|14|15|16|18|19)\d{9}){1}$/.test(value),
});
Validator.extend('Money', {
  getMessage: '请填写正确金额',
  validate: (value) => { /^[0-9]+(\.[0-9]{1,2})?$/.test(value); },
});
Validator.extend('AccountV', {
  getMessage: '请输入 5～15 字符如：A～Z、a～z、0～9',
  validate: value => /^[a-zA-Z0-9_]{5,16}$/.test(value),
});
Validator.extend('Psw18', {
  getMessage: '请填写8到20字元英文与数字',
  validate: (value) => { 
    if (value.length >= 8 && value.length <= 20) {
      return true;
    } 
    return false;
  },
});
Validator.extend('18Y', {
  getMessage: '对不起,本网站只对年满18周岁服务',
  validate: (value) => {
    const today = new Date();
    const Y = today.getFullYear() - 18;
    const M = today.getMonth();
    const D = today.getDate();
    const targerDate = Date.parse(new Date(Y, M, D));
    const sourceDate = Date.parse(new Date(value).toDateString());
    return sourceDate <= targerDate;
  },
});
