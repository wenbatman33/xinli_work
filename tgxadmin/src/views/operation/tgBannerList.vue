<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 Banner 管理
      .col-6.d-flex.justify-content-end
        router-link(tag="span", :to="{name:'tgBannerAdd'}") 
          el-button(size="medium", type='primary') 新增 Banner
    .row.no-gutters.px-3.py-3
      .col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label='"1"') 正常
          el-radio-button(:label='"0"') 停用
      .col-md-4.col-12.py-1
        el-select(v-model='search_group', size='medium', placeholder='選擇群組名稱',@change="get_data(1)", clearable)
          el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-2.py-1
        router-link(:to="{name:'tgBannerGroupList'}")
          el-button(size="medium", type='text') 群組管理
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入搜尋內容', v-model='search_content', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='Sort', label='排序', width='60', align='center')
          el-table-column(prop='GroupName', label='群組名稱')
          el-table-column(prop='BannerName', label='版位標題')
          el-table-column(label='圖示', align='center')
            template(slot-scope='scope')
              img.w-100.h-100(v-if="scope.row.Images", :src="scope.row.Images + '?' + new Date().getTime()")
          el-table-column(label='連結')
            template(slot-scope='scope') 
              a(:href='scope.row.Link', target='_blank') {{scope.row.Link}}
          el-table-column(label='日期區間', width="190")
            template(slot-scope='scope') {{scope.row.StartTime}} 至 {{scope.row.EndTime}}
          el-table-column(prop='Type_str', label='類型', align='center', width="60")
          el-table-column(prop='Status_str', label='狀態', align='center', width="60")
          el-table-column(label='操作', width='100')
            template(slot-scope='scope')
              router-link.links(:to="{name:'tgBannerEdit', query:{banner_id: scope.row.Sn}}") 修改
              a.cancel(@click='handledeleteComfirm(scope.row.Sn)', type='text') 刪除
    //- el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next',:current-page='now_page', :page-size='10', :total='total_page', @current-change='get_data')
</template>
<script>
export default {
  name: "tgBannerList",
  mounted() {
    this.get_group_option();
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      group_option: [],
      search_status: "",
      search_group: "",
      search_content: ""
    };
  },
  computed: {
    filter_table_data() {
      var self = this;
      return this.tableData.filter(function(item, index, array) {
        if (self.search_group && item.GroupId != self.search_group) {
          return false;
        }
        if (self.search_status && item.Status != self.search_status) {
          return false;
        }
        if (
          self.search_content &&
          item.BannerName.indexOf(self.search_content) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/BannerGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.group_option.push({
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
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/BannerList",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "開";
            } else {
              item["Status_str"] = "關";
            }
            item["Type_str"] = "";
            if (item["BannerType"] == 1) {
              item["Type_str"] = "圖片";
            } else {
              item["Type_str"] = "按鈕";
            }
          });
          self.tableData = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    handledeleteComfirm(banner_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_banner(banner_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_banner(banner_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/BannerListManage/Delete",
        data: {
          Sn: banner_id
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
