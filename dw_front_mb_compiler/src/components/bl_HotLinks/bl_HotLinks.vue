<template lang="pug">
  .hotlinks.mt-2.px-3
    bl_castleBonus
    bl_castleBet
    bl_castleBanner
    appdownload
</template>

<script>
import { mapState } from 'vuex';
import bl_castleBonus from '@/components/bl_HotLinks/bl_castleBonus.vue';
import bl_castleBet from '@/components/bl_HotLinks/bl_castleBet.vue';
import bl_castleBanner from '@/components/bl_HotLinks/bl_castleBanner.vue';
import appdownload from '@/components/bl_HotLinks/appdownload.vue';


export default {
  components: {
    appdownload,
    bl_castleBonus,
    bl_castleBet,
    bl_castleBanner,
  },
};
</script>

<style lang="scss" scoped>
.hotlinks {
  padding-bottom: 70px;
}
</style>
