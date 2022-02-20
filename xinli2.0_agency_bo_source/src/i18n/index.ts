import en from '@/i18n/en.json';
import cn from '@/i18n/cn.json';
import { createI18n } from 'vue-i18n';
if (!window.localStorage.LANG) window.localStorage.setItem('LANG', 'cn');

const i18n = createI18n({
	locale: window.localStorage.LANG,
	fallbackLocale: 'cn',
	globalInjection: true,
	legacy: false,
	messages: {
		cn,
		en,
	},
});

export default i18n;
