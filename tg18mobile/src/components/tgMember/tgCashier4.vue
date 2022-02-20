<template lang='pug'>
  .membertransfer
    .membertransfer_amount
      el-form(:model="transferForm" :rules="transferFormRules" ref="transferForm" label-width="100px")
        h1 转账钱包
        ul
          li
            el-card.transfer_info(shadow="never")
              .gameIcon(:style='{"background": dataWallet[0].gameColor}')
                img(:src='dataWallet[0].gameImage')
              .transfer_infoName {{ dataWallet[0].CompanyName }}钱包
              .transfer_infoCash ¥ {{ dataWallet[0].Cash | commaFormat }}
        .transfer_icon
          .icon
            i.el-icon-arrow-down
        ul
          li
            el-card.transfer_info(shadow="never")
              .gameIcon(:style='{"background": dataWallet[1].gameColor}')
                img(:src='dataWallet[1].gameImage')
              .transfer_infoName {{ dataWallet[1].CompanyName }}
              .transfer_infoCash ¥ {{ dataWallet[1].Cash | commaFormat }}
        h1 转账金额
        ul
          li
            el-form-item(prop="Amount")
              input.transferamount(type='number', v-model='transferForm.Amount', placeholder="输入金额")
        el-button.membertransfer_btn(@click='transfer', type="primary"  :loading="submitLoading") 提交
        //- p.invisible {{propsWallet}}
</template>
<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['propsWallet'],
  data() {
    const checkAmount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('金额不能为空'));
      } else if (!(/^[0-9]+(\.[0-9]{1,2})?$/.test(value))) {
        callback(new Error('请勿填写小数点两位以上的金额'));
      } else if (value <= 0) {
        callback(new Error('金额必须大於0'));
      } else {
        callback();
      }
    };
    return {
      submitLoading: false,
      transOut: true,
      dataWallet: this.propsWallet,
      transferForm: {
        Amount: '',
      },
      transferFormRules: {
        Amount: [{ required: true, message: '请填写金额', trigger: 'blur' }, { validator: checkAmount, trigger: ['blur', 'change'] }],
      },
    };
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberGameWallet',
      'MemberWallet',
    ]),
    getAllWallet() {
      const array1 = { center: ['中心錢包', this.MemberWallet.Cash] };
      const array2 = this.MemberGameWallet;
      return Object.assign(array1, array2);
    },
  },
  watch: {
    propsWallet: {
      handler(newValue) {
        this.changeSelectWallet(newValue);
      },
      deep: true,
    },
  },
  methods: {
    changeSelectWallet(newValue) {
      this.dataWallet = newValue;
    },
    selectWalletReverse() {
      this.transOut = !this.transOut;
      // this.dataWallet.reverse();
    },
    transfer() {
      const payload = {};
      payload.UserId = this.UserId;
      payload.TransferCash = this.transferForm.Amount;
      if (this.transOut) {
        payload.TransFrom = this.dataWallet[0].gameId;
        payload.TransTo = this.dataWallet[1].gameId;
      } else {
        payload.TransFrom = this.dataWallet[1].gameId;
        payload.TransTo = this.dataWallet[0].gameId;
      }
      const vm = this;
      vm.submitLoading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransfer`, payload)
        .then((res) => {
          vm.submitLoading = false;
          if (res.data.status === 1) {
            vm.sendMessage();
            vm.transferFinish();
          } else {
            vm.errorMessage(res.data.error_message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    errorMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
      });
    },
    sendMessage() {
      this.$message({
        message: '轉帳成功',
        type: 'success',
      });
      this.transferFinish();
      this.$emit('cashierDialog_3_Hide');
      this.resetForm('transferForm');
    },
    transferFinish() {
      if (this.UserId) {
        const payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
// .el-tabs__content{
//   min-height: 600px;
// }
// .itemTitle{
//   min-width: 64px;
//   line-height: 40px;
// }
// .el-form-item{
//   margin-bottom: 0;
// }
// .selectItem{
//   height: 40px;
// }
// .el-select-dropdown__item{
//   height: 50px;
// }
// .gameIcon{
//   width: 40px;
//   height: 40px;
//   border-radius: 100%;
// }
// .reverse{
//   cursor: pointer;
//   .icon{
//     margin: 0;
//     width: 24px;
//     height: 24px;
//     border-radius: 100%;
//     border: 1px solid #ccc;
//     line-height: 24px;
//   }
//   .active{
//     background: #1890ff;
//     border: 1px solid #1890ff;
//     color: #fff;
//   }
// }
</style>
<style lang="scss">
	.membertransfer_amount {
		.transfer_info {
			float: left;
			width: 100%;
			.el-card__body {
				float: left;
				width: 100%;
			};
			.gameIcon {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				float: left;
				width: 90px;
				height: 90px;
				border-radius: 50vw;
				overflow: hidden;
				img {
					width: 100%;
					height: auto;
				};
			};
		};
		.transfer_icon {
			.icon {
				display: inline-block;
				width: 70px;
				height: 70px;
				margin: 0 30px;
				color: rgba(140,140,140,1);
				font-size: 45px;
				text-align: center;
				line-height: 70px;
				border-radius: 100%;
				border: 1px solid #ccc;
			};
			.active {
				background: #1890ff;
				color: rgba(255,255,255,1);
				border: 1px solid #1890ff;
			};
		};
		.el-date-editor.el-input {
			display: block;
			float: left;
			width: 100%;
		};
		.el-form-item {
			margin-bottom: 0 !important;
			.el-form-item__content {
				margin-left: 0 !important;
			};
		};
		.el-button {
			padding: 0;
		};
		.invisible {
			display: block;
			float: left;
			width: 100%;
			margin: 0;
			padding: 0;
		};
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.membertransfer_amount {
			.transfer_info {
				.gameIcon {
					width: 12vw;
					height: 12vw;
				};
			};
			.transfer_icon {
				.icon {
					width: 9.33vw;
					height: 9.33vw;
					margin: 0 4vw;
					font-size: 6vw;
					line-height: 9.33vw;
				};
			};
			.el-form-item__content {
				line-height: 5.33vw;
			};
		}
	}
</style>
