<template lang="pug">
  .text-center
    img.mb-4(:src="img_playgame_step1", alt="alt" width="90%")
    img.mb-4(:src="img_playgame_step2", alt="alt" width="90%")
    img.mb-4(:src="img_playgame_step3", alt="alt" width="90%")
    img.mb-4(:src="img_playgame_step4", alt="alt" width="90%")
    img.mb-4(:src="img_playgame_step5", alt="alt" width="90%")
</template>

<script>
export default {
  data() {
    return {
      img_playgame_step1: `${process.env.VUE_APP_STATIC}/img/playgame_step1.jpg`,
      img_playgame_step2: `${process.env.VUE_APP_STATIC}/img/playgame_step2.jpg`,
      img_playgame_step3: `${process.env.VUE_APP_STATIC}/img/playgame_step3.jpg`,
      img_playgame_step4: `${process.env.VUE_APP_STATIC}/img/playgame_step4.jpg`,
      img_playgame_step5: `${process.env.VUE_APP_STATIC}/img/playgame_step5.jpg`,
    };
  },
};
</script>
