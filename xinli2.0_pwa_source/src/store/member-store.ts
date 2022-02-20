import { defineStore } from 'pinia';

/**
 * Member store
 */
export const useMemberStore = defineStore({
  id: 'member',
  state: () => {
    return {
      money: 0,
      lockMoney: 0,
    };
  },
  getters: {
    getMoney(): number {
      return this.money;
    },
    getLockMoney(): number {
      return this.lockMoney;
    },
  },
  actions: {
    updateMoney(money: number) {
      this.money = money;
    },
    updateLockMoney(lockMoney: number) {
      this.lockMoney = lockMoney;
    },
  },
});
