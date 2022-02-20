<template lang='pug'>
.navi#navi(:class='{"naviOpen": navOpen }')
  .collapseBtn(@click='navOpen=!navOpen')
    i.fas.fa-bars
  .d-flex.flex-column.justify-content-between.align-items-center.naviInner
    .top
      .unLogin(v-if='!memberLogined')
        el-tooltip(effect='dark',content='注册',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(@click='gotoRegister', :class='{"naviButtonOpen": navOpen }') 
            .icon
              i.fas.fa-user-plus
            .des
              span 注册
        el-tooltip(effect='dark',content='登录',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(@click='gotoLogin', :class='{"naviButtonOpen": navOpen }') 
            .icon
              i.fas.fa-sign-in-alt
            .des
              span 登录
      .userStatus(v-else)
        .row.p-2
          div(:class='[navOpen ? "col-5": "col-12"] ')
            .userAvatar.mx-2.my-1(@click='gotoMypage')
              img(:src='memberPofilePicture')
          div.pt-2(:class='[navOpen ? "col-7": "col-12"] ')
            .userName {{PersonalDetail.memberAccount}}
            //- .logOut.my-2(v-if='navOpen', @click='logOut') 登出
        .row.px-2
          //- .col-12
          //-   .userWallet.my-2(v-if='memberWallet!=null') ¥ {{ (memberWallet.cash + memberWallet.gameCash)| commaFormat}}
          .col-12
            //- 梦工厂点数
            .userDW_fund.my-2(v-if='memberWallet!=null', @click='gotoOder') 
              i.fas.fa-chess-knight.mr-2
              span {{memberWallet.point | commaFormatDefault}}
      .px-2
        el-tooltip(effect='dark',content='兑换商城',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoIndex')
            .icon
              i.fab.fa-fort-awesome
            .des
              span 兑换商城
        el-tooltip(effect='dark',content='游戏竞猜',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoBet')
            .icon
              i.fas.fa-trophy
            .des
              span 游戏竞猜
        el-tooltip(effect='dark',content='赚梦基金',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoMission')
            .icon
              i.fas.fa-piggy-bank
            .des
              span 赚梦基金
        el-tooltip(effect='dark',content='在线客服',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='liveChat')
            .icon
              i.fas.fa-headset
            .des
              span 在线客服
    .sub
      .logo.my-3(@click='back')
        img(src='/static/img/dw/logo_dreamwork.png')
</template>
<script>
import router from '@/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      navOpen: false,
      megaMenuVisible: [],
      userSettingVisible: false,
    };
  },
  computed: {
    ...mapState('index', ['MAINDOMAIN']),
    ...mapState('userSetting', ['darkMode']),
    ...mapState('member', ['memberLogined', 'PersonalDetail']),
    ...mapState('wallet', ['memberWallet']),
    ...mapState('game', ['gameTypeData']),
    memberPofilePicture() {
      return `${window.CDN_ASSETS}/static/img/memberPofilePicture/avater_${this.PersonalDetail.memberPofilePicture}.png`;
    },
  },
  methods: {
    darkModechange() {
      if (this.darkMode === 0 | this.darkMode === '0') {
        this.$store.commit('userSetting/changeDarkMode', 1);
      } else {
        this.$store.commit('userSetting/changeDarkMode', 0);
      }
    },
    gotoLogin() {
      this.navOpen = false;
      window.location.href = `${this.MAINDOMAIN}/?card=bl_Login&type=account`;
    },
    gotoRegister() {
      this.navOpen = false;
      window.location.href = `${this.MAINDOMAIN}/?card=bl_Register&type=account`;
    },
    gotoMission() {
      this.navOpen = false;
      this.$matomo_navi_mission();
      this.$router.push({ path: '/mission'}).catch((err) => {});
    },
    gotoAbout() {
      this.navOpen = false;
      this.$router.push({ path: '/about'}).catch((err) => {});
    },
    gotoBet() {
      this.navOpen = false;
      this.$matomo_navi_bet();
      this.$router.push({ path: '/bet'}).catch((err) => {});
    },
    gotoIndex() {
      this.navOpen = false;
      this.$matomo_navi_castle();
      this.$router.push({ path: '/'}).catch((err) => {});
    },
    gotoMypage() {
      this.navOpen = false;
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_mypage();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_mypage.postMessage('app_mypage');
        } catch (error) {
          console.log(error);
        }
      }
      setTimeout(() => {
        window.location.href = `${this.MAINDOMAIN}/my/personal`;
      }, 500);
    },
    gotoOder() {
      this.navOpen = false;
      this.$router.push({ path: '/oder'}).catch((err) => {});
    },
    // for appteam methods
    app_gohome() {
      console.log('app_gohome');
    },
    app_service() {
      console.log('app_service');
    },
    back() {
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          window.android.app_gohome();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          window.webkit.messageHandlers.app_gohome.postMessage('app_gohome');
        } catch (error) {
          console.log(error);
        }
      }
      this.navOpen = false;
      this.$matomo_navi_logo();
      console.log(this.MAINDOMAIN)
      setTimeout(() => {
        window.location.href = this.MAINDOMAIN;
      }, 500);
    },
    liveChat() {
      this.$matomo_navi_livechat();
      // eslint-disable-next-line no-undef
      LC_API.open_chat_window();
    },
  },
  mounted() {
    // for appteam methods
    window.app_gohome = this.app_gohome;
    window.app_service = this.app_service;
  },
};
</script>
<style lang='scss' scoped>
.navi{
  position: fixed;
  z-index: 100;
  top:0;
  box-shadow: 4px 0 10px 0 $balckAlpha_10;
  transition: all 0.5s;
  @include media_xs{
    width: 50px;
    height: 50px;
    background: none;
  }
  @include media_sm{
    width: 50px;
    height: 50px;
    background: none;
  }
  @include media_md{
    width: 50px;
    height: 50px;
    background: none;
  }
  @include media_lg{
    width: 120px;
    height: 100%;
    background: linear-gradient(to top, $DW_ColorDark, $DW_ColorLight);
  }
  @include media_xl{
    width: 120px;
    height: 100%;
    background: linear-gradient(to top, $DW_ColorDark, $DW_ColorLight);
  }
  .naviInner{
    // padding: 0 10px 10px 10px;
    overflow: hidden;
    @include media_xs{
      width: 0px;
      height: 0px;
    }
    @include media_sm{
      width: 0px;
      height: 0px;
    }
    @include media_md{
      width: 0px;
      height: 0px;
    }
    @include media_lg{
      width: 100%;
      height: 100%;
    }
    @include media_xl{
      width: 100%;
      height: 100%;
    }
  }
  .logOut{
    cursor: pointer;
    text-align: center;
    width: 108px;
    height: 28px;
    line-height: 28px;
    border-radius: 17px;
    border: solid 1px #ffffff;
    color: white;
    font-size: $text-14;
  }
  .naviButton{
    width: 48px;
    height: 48px;
    color: white;
    cursor: pointer;
    margin: 10px auto;
    line-height: 48px;
    border-radius: 12px;
    background: $balckAlpha_20;
    transition: all 0.5s;
    .icon{
      text-align: center;
      width: 100%;
      height: 48px;
      i{
        margin-top: 10px;
        font-size: 28px;
        pointer-events: none;
      }
    }
    .des{
      text-align: right;
      height: 48px;
      line-height: 48px;
      width: 0%;
      // display: none
    }
    
    span{
      display: none;
      margin-left: 10px;
      transition: all 0.5s;
      font-size: $text-16;
      pointer-events: none;
    }
    a{
      pointer-events: none;
      color: white !important;
    }
  }
  .naviButtonOpen{
    @include media_xs{
      width: 100%;
    }
    @include media_sm{
      width: 100%;
    }
    @include media_lg{
      width: 210px;
    }
    @include media_xl{
      width: 210px;
    }
    .icon{
      display: inline-block;
      text-align: center;
      width: 45%;
      margin: 0 !important;
    }
    .des{
      display: inline-block;
      text-align: left;
      width: 55%;
      margin: 0 !important;
    }
    span{
      display: inline-block;
    }
  }
  .top{
    width: 100%;
    padding-top: 10px;
  }
  .userAvatar{
    width: 88px;
    height: 5074pxpx;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
    background: $gray_ccc;
    img{
      width: 100%;
      // border-radius: 100%;
      height: auto;
    }
  }
  .userName{
    color: white;
    font-size: 12px;
    text-align: center;
  }
  .userWallet{
    color: white;
    font-size: 12px;
    line-height: 28px;
    height: 28px;
    text-align: center;
    border-radius: 16px;
    background: $DW_Color;
    font-size: $text-12;
  }
  .userDW_fund{
    color: white;
    font-size: 12px;
    line-height: 28px;
    height: 28px;
    text-align: center;
    border-radius: 16px;
    background: $DW_greenMiddle;
    font-size: $text-12;
    cursor: pointer;
  }
  .collapseBtn{
    position: absolute;
    cursor: pointer;
    right: -12px;
    top: 10px;
    width: 26px;
    height: 26px;
    border-radius: 100%;
    color: white;
    line-height: 26px;
    text-align: center;
    font-size: $text-12;
    background-color: $DW_ColorDark;
    z-index: 2;
    @include media_xs{
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 10px;
      width: 26px;
      height: 26px;
    }
    @include media_sm{
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 10px;
      width: 26px;
      height: 26px;
    }
    @include media_lg{
      position: absolute;
      cursor: pointer;
      right: -12px;
      top: 10px;
      width: 26px;
      height: 26px;
    }
    @include media_xl{
      position: absolute;
      cursor: pointer;
      right: -12px;
      top: 10px;
      width: 26px;
      height: 26px;
    }
  }
}
.naviOpen{
  @include media_xs{
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, $DW_ColorDark, $DW_ColorLight);
  }
  @include media_sm{
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, $DW_ColorDark, $DW_ColorLight);
  }
  @include media_lg{
    position: fixed;
    width: 234px;
  }
  @include media_xl{
    position: fixed;
    width: 234px;
  }
  .naviInner{
    // padding: 0 10px 10px 10px;
    overflow: hidden;
    @include media_xs{
      width: 100%;
      height: 100%;
    }
    @include media_sm{
      width: 100%;
      height: 100%;
    }
    @include media_lg{
      width: 100%;
      height: 100%;
    }
    @include media_xl{
      width: 100%;
      height: 100%;
    }
  }
}
.logo{
  cursor: pointer;
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .navi{
    background: linear-gradient(to top, $L_DW_blueGrey, $L_DW_slatBlue)!important;
    box-shadow: 4px 0 10px 0 $balckAlpha_10;
    .userWallet{background: $DW_Color;}
    .userDW_fund{background: $L_DW_greenMiddle;}
    .collapseBtn{background-color: $DW_ColorDark;}
  }
}
</style>