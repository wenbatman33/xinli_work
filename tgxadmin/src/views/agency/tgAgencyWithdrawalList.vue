<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理提款管理 / Withdrawal Management
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入代理帳號 / Agency Member Account', v-model='search_account', @keyup.enter.native="get_data(1)")
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
            el-form(v-show='toggletosee', ref='form', :model='form', label-width='80px', label-position='left')
              .row
                div.px-1.py-1(:style='width="400"')
                  el-form-item.en_label(label='日期區間 / Date')
                    el-date-picker(size="medium", v-model='search_time_range', type='datetimerange', range-separator='至', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']", clearable)
                .col-md-6.col-12
                  el-form-item.en_label(label='交易單號 / Transaction ID')
                    el-input(size="medium", v-model='search_order_id', placeholder='請輸入單號')
                .col-md-6.col-12
                  el-form-item.en_label(label='提款方式 / Model')
                    el-select(size="medium", v-model='search_pay_type', filterable='', placeholder='選擇提款方式', clearable)
                      el-option(label='全部', value='' )
                      el-option(v-for='item in pay_type_option', :key='item.ChannelId', :label='item.ChannelName', :value='item.ChannelId')
                .col-md-6.col-12
                  el-form-item.en_label(label='提款狀態 / Status')
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
            el-table-column(prop='Create_At', label='申請時間 / Transaction Date', width='170', align='right',:render-header="renderheader")
            el-table-column(prop='FeedbackTime', label='匯款時間 / Posting Date', width='170', align='right',:render-header="renderheader")
            el-table-column(label='狀態 / Status', width='100', align='center',:render-header="renderheader")
              template(slot-scope='scope')
                el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.StateCode_str}}
            el-table-column(prop='ChannelName', label='提款方式 / Model', width='110', align='center',:render-header="renderheader")
            el-table-column(prop='AgencyId', label='代理帳號 / AgencyId', width='100', align='center',:render-header="renderheader")
            el-table-column(prop='AgencyRealName', label='姓名 / AgencyRealName', width='100', align='center',:render-header="renderheader")
            el-table-column(prop='AgencyName', label='代理名稱 / Agency Name', width='100', align='center',:render-header="renderheader")
            el-table-column(prop='BankName', label='收款銀行 / Member Bank', width='120', align='center',:render-header="renderheader")
            el-table-column(prop='MemberAccount', label='銀行帳號 / Bank No', width='180', align='center',:render-header="renderheader")
            el-table-column(prop='Amount', label='提款金額 / Amount', width='100', align='right',:render-header="renderheader")
              template(slot-scope='scope')
                span {{scope.row.Amount | commaFormat}}
            el-table-column(prop='Fee', label='手續費 / Charge Amount', width='80', align='right',:render-header="renderheader")
              template(slot-scope='scope')
                span {{scope.row.Fee | commaFormat}}
            el-table-column(prop='OrderId', label='交易單號 / Transaction ID', width='220', align='center',:render-header="renderheader")
            el-table-column(prop='Device_str', label='裝置類型　/ Device', width='70', align='center',:render-header="renderheader")
            el-table-column(prop='Update_At', label='更新時間 / Last Update', width='170', align='right',:render-header="renderheader")                  
            el-table-column(prop='title', label='進度 / Stage', align='center', width='70',:render-header="renderheader")
              template(slot-scope='scope')
                el-button(v-if="scope.row.StateCode == 0 && $store.state.member.user_page_auth.Add_Auth==1", @click='order_info = scope.row ,check_order_process_status()',size='mini', type='primary') 
                  span(v-if="scope.row.ProcessStaff == 0") 處理
                  span(v-if="scope.row.ProcessStaff != 0") 處理中
                el-button(v-else, @click='order_info = scope.row, show_order()',size='mini') 檢視                  
            el-table-column(prop='title', label='操作 / Action', width='150',:render-header="renderheader",fixed="right")
              template(slot-scope='scope')
                a.links(@click='get_log(scope.row.OrderId)', type='text') 紀錄
            
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
    //--dealDialog
    el-dialog.withd-dialog(title='處理提款', :visible.sync='dealDialog', :before-close='handleClose', @close="init_dialog('deal')")
      el-form.mr-3(ref="deal")
        h6.dialog-title 交易明細
        .row.pt-2
          span.col-sm-12.col-md-3.mb-3.d-flex 交易單號：{{order_detail.OrderId}}
          span.col-sm-12.col-md-3.mb-3.d-flex 代理帳號：{{order_detail.AgencyId}}
          span.col-sm-12.col-md-3.mb-3.d-flex 申請時間：{{order_detail.ApplyTime}}
          .col-sm-12.col-md-3.mb-3.d-flex 
            span 提款金額：
            span.blue-style {{order_detail.Amount}}
        h6.dialog-title 提款資訊
        .row.pt-2
          .col-sm-12.col-md-3.mb-3.d-flex
            span.mr-2 系統建議：
              el-tag(v-if="order_detail.Suggest== 1", size='medium', type='success') 通過
              el-tag(v-else, size='medium', type='danger') 拒絕
          .col-sm-12.col-md-9.mb-3.d-flex
            span.mr-2 備註：
              span {{ order_detail.Note }}
          .col-sm-12.col-md-3.mb-3.d-flex
            span.mr-1 錢包餘額：
              span.mr-2.sucess-style(v-if="order_detail.CheckWalletCash== 1") {{order_detail.WalletCash}}
              span.mr-2.error-style(v-else) {{order_detail.WalletCash}}
              i.el-icon-circle-check-outline.sucess-style(v-if="order_detail.CheckWalletCash== 1")
              i.el-icon-circle-close-outline.error-style(v-else)  
        h6.dialog-title.mt-3 資金異動( 計算區間：{{order_detail.CheckTime_S}} ~ {{order_detail.CheckTime_E}} )
        el-table.mr-3(:data='transData')
          el-table-column(prop='Create_At', label='時間', width='180')
          el-table-column(prop='ModifyType_str', label='類型', width='140')
          el-table-column(prop='ModifyCash', label='金額', width='140', align='right')
          el-table-column(prop='WithDrawMultiple', label='流水倍數', width='140', align='right')
          el-table-column(prop='WithDrawLimit', label='流水限制', width='140', align='right')
          el-table-column(label='備註')
            template(slot-scope='scope')
              span(v-if="scope.row.ModifyType == '1'") {{scope.row.TotalCash}}
              span(v-else) {{scope.row.OfferName}}
      el-dialog(width='30%', top='35vh', :visible.sync='dealcomfirm', append-to-body='')
        span 請確認是否送出處理結果？
        .dialog-footer(slot='footer')
          el-button(@click='dealcomfirm = false') 取 消
          el-button(type='primary', @click='pass_order()') 確 認
      .dialog-footer(slot='footer')
        el-button(type='danger', @click='handleStopComfirm()') 拒 絕
        el-button(type='success', @click='dealcomfirm = true') 通 過
    //--readDealDialog
    el-dialog.withd-dialog(title='處理提款', :visible.sync='readDealDialog', @close="init_dialog('deal_read')")
      el-form.mr-3(ref="deal_read")
        h6.dialog-title 交易明細
        .row.pt-2
          span.col-sm-12.col-md-3.mb-3.d-flex 交易單號：{{order_detail.OrderId}}
          span.col-sm-12.col-md-3.mb-3.d-flex 代理帳號：{{order_detail.AgencyId}}
          span.col-sm-12.col-md-3.mb-3.d-flex 申請時間：{{order_detail.ApplyTime}}
          .col-sm-12.col-md-3.mb-3.d-flex 
            span 提款金額：
            span.blue-style {{order_detail.Amount}}
          span.col-sm-12.col-md-6.mb-3.d-flex 流水計算區間：{{order_detail.CheckTime_SS}} ~ {{order_detail.CheckTime_EE}}
          el-button.col-sm-12.col-md-3.mb-3.pl-3.d-flex(style='padding:0', type='text', @click="search_serial_log()") 查看各平台流水
        h6.dialog-title 提款資訊
        .row.pt-2
          .col-sm-12.col-md-3.mb-3.d-flex
            span.mr-2 系統建議：
              el-tag(v-if="order_detail.Suggest== 1", size='medium', type='success') 通過
              el-tag(v-else, size='medium', type='danger') 拒絕
          .col-sm-12.col-md-9.mb-3.d-flex
            span.mr-2 備註：
              span {{ order_detail.Note }}
          .col-sm-12.col-md-3.mb-3.d-flex
            el-tooltip.item(effect='dark', placement='top')
              div(slot='content', v-if="order_detail.TradeLimit")
                | 單筆上限：{{order_detail.TradeLimit.SingleMin}}
                br
                | 單筆下限：{{order_detail.TradeLimit.SingleMax}}
                br
                | 單日累計上限：{{order_detail.TradeLimit.TodayMax}}
                br
                | 本日當前累計：{{order_detail.TradeLimit.TransferTotal}}
              span 提款限額：
                span.mr-2.sucess-style(v-if="order_detail.CheckTradeLimit== 1")
                span.mr-2.error-style(v-else)
                i.el-icon-circle-check-outline.sucess-style(v-if="order_detail.CheckTradeLimit== 1")
                i.el-icon-circle-close-outline.error-style(v-else)  
          .col-sm-12.col-md-3.mb-3.d-flex
            span.mr-1 錢包餘額：
              span.mr-2.sucess-style(v-if="order_detail.CheckWalletCash== 1") {{order_detail.WalletCash}}
              span.mr-2.error-style(v-else) {{order_detail.WalletCash}}
              i.el-icon-circle-check-outline.sucess-style(v-if="order_detail.CheckWalletCash== 1")
              i.el-icon-circle-close-outline.error-style(v-else)  
          .col-sm-12.col-md-3.mb-3.d-flex
            el-tooltip.item(effect='dark', placement='top')
              div(slot='content')
                | 流水總限制：{{order_detail.SerialLimit}}
                br
                | 實際總流水：{{order_detail.SerialToTal}}
                br
                | 有效總流水：{{order_detail.EffectiveSerialToTal}}
              span.mr-1 流水差額：
                span.mr-2.sucess-style(v-if="order_detail.CheckSerial== 1") {{order_detail.SerialDiff}}
                span.mr-2.error-style(v-else) {{order_detail.SerialDiff}}
                i.el-icon-circle-check-outline.sucess-style(v-if="order_detail.CheckSerial== 1")
                i.el-icon-circle-close-outline.error-style(v-else)  
        h6.dialog-title.mt-3 資金異動 ( 計算區間：{{order_detail.CheckTime_S}} ~ {{order_detail.CheckTime_E}} )
        el-table.mr-3(:data='transData')
          el-table-column(prop='Create_At', label='時間 / Date', width='180')
          el-table-column(prop='ModifyType_str', label='類型 / Model', width='140')
          el-table-column(prop='ModifyCash', label='金額 / Amount', width='140', align='right')
          el-table-column(prop='WithDrawMultiple', label='流水倍數 / Multiple', width='160', align='right')
          el-table-column(prop='WithDrawLimit', label='流水限制 / Limit', width='140', align='right')
          el-table-column(label='備註')
            template(slot-scope='scope')
              span(v-if="scope.row.ModifyType == '1'") {{scope.row.TotalCash}}
              span(v-else) {{scope.row.OfferName}}
      .dialog-footer(v-if="(order_info.StateCode == 2) && $store.state.member.user_page_auth.Add_Auth==1", slot='footer')
        el-button(type='danger', @click='process_type=0; dialogFormVisible = true') 失 敗
        el-button(type='success', @click='process_type=1; dialogFormVisible = true') 成 功
    //--dealedDialog
    el-dialog(title='處理提款', width='30%', top='35vh', :visible.sync='dealedDialog')
      i.pr-2.el-icon-info
      span 交易目前由 {{order_process_user}} 處理中
      .dialog-footer(slot='footer')
        el-button(type='primary', @click="update_order_process_status('1')") 接手處理
        el-button(type='', @click='dealedDialog = false') 取 消
    el-dialog(:visible.sync='dialogFormVisible', width='40%', @close="order_form.note=''")
      .dialog-header(slot='title')
        h5
          span 是否確定將訂單 
          span(class="font-weight-bold") {{order_info.OrderId}} 
          span 改為
          span.text-danger(class="font-weight-bold")  {{ (process_type==1) ? '成功':'失敗' }}
          span ？(仍會確認FDI狀態)
      el-form.mr-3(:model="order_form", :rules="order_rules", ref="order_form", status-icon)
        el-form-item(label='備註', label-width='88px', prop="note")
          el-input(v-model='order_form.note')
      .dialog-footer(slot='footer')
        el-button(@click='dialogFormVisible = false') 取 消
        el-button(type='primary', @click='process_order()', :loading='lock_btn') 确 定
</template>
<script>
export default {
  name: "tgWithdrawalList",
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
      tableData: [],
      logData: [],
      transData: [],
      pay_type_option: [],
      payment_state_type_option: [],
      event_group_option: [],
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
      dealDialog: false,
      dealcomfirm: false,
      dealedDialog: false,
      readDealDialog: false,
      dialogFormVisible: false,
      lock_btn: false,
      order_process_user: "",
      order_info: "",
      order_detail: "",
      process_type: "",
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
          StateCode: self.search_status,
          PayType: 2,
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
      this.order_info = "";
      this.order_detail = "";
    },
    check_order_process_status() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/QueryOrderProcess",
        data: {
          OrderId: self.order_info.OrderId
        }
      })
        .then(async function(response) {
          if (
            response.data.data.admin_userid > 0 &&
            response.data.data.admin_userid !=
              self.$store.state.member.user_info.admin_userid
          ) {
            self.order_process_user = response.data.data.admin_username;
            self.dealedDialog = true;
          } else {
            await self.get_order_detail();
            self.get_trans_log();
            self.update_order_process_status("1");
            self.dealDialog = true;
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    async show_order() {
      await this.get_order_detail();
      this.get_trans_log();
      this.readDealDialog = true;
    },
    get_order_detail() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/CheckPayoutData",
        data: {
          OrderId: self.order_info.OrderId
        }
      })
        .then(function(response) {
          self.order_detail = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_trans_log() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_WalletAll/GetCashLog",
        data: {
          AgencyId: self.order_info.AgencyId,
          Date_S: self.order_detail.CheckTime_S,
          Date_E: self.order_detail.CheckTime_E
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

            let OfferName = [];
            if (item["OfferName"]) {
              OfferName.push(item["OfferName"]);
            }
            if (item["ChannelName"]) {
              OfferName.push(item["ChannelName"]);
            }
            if (item["Notes"]) {
              OfferName.push(item["Notes"]);
            }
            item["OfferName"] = OfferName.join(",");
          });
          self.transData = response.data.data.data_list;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_order_process_status(lock_status) {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/UpdateOrderProcess",
        data: {
          OrderId: self.order_info.OrderId,
          Lock: lock_status
        }
      })
        .then(async function(response) {
          if (lock_status == 1) {
            await self.get_order_detail();
            await self.get_trans_log();
            self.dealDialog = true;
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.dealedDialog = false;
        });
    },
    handleClose(done) {
      let self = this;
      this.$confirm("確認放棄處理，該筆提款仍維持「待處理」？", {
        confirmButtonText: "確 認",
        cancelButtonText: "取 消",
        type: "warning"
      })
        .then(function(response) {
          self.update_order_process_status("0");
          done();
        })
        .catch(_ => {});
    },
    search_serial_log() {
      let self = this;
      let routeData = self.$router.resolve({
        name: "tgAgencyWithdrawalInfo",
        query: {
          OrderId: self.order_info.OrderId,
          AgencyId: self.order_info.AgencyId,
          Date_S: self.order_detail.CheckTime_SS,
          Date_E: self.order_detail.CheckTime_EE
        }
      });
      window.open(routeData.href, "流水摘要", "height=750,width=1300");
    },
    get_order_process_status() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/QueryOrderProcess",
        data: {
          OrderId: self.order_info.OrderId
        }
      })
        .then(async function(response) {
          return response.data.data;

          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    async pass_order() {
      let self = this;
      let process_status = await self.get_order_process_status();
      if (
        process_status.admin_userid == 0 ||
        process_status.admin_userid ==
          self.$store.state.member.user_info.admin_userid
      ) {
        return axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "Agency_Payment/Payout",
          data: {
            OrderId: self.order_info.OrderId
          }
        })
          .then(async function(response) {
            if (response.data.status) {
              self.get_data(1);
              self.$message({
                message: "修改成功",
                type: "success"
              });
            } else {
              self.$message.error("修改失敗： " + response.data.error_message);
            }
            // console.log(response);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          })
          .finally(function() {
            self.dealcomfirm = false;
            self.dealDialog = false;
          });
      } else {
        self.order_process_user = process_status.admin_username;
        self.dealedDialog = true;
      }
    },
    async reject_order(remark) {
      let self = this;
      let process_status = await self.get_order_process_status();
      if (
        process_status.admin_userid == 0 ||
        process_status.admin_userid ==
          self.$store.state.member.user_info.admin_userid
      ) {
        return axios({
          method: "post",
          url:
            process.env.VUE_APP_APIHOST +
            "Agency_Payment/TransactionChangeError",
          data: {
            OrderId: self.order_info.OrderId,
            Note: remark
          }
        })
          .then(async function(response) {
            if (response.data.status) {
              self.get_data(1);
              self.$message({
                message: "提款拒絕成功",
                type: "success"
              });
            } else {
              self.$message.error(
                "提款拒絕失敗： " + response.data.error_message
              );
            }
            // console.log(response);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          })
          .finally(function() {
            self.dealDialog = false;
          });
      } else {
        self.order_process_user = process_status.admin_username;
        self.dealedDialog = true;
      }
    },
    handleStopComfirm() {
      this.$prompt("請確認是否拒絕該筆提款？", "拒絕確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        inputPlaceholder: "請輸入備註"
      })
        .then(({ value }) => {
          this.reject_order(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消拒絕"
          });
        });
    },
    process_order() {
      let self = this;
      this.$refs["order_form"].validate(async valid => {
        if (valid) {
          if (self.process_type == 1) {
            await self.success_order();
          } else {
            await self.fail_order(self.order_form.note);
          }
          self.process_type = "";
          self.dialogFormVisible = false;
        }
      });
    },
    async success_order() {
      let self = this;
      self.lock_btn = true;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_Payment/TransactionResend",
        data: {
          OrderId: self.order_info.OrderId,
          Note: self.order_form.note
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data(1);
            self.$message({
              message: "更新成功",
              type: "success"
            });
            self.readDealDialog = false;
          } else {
            self.$message.error("更新失敗： " + response.data.error_message);
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
    },
    async fail_order(remark) {
      let self = this;
      return axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Agency_Payment/TransactionChangeError",
        data: {
          OrderId: self.order_info.OrderId,
          Note: remark
        }
      })
        .then(async function(response) {
          if (response.data.status) {
            self.get_data(1);
            self.$message({
              message: "提款拒絕成功",
              type: "success"
            });
          } else {
            self.$message.error(
              "提款拒絕失敗： " + response.data.error_message
            );
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.readDealDialog = false;
          self.lock_btn = false;
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
            if (index === 8 || index === 9) {
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
