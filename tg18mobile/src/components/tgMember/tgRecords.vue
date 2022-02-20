<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			section
				.memberhistory
					.membertab_c
						ul
							li
								a(@click='handleClick(1)' :class='[(Method===1) ? "membertab_c_active" : ""]') 全部
							li
								a(@click='handleClick(2)' :class='[(Method===2) ? "membertab_c_active" : ""]') 存款
							li
								a(@click='handleClick(3)' :class='[(Method===3) ? "membertab_c_active" : ""]') 提款
							li
								a(@click='handleClick(4)' :class='[(Method===4) ? "membertab_c_active" : ""]') 转账
							// li
								a(@click='handleClick(5)' :class='[(Method===5) ? "membertab_active" : ""]') 红利
					.memberhistory_list
						tgRecordsAll(v-if='Method==1')
						tgRecordsDeposit(v-if='Method==2')
						tgRecordsWithdraw(v-if='Method==3')
						tgRecordsTrans(v-if='Method==4')
					// 红利纪录(暫無內容)
					// .memberhistory_list(v-if='Method==5')
						tgRecordsAll
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgRecordsAll from '@/components/tgMember/tgRecordsContent/tgRecordsAll.vue';
import tgRecordsDeposit from '@/components/tgMember/tgRecordsContent/tgRecordsDeposit.vue';
import tgRecordsWithdraw from '@/components/tgMember/tgRecordsContent/tgRecordsWithdraw.vue';
import tgRecordsTrans from '@/components/tgMember/tgRecordsContent/tgRecordsTrans.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgRecordsAll,
    tgRecordsDeposit,
    tgRecordsWithdraw,
    tgRecordsTrans,
    tgFooter,
  },
  data() {
    return {
      activeName: '1',
      Method: Number(this.$route.query.type),
    };
  },
  computed: {
    ...mapState('index', [
      'routerFrom',
    ]),
  },
  watch: {
    $route(to, from) {
      this.Method = Number(to.query.type);
    },
  },
  methods: {
    handleClick(num) {
      this.Method = num;
      router.push({
        name: 'records',
        query: {
          type: num,
        },
        params: {
          switch: 1,
        },
      });
    },
  },
};
</script>
<style lang="scss">
	.memberhistory_list {
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
		.memberhistory_list {
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
