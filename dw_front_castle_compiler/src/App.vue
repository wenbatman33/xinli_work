<template  lang="pug">
.BLOCK(v-if='memberLogined !== "notYet"')
  bl_Navi
  .BG.mainDarkBG
  .container-fluid.h-100
    bl_Header
    .mainContent#mainContent
      transition(name='fade' mode='out-in')
        router-view
      bl_Footer
  router-view(name='maintainRouterView')
  bl_Loading(v-if='globalLoading')
</template>
<script>
import axios from 'axios';
import bl_Navi from '@/components/bl_Navi/bl_Navi.vue';
import bl_Header from '@/components/bl_Header/bl_Header.vue';
import bl_Footer from '@/components/bl_Footer/bl_Footer.vue';
import bl_Loading from '@/components/bl_Loading/bl_Loading.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_Navi,
    bl_Header,
    bl_Footer,
    bl_Loading,
  },
  name: 'App',
  computed: {
    ...mapState('index', [
      'globalLoading',
    ]),
    ...mapState('member', [
      'memberLogined',
    ]),
  },
  methods: {
    checkShoppingCartTime(){
      if(window.localStorage.CARTTIME && (Date.now() - window.localStorage.CARTTIME) >= (1000 * 60 * 5 )){
        window.localStorage.removeItem(`CART_${window.localStorage.LC_API_ID}`);
        window.localStorage.removeItem('CARTTIME');
      } else if(window.localStorage.CARTTIME && window.localStorage[`CART_${window.localStorage.LC_API_ID}`]){
        // 轉換 window.localStorage CART_個人購物車 至 GoodsCartList'
        this.$store.commit('shopping/setGoodsCartList', JSON.parse(window.localStorage[`CART_${window.localStorage.LC_API_ID}`]));
      }
    },
    // for appteam methods
    app_gohome() {
      console.log('app_gohome');
    },
    app_service() {
      console.log('app_service');
    },
    
  },
  mounted() {
    // for appteam methods
    window.app_gohome = this.app_gohome;
    window.app_service = this.app_service;
    
    const elem = document.getElementById('loadingDiv');
    elem.parentNode.removeChild(elem);

    if (this.$route.query.share_id) {
      // 如果有 share_id 就送API  領取每日分享獎勵
      const payload = { uuid: this.$route.query.share_id };
      this.$store.dispatch('mission/submitTaskShare', payload);
    }
    this.$store.dispatch('member/checkMemberLoginStatus')
      .then((res) => {
        this.checkShoppingCartTime();
      });
  },
};
</script>
<style lang='scss'>
@import './assets/scss/main.scss';
.DWBreadcrumb{
  color: white !important;
  font-size: 14px;
  font-weight: 600;
  a{
    color: white !important;
  }
}

.RWDDIV{
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  text-align: center;
  overflow: hidden;
  .RWDImg{
    position: absolute;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    box-sizing: border-box;
    img{
      position:relative;
      width: 100%;
      margin: auto auto;
      height: auto;
    }
  }
}
@media screen and (max-width: 767px) {
  .el-picker-panel{
    width: 80vw !important;
    .el-picker-panel__body-wrapper{
      width: 80vw !important;
    }
    .el-date-range-picker, 
    .el-picker-panel__body, 
    .el-date-range-picker 
    .el-picker-panel__body  {
      min-width: none !important;
    }
    .el-picker-panel__body{
      display: flex;
      flex-direction: column;
      width: 80vw !important;
      .el-picker-panel__content{
        @media screen and (max-width: 767px) {
          width: 80vw !important;
        }
      }
    }
  }
}
.el-range-separator{
  width: 20px !important;
}
</style>
