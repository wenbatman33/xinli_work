<template lang='pug'>
.container-fluid
	tgFix
	tgSmNavi
	.content
		section
			.membercashback
				.membertab_b
					ul(v-model='activeName', type='border-card')
						li
							a(@click="handleClick(1)" :class='[(getUrlID === "1") ?"membertab_b_active" : ""]') 返水
								el-badge(v-if='MemberLogined && MemberBonusNumber.returnCnt > 0' :value="MemberBonusNumber.returnCnt" :max="99" class="item")
						li
							a(@click="handleClick(2)" :class='[(getUrlID === "2") ?"membertab_b_active" : ""]') 救援金
								el-badge(v-if='MemberLogined && MemberBonusNumber.rescueCnt > 0' :value="MemberBonusNumber.rescueCnt" :max="99" class="item")
						li
							a(@click="handleClick(3)" :class='[(getUrlID === "3") ?"membertab_b_active" : ""]') 红利
								el-badge(v-if='MemberLogined && MemberBonusNumber.bonusCnt > 0' :value="MemberBonusNumber.bonusCnt" :max="99" class="item")
			router-view
				p.invisible {{getUrlID}}
	tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    router,
    tgFooter,
  },
  data() {
    return {
      activeName: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberLogined',
      'MemberBonusNumber',
    ]),
    getUrlID: {
      get() {
        const path = this.$route.path.split('/');
        const parHash = path[3];
        return parHash;
      },
    },
  },
  methods: {
    handleClick(val) {
      this.$store.state.member.MemberReloadSwitch = true;
      router.push(`/member/bonus/${val}`);
    },
  },
  mounted() {
    const payload = {};
    payload.Status = 1;
    this.$store.dispatch('game/API_GameGroup', payload);
    this.activeName = this.getUrlID;
  },
};
</script>
<style lang="scss">
	.membercashback_content {
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
		.membercashback_content {
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
