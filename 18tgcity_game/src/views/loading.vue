<template lang="pug">
  .gamaPage.d-flex.justify-content-center.align-items-center.flex-column
    img.logo.my-0.mx-3(src="/static/img/logo.svg" width='300')
    i.loadingIocn.my-2(class="el-icon-loading")
    p.loadingWording 加载中
</template> 

<script>
import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import { mapState } from 'vuex';

export default {
  name: 'Loading',
  data() {
    return {
      GroupName: '',
      H5Game: '',
      GamePlay: '',
      isMobile: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'MemberData',
      'MemberBankList',
      'MemberInboxList',
    ]),
  },
  methods: {
    gameLogin(payload) {
      const vm = this;
      axios.post(`${process.env.VUE_APP_GAMEHOST}/Game/Login/`, payload)
        .then((res) => {
          if (res.data.status === 0) {
            // vm.gameErrorShow = true;
          } else if (res.data.status === 1) {
            setTimeout(() => {
              // //////// 注意這是正式玩的開啟方式 //////////////////////////////
              // //////// 以下是廠商注意事項 ///////////////////////////////////
              // PT  PG  PP 有各自的另開頁面的方式
              // TTG WG RT GG MG (VG) 均屬跳轉IM頁面
              // MWG  PNG RTG  均屬跳轉IM頁面 但須判斷是不是手機方式
              // VT 需另開頁面
              // 其他廠商均屬跳轉IM頁面
              // (LE KY VG) 這三家方式略微不同請注意
              // //////////////////////////////////////////////////////////
              // //////////////////////////////////////////////////////////
              if (vm.GroupName === 'PT') {
                if (vm.H5Game === 1 || vm.H5Game === '1') {
                  const { GameAccount } = res.data.data;
                  const { Password } = res.data.data;
                  window.location.href = `/pth5.html?GameAccount=${GameAccount}&GamePassword=${Password}&PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
                } else {
                  const { GameAccount } = res.data.data;
                  const { Password } = res.data.data;
                  window.location.href = `/pt.html?PTID=${GameAccount}&PTPASSWORD=${Password}&PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
                }
              } else if (vm.GroupName === 'PG') {
                window.location.href = `/pg.html?PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
              } else if (vm.GroupName === 'PP') {
                const { S } = res.data.data;
                const { SelectedLanguage } = res.data.data;
                window.setCookie(`${S}`, `${SelectedLanguage}`);
                window.location.href = `/pp.html?SelectedLanguage=${SelectedLanguage}&S=${S}&PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
              } else if (vm.GroupName === 'TTG' | vm.GroupName === 'WG' | vm.GroupName === 'RT' | vm.GroupName === 'GG' | vm.GroupName === 'MG' | vm.GroupName === 'VG' | vm.GroupName === 'VT') {
                window.location.href = res.data.data.PlayUrl;
              } else if (vm.GroupName === 'MWG' | vm.GroupName === 'PNG' | vm.GroupName === 'RTG'| vm.GroupName === 'AG') {
                if (this.isMobile) {
                  window.location.href = res.data.data.PlayUrl;
                } else {
                  window.location.href = `/im.html?PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
                }
              } else {
                console.log(res.data.data.PlayUrl);
                window.location.href = `/im.html?PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
              }
            }, 300);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gameLoginFree(payload) {
      const vm = this;
      axios.post(`${process.env.VUE_APP_GAMEHOST}/Game_Page/Login/`, payload)
        .then((res) => {
          if (res.data.status === 0) {
            // vm.gameErrorShow = true;
          } else if (res.data.status === 1) {
            setTimeout(() => {
              // //////// 注意這是試玩的開啟方式 //////////////////////////////
              // //////// 以下是廠商注意事項 ///////////////////////////////////
              // PT  PG  PP 有各自的另開頁面的方式
              // TTG WG AMG RT GG MG (LE KY VG) 均屬跳轉IM頁面
              // MWG  PNG RTG  均屬跳轉IM頁面 但須判斷是不是手機方式
              // VT 需另開頁面
              // 其他廠商均屬跳轉IM頁面
              // (LE KY VG) 這三家方式略微不同請注意
              // //////////////////////////////////////////////////////////
              // //////////////////////////////////////////////////////////
              if (vm.GroupName === 'PT') {
                if (vm.H5Game === 1 || vm.H5Game === '1') {
                  const { GameAccount } = res.data.data;
                  const { Password } = res.data.data;
                  window.location.href = `/pth5.html?GameAccount=${GameAccount}&GamePassword=${Password}&PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}&PlayFree=true`;
                } else {
                  const { GameAccount } = res.data.data;
                  const { Password } = res.data.data;
                  window.location.href = `/pt.html?PTID=${GameAccount}&PTPASSWORD=${Password}&PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}&PlayFree=true`;
                }
              } else if (vm.GroupName === 'PG') {
                window.location.href = `/pg.html?PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}&PlayFree=true`;
              } else if (vm.GroupName === 'PP') {
                const { S } = res.data.data;
                const { SelectedLanguage } = res.data.data;
                window.setCookie(`${S}`, `${SelectedLanguage}`);
                window.location.href = `/pp.html?SelectedLanguage=${SelectedLanguage}&S=${S}&PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}&PlayFree=true`;
              } else if (vm.GroupName === 'TTG' | vm.GroupName === 'WG' | vm.GroupName === 'AWG' | vm.GroupName === 'RT' | vm.GroupName === 'GG' | vm.GroupName === 'MG' | vm.GroupName === 'LE' | vm.GroupName === 'KY' | vm.GroupName === 'VG' | vm.GroupName === 'VT') {
                window.location.href = res.data.data.PlayUrl;
              } else if (vm.GroupName === 'MWG' | vm.GroupName === 'PNG' | vm.GroupName === 'RTG') {
                if (this.isMobile) {
                  window.location.href = res.data.data.PlayUrl;
                } else {
                  window.location.href = `/im.html?PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}`;
                }
              } else {
                window.location.href = `/im.html?PlayUrl=${encodeURIComponent(res.data.data.PlayUrl)}&PlayFree=true`;
              }
            }, 300);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }
    if (this.$route.query.token) {
      window.localStorage.setItem('JWT_TOKEN', this.$route.query.token);
      this.GroupName = this.$route.query.GroupName;
      this.H5Game = this.$route.query.H5Game;
      this.GamePlay = this.$route.query.GamePlay;
      const payload = {};
      payload.GameId = this.$route.query.GameId;
      payload.UserId = this.$route.query.UserId;
      payload.GamePlay = this.$route.query.GamePlay;
      payload.GroupId = this.$route.query.GroupId;
      if (this.$route.query.GamePlay === 0 || this.$route.query.GamePlay === '0') {
        const payload = {};
        payload.GameId = this.$route.query.GameId;
        payload.GroupId = this.$route.query.GroupId;
        payload.Machine = this.$route.query.Machine;
        this.gameLoginFree(payload);
      } else {
        const payload = {};
        payload.GameId = this.$route.query.GameId;
        payload.UserId = this.$route.query.UserId;
        payload.GamePlay = this.$route.query.GamePlay;
        payload.GroupId = this.$route.query.GroupId;
        payload.Machine = this.$route.query.Machine;
        this.gameLogin(payload);
      }
    }
    if (window.localStorage.JWT_TOKEN_Overdue) {
      window.localStorage.removeItem('JWT_TOKEN_Overdue');
      window.location = `${process.env.VUE_APP_tgHOST}/login`;
    }
  },
};
</script>
<style scoped>
.gamaPage{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(286deg, #0088da, #0050b3);
}
.loadingIocn{
  color: #fff;
  font-size: 24px;
}
.loadingWording{
  color: #fff;
}
</style>
