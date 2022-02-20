<template lang="pug">
  .text-center
    img.mb-4(:src="img_deposit_step1", alt="alt" width="90%")
</template>

<script>
export default {
  data() {
    return {
      img_deposit_step1: `${process.env.VUE_APP_STATIC}/img/deposit_step1.jpg`,
    };
  },
};
</script>
