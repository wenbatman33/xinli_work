import Vue from 'vue';
import VueI18n from 'vue-i18n';

import zh from './zh';
import en from './en';

Vue.use(VueI18n);

const messages = {
  zh,
  en,
};

function getLocale() {
  const result = Object.keys(messages);
  const index = result.findIndex((item) => item === window.navigator.language);
  if (index > -1) {
    return result[index];
  }
  return 'zh';
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages,
});

export default i18n;
