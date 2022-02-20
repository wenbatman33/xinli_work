<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi(:timeSwitch='Switch' @changeSwitch='sonChange')
		.content
			section
				.memberbet
					.memberbet_note 溫馨提示：提供30天内的流水纪录，每个平台的数据有不同的延迟，本纪录仅供参考
					.memberbet_list(v-show="Switch == false")
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
						ul
							li(v-for="item in MemberBetRecords.MemberBetReport")
								a(@click="goDetail(item)")
									.memberbet_info
										.memberbet_caption
											h1 平台
											h2 {{ item.GroupName }}
										.memberbet_caption
											h1 投注次数
											h2 {{ item.BetCount }}
										.memberbet_caption
											h1 总流水
											h2 ¥ {{ item.BetAmount | commaFormat }}
										.memberbet_caption
											h1 有效流水
											h2(v-if="item.ActiveBetAmount") ¥ {{ item.ActiveBetAmount | commaFormat }}
											h2(v-else) ¥ 0
										.memberbet_caption
											h1 输赢金额
											.balance_amount(v-if="item.BalanceAmount >= 0") ¥ {{ item.BalanceAmount | commaFormat }}
											.balance_amount_r(v-else) ¥ {{ item.BalanceAmount | commaFormat }}
					.memberbet_list(v-show="Switch")
						.memberbet_date(v-if="MemberBetRecords.MemberBetReportSearchDate") {{ MemberBetRecords.MemberBetReportSearchDate.Date_S }} ~ {{ MemberBetRecords.MemberBetReportSearchDate.Date_E }}
						ul
							li(v-for="item in MemberBetRecords.MemberGameBetReport.data_list")
								.memberbet_display
									.memberbet_info
										.memberbet_content
											h1 游戏名称
											h2 {{ item.GameName }}
										.memberbet_content
											h1 投注次数
											h2 {{ item.BetCount }}
										.memberbet_content
											h1 总流水
											h2 {{ item.BetAmount }}
										.memberbet_content
											h1 有效流水
											h2 {{ item.ActiveBetAmount }}
										.memberbet_content
											h1 输赢金额
											.balance_amount(v-if="item.BalanceAmount >= 0") ¥ {{ item.BalanceAmount | commaFormat }}
											.balance_amount_r(v-else) ¥ {{ item.BalanceAmount | commaFormat }}
						form(v-if="MemberBetRecords.MemberGameBetReport.data_list")
							.memberbet_btn(v-if="MemberBetRecords.MemberGameBetReport.data_list.length < MemberBetRecords.MemberGameBetReport.total_rows" @click="getReportMore") 显示更多纪录
						//- tgNoResult.tgError(v-if='Object.keys(showMemberGameBetReport).length <= 0')
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgNoResult from '@/components/tgError/tgNoResult.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgFooter,
    tgNoResult,
  },
  data() {
    return {
      Switch: false,
      currentPages: 1,
      EndDate: '',
      StartDate: '',
      DateRange: [],
      GameGroupId: 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() + (30 * 24 * 60 * 60 * 1000) || time.getTime() < (Date.now() - (180 * 24 * 60 * 60 * 1000));
        },
      },
    };
  },
  computed: {
    ...mapState('index', [
      'routerFrom',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberBetRecords',
      'MemberShowDatePicker',
    ]),
    getSwitch() {
      return this.$route.params.switch;
    },
  },
  methods: {
    sonChange(val) {
      this.Switch = val;
    },
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
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: false,
        };
        this.$store.dispatch('member/MemberBetReport', payload);
      }
    },
    getReportAPI() {
      if (this.UserId) {
        const payload = { 
          GameGroupId: this.GameGroupId,
          Page: 1,
          PageLimit: 10,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: false,
        };
        this.$store.dispatch('member/MemberGameBetReport', payload);
      }
    },
    getMore() {
      if (this.UserId) {
        this.currentPages += 1;
        const payload = { 
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: true,
        };
        this.$store.dispatch('member/MemberBetReport', payload);
      }
    },
    getReportMore() {
      if (this.UserId) {
        this.currentPages += 1;
        const payload = { 
          GameGroupId: this.GameGroupId,
          Page: this.currentPages,
          PageLimit: 10,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          more: true,
        };
        this.$store.dispatch('member/MemberGameBetReport', payload);
      }
    },
    goDetail(val) {
      this.GameGroupId = val.GroupId;
      this.getReportAPI();
      this.Switch = true;
    },
  },
  mounted() {
    if (this.MemberBetRecords.MemberBetReport.data_list === undefined || this.getSwitch === 1 || this.getSwitch === '1') {
      const EndDateFormated = moment().format('YYYY-MM-DD');
      const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
      this.DateRange = [];
      this.DateRange.push(StartDateFormated);
      this.DateRange.push(EndDateFormated);
      this.getAPI();
    } else {
      this.DateRange = [];
      this.DateRange.push(this.MemberBetRecords.MemberBetReportSearchDate.Date_S);
      this.DateRange.push(this.MemberBetRecords.MemberBetReportSearchDate.Date_E);
      this.currentPages = this.MemberBetRecords.MemberBetReport.data_list.length / 30;
    }
    this.$store.state.member.MemberShowDatePicker = true;
  },
};
</script>
<style lang="scss">
	.memberbet {
		.el-input__inner {
			height: 100%;
			padding: 30px 120px;
		};
		.DatePicker {
			width: 100%;
			border: none;
			box-sizing: border-box;
			.el-range-input {
				display: block;
				width: 40%;
				color: rgba(0,80,179,1);
				font-size: 30px;
			};
			.el-icon-date {
				width: 10%;
				// background: url(/static/img/icon_filter.svg) 50% 50% no-repeat;
				background-size: contain;
				color: rgba(0,80,179,1);
				font-size: 30px;
				&::before {
					content: "\e608";
				};
			};
			.el-range-separator {
				width: 10%;
				color: rgba(0,80,179,1);
				font-size: 30px;
			};
			.el-range__close-icon {
				display: none;
			}
			.el-icon-circle-close {
				display: none;
				width: 0;
				color: rgba(0,80,179,1);
				font-size: 30px;
			};
		};
	}
	.tgError {
		margin-top: 60px;
	}
	.el-picker-panel {
		top: 170px !important;
	}
	.el-date-range-picker{
		width: 80vw !important;
		margin: 10vw !important;
	}
	.el-date-range-picker .el-picker-panel__body{
		min-width: 100px !important
	}
	.el-date-range-picker__content{
		width: 100% !important;
		padding: 5px !important;
	}
	.el-date-table td{
		padding: 0;
	}
	.el-date-table th{
		text-align: center;
	}
	@media screen and (max-width: 750px) {
		.memberbet {
			.el-input__inner {
				padding: 4vw 16vw;
			};
			.DatePicker {
				.el-range-input {
					font-size: 4vw;
				};
				.el-icon-date {
					font-size: 4vw;
				};
				.el-range-separator {
					font-size: 4vw;
				};
				.el-icon-circle-close {
					font-size: 4vw;
				};
			};
		}
		.tgError {
			margin-top: 24vh;
		}
		.el-picker-panel {
			top: 22.67vw !important;
		}
	}
</style>
<style lang="scss" scoped>

</style>
