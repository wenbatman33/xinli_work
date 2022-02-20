import axios from 'axios';
// process.env.APIHOST
// process.env.DEVHOST
export default {
  namespaced: true,
  state: {
    userAgent: '',
    indexBanner: [],
    Jackpot: [],
    AllProvider: [],
    gameProvider: [],
    slotProvider: [],
    fishingProvider: [],
    boardProvider: [],
    gameProviderIndexName: '',
    slotProviderIndexName: '',
    fishingProviderIndexName: '',
    boardProviderIndexName: '',
    HeroBoard_1: [],
    HeroBoard_2: [],
    HeroBoard_3: [],
    WinnerJackpot: [],
    WinnerNewest: [],
    WinnerHighest: [],
    WeekWinner: [],
    OddsGame: [],
    searchBar: false,
    showSmNav: false,
    routerFrom: '',
    loginBackUrl: '',
    JWTtokenReady: false,
  },
  getters: {},
  mutations: {
    setUserAgent(state, payload) {
      state.userAgent = payload;
    },
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
      state.AllProvider = tempArray.concat(arr1, arr2, arr3);
    },
    setProvider(state, payload) {
      state.gameProvider = payload;
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
    API_IndexBanner({ commit }) {
      const payload = { GroupId: 8, NowTime: 1 }; // 手機板群組
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/BannerList`, payload)
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_FishingProvider({ commit }) {
      const payload = {};
      payload.GameType = 2;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setFishingProvider', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_BoardProvider({ commit }) {
      const payload = {};
      payload.GameType = 3;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setBoardProvider', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_Provider({ commit }) {
      const gameProvider = [
        {
          name: 'Play Tech 老虎機',
          imgSrc: '/static/img/pic-provider-pt.png',
          s_imgSrc: '/static/img/brand-pt.png',
          link: '/games/group/pt',
          brand: 'pt',
        },
        {
          name: 'Pocket Game Soft 老虎機',
          imgSrc: '/static/img/pic-provider-pg.png',
          s_imgSrc: '/static/img/brand-pg.png',
          link: '/games/group/pg',
          brand: 'pg',
        },
        {
          name: 'Pragmatic Play 老虎機',
          imgSrc: '/static/img/pic-provider-pp.png',
          s_imgSrc: '/static/img/brand-pp.png',
          link: '/games/group/pp',
          brand: 'pp',
        },
      ];
      commit('setProvider', gameProvider);
    //   axios.get(`${process.env.DEVHOST}/gameProvider`)
    //     .then(function (res) {
    //       commit('setProvider', res.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    },
    API_HeroBoard({ commit }) {
      const HeroBoards = [];
      const JackpotPaylod = { GameMode: 2 };
      const HeroBoardPaylod = { GameMode: 2 };
      JackpotPaylod.method = 'List';
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Jackpot/List`, JackpotPaylod)
        .then((res) => {
          commit('index/setWinnerJackpot', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/WinnerNewest`, HeroBoardPaylod)
        .then((res) => {
          commit('index/setWinnerNewest', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/WinnerHighest`, HeroBoardPaylod)
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
