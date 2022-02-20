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
				// 转icon
				.list_transfer
				.memberhistory_info
					.memberhistory_caption
						// 日期
						h1 {{ item.FeedbackTrasfer }}
						// 成功状态
						.fettle_success(v-if='item.StateCode==3') {{ formatStatus(item.StateCode) }}
						// 审核中状态
						.fettle_review(v-if='item.StateCode==1 || item.StateCode==2') {{ formatStatus(item.StateCode) }}
						// 失败状态
						.fettle_fail(v-if='item.StateCode==4') {{ formatStatus(item.StateCode) }}
					.memberhistory_content
						// 交易渠道
						h1(v-if="item.ModifyCash > 0") {{ item.ChannelName }} -> 中心钱包
						h1(v-if="item.ModifyCash < 0") 中心钱包 -> {{ item.ChannelName }}
						// 交易金额
						h2 ¥ {{ Math.abs(item.ModifyCash).toFixed(2) | commaFormat}}
	form(v-if="MemberRecords.MemberTransLog.data_list")
		.memberhistory_btn(v-if="MemberRecords.MemberTransLog.data_list.length < MemberRecords.MemberTransLog.total_rows" @click="getMore") 显示更多纪录
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
          return time.getTime() > Date.now() + (30 * 24 * 60 * 60 * 1000) || time.getTime() < (Date.now() - (90 * 24 * 60 * 60 * 1000));
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
      if (this.MemberRecords.MemberTransLog.data_list !== undefined) {
        this.MemberRecords.MemberTransLog.data_list.forEach((item, index, array) => {
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
      const target = this.MemberRecords.MemberTransOther.StateCode;
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
          more: false,
        };
        this.$store.dispatch('member/MemberGetCashLog_Trans', payload);
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
          more: true,
        };
        this.$store.dispatch('member/MemberGetCashLog_Trans', payload);
      }
    },
    goDetail(val) {
      const payload = {};
      payload.Data = val;
      payload.Type = 3;
      this.$store.commit('member/setMemberShowDetail', payload);
      router.push('/member/recordsdetail');
    },
  },
  mounted() {
    if (this.MemberRecords.MemberTransLog.data_list === undefined || this.getSwitch === 1 || this.getSwitch === '1') {
      const EndDateFormated = moment().format('YYYY-MM-DD');
      const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
      this.DateRange = [];
      this.DateRange.push(StartDateFormated);
      this.DateRange.push(EndDateFormated);
      this.getAPI();
    } else {
      this.DateRange = [];
      this.DateRange.push(this.MemberRecords.MemberTransSearchDate.Date_S);
      this.DateRange.push(this.MemberRecords.MemberTransSearchDate.Date_E);
      this.currentPages = this.MemberRecords.MemberTransLog.data_list.length / 30;
    }
    this.$store.state.member.MemberShowDatePicker = true;
  },
};
</script>
<style lang="scss">

</style>
