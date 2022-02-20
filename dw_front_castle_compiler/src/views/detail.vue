<template lang="pug">
.container-fluid
  .container
    bl_GoodDetail
</template>
<script>
import bl_GoodDetail from '@/components/bl_GoodList/bl_GoodDetail.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_GoodDetail,
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
