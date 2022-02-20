<template lang='pug'>
  .container-fluid.slotGamesContainer
    .container
      .row
        .slotPromotion(v-if='PromotionsList')
          h2.mt-5.mb-5 {{PromotionsList[0].PromotionsName}}
          p(v-html='$options.filters.unescape(PromotionsList[0].LinkContent)')
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      PromotionsList: '',
    };
  },
  methods: {},
  computed: {
    getUrlID() {
      return this.$route.params.id;
    },
    getDialogMessage() {
      return this.$store.state.promotion.DialogMessage;
    },
  },
  filters: {
    unescape(html) {
      return html
        .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    },
  },
  mounted() {
    const vm = this;
    const path = this.$route.path.split('/');
    const parHash = path[2];
    const payload = {};
    payload.Sn = parHash;
    axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PromotionsList`, payload)
      .then((res) => {
        vm.PromotionsList = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss" scoped>
  .slotPromotion{
    padding: 20px 0;
    min-height:400px;
  }
</style>
