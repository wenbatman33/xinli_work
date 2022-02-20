<template lang='pug'>
	section
		.promotions
			.promotionsdetail(v-if="PromotionsList != null")
				.promotionsdetail_img
					img(:src="PromotionsList[0].Images")
				.promotionsdetail_caption {{PromotionsList[0].PromotionsName}}
				.promotionsdetail_content(v-html='$options.filters.unescape(PromotionsList[0].LinkContent)')
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      DialogIMG: this.$store.state.promotion.DialogIMG,
      DialogTitle: this.$store.state.promotion.DialogTitle,
      DialogMessage: this.$store.state.promotion.DialogMessage,
      PromotionsList: null,
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
    const payload = {};
    payload.Sn = this.getUrlID;
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

</style>
