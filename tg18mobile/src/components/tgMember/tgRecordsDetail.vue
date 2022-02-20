<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			section
				.memberhistorydetail
					.memberhistorydetail_bonus(v-if="MemberShowDetailData.Type == 0 || MemberShowDetailData.Type == 3")
						.memberhistorydetail_icon_sucess(v-if="MemberShowDetailData.Type == 0 || MemberShowDetailData.Data.StateCode == 3")
						.memberhistorydetail_icon_wait(v-if="MemberShowDetailData.Data.StateCode == 1 || MemberShowDetailData.Data.StateCode == 2")
						.memberhistorydetail_icon_cancel(v-if="MemberShowDetailData.Data.StateCode == 4")
						.memberhistorydetail_caption
							h1(v-if="MemberShowDetailData.Type == 0 || MemberShowDetailData.Data.StateCode == 3") 交易成功
							h1(v-if="MemberShowDetailData.Data.StateCode == 2") 交易申请
							h1(v-if="MemberShowDetailData.Data.StateCode == 1") 交易审核中
							h1(v-if="MemberShowDetailData.Data.StateCode == 4") 交易失败
						// 交易內容資訊
						.memberhistorydetail_content
							ul
								li 交易单号
									span {{MemberShowDetailData.Data.ReferSn}}
								li(v-if="MemberShowDetailData.Data.ModifyType == 1 || MemberShowDetailData.Data.ModifyType == 5 || MemberShowDetailData.Data.ModifyType == 6 || MemberShowDetailData.Data.ModifyType == 101 || MemberShowDetailData.Data.ModifyType == 103") 交易渠道
									span {{ MemberShowDetailData.Data.ChannelName }}
								li(v-if="MemberShowDetailData.Data.ModifyType == 2 || MemberShowDetailData.Data.ModifyType == 3 || MemberShowDetailData.Data.ModifyType == 4 || MemberShowDetailData.Data.ModifyType == 102") 交易类型
									span(v-if="MemberShowDetailData.Data.ModifyCash < 0") 中心钱包 -> {{ MemberShowDetailData.Data.ChannelName }}
									span(v-if="MemberShowDetailData.Data.ModifyCash > 0") {{ MemberShowDetailData.Data.ChannelName }} -> 中心钱包 
								li 日期时间
									span {{MemberShowDetailData.Data.Create_At}}
								li 交易金额
									span ¥ {{ Math.abs(MemberShowDetailData.Data.ModifyCash).toFixed(2) | commaFormat}}
								li 交易前钱包金额
									span ¥ {{ MemberShowDetailData.Data.OldCash | commaFormat}}
								li 交易後钱包金额
									span ¥ {{ MemberShowDetailData.Data.NewCash | commaFormat}}
						form
							.memberhistorydetail_btn(@click="back(MemberShowDetailData.Type)") 返回记录

					.memberhistorydetail_bonus(v-if="MemberShowDetailData.Type == 1 || MemberShowDetailData.Type == 2")
						// 交易狀態圖示
						// 交易成功
						.memberhistorydetail_icon_sucess(v-if="MemberShowDetailData.Data.StateCode == 1")
						// 交易审核中
						.memberhistorydetail_icon_wait(v-if="MemberShowDetailData.Data.StateCode == 0 || MemberShowDetailData.Data.StateCode == 2")
						// 交易失败
						.memberhistorydetail_icon_cancel(v-if="MemberShowDetailData.Data.StateCode == 3")
						// 交易結果
						.memberhistorydetail_caption
							h1(v-if="MemberShowDetailData.Data.StateCode == 0") 交易申请
							h1(v-if="MemberShowDetailData.Data.StateCode == 1") 交易成功
							h1(v-if="MemberShowDetailData.Data.StateCode == 2") 交易处理
							h1(v-if="MemberShowDetailData.Data.StateCode == 3") 交易失败
						// 交易內容資訊
						.memberhistorydetail_content
							ul
								li 交易单号
									span {{MemberShowDetailData.Data.OrderId}}
								li 交易类型
									span(v-if="MemberShowDetailData.Data.PayType == 1") 存款交易
									span(v-if="MemberShowDetailData.Data.PayType == 2") 提款交易
								li 日期时间
									span {{MemberShowDetailData.Data.Create_At}}
								li 交易渠道
									span {{MemberShowDetailData.Data.ChannelName}}
								li 交易金额
									span ¥ {{MemberShowDetailData.Data.Amount | commaFormat}}
								li(v-if="MemberShowDetailData.Type == 2 && MemberShowDetailData.Data.StateCode == 3") 交易备注
									.memberdetail_not {{MemberShowDetailData.Data.Note}}
						form
							.memberhistorydetail_btn(@click="back(MemberShowDetailData.Type)") 返回记录

								// 異動類型:1:"存款" 2:"轉進" 3:"返水" 4:"救援金" 5:"紅利" 6:"提款失敗回款" 7:"手动上分" 101:"提款處理中" 102:"轉出" 103:"提款成功" 104:"用户异常扣除"
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgError from '@/components/tgError/tgError.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      showData: '',
    };
  },
  components: {
    tgFix,
    tgSmNavi,
    tgError,
    tgFooter,
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberRecords',
      'MemberShowDetailData',
    ]),
  },
  methods: {
    back(type) {
      router.push({
        name: 'records',
        query: {
          type: type + 1,
        },
        params: {
          switch: 0,
        },
      });
    },
  },
  mounted() {
    if (this.MemberShowDetailData.Type === undefined) {
      router.push({
        name: 'records',
        query: {
          type: 1,
        },
        params: {
          switch: 0,
        },
      });
    }
  },
};
</script>
<style lang="scss" scoped>

</style>
