import { defineStore } from 'pinia';

/**
 * App store
 */
export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      inAppPopupUrl: '',
      inAppPopupTitle: '',
      inAppPopupVisible: false,
      gameGroupPopupId: 0,
      gameGroupPopupVisible: false,
    };
  },
  getters: {
    getInAppPopupVisible(): boolean {
      return this.inAppPopupVisible;
    },
    getInAppPopupUrl(): string {
      return this.inAppPopupUrl;
    },
    getInAppPopupTitle(): string {
      return this.inAppPopupTitle;
    },
    getGameGroupPopupId(): number {
      return this.gameGroupPopupId;
    },
    getGameGroupPopupVisible(): boolean {
      return this.gameGroupPopupVisible;
    },
  },
  actions: {
    showInAppPopup(url: string, title: string) {
      this.inAppPopupUrl = url;
      this.inAppPopupTitle = title;
      this.inAppPopupVisible = true;
    },
    hideInAppPopup() {
      this.inAppPopupVisible = false;
    },
    showGameGroupPopup(gameGroupId: number) {
      this.gameGroupPopupId = gameGroupId;
      this.gameGroupPopupVisible = true;
    },
    hideGameGroupPopup() {
      this.gameGroupPopupVisible = false;
    },
  },
});
