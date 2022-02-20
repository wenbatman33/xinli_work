<template lang='pug'>
.navi#navi(:class='{"naviOpen": navOpen }')
  .collapseBtn(@click='collapseHandle')
    i.fas.fa-bars
  .d-flex.flex-column.justify-content-between.align-items-center.naviInner
    .top
      .unLogin(v-if='!memberLogined')
        el-tooltip(effect='dark',content='注册',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row(@click='openRegisterDialog', :class='{"naviButtonOpen": navOpen }') 
            .icon
              i.fas.fa-user-plus
            .des 
              span 注册
        el-tooltip(effect='dark',content='登录',placement='right',:disabled='navOpen', :open-delay='300')
          .naviButton.d-flex.flex-row#loginBtn(@click='openLoginDialog', :class='{"naviButtonOpen": navOpen }') 
            .icon
              i.fas.fa-sign-in-alt
            .des 
              span 登录
      .userStatus(v-else)
        .row.p-2
          div(:class='[navOpen ? "col-5": "col-12"] ')
            .userAvatar.mx-2.my-1
              router-link(to='/my/personal', @click.native='clickAvatar')
                img(:src='memberPofilePicture')
          div.pt-2(:class='[navOpen ? "col-7": "col-12"] ')
            .userName {{PersonalDetail.memberAccount}}
            .logOut.my-2(v-if='navOpen', @click='logOut') 登出
        .row.px-2
          .col-12
            .userWallet.my-2(v-if='memberWallet!=null', @click='openDepositDialog') ¥ {{ (memberWallet.cash + memberWallet.gameCash)| commaFormat}}
              .dot(v-if='(memberWallet.cash + memberWallet.gameCash)<=0')
          .col-12
            //- 梦工厂点数
            .userDW_fund.my-2(v-if='memberWallet!=null', @click='gotoCastle') 
              i.fas.fa-chess-knight.mr-2
              span {{memberWallet.point | commaFormatDefault}}
      el-tooltip(effect='dark',content='每日签到',placement='right',:disabled='navOpen', :open-delay='300')
        .naviButton.signatureButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoSignature')
          .icon
            i.fas.fa-calendar-check
          .des 
            span 每日签到
      el-tooltip(effect='dark',content='梦之城',placement='right',:disabled='navOpen', :open-delay='300')
        .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoCastle')
          .icon
            i.fab.fa-fort-awesome
          .des 
            span 梦之城
      el-tooltip(effect='dark',content='优惠活动',placement='right',:disabled='navOpen', :open-delay='300')
        .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoPromotion')
          .icon
            i.fas.fa-gift
          .des 
            span 优惠活动
      el-tooltip(effect='dark',content='代理',placement='right',:disabled='navOpen', :open-delay='300')
        .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoAgent')
          .icon
            i.fas.fa-user-friends
          .des 
            span 代理
      el-tooltip(effect='dark',content='App下载',placement='right',:disabled='navOpen', :open-delay='300')
        .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='gotoApp')
          .icon
            i.fas.fa-mobile-alt
          .des 
            span App下载
      el-tooltip(effect='dark',content='在线客服',placement='right',:disabled='navOpen', :open-delay='300')
        .naviButton.d-flex.flex-row(:class='{"naviButtonOpen": navOpen }', @click='openChat')
          .icon
            i.fas.fa-headset
          .des 
            span 在线客服
    .sub
      router-link(to='/', @click.native='clickLogo')
        .logo.my-3
          img(:src='logo_dreamwork')
      //- el-button(@click='darkModechange', round, size='mini') 切换模式
</template>
<script>
import router from '@/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      megaMenuVisible: [],
      userSettingVisible: false,
      logo_dreamwork: `${window.CDN_ASSETS}/static/img/dw/logo_dreamwork.png`,
    };
  },
  computed: {
    ...mapState('userSetting', ['darkMode', 'navOpen']),
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
    collapseHandle() {
      if (this.navOpen === false) {
        this.$store.commit('userSetting/setNavOpen', true);
      } else {
        this.$store.commit('userSetting/setNavOpen', false);
      }
    },
    openLoginDialog() {
      this.$matomo_navi_login();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
    },
    openRegisterDialog() {
      this.$matomo_navi_register();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Register' });
    },
    gotoCastle() {
      this.$store.commit('userSetting/setNavOpen', false);
      if (this.memberLogined) {
        this.$matomo_navi_gastle();
        // window.location.href = 'http://'window.CASTLEDOMAIN;
        window.location.replace(window.CASTLEDOMAIN);
      } else {
        this.openLoginDialog();
      }
    },
    gotoSignature() {
      this.$store.commit('userSetting/setNavOpen', false);
      this.$matomo_navi_signature();
      window.location.replace(`${window.CASTLEDOMAIN}/signature`);
    },
    gotoPromotion() {
      this.$store.commit('userSetting/setNavOpen', false);
      this.$matomo_navi_promtion();
      this.$router.push({ path: '/promotion' });
    },
    gotoAbout() {
      this.$store.commit('userSetting/setNavOpen', false);
      this.$matomo_navi_about();
      this.$router.push({ path: '/about' });
    },
    gotoApp() {
      if (this.$route.path === '/') {
        window.document.getElementById('mainContent').scrollTop = 822;
      } else {
        this.$router.push({ path: '/#app' }).catch((err) => {});
      }
      this.$matomo_navi_app();
      this.$store.commit('userSetting/setNavOpen', false);
    },
    gotoAgent() {
      if (this.memberLogined) {
        this.$matomo_navi_agent();
        this.$router.push({ path: '/agency' });
      } else {
        this.openLoginDialog();
      }
    },
    logOut() {
      this.$store.commit('userSetting/setNavOpen', false);
      this.$matomo_navi_logout();
      this.$router.push({ path: '/' });
      this.$store.dispatch('member/MemberLogout', '');
    },
    openDepositDialog() {
      this.$router.push({ path: this.$route.fullPath, query: { card: 'bl_Transaction', type: 'deposit' } });
    },
    clickAvatar() {
      this.$matomo_navi_avatar();
    },
    clickLogo() {
      this.$matomo_navi_logo();
    },
    openChat() {
      this.$matomo_navi_livechat();
      window.LC_API.open_chat_window();
    },
  },
};
</script>
<style lang='scss' scoped>
.navi{
  position: fixed;
  z-index: 100;
  top:0;
  box-shadow: 4px 0 10px 0 $balckAlpha_10;
  transition: all 0.3s ease;
  width: 120px;
  height: 100%;
  background: linear-gradient(to top, $DW_ColorDark, $DW_ColorLight);
  .naviInner{
    // padding: 0 10px 10px 10px;
    overflow: hidden;
    width: 100%;
    height: 100%;
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
    transition: all 0.3s ease;
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
      transition: all 0.3s ease;
      font-size: $text-16;
      pointer-events: none;
    }
    a{
      pointer-events: none;
      color: white !important;
    }
  }
  .signatureButton{
    background: $DW_orange;
  }
  .naviButtonOpen{
    width: 210px;
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
    height: 88px;
    border-radius: 100%;
    overflow: hidden;
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
    .dot{
      position: absolute;
      top: 8px;
      right: 16px;
      width: 8px;
      height: 8px;
      border-radius: 16px;
      background: red
    }
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
  }
}
.naviOpen{
  position: fixed;
  width: 234px;
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
