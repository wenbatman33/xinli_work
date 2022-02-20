<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理存款管理 / Agency Deposit Management
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入代理帳號 / Enter Agency Account', v-model='search_account', @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)")
      .col-md-3.col-12.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee', transition="fade") 進階搜尋 / Advanced Search
          i.el-icon-arrow-down.el-icon--right
    //--advance search
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', ref='form', label-width='80px', label-position='left')
              .row
                div.px-1.py-1(:style='width="400"')
                  el-form-item.en_label(label='日期區間 / Date')
                    el-date-picker(size="medium", v-model='search_time_range', type='datetimerange', range-separator='至', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']", clearable)
                .col-md-6.col-12
                  el-form-item.en_label(label='交易單號 / Transaction ID')
                    el-input(size="medium", v-model='search_order_id', placeholder='請輸入交易單號')
                .col-md-6.col-12
                  el-form-item.en_label(label='存款方式 / Model')
                    el-select(size="medium", v-model='search_pay_type', filterable='', placeholder='選擇存款方式', clearable)
                      el-option(label='全部', value='' )
                      el-option(v-for='item in pay_type_option', :key='item.ChannelId', :label='item.ChannelName', :value='item.ChannelId')
                .col-md-6.col-12
                  el-form-item.en_label(label='存款狀態 / Status')
                    el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇存款狀態', clearable)
                      el-option(label='全部', value='' )
                      el-option(v-for="(value,key) in payment_state_type_option" :label='value', :value='key' :key="key")
                .col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee') 取消 / Cancel
                    el-button(size="medium", type='primary', @click='get_data(1)') 搜尋 / Search
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%', show-summary='', :summary-method="getSummaries")
            el-table-column(prop='SendOrderTime', label='存款時間 / Transaction Date', width='170', align='right',:render-header="renderheader")
            el-table-column(prop='Update_At', label='到帳時間 / Posting Date', width='170', align='right',:render-header="renderheader")
            el-table-column(label='狀態 / Status', width='90', align='center',:render-header="renderheader")
              template(slot-scope='scope')
                el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.StateCode_str}}
            el-table-column(prop='ChannelName', label='存款方式 / Model', width='90', align='center',:render-header="renderheader")
            el-table-column(prop='AgencyId', label='代理帳號 / AgencyId', width='100', align='center',:render-header="renderheader")
            el-table-column(prop='AgencyRealName', label='姓名 / AgencyRealName', width='100', align='center',:render-header="renderheader")
            el-table-column(prop='AgencyName', label='代理名稱 / Agency Name', width='100', align='center',:render-header="renderheader")
            el-table-column(prop='Amount', label='存款金額 / Amount', width='100', align='right',:render-header="renderheader")
              template(slot-scope='scope')
                span {{scope.row.Amount | commaFormat}}
            el-table-column(prop='BankCardInfo.remark', label='附言 / Comments', width='100',:render-header="renderheader")
            el-table-column(prop='BankCardInfo.bankAccount', label='銀行卡代號 / Bank No', width='180',:render-header="renderheader")
            el-table-column(prop='BankCardInfo.name', label='銀行卡戶名 / Bank Account Name', width='100',:render-header="renderheader")
            el-table-column(prop='OrderId', label='18交易單號 / Transaction ID', width='220', align='center',:render-header="renderheader")     
            el-table-column(prop='Device_str', label='裝置類型　/ Device', width='90', align='center',:render-header="renderheader")
            el-table-column(prop='Update_At', label='更新時間 / Last Update', width='170', align='right',:render-header="renderheader")
              template(slot-scope='scope')
                span(v-if="scope.row.StateCode == 1") {{scope.row.Update_At}}                  
            el-table-column(v-if="platform != 'www'", prop='title', label='操作 / Action', width='220',:render-header="renderheader",fixed="right")
              template(slot-scope='scope')
                a.links(@click='get_log(scope.row.OrderId)', type='text') 紀錄
                a.success(v-if="scope.row.StateCode == 2 && $store.state.member.user_page_auth.Add_Auth==1", @click='order_id = scope.row.OrderId; dialogFormVisible = true', type='text') 成功
                a.success(v-if="scope.row.StateCode != 1 && scope.row.StateCode != 3 && $store.state.member.user_page_auth.Add_Auth==1", @click='handleStopComfirm_test("02",scope.row.OrderId,scope.row.Amount)', type='text') 通過
                a.cancel(v-if="scope.row.StateCode != 1 && scope.row.StateCode != 3 && $store.state.member.user_page_auth.Add_Auth==1", @click='handleStopComfirm_test("03",scope.row.OrderId,scope.row.Amount)', type='text') 拒絕
            el-table-column(v-else, prop='title', label='操作', width='180',:render-header="renderheader",fixed="right")
              template(slot-scope='scope')
                a.links(@click='get_log(scope.row.OrderId)', type='text') 紀錄
                a.success(v-if="scope.row.StateCode == 2 && $store.state.member.user_page_auth.Add_Auth==1", @click='order_id = scope.row.OrderId; dialogFormVisible = true', type='text') 成功
                a.cancel(v-if="scope.row.StateCode != 1 && scope.row.StateCode != 3 && $store.state.member.user_page_auth.Add_Auth==1", @click='handleStopComfirm(scope.row.OrderId)', type='text') 拒絕
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--logDialog
    el-dialog(title='狀態變更紀錄', :visible.sync='logDialog')
      el-form.mr-3()
        el-table.mr-3(:data='logData')
          el-table-column(property='Sn', label='#', width='100')
          el-table-column(property='Create_At', label='更新時間', width='180')
          el-table-column(property='ExcuteUserName', label='操作人', width='120')
          el-table-column(property='StateName', label='狀態')
    el-dialog(:visible.sync='dialogFormVisible', width='40%', @close="order_form.note=''")
      .dialog-header(slot='title')
        h5
          span 是否確定將訂單 
          span(class="font-weight-bold") {{order_id}} 
          span 改為成功？(仍會確認FDI狀態)
      el-form.mr-3(:model="order_form", :rules="order_rules", ref="order_form", status-icon)
        el-form-item(label='備註', label-width='88px', prop="note")
          el-input(v-model='order_form.note')
      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false') 取 消
        el-button(type='primary', @click='success_order()', :loading='lock_btn') 确 定
</template>
<script>
export default {
  name: "tgAgencyDepositList",
  mounted() {
    let self = this;
    axios({
      method: "post",
      url: process.env.VUE_APP_APIHOST + "Admin/QueryConditions",
      data: {}
    })
      .then(function(response) {
        self.pay_type_option = response.data.data.deposit;
        self.payment_state_type_option = response.data.data.PaymentStateCode;
        // console.log(response.data.data.deposit);
      })
      .catch(function(error) {
        self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        // console.log(error);
      })
      .finally(function() {
        self.get_data(1);
      });
  },
  data() {
    return {
      platform: process.env.VUE_APP_PLATFORM,
      tableData: [],
      logData: [],
      pay_type_option: [],
      payment_state_type_option: [],
      now_page: 1,
      page_size: 10,
      total_page: 0,
      search_account: "",
      search_time_range: null,
      search_order_id: "",
      search_pay_type: "",
      search_status: "",
      toggletosee: false,
      logDialog: false,
      eventDialog: false,
      lock_btn: false,
      dialogFormVisible: false,
      order_id: "",
      form: {
        account: "",
        group: "",
        content: "",
        images: "",
        file_list: [],
        order_id: ""
      },
      rules: {
        group: [
          {
            required: true,
            message: "請選擇事件類型",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "請填寫事件說明",
            trigger: "change"
          }
        ]
      },
      order_form: {
        note: ""
      },
      order_rules: {
        note: [
          {
            required: true,
            message: "請填寫備註",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    get_data(now_page) {
      let self = this;
      self.lock_btn = true;
      if (self.search_time_range == null) {
        let today = new Date();
        let last;
        let y = today.getFullYear();
        let m = today.getMonth() + 1;
        let d = today.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        let date_s = y + "-" + m + "-" + d;
        let date_e = y + "-" + m + "-" + d;

        last = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        y = last.getFullYear();
        m = last.getMonth() + 1;
        d = last.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        date_s = y + "-" + m + "-" + d;

        self.search_time_range = [date_s + " 00:00:00", date_e + " 23:59:59"];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/QueryOrder_Admin",
        data: {
          AgencyId: self.search_account,
          DateTime_S: self.search_time_range[0],
          DateTime_E: self.search_time_range[1],
          OrderId: self.search_order_id,
          PayChannelId: self.search_pay_type,
          StateCode: self.search_status.toString(),
          PayType: 1,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            switch (item["StateCode"]) {
              case "0":
                item["color"] = "primary";
                break;
              case "1":
                item["color"] = "success";
                break;
              case "2":
                item["color"] = "warning";
                break;
              case "3":
                item["color"] = "danger";
                break;
            }
            item["StateCode_str"] =
              self.payment_state_type_option[item["StateCode"]];
            item["Event"] = [];
            if (item["EventSn"] != null) {
              JSON.parse(item["EventSn"]).forEach(function(
                event_item,
                event_index,
                event_array
              ) {
                item["Event"].push(event_item.Sn);
              });
            }

            item["Device_str"] = "";
            switch (item["Device"]) {
              case "0":
                item["Device_str"] = "pc";
                break;
              case "1":
                item["Device_str"] = "MobleIos";
                break;
              case "2":
                item["Device_str"] = "MobileAndroid";
                break;
              case "3":
                item["Device_str"] = "AppIos";
                break;
              case "4":
                item["Device_str"] = "AppAndroid";
                break;
            }
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    get_log(order_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/GetModifyLog",
        data: {
          OrderId: order_id
        }
      })
        .then(function(response) {
          self.logDialog = true;
          self.logData = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.form.account = "";
      this.form.group = "";
      this.form.content = "";
      this.form.images = "";
      this.form.file_list = [];
      this.form.order_id = "";
    },
    set_file(param) {
      this.form.images = param.file;
    },
    remove_file() {
      this.form.images = "";
    },
    handleStopComfirm_test(status, order_id, amount) {
      let self = this;
      this.$confirm(
        "請確認是否" + (status == "02" ? "通過" : "拒絕") + "該筆存款？",
        (status == "02" ? "通過" : "拒絕") +
          `確認(${process.env.VUE_APP_PLATFORM}環境)`,
        {
          confirmButtonText: "確認",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          self.update_status_test(status, order_id, amount);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消" + (status == "02" ? "通過" : "拒絕")
          });
        });
    },
    update_status_test(status, order_id, amount) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Payment_Page/TestPayNotice",
        data: {
          StatusCode: status,
          OrderId: order_id,
          Amount: amount,
          Fee: 1
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data(self.now_page);
            self.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            self.$message.error("修改失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    handleStopComfirm(order_id) {
      let self = this;
      this.$confirm("請確認是否拒絕該筆存款？", "拒絕確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.update_status(order_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消拒絕"
          });
        });
    },
    update_status(order_id) {
      let self = this;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Agency_Payment/TransactionChangeError",
        data: {
          OrderId: order_id
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data(self.now_page);
            self.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            self.$message.error("修改失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    success_order() {
      let self = this;
      this.$refs["order_form"].validate(async valid => {
        if (valid) {
          self.lock_btn = true;
          return axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Agency_Payment/TransactionResend",
            data: {
              OrderId: self.order_id,
              Note: self.order_form.note
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(self.now_page);
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
                self.dialogFormVisible = false;
                self.order_id = "";
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
            });
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (index === 6) {
              return (parseFloat(prev) + parseFloat(curr)).toFixed(2);
            }
          }, 0);
          if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
            sums[index] = sums[index]
              .toString()
              .replace(
                /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
                (all, pre, groupOf3Digital) =>
                  pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
              );
          }
        }
      });
      return sums;
    },
    renderheader(h, { column, $index }) {
      return h("span", {}, [
        h("span", {}, column.label.split("/")[0]),
        h("br"),
        h("span", {}, column.label.split("/")[1])
      ]);
    }
  }
};
</script>