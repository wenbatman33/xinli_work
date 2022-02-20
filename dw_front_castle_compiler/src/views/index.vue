<template lang="pug">
.container-fluid.p-0
  bl_Banners
  marquee
  bl_GoodList
</template>

<script>
import bl_Banners from '@/components/bl_Banners/bl_Banners.vue';
import marquee from '@/components/bl_Marquee/bl_Marquee.vue';
import bl_GoodList from '@/components/bl_GoodList/bl_GoodList.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_Banners,
    marquee,
    bl_GoodList,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('shopping', ['goodsList']),
    ...mapState('wallet', ['memberWallet']),
  },
  mounted() {
    const payload = { banner_group_id: 1, device: 1, platform: 3 };
    this.$store.dispatch('index/API_IndexBanner', payload);
  },
};
</script>

<style lang="scss" scoped>

</style>
