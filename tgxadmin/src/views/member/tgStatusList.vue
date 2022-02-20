<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 狀態紀錄
    .row.no-gutters.px-3.py-3
      .col-md-4.col-12.px-1.py-1
        el-input(size='medium', v-model='search_account', placeholder='輸入會員帳號', clearable)
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-4.col-12.px-1.py-1
        el-select(size='medium', v-model='search_status_Name', placeholder='選擇狀態名稱', clearable)
          el-option(label='登入狀態', value="1")
          el-option(label='存款狀態', value="2")
          el-option(label='第三方存款狀態', value="3")
          el-option(label='提款狀態', value="4")
      .col-md-4.col-12.px-1.py-1
        el-select(size='medium', v-model='search_status', placeholder='選擇狀態設定', clearable)
          el-option(label='凍結', value="0")
          el-option(label='正常', value="1")
          el-option(label='登入鎖定', value="2")
      .col-md-4.col-12.px-1.py-1
          el-input(size='medium', v-model='search_excuter', placeholder='輸入設定人', clearable)
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium",type='primary', :loading='lock_btn') 搜 尋
      //- .col-md-1.col-12
        el-button(@click='newDialog = true', size="medium") 匯 出 
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(label='會員帳號', width='160')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='Create_At', label='日期', width='170')
            el-table-column(prop='StatusName', label='狀態名稱', align='center')
            el-table-column(prop='Status', label='狀態標籤')
            el-table-column(prop='EditUserName', label='設定人', width='120')
            el-table-column(prop='Ip', label='設定IP', width='120')
            el-table-column(label='設定前')
              template(slot-scope='scope')
                div(v-html="scope.row.BeforeValue")
            el-table-column(label='設定後')
              template(slot-scope='scope')
                div(v-html="scope.row.AfterValue")
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgStatusList",
  mounted() {
    this.get_data(1);
  },
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d + " 00:00:00";
    let date_e = y + "-" + m + "-" + d + " 23:59:59";
    return {
      tableData: [],
      search_account: "",
      search_time_range: [date_s, date_e],
      search_status_Name: "",
      search_status: "",
      search_excuter: "",
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
      let data = new FormData();
      data.append("UserName", self.search_account);
      data.append("StatusName", self.search_status_Name);
      if (self.search_status) {
        data.append("Status", self.search_status);
      }
      if (self.search_time_range[0]) {
        data.append("StartDT", self.search_time_range[0]);
      }
      if (self.search_time_range[1]) {
        data.append("EndDT", self.search_time_range[1]);
      }
      data.append("EditUserName", self.search_excuter);
      data.append("Page", now_page);
      data.append("PageLimit", self.page_size);
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberStatusLog",
        data: data
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["BeforeValue"] = item["BeforeValue"].split("|");
            item["BeforeValue"] = item["BeforeValue"].join("<br>");
            item["AfterValue"] = item["AfterValue"].split("|");
            item["AfterValue"] = item["AfterValue"].join("<br>");
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
  