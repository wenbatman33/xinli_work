import { defineStore } from 'pinia';
import { store } from '/@/store';
import { putPromotionCond, createPromotionCond } from '/@/api/promotion/list';

export const usePromotionStore = defineStore({
  id: 'app-promotion',
  state: () => ({
    condList: [] as any[],
    condListQueue: [] as any[],
    submitAction: false,
    totalCond: 0,
    fetchDone: false,
    beforeApply: 2,
  }),
  getters: {},
  actions: {
    setCondList(data) {
      this.condList = data;
      this.condListQueue = [];
      this.totalCond = 0;
      this.fetchDone = false;
    },
    resetCondList() {
      this.condList = [];
      this.condListQueue = [];
      this.totalCond = 0;
      this.fetchDone = false;
    },
    // 計算目前模板內的遊戲廠商表單總數量
    addCondTotal() {
      this.totalCond += 1;
    },
    // 新增優惠模板
    updateCondList(data) {
      this.condList.push(data);
    },
    // 通知各元件驗證表單
    toggleSubmitAction(type: boolean) {
      this.submitAction = type;
    },

    // 有單一個表單未通過時 清除condListQueue
    clearcondListQueue() {
      this.condListQueue = [];
      this.submitAction = false;
    },
    // condListQueue 加入表單列表 準備發送api
    addcondListQueue(data) {
      this.condListQueue.push(data);
      if (this.condListQueue.length >= this.totalCond) {
        this.fetchAllForm();
      }
    },
    async fetchAllForm() {
      this.condListQueue.forEach(async (item) => {
        if (item.ID !== undefined) {
          await putPromotionCond(item);
        } else {
          await createPromotionCond(item);
        }
      });
      this.condListQueue = [];
      this.submitAction = false;
      this.fetchDone = true;
    },
    setBeforeApply(target) {
      if(target === true){
        this.beforeApply = 1;
      }else{
        this.beforeApply = 2;
      }
    }
  },
});

// Need to be used outside the setup
export function usePromotionStoreWithOut() {
  return usePromotionStore(store);
}
