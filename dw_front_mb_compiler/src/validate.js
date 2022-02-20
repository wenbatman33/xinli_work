import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate, { fieldsBagName: 'vee-fields' });

Validator.extend('account', {
  getMessage: '请输入5~15位半形英文、数字或下划线',
  validate: value => /^[a-zA-Z0-9_]{5,16}$/.test(value),
});

Validator.extend('password', {
  getMessage: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~',
  validate: value => /^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value),
});

Validator.extend('phone', {
  getMessage: '请填写正确手机格式',
  validate: value => /^((1)\d{10}){1}$/.test(value),
});

Validator.extend('number', {
  getMessage: '請輸入數字',
  validate: value => /^([0-9]+)$/.test(value),
});

Validator.extend('EmailV', {
  getMessage: '请输入正确的邮箱',
  validate: value => /^[a-z0-9.\-_]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(value),
});
