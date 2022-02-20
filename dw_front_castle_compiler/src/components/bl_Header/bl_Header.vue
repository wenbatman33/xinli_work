<template lang='pug'>
.header.d-flex.flex-row.justify-content-between
  div
    .mobileLogo.text-center(@click='back')
      img(:src='logoImg')
  div.d-flex.flex-row.pr-3
    router-link(to='/oder', @click.native='$matomo_header_oder')
      .headerBtn.text-white
        el-badge(:value='12', class='badge', hidden)
          i.fas.fa-user
    router-link(v-if='goodsCartList.length>0', to='/cart', @click.native='$matomo_header_cart')
      .headerBtn.text-white
        el-badge(:hidden='goodsCartList.length<=0', :value='goodsCartList.length', class='badge')
          i.fas.fa-shopping-cart
    .headerBtn.text-white(v-else)
      el-badge(:hidden='goodsCartList.length<=0', :value='goodsCartList.length', class='badge')
        i.fas.fa-shopping-cart
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      logoImg: `${window.CDN_ASSETS}/static/img/footer_logo.png`,
    };
  },
  computed: {
    ...mapState('shopping', ['goodsCartList']),
    ...mapState('wallet', ['memberWallet']),
    ...mapState('index', ['MAINDOMAIN']),
  },
  methods: {
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
      setTimeout(() => {
        window.location.href = this.MAINDOMAIN;
      }, 500);
      // this.$router.push({ path: '/'}).catch((err) => {});
    },
  },
};
</script>
<style lang='scss' scoped>
.header{
  position: fixed;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background-color: $balckAlpha_40;
  z-index: 2;
  @include media_xs{
    background-image: linear-gradient(to right, $DW_ColorDark, $DW_ColorLight);
  }
  @include media_sm{
    background-image: linear-gradient(to right, $DW_ColorDark, $DW_ColorLight);

  }
  @include media_md{
    background-image: linear-gradient(to right, $DW_ColorDark, $DW_ColorLight);
  }
  @include media_lg{
    background-image: none;
  }
  @include media_xl{
    background-image: none;
  }
  .headerBtn{
    position: relative;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    /deep/.el-badge{
      sup{
        position: absolute;
        right: 2px !important;
        top: 8px !important;
      }
    }
  }
}
.mobileLogo{
  margin-left: 50px;
  margin-top: 6px;
  img{
    width: 100px;
  }
  cursor: pointer;
  @include media_lg{
    display: none;
  }
  @include media_xl{
    display: none;
  }
}
</style>