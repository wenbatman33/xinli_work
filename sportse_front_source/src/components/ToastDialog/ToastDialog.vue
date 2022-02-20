<template lang='pug'>
.toastDialog
  .overlayer(@click='closeDialog')
  .closeBar(@click='closeDialog')
  .card
    .cardTitle 
      .container {{ToastTitle}}
    .cardComponent
      component(:is='CardComponent')
</template>

<script>
import { mapState } from 'vuex';
import BettingCard from '@/components/ToastDialog/BettingCard.vue';
import BettingLogDetail from '@/components/ToastDialog/BettingLogDetail.vue';
import TransactionLogDetail from '@/components/ToastDialog/TransactionLogDetail.vue';
import MyNameCard from '@/components/ToastDialog/MyNameCard.vue';
import MyPhoneCard from '@/components/ToastDialog/MyPhoneCard.vue';
import MyPasswordCard from '@/components/ToastDialog/MyPasswordCard.vue';
import MyBankCard from '@/components/ToastDialog/MyBankCard.vue';

export default {
  components: {
    BettingCard,
    BettingLogDetail,
    TransactionLogDetail,
    MyNameCard,
    MyPhoneCard,
    MyPasswordCard,
    MyBankCard,
  },
  computed: {
    ...mapState('dialog', ['CardComponent', 'ToastTitle']),
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('dialog/closeToastDialog');
    },
  },
};
</script>

<style lang='scss' scoped>
.toastDialog {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 300;
  .overlayer{
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.8;
    width: 100vw;
    height: 100vh;
  }
  .closeBar{
    position: relative;
    margin: auto auto;
    background: white;
    border-radius: 8px ;
    width: 100px;
    height: 4px;
    top:13.5vh;
    animation-name: toastBar;
    animation-duration: .3s;
  }
  .card {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100vw;
    height: 85vh;
    bottom: 0;
    left: 0;
    overflow: auto;
    border-radius: 8px 8px 0 0;
    background-color: white;
    animation-name: toast;
    animation-duration: .3s;
    .cardTitle{
      position: fixed;
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: white;
      z-index: 2;
      border-radius: 8px 8px 0 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .cardComponent{
      flex-grow: 1;
      margin-top: 48px;
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
@keyframes toastBar{
  from{
    top:1000px;
  }
  to{
    top:13.5vh;
  }
}
@keyframes toast{
  from{
    bottom:-1000px;
  }
  to{
    bottom:0px;
  }
}
</style>
