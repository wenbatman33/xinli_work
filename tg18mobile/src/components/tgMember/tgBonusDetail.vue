<template lang='pug'>
.container-fluid
	tgFix
	tgSmNavi
	.content
		section
			.memberdetail
				.memberdetail_bonus
					//- Icon图示
					.memberdetail_icon
					.memberdetail_caption
						//- 返水金額
						h1 ¥ {{MemberShowDetailData.Data.ModifyCash | commaFormat}}
						h2 {{MemberShowDetailData.Data.OfferName}}
						h3 {{MemberShowDetailData.Data.CalcDate}}
						hr.dashed
					.memberdetail_content
						ul
							li(v-if="MemberShowDetailData.Data.ChannelName") 平台
								span {{MemberShowDetailData.Data.ChannelName}}
							li(v-if="MemberShowDetailData.Type == 2") 负盈利
								span ¥  {{MemberShowDetailData.Data.CalcCash | commaFormat}}
							li(v-if="MemberShowDetailData.Type == 1") 流水金额
								span ¥  {{MemberShowDetailData.Data.CalcCash | commaFormat}}
							li(v-if="MemberShowDetailData.Type == 3") 存款金额
								span ¥  {{MemberShowDetailData.Data.CalcCash | commaFormat}}
							//- li 赠送比例
							//- 	span {{MemberShowDetailData.Data.OfferRate}} %
							li 转出限制
								span.ml-1 {{MemberShowDetailData.Data.BonusLimit | commaFormat}}
								span(v-if='MemberShowDetailData.Data.BonusLimitType==1') 流水满 
								span(v-if='MemberShowDetailData.Data.BonusLimitType==2') 游戏钱包满 
								
							li 提款要求
								span 有效流水满 ¥ {{MemberShowDetailData.Data.WithDrawLimit | commaFormat}}
							li 状态
								span.fettle(v-if='MemberShowDetailData.Data.Status == 5') {{searchGroupId(MemberShowDetailData.Data.DeliveryGroupId)}}
								span.fettle(v-if='MemberShowDetailData.Type == 1') {{MemberBonus.MemberReturnOther[MemberShowDetailData.Data.Status]}} 
								span.fettle(v-if='MemberShowDetailData.Type == 2') {{MemberBonus.MemberRescueOther[MemberShowDetailData.Data.Status]}} 
								span.fettle(v-if='MemberShowDetailData.Type == 3') {{MemberBonus.MemberBonusOther[MemberShowDetailData.Data.Status]}} 
							li(v-if='MemberShowDetailData.Data.Notes2') 备注
								span {{MemberShowDetailData.Data.Notes2}}
					form
						.memberdetail_btn(v-if="MemberShowDetailData.Data.Status == 2" @click='apply(MemberShowDetailData)') 提交申请
						//- .memberdetail_btn(v-if="MemberShowDetailData.Data.Status == 1" @click="cancel(MemberShowDetailData)") 取消申请
						.memberdetail_btn(v-if="MemberShowDetailData.Data.Status == 777" @click="BonusGiveUp_dialogShow = true") 放弃
	tgFooter
	el-dialog.ReceiveBonus_dialog(width='100%', :visible.sync='applyBonus_dialogShow', append-to-body='', center)
		tgReceiveBonus(:Sn='applyData.Sn',
    :dialogShow='applyBonus_dialogShow',
    :applyBonusArray='applyBonusArray',
    :applyBonusData='applyBonusData',
		:rowData = 'rowData',
    @applyBonus_dialogHide='applyBonus_dialogHide',
    @ApplyOfferConfirm='ApplyOfferConfirm')
	el-dialog.BonusGiveUp_dialog(width='100%', title='请确认是否放弃此笔红利？',  :visible.sync='BonusGiveUp_dialogShow', append-to-body='', center)
		p.text-center 若放弃，此笔期间产生之赢利与优惠红利将会全数扣除。 
		p.text-center.mt-3
			el-button(@click="BonusGiveUp_dialogShow = false") 取 消
			el-button(type="primary" @click="ApplyBonusGiveUp(MemberShowDetailData)") 确 定
</template>
<script>
import axios from 'axios';
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgReceiveBonus from '@/components/tgMember/tgBonusContent/tgReceiveBonus.vue';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    router,
    tgFooter,
    tgReceiveBonus,
  },
  data() {
    return {
      bonusType: '',
      applyGroupName: '',
      applyData: {
        Sn: '',
        CompanyName: '',
        GroupId: '',
        Status: '',
      },
      rowData: '',
      applyBonusArray: [],
      applyBonusData: '',
      applyBonus_dialogShow: false,
      BonusGiveUp_dialogShow: false,
    };
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberBonus',
      'MemberShowDetailData',
    ]),
  },
  methods: {
    renewBonusNumber() {
      const payload = {};
      payload.UserId = this.UserId;
      this.$store.dispatch('member/MemberBonusNumber', payload);
    },
    apply(data) {
      const vm = this;
      let url;
      this.bonusType = data.Type;
      if (data.Type === 1) {
        url = 'return';
      } else if (data.Type === 2) {
        url = 'rescue';
      } else {
        url = 'bonus';
      }
      const payload = {};
      this.applyData.Sn = data.Data.Sn;
      this.applyData.Status = 1;
      this.rowData = data;
      payload.UserId = this.UserId;
      payload.Sn = data.Data.Sn;
      payload.Status = 1;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetBonusGameWallet/${url}`, payload)
        .then((res) => {
          vm.applyBonusData = res.data.data.BonusData;
          vm.applyBonusArray = res.data.data.GroupList;
          vm.applyBonus_dialogShow = true;
        });
    },
    ApplyOfferConfirm(data) {
      const vm = this;
      let url;
      const payload = {};
      if (this.bonusType === 1 || this.bonusType === '1') {
        url = 'return';
      } else if (this.bonusType === 2 || this.bonusType === '2') {
        url = 'rescue';
      } else if (this.bonusType === 3 || this.bonusType === '3') {
        url = 'bonus';
      }
      payload.UserId = this.UserId;
      payload.GroupId = data.GroupId;
      payload.Sn = this.applyData.Sn;
      payload.Status = 1;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/ApplyOffer/${url}`, payload)
        .then((res) => {
          vm.renewBonusNumber();
          vm.$store.state.member.MemberReloadSwitch = true;
          if (res.data.status === 1) {
            vm.applyBonus_dialogHide();
            vm.$message({
              message: res.data.message,
              type: 'success',
              duration: 1500,
              onClose() {
                vm.jumpGamePage(data);
              },
            });
          } else {
            vm.applyBonus_dialogHide();
            vm.$message({
              message: res.data.error_message, 
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ApplyBonusGiveUp(data) {
      const vm = this;
      const payload = {};
      let url;
      this.applyData.Sn = data.Data.Sn;
      this.bonusType = data.Type;
      payload.Sn = this.applyData.Sn;
      payload.UserId = this.UserId;
      if (this.bonusType === 1 || this.bonusType === '1') {
        url = 'return';
      } else if (this.bonusType === 2 || this.bonusType === '2') {
        url = 'rescue';
      } else if (this.bonusType === 3 || this.bonusType === '3') {
        url = 'bonus';
      }
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/BonusGiveUp/${url}`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            vm.applyBonus_dialogHide();
            vm.$message({
              message: '成功，系统将自动跳转',
              type: 'success',
              duration: 1500,
              center: true,
              onClose() {
                vm.$store.commit('member/reSetMemberBonusLogs');
                window.history.go(-1);
              },
            });
          } else {
            vm.applyBonus_dialogHide();
            vm.$message({
              message: res.data.error_message, 
              type: 'error',
              duration: 1500,
              onClose() {
                vm.$store.commit('member/reSetMemberBonusLogs');
                window.history.go(-1);
              },
            });
          }
          vm.BonusGiveUp_dialogShow = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // - 轉跳頁面
    jumpGamePage(payload) {
      if (payload.GameType === 1 || payload.GameType === '1') {
        router.push({ path: '/games/slot', query: { game: payload.GroupName } });
      } else if (payload.GameType === 2 || payload.GameType === '2') {
        router.push({ path: '/games/fishing', query: { game: payload.GroupName } });
      } else if (payload.GameType === 3 || payload.GameType === '3') {
        router.push({ path: '/games/board', query: { game: payload.GroupName } });
      }
    },
    // - 透過fGroupId filter index AllProvider 取得CompanyName
    searchGroupId(id) {
      const result = this.AllProvider.filter(item => item.GroupId === id);
      let resultTxt;
      if (result.length > 0) {
        resultTxt = result[0].CompanyName;
      } else {
        resultTxt = '';
      }
      return resultTxt;
    },
    cancel(data) {
      const vm = this;
      let url;
      const payload = {};
      if (data.Type === 1) {
        url = 'return';
      } else if (data.Type === 2) {
        url = 'rescue';
      } else {
        url = 'bonus';
      }
      payload.UserId = this.UserId;
      payload.Sn = data.Data.Sn;
      payload.Status = 2;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/ApplyOffer/${url}`, payload)
        .then((res) => {
          vm.renewBonusNumber();
          vm.$store.state.member.MemberReloadSwitch = true;
          const url = `/member/bonus/${data.Type}`;
          if (res.data.status === 1) {
            vm.sendMessage(url);
          } else {
            vm.errorMessage(url, res.data.error_message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    errorMessage(url, msg) {
      const vm = this;
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 1500,
        center: true,
      });
    },
    sendMessage(url) {
      this.$message({
        message: '成功，系统将自动跳转',
        type: 'success',
        duration: 1500,
        center: true,
        onClose() {
          this.jumpGamePage(url); 
        },
      });
    },
    applyBonus_dialogHide() {
      this.applyBonus_dialogShow = false;
    },
  },
  mounted() {
    this.$store.state.member.MemberReloadSwitch = false;
  },
};
</script>
<style lang="scss">
	.ReceiveBonus_dialog{
		.el-dialog {
			float: left;
			margin: 0 !important;
			border-radius: 0 !important;
			box-shadow: 0 !important;
		}
		.el-dialog__body {
			float: left;
			padding: 0;
			min-height: 100vh;
		}
	}
</style>
<style lang="scss" scoped>
	
</style>
