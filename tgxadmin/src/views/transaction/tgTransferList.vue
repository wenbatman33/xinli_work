<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 轉帳紀錄
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入會員帳號', v-model='search_account', @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)")
      .col-md-1.col-12.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee', transition="fade") 進階搜尋
          i.el-icon-arrow-down.el-icon--right
    //--advance search
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', ref='form', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='日期區間')
                    el-date-picker(size="medium", v-model='search_time_range', type='datetimerange', range-separator='至', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']", clearable)
                .col-md-6.col-12
                  el-form-item(label='交易單號')
                    el-input(size="medium", v-model='search_transfer_id', placeholder='請輸入單號')
                .col-md-6.col-12
                  el-form-item(label='轉帳方式')
                    el-select(size="medium", v-model='search_transfer_type', filterable='', placeholder='選擇轉帳方式', clearable)
                      el-option(label='轉出', value='1')
                      el-option(label='轉入', value='2')
                .col-md-6.col-12
                  el-form-item(label='遊戲平台')
                    el-select(size="medium", v-model='search_game_group', filterable='', placeholder='選擇遊戲平台', clearable)
                      el-option(v-for='item in game_group_option', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='轉帳狀態')
                    el-select(size="medium", v-model='search_transfer_status', filterable='', placeholder='選擇交易狀態', clearable)
                      el-option(label='審核中', value='1')
                      el-option(label='成功', value='3')
                      el-option(label='失敗', value='4')
                .col-md-6.col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='TrasferOrderId', label='交易平台單號', width='200')
            el-table-column(label='狀態', width='90', align='center')
              template(slot-scope='scope')
                el-button(v-if="scope.row.StateCode == 1 || scope.row.StateCode == 3 ", :type='scope.row.color', size="small", plain, @click="selected_row=scope.row; setDialog=true") {{scope.row.StateCode_str}}
                el-tag(v-else, :type="scope.row.color", disable-transitions='') {{scope.row.StateCode_str}}
            el-table-column(label='會員帳號', width='150')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(label='轉出錢包', width='80', align='center')
              template(slot-scope="scope" )
                span(v-if="scope.row.ModifyCash > 0") {{ scope.row.ChannelName }}
                span(v-if="scope.row.ModifyCash < 0") 中心钱包
            el-table-column(label='轉入錢包', width='80', align='center')
              template(slot-scope="scope" )
                span(v-if="scope.row.ModifyCash > 0") 中心钱包
                span(v-if="scope.row.ModifyCash < 0") {{ scope.row.ChannelName }}
            el-table-column(prop='OldCash', label='交易前', width='120', align='right')
            el-table-column(prop='NewCash', label='交易後', width='120', align='right')
            el-table-column(prop='ModifyCash', label='金額', width='120', align='right')
            el-table-column(prop='FeedbackTrasfer', label='轉帳時間', width='170')
            el-table-column(prop='Notes', label='備註')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    el-dialog(title='轉帳異常補分操作', :visible.sync='setDialog', @close="init_dialog('form')")
      el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
        el-form-item(label='交易平台單號', label-width="100px" ,label-position='left')
          span {{selected_row.TrasferOrderId}}  
        el-form-item(label='補分', label-width="100px" ,label-position='left')
          span {{Math.abs(selected_row.ModifyCash)}}  
        el-form-item(label='備註', prop="remark" , label-width="100px" ,label-position='left')
          el-input(v-model='form.remark', placeholder='輸入備註內容', type='textarea', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='setDialog = false') 取消
        el-button(type='primary', @click='recheck()', :loading='lock_btn') 確認補分
</template>
<script>
export default {
  name: "tgTransferList",
  mounted() {
    this.get_game_group_option();
  },
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d;
    let date_e = y + "-" + m + "-" + d;

    return {
      tableData: [],
      gridData: [],
      game_group_option: [],
      now_page: 1,
      page_size: 100,
      total_page: 0,
      search_account: "",
      search_time_range: [date_s + " 00:00:00", date_e + " 23:59:59"],
      search_transfer_id: "",
      search_transfer_type: "",
      search_game_group: "",
      search_transfer_status: "",
      setDialog: false,
      toggletosee: false,
      logDialog: false,
      lock_btn: false,
      selected_row: "",
      form: {
        remark: ""
      },
      rules: {
        remark: [
          {
            required: true,
            message: "請填寫備註內容",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    get_game_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.game_group_option.push({
              value: item.GroupId,
              label: item.GroupName
            });
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_data(now_page) {
      let self = this;
      if (self.search_account) {
        self.lock_btn = true;
        if (self.search_time_range == null) {
          self.search_time_range = [];
        }
        axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "WalletAll/GetCashLog/trans",
          data: {
            UserId: 1,
            UserName: self.search_account,
            Date_S: self.search_time_range[0],
            Date_E: self.search_time_range[1],
            TrasferType: self.search_transfer_type,
            GameGroupId: self.search_game_group,
            Status: self.search_transfer_status,
            TrasferOrderId: self.search_transfer_id,
            Page: now_page,
            PageLimit: self.page_size
          }
        })
          .then(function(response) {
            response.data.data.data_list.forEach(function(item, index, array) {
              item["StateCode_str"] =
                response.data.other.StateCode[item["StateCode"]];
              switch (item["StateCode"]) {
                case "1":
                  item["color"] = "primary";
                  break;
                case "2":
                  item["color"] = "warning";
                  break;
                case "3":
                case "6":
                  item["color"] = "success";
                  break;
                case "4":
                case "6":
                  item["color"] = "danger";
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
      } else {
        self.$message.error("請輸入會員帳號");
      }
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.form.remark = "";
    },
    recheck() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "WalletAll/TransferRecheck",
            data: {
              UserId: self.selected_row.UserId,
              Sn: self.selected_row.Sn,
              Notes: self.form.remark
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(1);
                self.$message({
                  message: "修改成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "修改失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.setDialog = false;
            });
        }
      });
    }
  }
};
</script>
