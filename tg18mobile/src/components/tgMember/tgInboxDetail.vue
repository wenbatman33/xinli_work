<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			section
				.memberinbox
					.memberinbox_detail( v-for='item in getCurrentItem')
						.memberinbox_detail_caption {{ item.Title }}
						.memberinbox_detail_date {{ item.Create_At }}
						.memberinbox_detail_content(v-html='item.Content')
		tgFooter
</template>
<script>
import axios from 'axios';
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgFooter,
  },
  data() {
    return {
      getCurrentItem: '',
    };
  },
  watch: {
    MemberInboxList(val, old) {
      this.filterData();
    },
  },
  methods: {
    getAPI() {
      const vm = this;
      const member = {
        UserName: vm.UserName,
        Page: 1,
        PageLimit: 500,
      };			
      this.$store.dispatch('member/MemberInbox', member);
    },
    filterData() {
      const vm = this;
      this.getCurrentItem = this.MemberInboxList.data_list.filter(x => x.Sn === vm.getUrlID);
    },
    readed() {
      const payload = {};
      payload.Sn = this.getUrlID;
      payload.Status = 1;
      payload.UserName = this.UserName;
      payload.Page = 1;
      payload.PageLimit = 500;
      this.$store.dispatch('member/MemberInboxEdit', payload);
    },
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberInboxList',
    ]),	
    getUrlID() {
      return this.$route.params.id;
    },
  },
  mounted() {
    if (this.MemberInboxList.data_list === undefined) {
      this.getAPI();
    } else {
      this.filterData();
    }
    // 變更已讀取狀態
    this.readed();
  },
};
</script>
<style lang="scss" scoped>

</style>
