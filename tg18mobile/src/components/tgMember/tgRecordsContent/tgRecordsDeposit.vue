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
			// router-link(:to="{name:'recordsdetail',params: {id: item.Sn, type: 1}}")
			a(@click="goDetail(item)")
				// 存icon
				.list_deposit
				.memberhistory_info
					.memberhistory_caption
						// 日期
						h1 {{ item.SendOrderTime }}
						// 成功状态
						.fettle_success(v-if='item.StateCode==1') {{ formatStatus(item.StateCode) }}
						// 审核中状态
						.fettle_review(v-if='item.StateCode==0 || item.StateCode==2') {{ formatStatus(item.StateCode) }}
						// 失败状态
						.fettle_fail(v-if='item.StateCode==3') {{ formatStatus(item.StateCode) }}
					.memberhistory_content
						// 交易渠道
						h1 {{ item.ChannelName }}
						// 交易金额
						h2 ¥ {{ item.Amount | commaFormat }}
	form(v-if="MemberRecords.MemberDepositLog.data_list")
		.memberhistory_btn(v-if="MemberRecords.MemberDepositLog.data_list.length < MemberRecords.MemberDepositLog.total_rows" @click="getMore") 显示更多纪录
	tgNoResult.tgError(v-if='Object.keys(showMemberRecords).length <= 0')
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
      if (this.MemberRecords.MemberDepositLog.data_list !== undefined) {
        this.MemberRecords.MemberDepositLog.data_list.forEach((item, index, array) => {
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
    formatStatus(value) {  
      const target = this.MemberRecords.MemberDepositOther.StateCode;
      let Status = '';
      Object.keys(target).map((key, index) => {
        if (value === key) {
          Status = target[key];
        }
        return Status;
      });
      return Status;
    },
    getAPI() {
      if (this.UserId) {
        const payload = { 
          UserId: this.UserId,
          Status: 0,
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          PayType: 1,
          more: false,
        };
        this.$store.dispatch('member/MemberGetCashLog_Deposit', payload);
      }
    },
    getMore() {
      if (this.UserId) {
        this.currentPages += 1;
        const payload = { 
          UserId: this.UserId,
          Status: 0,
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          PayType: 1,
          more: true,
        };
        this.$store.dispatch('member/MemberGetCashLog_Deposit', payload);
      }
    },
    goDetail(val) {
      const payload = {};
      payload.Data = val;
      payload.Type = 1;
      this.$store.commit('member/setMemberShowDetail', payload);
      router.push('/member/recordsdetail');
    },
  },
  mounted() {
    if (this.MemberRecords.MemberDepositLog.data_list === undefined || this.getSwitch === 1 || this.getSwitch === '1') {
      const EndDateFormated = moment().format('YYYY-MM-DD');
      const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
      this.DateRange = [];
      this.DateRange.push(StartDateFormated);
      this.DateRange.push(EndDateFormated);
      this.getAPI();
    } else {
      this.DateRange = [];
      this.DateRange.push(this.MemberRecords.MemberDepositSearchDate.Date_S);
      this.DateRange.push(this.MemberRecords.MemberDepositSearchDate.Date_E);
      this.currentPages = this.MemberRecords.MemberDepositLog.data_list.length / 30;
    }
    this.$store.state.member.MemberShowDatePicker = true;
  },
};
</script>
<style lang="scss">

</style>
