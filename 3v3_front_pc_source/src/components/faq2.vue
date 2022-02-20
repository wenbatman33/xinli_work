<template lang="pug">
  .text-center
    img.mb-4(:src="img_withdraw_step1", alt="alt" width="90%")
    img.mb-4(:src="img_withdraw_step2", alt="alt" width="90%")
</template>

<script>
export default {
  data() {
    return {
      img_withdraw_step1: `${process.env.VUE_APP_STATIC}/img/withdraw_step1.jpg`,
      img_withdraw_step2: `${process.env.VUE_APP_STATIC}/img/withdraw_step2.jpg`,
    };
  },
};
</script>
