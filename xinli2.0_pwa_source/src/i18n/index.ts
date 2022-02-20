import { createI18n } from 'vue-i18n';
import { LocalStorageKeys, DEFAULT_LNAG } from '@/utils/constants';
import cn from './cn';
import en from './en';

const i18n = createI18n({
  locale: localStorage.getItem(LocalStorageKeys.LANG) || DEFAULT_LNAG,
  fallbackLocale: DEFAULT_LNAG,
  messages: {
    cn,
    en,
  },
});

export default i18n;
