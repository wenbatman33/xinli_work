<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 使用者登入紀錄
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入使用者姓名或公司帳號', v-model='search_name', @keyup.enter.native='get_data(1)', clearable)
          el-button(slot='append', icon='el-icon-search', @click='get_data(1)')
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
                    el-date-picker(size="medium", v-model='search_time_range', value-format="yyyy-MM-dd" , type='daterange', range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期')
                .col-md-6.col-12
                  el-form-item(label='隸屬群組')
                    el-input(size='medium', placeholder='輸入隸屬群組', v-model='search_group', clearable)
                .col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(id='my_table',:data='tableData', border='', style='width: 100%')
            el-table-column(label='使用者姓名', width='120')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='Account', label='公司帳號', width='190')
            el-table-column(prop='GroupName', label='使用者群組', show-overflow-tooltip=true)
            el-table-column(prop='Create_At', label='登入時間', width='170')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgLoginLog",
  mounted() {
    if (this.$route.query.username) {
      this.search_name = this.$route.query.username;
    }
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      now_page: 1,
      page_size: 30,
      total_page: 0,
      search_name: "",
      search_time_range: null,
      search_group: "",
      search_status: "",
      lock_btn: false,
      toggletosee: false
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

        last = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
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
        url: process.env.VUE_APP_APIHOST + "Admin/QueryLoginLog",
        data: {
          User: self.search_name,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          GroupName: self.search_group,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = response.data.data.data_list;
          } else {
            self.$message.error(response.data.error_message);
          }
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