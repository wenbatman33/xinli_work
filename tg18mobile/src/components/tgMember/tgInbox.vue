<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			section
				.memberinbox(v-if='showMemberInboxList.length > 0')
					.memberinbox_list(:data="showMemberInboxList")
						ul
							li(v-for="(item, index) in showMemberInboxList")
								router-link(:class='(item.Status == 0)? "unread" : ""' :to="'/member/inboxdetail/'+item.Sn")
									.memberinbox_info
										// 主题
										.memberinbox_caption
											.icon_unread(v-if="item.Status == 0") new
											//- .icon_unread(v-if="MemberShowInboxDelBtn === false && item.Status == 0") new
											span {{ item.Title }}
										// 日期 & 内文
										.memberinbox_content {{ item.Create_At }}．{{ RemoveHTML(item.Content) }}
								.memberdelete_check(v-if="MemberShowInboxDelBtn === true && showCheckBtn === false")
									i.el-icon-error.check_delete(@click='showCheckBtnFn(true, item.Sn)')
								.memberdelete_check(v-if="showCheckBtn === true && clickSn == item.Sn")
									.check_confirm(@click='deletesInbox(item.Sn)') 确认 
									.check_cancel(@click='showCheckBtnFn(false)') 取消 
						form
							.memberinbox_btn(v-if="showMemberInboxList.length <= 6 && MemberInboxList.data_list.length > 6" @click="showMore()") 显示更多纪录
				tgNoResult(v-else)
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgNoResult from '@/components/tgError/tgNoResult.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgNoResult,
    tgFooter,
  },
  data() {
    return {
      activeName: '1',
      dialogMessage: [],
      inboxList: [],
      showCheckBtn: false,
      clickSn: '',
      showMemberInboxList: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'MemberData',
      'MemberInboxList',
      'MemberShowInboxDelBtn',
      'MemberInboxShowMore',
    ]),
    getUrlID: {
      get() {
        const path = this.$route.path.split('/');
        const parHash = path[3];
        return parHash;
      },
    },
  },
  watch: {
    MemberShowInboxDelBtn(val, oldVal) {
      this.showCheckBtn = false;
    },
    MemberInboxList(val, oldVal) {
      if (this.MemberInboxShowMore === true) {
        this.showMore();
      } else {
        this.filterData();
      }
    },
  },
  methods: {
    RemoveHTML(str) {
      const regEx = /<[^>]*>/g;
      return str.replace(regEx, '');
    },
    handleSelectionChange(val) {
      this.inboxList = val;
    },
    handleCurrentChange(val) {
      this.currentPages = val;
      this.getAPI();
    },
    deletesInbox(Sn) {
      const payload = {};
      payload.Sn = Sn;
      payload.UserName = this.UserName;
      this.$store.dispatch('member/MemberInboxDelete', payload);
      this.showCheckBtn = false;
    },
    showCheckBtnFn(type, Sn = '') {
      this.clickSn = Sn;
      this.showCheckBtn = type;
    },
    getAPI() {
      const vm = this;
      const member = {
        UserName: vm.UserName,
        Page: 1,
        PageLimit: 500,
      };			
      this.$store.dispatch('member/MemberInbox', member);
    },
    showMore() {
      this.showMemberInboxList = this.MemberInboxList.data_list;
      this.$store.state.member.MemberInboxShowMore = true;
    },
    filterData() {
      this.showMemberInboxList = this.MemberInboxList.data_list.filter((item, index, array) => index <= 5);
    },
  },
  mounted() {
    this.activeName = this.getUrlID;
    this.$store.state.member.MemberShowInboxDelBtn = true;
    if (this.MemberInboxList.data_list === undefined) {
      this.getAPI();
    } else if (this.MemberInboxShowMore === true) {
      this.showMore();
    } else {
      this.filterData();
    }
  },
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
	.tgError{
		min-height: 66vh;
		margin-top: 1vh;
	}
</style>
