<template lang='pug'>
.membercashback_content
	el-date-picker.DatePicker(
								v-if='MemberShowDatePicker == true' 
								v-model="DateRange" 
								type="daterange" 
								range-separator="至" 
								start-placeholder="开始日期" 
								end-placeholder="结束日期" 
								value-format="yyyy-MM-dd"
								:picker-options="pickerOptions"
								@change="(value) => changeHandler(value)")
	ul(v-for="(mainItem, mainIndex) in showMemberBonus")
		.membercashback_date {{mainIndex.split('-')[0]}} 年 {{mainIndex.split('-')[1]}} 月
		li(v-for="item in mainItem")
			a.membercashback_bonus(@click="goDetail(item)")
				//- 成功状态 & 已派送
				.icon_application(v-if='item.Status==3 || item.Status==5') {{ formatStatus(item.Status) }}
				//- 审核中状态 & 申请
				.icon_review(v-if='item.Status==1 || item.Status==2') {{ formatStatus(item.Status) }}
				//- 失败状态 & 逾期
				.icon_account(v-if='item.Status==4 || item.Status==6') {{ formatStatus(item.Status) }}
				.membermorecoupon_info
					//- 优惠名称
					h1 {{ item.OfferName }}
					//- 金額
					h2 ¥ {{ item.ModifyCash | commaFormat}}
				.membermorecoupon_note
					//- 提款要求
					h1 提款要求 有效流水满{{ item.WithDrawLimit | commaFormat}}
					//- 日期
					h2 {{ item.CalcDate }}
	form(v-if="MemberBonus.MemberBonusLog.data_list")
		.memberhistory_btn(v-if="MemberBonus.MemberBonusLog.data_list.length < MemberBonus.MemberBonusLog.total_rows" @click="getMore(filterGroupId)") 显示更多纪录
	tgNoResult.tgError(v-if="JSON.stringify(showMemberBonus) === '{}'")
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
      filterGroupId: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberBonus',
      'MemberShowDatePicker',
      'MemberBonusActName',
      'MemberReloadSwitch',
    ]),
    ...mapState('game', [
      'gameGroup',
    ]),
    showMemberBonus() {
      const tempArr = {};
      if (this.MemberBonus.MemberBonusLog.data_list !== undefined) {
        this.MemberBonus.MemberBonusLog.data_list.forEach((item, index, array) => {
          const tempM = `${item.Create_At.split(' ')[0].split('-')[0]}-${item.Create_At.split(' ')[0].split('-')[1]}`;
          if (tempArr[tempM] === undefined) {
            tempArr[tempM] = [];
          }
          tempArr[tempM].push(item);
        });
      }
      return tempArr;
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
      const target = this.MemberBonus.MemberBonusOther;
      let Status = '';
      Object.keys(target).map((key, index) => {
        if (value === key) {
          Status = target[key];
        }
        return Status;
      });
      return Status;
    },
    getAPI(groupID = false) {
      if (this.UserId) {
        const payload = { 
          UserId: this.UserId,
          Page: this.currentPages,
          PageLimit: 10,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: false,
        };
        if (groupID) {
          payload.GameGroupId = groupID;
        }
        this.$store.dispatch('member/MemberGetCashLog_bonus', payload);
      }
    },
    getMore(groupID = false) {
      if (this.UserId) {
        this.currentPages += 1;
        const payload = { 
          UserId: this.UserId,
          Page: this.currentPages,
          PageLimit: 10,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: true,
        };
        if (groupID && groupID !== 999) {
          payload.GameGroupId = groupID;
        }
        this.$store.dispatch('member/MemberGetCashLog_bonus', payload);
      }
    },
    goDetail(val) {
      const payload = {};
      payload.Data = val;
      payload.Type = 3; // 紅利
      this.$store.commit('member/setMemberShowDetail', payload);
      router.push('/member/bonusdetail');
    },
    filterGroup(val) {
      this.currentPages = 1;
      if (val === 'all') {
        this.getAPI();
        this.$store.state.member.MemberBonusActName = val;
        this.filterGroupId = 999;
      } else {
        this.getAPI(this.gameGroup[val].GroupId);
        this.$store.state.member.MemberBonusActName = this.gameGroup[val].GroupName;
        this.filterGroupId = this.gameGroup[val].GroupId;
      }
    },
  },
  mounted() {
    if (this.MemberBonus.MemberBonusLog.data_list === undefined || this.MemberReloadSwitch === true) {
      this.$store.state.member.MemberBonusActName = 'all';
      const EndDateFormated = moment().format('YYYY-MM-DD');
      const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
      this.DateRange = [];
      this.DateRange.push(StartDateFormated);
      this.DateRange.push(EndDateFormated);
      this.getAPI();
    } else {
      this.DateRange = [];
      this.DateRange.push(this.MemberBonus.MemberBonusSearchDate.Date_S);
      this.DateRange.push(this.MemberBonus.MemberBonusSearchDate.Date_E);
      this.currentPages = Math.ceil(this.MemberBonus.MemberBonusLog.data_list.length / 30); 
    }
    this.$store.state.member.MemberShowDatePicker = true;
  },
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>

</style>
