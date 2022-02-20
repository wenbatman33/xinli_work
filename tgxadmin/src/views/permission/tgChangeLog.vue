<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 異動紀錄
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入異動者帳號', v-model='search_exec_name',@keyup.enter.native="get_data(1)", clearable)
          el-select.select-input-style(v-model='search_log_type', slot='prepend', placeholder='選擇紀錄類型', @change="get_data(1)")
            el-option(label='後台', value="1")
            el-option(label='遊戲', value="2")
            el-option(label='會員', value="3")
            el-option(label='支付', value="4")
            el-option(label='錢包', value="5")
            el-option(label='網站', value="6")
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
            el-form(v-show='toggletosee', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='日期區間')
                    el-date-picker(size="medium", v-model='search_time_range', type='daterange', value-format="yyyy-MM-dd", range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期')
                .col-md-6.col-12
                  el-form-item(label='異動類型')
                    el-select(size="medium", v-model='search_action_type', filterable='', placeholder='選擇異動類型', clearable)
                      el-option(label='所有', value="")
                      el-option(label='新增', value="I")
                      el-option(label='修改', value="U")
                      el-option(label='刪除', value="D")
                      el-option(label='取代', value="R")
                .col-md-6.col-12
                  el-form-item(label='被異動者')
                      el-input(size="medium", v-model='search_be_exec_name', placeholder='輸入被異動者帳號', clearable)
                .col-md-6.col-12
                  el-form-item(label='備註')
                      el-input(size="medium", v-model='search_remark', placeholder='輸入備註', clearable)
                .col-md-6.col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='ActionName', label='異動表', width='140')
            el-table-column(prop='ActionIdName', label='異動欄位', width='80', align='center')
            el-table-column(prop='ActionId', label='異動值', width='70', align='center')
            el-table-column(prop='ActionType', label='異動類型', width='80', align='center')
            el-table-column(prop='BeforeValue', label='異動前')
            el-table-column(prop='AfterValue', label='異動後')
            el-table-column(prop='ExcuteUserName', label='異動者', width='180')
            el-table-column(prop='Create_At', label='異動時間', width='170')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgChangeLog",
  mounted() {
    if (this.$route.query.username) {
      this.search_exec_name = this.$route.query.username;
    }
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      now_page: 1,
      page_size: 30,
      total_page: 0,
      lock_btn: false,
      search_be_exec_name: "",
      search_log_type: "1",
      search_time_range: null,
      search_action_type: "",
      search_exec_name: "",
      search_remark: "",
      toggletosee: false
    };
  },
  computed: {},
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

        last = new Date(today.getTime() - (365 / 12) * 24 * 60 * 60 * 1000);
        y = last.getFullYear();
        m = last.getMonth() + 1;
        d = last.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        date_s = y + "-" + m + "-" + d;

        self.search_time_range = [date_s, date_e];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryChangeLog/",
        data: {
          ActionUserName: self.search_be_exec_name,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          Type: self.search_log_type,
          ActionType: self.search_action_type,
          ExcuteUserName: self.search_exec_name,
          Note: self.search_remark,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            if (item.ActionType == "I") {
              item.ActionType = "新增";
            } else if (item.ActionType == "U") {
              item.ActionType = "修改";
            } else if (item.ActionType == "D") {
              item.ActionType = "刪除";
            } else if (item.ActionType == "R") {
              item.ActionType = "取代";
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
    }
  }
};
</script>
