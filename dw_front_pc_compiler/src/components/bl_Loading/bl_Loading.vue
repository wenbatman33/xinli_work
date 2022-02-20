<template lang="pug">
.globalLoading.d-flex.justify-content-center.align-items-center
  .loading.d-flex.justify-content-between.align-items-center
    .bounce1
    .bounce2
    .bounce3
    .bounce4
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('index', [
      'globalLoading',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.globalLoading{
  position: fixed;
  top: 0;
  left:0;
  width: 100vw;
  height: 100vh;
  background: $balckAlpha_00;
  z-index:99999;
  .loading{
    width: 120px;
    height: 120px;
    div {
      width: 16px;
      height: 16px;
      background-color: $DW_ColorDark;
      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }
    .bounce1 {
      background-color: $DW_yellow;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .bounce2 {
      background-color: $DW_greenMiddle;
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
    .bounce3 {
      background-color: $DW_sky_1;
      -webkit-animation-delay: -0.08s;
      animation-delay: -0.08s;
    }  
  }
}
@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .globalLoading{
    .loading{
      div {background-color: $L_DW_ColorDark;}
      .bounce1 {background-color: $L_DW_yellow;}
      .bounce2 {background-color: $L_DW_greenMiddle;}
      .bounce3 {background-color: $L_DW_sky_1;}  
    }
  }
}
</style>
