<template lang="pug">
  .container-fluid
    //--Card 會員錢包
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 會員錢包
          el-button.py-1.float-right.pl-2(type='text', @click="get_wallet(), get_wallet_log()") 刷新
          el-button.py-1.float-right(v-if="$store.state.member.user_page_auth.Add_Auth==1", type='text', @click="editDialog = true") 金額異動		
        .row.card-text.item
          span.col-md-4.col-12.py-2 錢包總額：{{wallet.CashTotal | commaFormat}}
          span.col-md-4.col-12.py-2 中心錢包：{{wallet.Cash | commaFormat}}
          span.col-md-4.col-12.py-2 凍結資金：{{wallet.LockCash | commaFormat}}
          span.col-md-4.col-12.py-2 會員總輸贏
            el-tooltip(class="item" effect="light" content="會員總輸贏=總提款-總存款+錢包總額" placement="right")
              i(class="el-icon-info")
            span ：{{ wallet.NewBalanceAmount  | commaFormat}}	
          span.col-md-4.col-12.py-2 總存款：{{wallet.DepositAmount | commaFormat}}
          span.col-md-4.col-12.py-2 總提款：{{wallet.WithDrawAmount | commaFormat}}
          span.col-md-4.col-12.py-2 
            el-tooltip.item(effect='dark', placement='top')
              div(slot='content')
                | 總紅利：{{wallet.BonusAmount | commaFormat}}
                br
                | 總救援金：{{wallet.RescueAmount | commaFormat}}
                br
                | 總返水：{{wallet.ReturnAmount | commaFormat}}
              span 總優惠：{{wallet.bounsTotal | commaFormat}}
          span.col-md-4.col-12.py-2 總流水：{{wallet.BettingAmount | commaFormat}}
          span.col-md-4.col-12.py-2 18轉帳金額：{{wallet.LuckTransferCash | commaFormat}}
        template
          el-table(:data='wallet_table_data', style='width: 100%')
            el-table-column(prop='GroupName', label='平台', align='center')
            el-table-column(prop='GameAccount', label='遊戲帳號', align='center')
            el-table-column(prop='TransferInAmount', label='轉進', align='center')
            el-table-column(prop='TransferOutAmount', label='轉出', align='center')
            el-table-column(prop='BetCount', label='投注次數', align='center')
            el-table-column(prop='BetAmount', label='流水', align='center')
            el-table-column(prop='ReturnAmount', label='返水', align='center')
            el-table-column(label='平台總輸贏', align='center')
              template(slot-scope='scope')
                span {{scope.row.BalanceAmount}}
            el-table-column(prop='KillNumber', label='殺數', align='center')
            el-table-column(prop='GameCash', label='餘額', align='center')
            el-table-column(prop='BetDateTime', label='最後投注時間', width="180", align='center')
    //--Card 存款紀錄
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 存款紀錄
          router-link(:to="{name:'tgDepositList', query:{user_name:user_info.UserName}}")
            el-button.py-1.float-right(type='text') 更多紀錄
        .row.card-text.item
          span.col-12.h6 全部存款統計
          span.col-md-3.col-12.py-2 存款總額：{{save.TotalAmount | commaFormat}}
          span.col-md-3.col-12.py-2 最高金額：{{save.HighestAmount | commaFormat}}
          span.col-md-3.col-12.py-2 存款次數：{{save.Counts | commaFormat}}
          span.col-md-3.col-12.py-2 平均金額：{{save.AVG | commaFormat}}
          span.col-12.h6.py-2 最近 5 筆存款
        template
          el-table(:data='save_table_data', style='width: 100%')
            el-table-column(prop='OrderId', label='交易單號')
            el-table-column(prop='ChannelName', label='交易類型')
            el-table-column(prop='Amount', label='交易金額')
             template(slot-scope='scope') {{ scope.row.Amount | commaFormat}}
            el-table-column(prop='SendOrderTime', label='交易時間', width='170')
    //--Card 提款紀錄
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 提款紀錄
          router-link(:to="{name:'tgWithdrawalList', query:{user_name:user_info.UserName}}")
            el-button.py-1.float-right(type='text') 更多紀錄
        .row.card-text.item
          span.col-12.h6 全部提款統計
          span.col-md-3.col-12.py-2 提款總額：{{lend.TotalAmount | commaFormat}}
          span.col-md-3.col-12.py-2 最高金額：{{lend.HighestAmount | commaFormat}}
          span.col-md-3.col-12.py-2 提款次數：{{lend.Counts | commaFormat}}
          span.col-md-3.col-12.py-2 平均金額：{{lend.AVG | commaFormat}}
          span.col-12.h6.py-2 最近 5 筆提款
        template
          el-table(:data='lend_table_data', style='width: 100%')
            el-table-column(prop='BankCode', label='銀行')
            el-table-column(prop='MemberName', label='姓名')
            el-table-column(prop='MemberAccount', label='帳號')
            el-table-column(prop='Amount', label='金額')
              template(slot-scope='scope') {{ scope.row.Amount | commaFormat}}
            el-table-column(prop='SendOrderTime', label='交易時間', width='170')
    //--Card 優惠紀錄
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 優惠紀錄
          router-link(:to="{name:'tgBonusRecordList', query:{user_name:user_info.UserName}}")
            el-button.py-1.float-right(type='text') 更多紀錄
        .row.card-text.item
          span.col-12.h6 30 天內優惠統計
          span.col-md-3.col-12.py-2 優惠總額：{{bonus.TotalAmount | commaFormat}}
          span.col-md-3.col-12.py-2 最高金額：{{bonus.HighestAmount | commaFormat}}
          span.col-md-3.col-12.py-2 優惠筆數：{{bonus.Counts | commaFormat}}
          span.col-md-3.col-12.py-2 平均金額：{{bonus.AVG | commaFormat}}
          span.col-12.h6.py-2 最近 5 筆優惠
        template
          el-table(:data='bonus_table_data', style='width: 100%')
            el-table-column(prop='ModifyType_str', label='類型', width='120')
            el-table-column(prop='OfferName', label='來源')
            el-table-column(prop='ModifyCash', label='金額', width='200')
            el-table-column(prop='DeliveryDate', label='派送日期', width='170')
    el-dialog(title='金額異動', :visible.sync='editDialog', @close="init_dialog('form')")
      el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
        el-form-item(label='異動金額', prop="modify_cash", label-width="120px" ,label-position='left')
          el-input(v-model='form.modify_cash', placeholder='請輸入異動金額', type="number")
        el-form-item(label='流水限制', prop="withdraw_limit", label-width="120px" ,label-position='left')
          el-input(v-model='form.withdraw_limit', placeholder='請輸入流水限制')
        el-form-item(label='備註', prop="notes", label-width="120px" ,label-position='left')
          el-input(type="textarea", v-model='form.notes', placeholder='請輸入備註')
      .dialog-footer(slot='footer')
        el-button(@click='editDialog = false') 取 消
        el-button(type='primary', @click='update_cash()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgMemberLog",
  props: ["user_info"],
  watch: {
    UserId(new_value, old_value) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    reverseFormat(value) {
      if (!value) {
        return;
      }
      if (value.substr(0, 1) == 0) {
        return value;
      } else {
        if (value.substr(0, 1) == "-") {
          return value.substr(1);
        } else {
          return "-" + value;
        }
      }
    }
  },
  data() {
    return {
      wallet: {},
      save: {},
      lend: {},
      bonus: {},
      wallet_table_data: [],
      save_table_data: [],
      lend_table_data: [],
      bonus_table_data: [],
      editDialog: false,
      lock_btn: false,
      form: {
        modify_cash: "",
        withdraw_limit: "",
        notes: ""
      },
      rules: {
        modify_cash: [
          {
            required: true,
            message: "請選擇異動金額",
            trigger: "change"
          }
        ],
        notes: [
          {
            required: true,
            message: "請選擇備註",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    UserId: function() {
      return this.user_info.UserId;
    }
  },
  methods: {
    async init() {
      this.get_wallet();
      this.get_wallet_log();
      this.get_save();
      this.get_save_log();
      this.get_lend();
      this.get_lend_log();
      this.get_bonus();
      this.get_bonus_log();
    },
    get_wallet() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/UserWalletInfo",
        data: { UserId: self.user_info.UserId }
      })
        .then(function(response) {
          self.wallet = response.data.data[0];
          self.wallet.CashTotal = (
            parseFloat(self.wallet.Cash) + parseFloat(self.wallet.LockCash)
          ).toFixed(2);
          self.wallet.bounsTotal = (
            parseFloat(self.wallet.BonusAmount) +
            parseFloat(self.wallet.RescueAmount) +
            parseFloat(self.wallet.ReturnAmount)
          ).toFixed(2);
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_wallet_log() {
      let self = this;
      let today = new Date();
      let last;
      let y = today.getFullYear();
      let m = today.getMonth() + 1;
      let d = today.getDate();
      m < 10 && (m = "0" + m);
      d < 10 && (d = "0" + d);
      let from_date = "2017-01-01";
      let to_date = y + "-" + m + "-" + d;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetBetReport",
        data: {
          Type: "Game",
          UserId: self.user_info.UserId,
          Date_S: from_date,
          Date_E: to_date
        }
      })
        .then(function(response) {
          response.data.data.Total = response.data.data.Total[0];
          response.data.data.Total.GroupName = "合計";
          let arr = Object.keys(response.data.data).map(
            index => response.data.data[index]
          );
          self.wallet_table_data = arr;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_save() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberThirtyData",
        data: {
          CountName: "Deposit",
          UserId: self.user_info.UserId
        }
      })
        .then(function(response) {
          self.save = response.data[0];
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_save_log() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Payment/QueryOrder_Admin",
        data: {
          DateTime_S: "2000-01-01 00:00:00",
          DateTime_E: "9999-01-01 00:00:00",
          UserId: self.user_info.UserId,
          PayType: "1",
          StateCode: "1",
          Page: 1,
          PageLimit: 5
        }
      })
        .then(function(response) {
          self.save_table_data = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_lend() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberThirtyData",
        data: {
          CountName: "Withdraw",
          UserId: self.user_info.UserId
        }
      })
        .then(function(response) {
          self.lend = response.data[0];
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_lend_log() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Payment/QueryOrder_Admin",
        data: {
          DateTime_S: "2000-01-01  00:00:00",
          DateTime_E: "9999-01-01  00:00:00",
          UserId: self.user_info.UserId,
          PayType: "2",
          StateCode: "1",
          Page: 1,
          PageLimit: 5
        }
      })
        .then(function(response) {
          self.lend_table_data = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_bonus() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberThirtyData",
        data: {
          CountName: "Other",
          UserId: self.user_info.UserId
        }
      })
        .then(function(response) {
          self.bonus = response.data[0];
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_bonus_log() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/GetCashLog",
        data: {
          method: "all",
          ModifyType: "3,4,5",
          UserId: self.user_info.UserId,
          Page: 1,
          PageLimit: 5
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["ModifyType_str"] =
              response.data.other.ModifyType[item["ModifyType"]];
            if (item["ModifyType"] == 3) {
              item["OfferName"] =
                item["ChannelName"] + " - " + item["OfferName"];
            }
          });
          self.bonus_table_data = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.form.modify_cash = "";
      this.form.withdraw_limit = "";
      this.form.notes = "";
    },
    update_cash() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("UserId", self.user_info.UserId);
          data.append("ModifyCash", self.form.modify_cash);
          if (self.form.withdraw_limit) {
            data.append("WithDrawLimit", self.form.withdraw_limit);
          }
          data.append("Notes", self.form.notes);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "WalletAll/UserCashFromBack",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_wallet();
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "更新失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.lock_btn = false;
              self.editDialog = false;
            });
        }
      });
    }
  }
};
</script>
