<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 站內信
      .col-6.d-flex.justify-content-end
        router-link(tag="span", :to="{name:'tgInboxAdd'}")
          el-button(size="medium",type='primary') 發信
    //--Search
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入搜尋內容', v-model='search_content',@keyup.enter.native='get_data(1)', clearable)
          el-select.select-input-style(v-model='search_field', slot='prepend', placeholder='請選擇搜尋條件', clearable)
            el-option(label='會員帳號', value='UserName')
            el-option(label='發信人', value='EditUserName')
            el-option(label='標題', value='Title')
            el-option(label='內文', value='Content')
          el-button(slot='append', icon='el-icon-search',@click="get_data(1)")
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='Sn', label='#', width='60', align='center')
            el-table-column(label='會員帳號', width='150')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='Title', label='標題', show-overflow-tooltip=true)
            el-table-column(prop='Content', label='內文')
              template(slot-scope='scope')
                el-tooltip(placement='top')
                  div(v-html="scope.row.Content", slot='content')
                  div(style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;") {{scope.row.Content}}
            el-table-column(prop='EditUserName', label='發信人', width='100', align='center')
            el-table-column(prop='Create_At', label='設定時間', width='170')
            el-table-column(prop='SendTime_At', label='發送時間', width='170') 
            el-table-column(label='狀態', width='90', align='center')
              template(slot-scope='scope')
                  el-tag(v-if="scope.row.Status == '0'", type="danger", disable-transitions='') 等待中
                  el-tag(v-else-if="scope.row.Status == '1'", type="success", disable-transitions='') 已發送
                  el-tag(v-else, type="info", disable-transitions='') 刪除
            el-table-column(label='操作', width='100')
              template(slot-scope='scope',v-if="scope.row.Status == 0")
                router-link.links(:to="{name:'tgInboxEdit', query:{inbox_id: scope.row.Sn}}") 修改
                a.cancel(@click='handleDeleteComfirm(scope.row.Sn)', type='text') 刪除
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgInboxList",
  mounted() {
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      now_page: 1,
      page_size: 100,
      total_page: 0,
      search_field: "",
      search_content: ""
    };
  },
  methods: {
    get_data(now_page) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberInbox",
        data: {
          Type: "Detail",
          [self.search_field]: self.search_content,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    handleDeleteComfirm(inbox_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_inbox(inbox_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_inbox(inbox_id) {
      let self = this;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Member_All/MemberInboxManage/Delete",
        data: {
          Sn: inbox_id
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
            self.$message.error("刪除失敗： " + response.data.error_message);
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
