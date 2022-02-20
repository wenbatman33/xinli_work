import { defineStore } from 'pinia';
import { store } from '/@/store';

export const useOTPStore = defineStore({
  id: 'app-otp',
  state: () => ({
    OTP_open: false,
    OTP: '',
    requestParams: {},
    requestUrl: '',
    requestMethod: '',
    OTP_callback: false,
    OTP_response: {},
  }),
  getters: {},
  actions: {
    init() {
      this.OTP_open = false;
      this.OTP = '';
      this.requestParams = {};
      this.requestUrl = '';
      this.requestMethod = '';
      this.OTP_callback = false;
      this.OTP_response = {};
    },
    openOTP(open) {
      this.OTP_open = open;
    },
    setBeforeRequest(url, method, params) {
      this.requestParams = params;
      this.requestUrl = url;
      this.requestMethod = method;
    },
    callback(status, response){
      this.OTP_callback = status;
      this.OTP_response = response;
    }
  },
});

// Need to be used outside the setup
export function useOTPStoreWithOut() {
  return useOTPStore(store);
}
