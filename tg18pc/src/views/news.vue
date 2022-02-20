<template lang="pug">
  .container-fluid
    tgNavi
    tgNews
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgNews from '@/components/tgNews/tgNews.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  components: {
    tgNavi,
    tgNews,
    tgFooter,
  },
  mounted() {
    const payload = {};
    payload.GroupId = '';
    payload.NowTime = 1;
    
    const payloadGroup = {};
    payloadGroup.GroupId = '';
    payloadGroup.NowTime = 1;
    payloadGroup.Status = 1;

    this.$store.dispatch('news/NewsList', payload);
    this.$store.dispatch('news/NewsGroup', payloadGroup);
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
