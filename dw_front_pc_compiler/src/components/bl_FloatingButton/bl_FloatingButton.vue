<template lang="pug">
.floating.d-flex.flex-column.justify-content-center
  .transactionlog#transactionlog(@click='openDepositDialog')
    img(:src='transactionlogImg', :srcset='transactionlogImg2x+" 2x, "+transactionlogImg3x+" 3x"')
</template>
<script>
import router from '@/router';

export default {
  data() {
    return {
      floatingButtonHide: false,
      transactionlogImg: `${window.CDN_ASSETS}/static/img/transactionlog.png`,
      transactionlogImg2x: `${window.CDN_ASSETS}/static/img/transactionlog@2x.png`,
      transactionlogImg3x: `${window.CDN_ASSETS}/static/img/transactionlog@3x.png`,
    };
  },
  methods: {
    openDepositDialog() {
      this.$matomo_navi_transactionlog();
      this.$router.push({ path: this.$route.fullPath, query: { card: 'bl_Transaction', type: 'deposit' } });
    },
    openWithdrawDialog() {
      this.$router.push({ path: this.$route.fullPath, query: { card: 'bl_Transaction', type: 'withdraw' } });
    },
    gotoBonus() {
      router.push({ path: '/my/mypromotion' }).catch((err) => {});
    },
    gotoBetting() {
      router.push({ path: '/my/betting' }).catch((err) => {});
    },
    gotoTransaction() {
      router.push({ path: '/my/transactionlog' }).catch((err) => {});
    },
    backTop() {
      this.floatingButtonHide = !this.floatingButtonHide;
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  beforeDestroy() {
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.floating{
  position: fixed;
  top: 465px;
  right: 0px;
  width: 172px;
  height: auto;
  opacity: 0.92;
  z-index: 300;
  .floatingButton{
    cursor: pointer;
    text-align: center;
    color: white;
    width: 172px;
    height: 66px;
    line-height: 48px;
    font-size: 20px;
  }
  .transactionlog{
    cursor: pointer;
    width: 180px;
    height: 64px;
    animation-duration: 3s;
    animation-name: shake;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    &:hover{
      margin-top: -5px;
    }
  }
}
@keyframes shake {
  0% {
    transform: translateY(0);
  }
  47% {
    transform: translateY(0);
  }
  48% {
    transform: translateY(-10px);
  }
  52% {
    transform: translateY(0);
  }
  56% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}

</style>

