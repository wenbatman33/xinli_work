<template lang='pug'>
.container-fluid(v-loading.fullscreen.lock="loading" element-loading-text="加载中")
	tgFix
	tgSmNavi
	memberStatus
	.content
		section
			.memberpocket
				.memberpocket_game
					div(v-if='MemberGameWalletCommon')
						.memberpocket_title 常用钱包
						.memberpocket_over
							ul(v-for="(game, index) in MemberGameWalletCommon")
								hr(:style='{"background": filterProviderColorCode(game[0])}')
								.memberpocket_info
									.memberpocket_icon(:style='{"background": filterProviderColorCode(game[0])}')
										img(:src='filterProviderImg(game[0])')
									h1 {{ game[2] }} 钱包余额
									//- h1 {{ game[0] }} 钱包余额
									h2 ¥ {{ game[1] | commaFormat }}
										a(@click='renewWallet(game[0])')
								li
									button.transfer(:index='index' @click='seletePropsWallet(game,index)') 转账
								li
									button.transfergame(:index='index' @click='WalletTransferGame(filterGroupId(game[0]),game[0])') 闪入
								li
									button.transferall(:index='index' @click='WalletTransferAll(filterGroupId(game[0]),game[0])') 闪提
					.memberpocket_title(v-if='MemberGameWalletCommon') 更多钱包
					.memberpocket_over
						ul(v-for="(game, index) in MemberGameWalletNormal")
							hr(:style='{"background": filterProviderColorCode(game[0])}')
							.memberpocket_info
								.memberpocket_icon(:style='{"background": filterProviderColorCode(game[0])}')
									img(:src='filterProviderImg(game[0])')
								h1 {{ game[2] }} 钱包余额
								//- h1 {{ game[0] }} 钱包余额
								h2 ¥ {{ game[1] | commaFormat }}
									a(@click='renewWallet(game[0])')
							li
								button.transfer(:index='index' @click='seletePropsWallet(game,index)') 转账
							li
								button.transfergame(:index='index' @click='WalletTransferGame(filterGroupId(game[0]),game[0])') 闪入
							li
								button.transferall(:index='index' @click='WalletTransferAll(filterGroupId(game[0]),game[0])') 闪提
						el-dialog.transfer_dialog(:visible.sync='dialogShow', width='100%')
							tgCashier3(:propsWallet.sync='propsWallet', :transType.sync='transType', @dialogHide='dialogHide')
	tgFooter
</template>
<script>
import axios from 'axios';
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import memberStatus from '@/components/tgMember/memberStatus.vue';
import tgCashier3 from '@/components/tgMember/tgCashier3.vue';
import tgError from '@/components/tgError/tgError.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      propsWallet: [],
      // propsWallet: {
      //   input: '',
      //   output: '',
      // },
      transType: 1,
      dialogShow: false,
    };
  },
  components: {
    tgFix,
    tgSmNavi,
    memberStatus,
    tgCashier3,
    tgError,
    tgFooter,
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberGameWallet',
      'MemberGameWalletCommon',
      'MemberGameWalletNormal',
    ]),
    ...mapState('game', [
      'gameGroup',
    ]),
  },
  methods: {
    filterProviderImg(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      if (result.length > 0) {
        return result[0].Images;
      } 
      return '';
    },
    filterProviderColorCode(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      if (result.length > 0) {
        return result[0].ColorCode;
      } 
      return '';
    },
    filterGroupId(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      if (result.length > 0) {
        return result[0].GroupId;
      } 
      return '';
    },
    transferFinish() {
      if (this.UserId) {
        const payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
    },
    WalletTransferGame(GroupId, GroupName) {
      // console.log(GroupId);
      // console.log(GroupName);
      const payload = { UserId: this.UserId, GameGroupId: GroupId, Type: 1 };
      const vm = this;
      vm.loading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferGame`, payload)
        .then((res) => {
          vm.loading = false;
          if (res.data.status === 1) {
            vm.$message({ message: `已转入${GroupName}钱包`, type: 'success' });
            vm.transferFinish();
            this.GA_member_fastinmobile(GroupId);
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.transferFinish();
            this.GA_member_fastinmobile(GroupId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    WalletTransferAll(GroupId, GroupName) {
      // console.log(GroupId);
      // console.log(GroupName);
      const payload = { UserId: this.UserId, GameGroupId: GroupId };
      const vm = this;
      vm.loading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferAll`, payload)
        .then((res) => {
          vm.loading = false;
          if (res.data.status === 1) {
            vm.$message({ message: '已收回中心钱包', type: 'success' });
            vm.transferFinish();
            this.GA_member_fastoutmobile(GroupId);
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.transferFinish();
            this.GA_member_fastoutmobile(GroupId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    seletePropsWallet(game, index) {
      // console.log(game[0]);
      console.log(game);
      this.GA_member_transfermobile2(index);
      const Wallet_1 = {
        gameId: index,
        gameName: game[0],
        Cash: game[1],
        CompanyName: game[2],
        gameImage: this.filterProviderImg(game[0]),
        gameColor: this.filterProviderColorCode(game[0]),
      };
      const Wallet_2 = {
        gameId: 'center',
        gameName: '中心钱包',
        CompanyName: '中心钱包',
        Cash: this.MemberWallet.Cash,
        gameImage: '/static/img/18-tiger.svg',
        gameColor: '#002766',
      };
      this.propsWallet = [Wallet_1, Wallet_2];
      this.transType = 1;
      this.dialogShow = true;
    },
    init() {
      if (this.UserId) {
        const payload = { UserId: this.UserId };
        this.loading = true;
        this.$store.dispatch('member/MemberGetGameWallet', payload)
        // payload = { Status: 1 };
        // this.$store.dispatch('game/API_GameGroup', payload);
          .then((res) => {
            this.loading = false;
            if (res.data.data.length <= 0) {
              this.showError = true;
            }
          });
      }
    },
    dialogHide() {
      this.dialogShow = false;
    },
    renewWallet(gameName) {
      const vm = this;
      const GroupID = this.gameGroup.filter((item, index, array) => item.GroupName === gameName)[0].GroupId;
      this.GA_wallet_updatemobile(GroupID);
      // console.log(GroupID);
      axios.post(`${process.env.VUE_APP_GAMEHOST}/Game/GameApi/GetBalance_Api/${this.UserId}/${GroupID}`)
        .then((res) => {
          if (res.data.status === 1) {
            const payload = { id: GroupID, groupName: gameName, cash: res.data.data.Balance };
            vm.$store.commit('member/setMemberGameWalletByOne', payload);
            vm.$message({
              message: `${gameName}钱包更新成功`,
              type: 'success',
              duration: 1500,
              center: true,
            });
          } else {
            vm.$message({
              showClose: true,
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.init();
    if (this.UserId) {
      let payload = { UserId: this.UserId };
      payload = { Status: 1 };
      this.$store.dispatch('game/API_GameGroup', payload);
    }
  },
};
</script>
<style lang="scss" scoped>
	hr {
		float: left;
		width: 100%;
		height: 12px;
		margin: 0;
	}
	.memberpocket_icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		float: left;
		width: 120px;
		height: 120px;
		padding: 20px;
		border-radius: 100px;
		overflow: hidden;
		img {
			width: 125%;
			height: auto;
		}
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		hr {
			height: 1.6vw;
		}
		.memberpocket_icon {
			width: 16vw;
			height: 16vw;
			padding: 2.67vw;
		}
	}
</style>
<style lang="scss">
	.membertransfer_amount {
		form {
			margin: 0 auto !important;
			h1 {
				text-align: left !important;
			}
		}
	}
	.transfer_dialog {
		background: rgba(255,255,255,1) !important;
		.el-dialog {
			float: left !important;
			margin: 0 !important;
			border-radius: 0 !important;
			box-shadow: none !important;
		}
		.el-dialog__body {
			width: 100%;
		}
		.el-dialog__title {
			display: none;
		}
		.el-dialog__headerbtn {
			display: block;
			float: right;
			width: 48px;
			height: 48px;
			background: url("/static/img/close.png") 0 0 no-repeat;
			background-size: contain;
			top: 8vw;
			right: 8vw;
			z-index: 100;
		}
		.el-dialog__close {
			display: none;
		}
		.el-dialog__body {
			float: left;
			padding: 0;
		}
		ul {
			margin: 0 auto !important;
			border: 0 !important;
			box-shadow: none !important;
			li:last-child {
				border-right: 2px solid rgba(217,217,217,1) !important;
			}
		}
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.transfer_dialog {
			.el-dialog__headerbtn {
				width: 6.4vw !important;
				height: 6.4vw !important;
			}
			ul {
				li {
					border: 0.26vw solid rgba(217,217,217,1) !important;
				}
				li:last-child {
					border-right: 0.26vw solid rgba(217,217,217,1) !important;
				}
			}
		}
	}
	@media screen and (max-width: 450px) {
		.transfer_dialog {
			ul {
				li {
					border: 1px solid rgba(217,217,217,1) !important;
				}
				li:last-child {
					border-right: 1px solid rgba(217,217,217,1) !important;
				}
			}
		}
	}
</style>
