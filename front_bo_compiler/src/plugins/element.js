import Vue from 'vue';
import Element from 'element-ui';
import '@/assets/scss/element-variables.scss';
import locale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(Element, {
  locale,
  size: 'medium'
});
