<template lang="pug">
  .container-fluid.p-0
    //- tgNavi
    bl_Agency
    //- tgFooter
    Footer
</template>
<script>
import bl_Agency from '@/components/bl_Agency/bl_Agency.vue';
import Footer from '@/components/bl_Footer/bl_Footer.vue';

export default {
  components: {
    bl_Agency,
    Footer
  },
};
</script>
<style lang="scss" scoped>
</style>
