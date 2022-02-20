<template lang="pug">
.container-fluid.p-0
  .container
    .row
      .col-12
        bl_BetGastleGame
    .row.mt-3
      .col-7
        bl_Banners
        marquee
      .col-5 
        bl_BetGastleBonus
    .row
      .col-12
        bl_BannerForChannel
    .row
      .col-12
        a#app(ref='app', name='#app')
        section_1
  section_2
  bl_Footer
</template>

<script>
import bl_Banners from '@/components/bl_Banners/bl_Banners.vue';
import bl_BetGastleBonus from '@/components/bl_BetGastleBonus/bl_BetGastleBonus.vue';
import bl_BetGastleGame from '@/components/bl_BetGastleGame/bl_BetGastleGame.vue';
import bl_BannerForChannel from '@/components/bl_BannerForChannel/bl_BannerForChannel.vue';
import marquee from '@/components/bl_Marquee/bl_Marquee.vue';
import section_1 from '@/components/bl_IndexSection/section_1.vue';
import section_2 from '@/components/bl_IndexSection/section_2.vue';
import bl_Footer from '@/components/bl_Footer/bl_Footer.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_Banners,
    bl_BetGastleBonus,
    bl_BetGastleGame,
    bl_BannerForChannel,
    marquee,
    section_1,
    section_2,
    bl_Footer,
  },
  
  mounted() {
    // const payload = { banner_group_id: 1, device: 1, platform: 1 };
    // this.$store.dispatch('index/API_IndexBanner', payload);
  },
};
</script>
<style lang="sass" scoped>

</style>
