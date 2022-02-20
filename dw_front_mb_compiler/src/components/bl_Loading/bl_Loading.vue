<template lang="pug">
  .spinnerBg
    .spinner
      .bounce1
      .bounce2
      .bounce3
      .bounce4
</template>

<style lang="scss" scoped>
.spinnerBg {
  width: 100vw;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0);
  z-index: 999;
  position: fixed;
  top: 0;
}

.spinner {
  width: 100%;
  position: fixed;
  top: 35%;
  text-align: center;
}

.spinner > div {
  width: 16px;
  height: 16px;
  background-color: #6B49AA;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  background-color: #F7BA2A;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  background-color: #13CE66;
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.spinner .bounce3 {
  background-color: #20A0FF;
  -webkit-animation-delay: -0.08s;
  animation-delay: -0.08s;
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
