<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 郵件&簡訊紀錄
    .row.no-gutters.px-3.py-3
      .col-md-3.col-12.px-1.py-1
        el-select(size="medium", v-model='search_validate_type', filterable='', placeholder='選擇驗證類型', clearable, @change="get_data(1)")
          el-option(label='email驗證', value="1")
          el-option(label='電話驗證', value="2")
          el-option(label='忘記密碼', value="3")
          el-option(label='18轉帳驗證', value="4")
      .col-md-4.col-12.px-1.py-1
        el-input(size='medium', placeholder='輸入搜尋內容', v-model='search_content',@keyup.enter.native='get_data(1)', clearable)
          el-select.select-input-style(v-model='search_field', slot='prepend', placeholder='驗證資料', clearable)
            el-option(label='會員帳號', value="1")
            el-option(label='手機', value="2")
            el-option(label='email', value="3")
      .col-md-4.col-12.px-1.py-1
        el-date-picker(size='medium', v-model='search_time_range', type='daterange', align='right', value-format="yyyy-MM-dd", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium", type='primary', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(label='會員帳號')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='Type_str', label='類型')
            el-table-column(prop='VertifyInfo', label='驗證資料')
            el-table-column(prop='Create_At', label='送出時間', width='170')
            el-table-column(prop='VertifyTime', label='完成驗證時間', width='170')
            el-table-column(prop='Code', label='確認碼')
            el-table-column(prop='VertifyStatus_str', label='驗證狀態', width='80', align='center')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
let Today = new Date();
let month = Today.getMonth() + 1;
month = ("0" + month).slice(-2);
let TodayStr =
  Today.getFullYear() + "-" + month + "-" + ("0" + Today.getDate()).slice(-2);

let week = new Date(Today.getTime() - 6 * 24 * 60 * 60 * 1000);
month = week.getMonth() + 1;
month = ("0" + month).slice(-2);
let weekStr =
  week.getFullYear() + "-" + month + "-" + ("0" + week.getDate()).slice(-2);
export default {
  name: "tgSmsAndMail",
  mounted() {
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      search_validate_type: "",
      search_field: "1",
      search_content: "",
      search_time_range: [weekStr, TodayStr],
      now_page: 1,
      page_size: 100,
      total_page: 0,
      lock_btn: false
    };
  },
  computed: {},
  methods: {
    get_data(now_page) {
      let self = this;
      self.lock_btn = true;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      let search_field_str;
      switch (self.search_field) {
        case "1":
          search_field_str = "UserName";
          break;
        case "2":
        case "3":
          search_field_str = "VertifyInfo";
          break;
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberVertifyList",
        data: {
          Method: "List",
          Type: self.search_validate_type,
          [search_field_str]: self.search_content,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            switch (item["VertifyStatus"]) {
              case "0":
                item["VertifyStatus_str"] = "未過";
                break;
              case "1":
                item["VertifyStatus_str"] = "已過";
                break;
              case "2":
                item["VertifyStatus_str"] = "失效";
                break;
            }
            switch (item["Type"]) {
              case "1":
                item["Type_str"] = "email驗證";
                break;
              case "2":
                item["Type_str"] = "電話驗證";
                break;
              case "3":
                item["Type_str"] = "忘記密碼";
                break;
              case "4":
                item["Type_str"] = "18轉帳驗證";
                break;
            }
            if (item["PhoneVertifyType"] == 1) {
              item["Type_str"] += "(簡訊)";
            } else if (item["PhoneVertifyType"] == 2) {
              item["Type_str"] += "(語音)";
            }
            if (item["VertifyCompany"] && item["VertifyCompany"] != "") {
              item["Type_str"] += "(" + item["VertifyCompany"] + ")";
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