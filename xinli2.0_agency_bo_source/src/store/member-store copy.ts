import { defineStore } from 'pinia';

/**
 * Member store
 */
export const useMemberStore = defineStore({
	id: 'member',
	state: () => {
		return {
			money: 0,
		};
	},
	getters: {
		getMoney(): number {
			return this.money;
		},
	},
	actions: {
		updateMoney(money: number) {
			this.money = money;
		},
	},
});
