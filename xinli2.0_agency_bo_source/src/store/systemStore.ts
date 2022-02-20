import { defineStore } from 'pinia';

interface ISetting {
	SHOW_TAB: boolean;
	navTitle: string;
	prePath: string;
	nextPath: string;
}

export const SystemStore = defineStore({
	id: 'system',

	state: (): ISetting => ({
		SHOW_TAB: false,
		navTitle: '',
		prePath:'',
		nextPath:'',
	}),

	getters: {},

	actions: {},
});
