<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 遊戲標籤查詢
    .row.no-gutters.px-3.py-3
      .col-12.px-1.py-1
        el-radio-group(v-model="search_status", size="medium", @change="get_data(1)")
          el-radio-button(:label="'1'") 正常
          el-radio-button(:label="'2'") 維護
          el-radio-button(:label="'0'") 停用
      .col-md-4.col-12.px-1.py-1
        el-select(v-model='search_tag_group', size='medium', placeholder='選擇群組名稱', @change="get_game_tag_option(),get_data(1)", clearable)
          el-option(v-for='item in tag_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1
        el-select(v-model='search_tag', size='medium', placeholder='選擇標籤名稱',@change="get_data(1)", clearable)
          el-option(v-for='item in tag_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1
        el-input(size="medium", placeholder='輸入遊戲名稱', v-model='search_content', clearable, @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)")
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='GroupName', label='遊戲廠商', width='80', align='center')
            el-table-column(prop='TagGroupName', label='群組名稱')
            el-table-column(prop='TagName', label='標籤名稱')
            el-table-column(prop='GameName', label='遊戲名稱')
            el-table-column(prop='Status_str', label='狀態', width='60', align='center') 
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgGameTag",
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      now_page: 1,
      page_size: 30,
      total_page: 0,
      tag_group_option: [],
      tag_option: [],
      search_status: "0,1,2",
      search_tag_group: "",
      search_tag: "",
      search_content: ""
    };
  },
  methods: {
    async init() {
      this.get_game_tag_group_option();
      if (this.$route.query.group_id) {
        this.search_tag_group = this.$route.query.group_id;
      }
      await this.get_game_tag_option();
      if (this.$route.query.tag_id) {
        this.search_tag = this.$route.query.tag_id;
      }
      this.get_data(1);
    },
    get_game_tag_group_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.tag_group_option.push({
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
    get_game_tag_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagList",
        data: {
          GroupId: self.search_tag_group
        }
      })
        .then(function(response) {
          self.search_tag = "";
          self.tag_option = [];
          response.data.data.forEach(function(item, index, array) {
            self.tag_option.push({
              value: item.Sn,
              label: item.TagName
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
      var data = new FormData();
      if (self.search_tag_group && self.search_tag) {
        data.append("GameTag", self.search_tag);
      } else {
        data.append("GameTagGroupId", self.search_tag_group);
        data.append("GameTag", self.search_tag);
      }
      data.append("GameName", self.search_content);
      data.append("Status", self.search_status);
      data.append("Page", now_page);
      data.append("PageLimit", self.page_size);
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameList",
        data: data
      })
        .then(function(response) {
          if (response.data.data.data_list == null) {
            response.data.data.data_list = [];
          }
          response.data.data.data_list.forEach(function(item, index, array) {
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "開";
            } else if (item["Status"] == 0) {
              item["Status_str"] = "關";
            } else {
              item["Status_str"] = "維護";
            }
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    }
  }
};
</script>