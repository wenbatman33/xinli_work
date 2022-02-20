import axios from 'axios';

export default {
  namespaced: true,
  state: {
    indexBanner: [],
    Jackpot: [],
    AllProvider: [],
    gameProvider: [],
    slotProvider: [],
    fishingProvider: [],
    arcadeProvider: [],
    boardProvider: [],
    gameProviderIndexName: '',
    slotProviderIndexName: '',
    fishingProviderIndexName: '',
    boardProviderIndexName: '',
    arcadeProviderIndexName: '',
    HeroBoard_1: [],
    HeroBoard_2: [],
    HeroBoard_3: [],
    WinnerJackpot: [],
    WinnerNewest: [],
    WinnerHighest: [],
    WeekWinner: [],
    OddsGame: [],
    PaymentTime: '',
    JWTtokenReady: false,
  },
  getters: {},
  mutations: {
    setIndexBanner(state, payload) {
      state.indexBanner = payload;
    },
    setJackpot(state, payload) {
      state.Jackpot = payload;
    },
    setAllProvider(state) {
      const tempArray = [];
      const arr1 = state.slotProvider;
      const arr2 = state.fishingProvider;
      const arr3 = state.boardProvider;
      const arr4 = state.arcadeProvider;
      state.AllProvider = tempArray.concat(arr1, arr2, arr3, arr4);
    },
    setProvider(state, payload) {
      state.gameProvider = [];
      state.gameProvider = payload;
      state.gameProviderIndexName = payload[0].GroupName;
    },
    setSlotProvider(state, payload) {
      state.slotProvider = [];
      state.slotProvider = payload;
      state.slotProviderIndexName = payload[0].GroupName;
    },
    setFishingProvider(state, payload) {
      state.fishingProvider = [];
      state.fishingProvider = payload;
      state.fishingProviderIndexName = payload[0].GroupName;
    },
    setBoardProvider(state, payload) {
      state.boardProvider = [];
      state.boardProvider = payload;
      state.boardProviderIndexName = payload[0].GroupName;
    },
    setArcadeProvider(state, payload) {
      state.arcadeProvider = [];
      state.arcadeProvider = payload;
      state.arcadeProviderIndexName = payload[0].GroupName;
    },
    setHeroBoard(state, payload) {
      state.HeroBoard_1 = payload.tgHeroBoard_1;
      state.HeroBoard_2 = payload.tgHeroBoard_2;
      state.HeroBoard_3 = payload.tgHeroBoard_3;
    },
    setWinnerJackpot(state, payload) {
      state.WinnerJackpot = payload;
    },
    setWinnerNewest(state, payload) {
      state.WinnerNewest = payload;
    },
    setWinnerHighest(state, payload) {
      state.WinnerHighest = payload;
    },
    setWeekWinner(state, payload) {
      state.WeekWinner = payload;
    },
    setOddsGame(state, payload) {
      state.OddsGame = payload;
    },
    setPaymentTime(state, payload) {
      state.PaymentTime = payload;
    },
    setJWTtokenReady(state, payload) {
      state.JWTtokenReady = payload;
    },
  },
  actions: {
    JwtExpireCheck({ commit }, payload) {
      const vm = this;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Verification/JwtExpireCheck`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            commit('index/setJWTtokenReady', true, { root: true });
          } else {
            commit('index/setJWTtokenReady', false, { root: true });
            vm.dispatch('member/JWT_INIT', '');
          }
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_IndexBanner({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/BannerList`, payload)
        .then((res) => {
          commit('index/setIndexBanner', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_Jackpot({ commit }) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Jackpot/Total`)
        .then((res) => {
          commit('index/setJackpot', res.data.data[0].SumBonus, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_SlotProvider({ commit }) {
      const payload = {};
      payload.GameType = 1;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setSlotProvider', res.data.data, { root: true });
          return res;
        })
        .catch(error => error);
    },
    API_FishingProvider({ commit }) {
      const payload = {};
      payload.GameType = 2;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setFishingProvider', res.data.data, { root: true });
          return res;
        })
        .catch(error => error);
    },
    API_BoardProvider({ commit }) {
      const payload = {};
      payload.GameType = 3;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setBoardProvider', res.data.data, { root: true });
          return res;
        })
        .catch(error => error);
    },
    API_ArcadeProvider({ commit }) {
      const payload = {};
      payload.GameType = 4;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setArcadeProvider', res.data.data, { root: true });
          return res;
        })
        .catch(error => error);
    },
    API_Provider({ commit }, currentGameType) {
      const payload = {};
      payload.GameType = currentGameType;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('setProvider', res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_PaymentTime({ commit }, currentGameType) {
      const payload = {};
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PaymentTime`, payload)
        .then((res) => {
          commit('setPaymentTime', res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_HeroBoard({ commit }) {
      const HeroBoards = [];
      const JackpotPaylod = {};
      JackpotPaylod.method = 'List';
      JackpotPaylod.GameMode = 1;
      const HeroPaylod = {};
      const HeroBoardPaylod = { GameMode: 2 };
      HeroPaylod.GameMode = 1;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Jackpot/List`, JackpotPaylod)
        .then((res) => {
          commit('index/setWinnerJackpot', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/WinnerNewest`, HeroPaylod)
        .then((res) => {
          commit('index/setWinnerNewest', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/WinnerHighest`, HeroPaylod)
        .then((res) => {
          commit('index/setWinnerHighest', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/WeekWinner`, HeroBoardPaylod)
        .then((res) => {
          commit('index/setWeekWinner', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/OddsGame`, HeroBoardPaylod)
        .then((res) => {
          commit('index/setOddsGame', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      commit('setHeroBoard', HeroBoards);
    },
  },
};
