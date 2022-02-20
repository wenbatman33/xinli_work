<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 用戶備註
    .row.no-gutters.px-3.py-3
      .col-md-4.col-12.px-1.py-1
        el-input(size='medium', v-model='search_account', placeholder='輸入會員帳號', clearable)
      div.px-1.py-1(:style='width="400"')
        el-date-picker.select-wstyle(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-4.col-12.px-1.py-1
          el-input(size='medium', v-model='search_execuser', placeholder='輸入建立者', clearable)
      .col-md-2.col-12.px-1.py-1.d-flex.justify-content-center
        el-select.select-wstyle(size='medium', v-model='search_remark', placeholder='選擇備註類型', clearable)
          el-option(v-for='item in remark_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-1.col-12.py-1.d-flex.justify-content-center
        router-link(:to="{name:'tgRemarkList'}")
          el-button(size="medium",type='text') 類型管理
      .col-md-1.col-12.px-1.py-1
        el-button.button-wstyle(@click='get_data(1)', size="medium",type='primary', :loading='lock_btn') 搜 尋
      .col-md-1.col-12.px-1.py-1
        //- el-button.button-wstyle(@click='newDialog = true', size="medium") 匯 出 
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(ref='multipleTable', :data='tableData', border='', style='width: 100%')
            //- el-table-column(type='selection', width='40')
            el-table-column(label='會員帳號', width='160')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='Update_At', label='日期', width='170')
            el-table-column(prop='GroupName', label='備註類型', width='150')
            el-table-column(prop='Note', label='內容')
            el-table-column(prop='EditUserName', label='建立者', width='120')
            el-table-column(label='操作', width='60', align='center')
              template(slot-scope='scope')
                a.cancel(@click='handleDeleteComfirm(scope.row.Sn)', type='text') 刪除
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgMemberRemark",
  mounted() {
    this.get_remark_option();
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      remark_option: [],
      search_account: "",
      search_time_range: [],
      search_execuser: "",
      search_remark: "",
      now_page: 1,
      page_size: 100,
      total_page: 0,
      lock_btn: false
    };
  },
  computed: {},
  methods: {
    get_remark_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserNoteGroup",
        data: {
          Status: 1
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.remark_option.push({
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
      self.lock_btn = true;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserNoteList",
        data: {
          GroupId: self.search_remark,
          UserName: self.search_account,
          EditUserId: self.search_execuser,
          StartDT: self.search_time_range[0],
          EndDT: self.search_time_range[1],
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    handleDeleteComfirm(remark_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_remark(remark_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_remark(remark_id) {
      let self = this;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Member_All/UserNoteListManage/Delete",
        data: {
          Sn: remark_id
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data();
            self.$message({
              message: "刪除成功",
              type: "success"
            });
          } else {
            self.$message.error("刪除失敗 " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    }
  }
};
</script>