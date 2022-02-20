<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理公告管理
      .col-6.d-flex.justify-content-end
        router-link.links(:to="{name:'tgAgencyBulletinAdd'}")
          el-button(size="medium", type='primary') 新增公告
    //--Table
    .row.no-gutters.px-3
      //.col-12.py-3.d-flex.justify-content-end  
      //  el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='Sn', label='序號' width="50px") 
            el-table-column(prop='NewsName', label='標題')
            el-table-column(label='內文')
              template(slot-scope='scope')
                el-tooltip(placement='top')
                  div(v-html="scope.row.Content", slot='content')
                  div(style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;") {{scope.row.Content}}
            el-table-column(prop='NewsUserId', label='操作人')
            el-table-column( label='日期區間')
              template(slot-scope='scope') {{scope.row.StartTime}} ~ {{scope.row.EndTime}}
            el-table-column( label='操作')
              template(slot-scope='scope')
                router-link.links(:to="{name:'tgAgencyBulletinEdit', query:{news_id: scope.row.Sn}}") 修改
    //-   .col-12.py-3.d-flex.justify-content-end  
    //-     el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgAgencyBulletinList",
  mounted() {
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      now_page: 1,
      page_size: 30,
      total_page: 0,
      search_status: "",
      search_time_range: null
    };
  },
  methods: {
    get_data(now_page) {
      let self = this;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Agency_Admin/GetAgencyNewsList/Backend"
      })
        .then(function(response) {
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    del_news(news_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/NewsListManage/Delete",
        data: {
          Sn: news_id
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