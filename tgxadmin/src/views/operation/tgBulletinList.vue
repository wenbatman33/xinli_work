<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 網站公告管理
      .col-6.d-flex.justify-content-end
        router-link.links(:to="{name:'tgBulletinAdd'}")
          el-button(size="medium", type='primary') 新增公告
    .row.no-gutters.px-3.py-3
      .col-md-2.col-12.px-1.py-1
        el-select(size='medium', v-model='search_status', placeholder='選擇狀態', clearable)
          el-option(label='全部', value='')
          el-option(label='公告中', value='0')
          el-option(label='等待中', value='1')
          el-option(label='未公告', value='2')
          el-option(label='已過期', value='3')
      .col-md-5.col-12.px-1.py-1
        el-date-picker(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium", type='primary') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='Sn', label='編號', width='60', align='center')
            el-table-column(prop='NewsName', label='標題', show-overflow-tooltip=true)
            el-table-column(label='內文')
              template(slot-scope='scope')
                el-tooltip(placement='top')
                  div(v-html="scope.row.Content", slot='content')
                  div(style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;") {{scope.row.Content}}
            el-table-column(prop='NewsUserName', label='操作人', width='80', align='center')
            el-table-column(prop='Update_At', label='更新時間', width='170')
            el-table-column(prop='StartTime', label='公告時間', width='170')
            el-table-column(label='狀態', width='100', align='center')
              template(slot-scope='scope')
                  el-tag(v-if="scope.row.Status == '公告中'", type="success", disable-transitions='') {{scope.row.Status}}
                  el-tag(v-else-if="scope.row.Status == '等待中'", type="warning", disable-transitions='') {{scope.row.Status}}
                  el-tag(v-else-if="scope.row.Status == '未公告'", type="danger", disable-transitions='') {{scope.row.Status}}
                  el-tag(v-else, type="info", disable-transitions='') {{scope.row.Status}}
            el-table-column(label='操作', width='100')
              template(slot-scope='scope')
                router-link.links(:to="{name:'tgBulletinEdit', query:{news_id: scope.row.Sn}}") 修改
                a.cancel(@click='handledeleteComfirm(scope.row.Sn)', type='text', style='color:#ff4949') 刪除
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgBulletinList",
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
        self.search_time_range = [date_s + " 00:00:00", date_e + " 23:59:59"];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/NewsList",
        data: {
          Status: self.search_status,
          StartTime: self.search_time_range[0],
          EndTime: self.search_time_range[1],
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
    handledeleteComfirm(news_id) {
      let self = this;
      this.$confirm("只有等待中的公告才可刪除，請確認是否刪除？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_news(news_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
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