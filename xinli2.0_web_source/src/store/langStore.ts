import { defineStore } from 'pinia';

interface ILang {
	lang: string;
}

export const LangStore = defineStore({
	id: 'lang',
	state: (): ILang => ({
		lang: window.localStorage.LANG ? window.localStorage.LANG : 'cn',
	}),

	actions: {
		changLang(lang: string) {
			window.localStorage.setItem('LANG', lang);
			window.location.reload();
		},
	},
});
