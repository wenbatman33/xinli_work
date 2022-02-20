<template lang='pug'>
.container-fluid
	el-date-picker.DatePicker(
								v-if='MemberShowDatePicker == true' 
								v-model="DateRange" 
								type="daterange" 
								range-separator="~" 
								start-placeholder="开始日期" 
								end-placeholder="结束日期" 
								value-format="yyyy-MM-dd"
								:picker-options="pickerOptions"
								@change="(value) => changeHandler(value)")
	ul(v-for="(mainItem, mainIndex) in showMemberRecords")
		.memberhistory_date {{mainIndex.split('-')[0]}} 年 {{mainIndex.split('-')[1]}} 月
		li(v-for="item in mainItem")
			a(@click="goDetail(item)")
				.list_deposit(v-if="item.ModifyType == 1")
				// 提icon
				.list_withdrawal(v-if="item.ModifyType == 6 || item.ModifyType == 101 || item.ModifyType == 103")
				// 转icon
				.list_transfer(v-if="item.ModifyType == 2 || item.ModifyType == 102")
				// 红icon
				.list_bonus(v-if="item.ModifyType == 3 || item.ModifyType == 4 || item.ModifyType == 5 || item.ModifyType == 7 || item.ModifyType == 104")
				.memberhistory_info
					.memberhistory_caption
						// 日期
						h1 {{ item.Create_At }}
						// 异动金额
						.change_amount(v-if="item.ModifyCash >= 0") ¥ {{ item.ModifyCash | commaFormat }}
						.change_amount_r(v-else) ¥ {{ item.ModifyCash | commaFormat }}
					.memberhistory_content
						// 交易渠道
						h1 {{ item.ChannelName }}
						// 新金额
						h2 ¥ {{ item.NewCash | commaFormat }}
	form(v-if="MemberRecords.MemberCashLog.data_list")
		.memberhistory_btn(v-if="MemberRecords.MemberCashLog.data_list.length < MemberRecords.MemberCashLog.total_rows" @click="getMore") 显示更多纪录
	tgNoResult.tgError(v-if='Object.keys(showMemberRecords).length <= 0')
	// 異動類型:1:"存款" 2:"轉進" 3:"返水" 4:"救援金" 5:"紅利" 6:"提款失敗回款" 7:"手动上分" 101:"提款處理中" 102:"轉出" 103:"提款成功" 104:"用户异常扣除"

</template>
<script>
import tgNoResult from '@/components/tgError/tgNoResult.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import router from '@/router/router';
import moment from 'moment';

export default {
  components: {
    tgNoResult,
  },
  data() {
    return {
      currentPages: 1,
      EndDate: '',
      StartDate: '',
      DateRange: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() + (30 * 24 * 60 * 60 * 1000) || time.getTime() < (Date.now() - (180 * 24 * 60 * 60 * 1000));
        },
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberRecords',
      'MemberShowDatePicker',
    ]),
    showMemberRecords() {
      const tempArr = {};
      if (this.MemberRecords.MemberCashLog.data_list !== undefined) {
        this.MemberRecords.MemberCashLog.data_list.forEach((item, index, array) => {
          const tempM = `${item.Create_At.split(' ')[0].split('-')[0]}-${item.Create_At.split(' ')[0].split('-')[1]}`;
          if (tempArr[tempM] === undefined) {
            tempArr[tempM] = [];
          }
          tempArr[tempM].push(item);
        });
      }
      return tempArr;
    },
    getSwitch() {
      return this.$route.params.switch;
    },
  },
  methods: {
    changeHandler(value) {
      if (this.DateRange) {
        if (this.DateRange.length > 0) {
          this.currentPages = 1;
          this.getAPI();
        }
      }
    },
    getAPI() {
      if (this.UserId) {
        const payload = { 
          UserId: this.UserId,
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: false,
        };
        this.$store.dispatch('member/MemberGetCashLog_All', payload);
      }
    },
    getMore() {
      if (this.UserId) {
        this.currentPages += 1;
        const payload = { 
          UserId: this.UserId,
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: true,
        };
        this.$store.dispatch('member/MemberGetCashLog_All', payload);
      }
    },
    goDetail(val) {
      const payload = {};
      payload.Data = val;
      payload.Type = 0;
      this.$store.commit('member/setMemberShowDetail', payload);
      router.push('/member/recordsdetail');
    },
  },
  mounted() {
    if (this.MemberRecords.MemberCashLog.data_list === undefined || this.getSwitch === 1 || this.getSwitch === '1') {
      const EndDateFormated = moment().format('YYYY-MM-DD');
      const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
      this.DateRange = [];
      this.DateRange.push(StartDateFormated);
      this.DateRange.push(EndDateFormated);
      this.getAPI();
    } else {
      this.DateRange = [];
      this.DateRange.push(this.MemberRecords.MemberCashSearchDate.Date_S);
      this.DateRange.push(this.MemberRecords.MemberCashSearchDate.Date_E);
      this.currentPages = this.MemberRecords.MemberCashLog.data_list.length / 30;
    }
    this.$store.state.member.MemberShowDatePicker = true;
  },
};
</script>
<style lang="scss">

</style>
