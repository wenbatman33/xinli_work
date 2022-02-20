<template lang="pug">
  .text-center
    img.mb-4(:src="img_register_step1", alt="alt" width="90%")
    img.mb-4(:src="img_register_step2", alt="alt" width="90%")
    img.mb-4(:src="img_register_step3", alt="alt" width="90% ")
</template>

<script>
export default {
  data() {
    return {
      img_register_step1: `${process.env.VUE_APP_STATIC}/img/register_step1.jpg`,
      img_register_step2: `${process.env.VUE_APP_STATIC}/img/register_step2.jpg`,
      img_register_step3: `${process.env.VUE_APP_STATIC}/img/register_step3.jpg`,
    };
  },
};
</script>
