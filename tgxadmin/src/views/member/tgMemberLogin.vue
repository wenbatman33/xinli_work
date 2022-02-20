<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 登入紀錄
    .row.no-gutters.px-3.py-3
      .col-md-1.col-12.py-1
         el-select(size="medium", v-model='search_login_type', filterable='', placeholder='選擇登入類型', clearable)
          el-option(label='註冊', value="1")
          el-option(label='登入', value="2")
      .col-md-3.col-12.py-1.px-1
        el-input(size='medium', placeholder='輸入會員帳號或姓名', v-model='search_account', @keyup.enter.native="get_data(1)", clearable)
          el-button(slot='append', icon='el-icon-search', @click='get_data(1)')
      .col-md-1.col-12.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee', transition="fade") 進階搜尋
          i.el-icon-arrow-down.el-icon--right
    //--Search Info
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', ref='form', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='登入時間')
                    el-date-picker(size="medium",v-model='search_login_time', type='daterange', align='right', value-format="yyyy-MM-dd", start-placeholder='开始日期', end-placeholder='结束日期')
                .col-md-6.col-12
                  el-form-item(label='裝置類型', label-width="130px")
                    el-select(size="medium", v-model='search_device', filterable='', placeholder='選擇裝置類型', clearable)
                      el-option(label='pc', value="0")
                      el-option(label='MobleIos', value="1")
                      el-option(label='MobileAndroid', value="2")
                      el-option(label='AppIos', value="3")
                      el-option(label='AppAndroid', value="4")
                .col-md-6.col-12
                  el-form-item(label='登入狀態')
                    el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇登入狀態', clearable)
                      el-option(label='失敗', value="0")
                      el-option(label='成功', value="1")
                .col-md-6.col-12
                  el-form-item(label='設備指紋', label-width="130px")
                    el-input(size="medium", v-model='search_finger', placeholder='輸入設備指紋', clearable)
                .col-md-6.col-12
                  el-form-item(label='登入 IP')
                    el-input(size="medium", v-model='search_ip', placeholder='輸入登入 IP', clearable)
                .col-md-6.col-12
                  el-form-item(label='顯示最後登入紀錄', label-width="130px" ,)
                    el-tooltip(class="item" effect="light" content="選擇僅顯示最後登錄紀錄，可排除相同帳號的多次登錄紀錄，僅顯示最後一筆登錄紀錄" placement="right" style="display: inline-block;")
                      i(class="el-icon-info")
                    span &nbsp;
                    el-select(size="medium", v-model='search_last_log', filterable='', placeholder='選擇登入狀態', clearable, style="width:90%")
                      el-option(label='顯示所有登錄紀錄', value="0")
                      el-option(label='僅顯示最後登錄紀錄', value="1")

                .col-md-6.col-12
                  el-form-item(label='省份')
                    el-input(size="medium", v-model='search_province', placeholder='輸入省份', clearable)
                .col-md-6.col-12
                  el-form-item(label='城市', label-width="130px")
                    el-input(size="medium", v-model='search_city', placeholder='輸入城市', clearable)
                .col-md-6.col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-6
        el-button(size="medium", type='primary', @click='tagDialog = true') 標籤管理
        span &nbsp;
        el-tooltip(class="item" effect="light" content="勾選會員帳號前的複選框後，點擊標籤管理按鈕，可將選種會員批次加入會員標籤" placement="right" style="display: inline-block;")
          i(class="el-icon-info")
      .col-6.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%', @selection-change="(val) => {selected_user = val.map(row => row.UserName) }")
            el-table-column(type="selection")
            el-table-column(label='會員帳號', width='140')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='RealName', label='姓名', width='100')
            el-table-column(prop='Device_str', label='裝置類型', width='80', align='center')
            el-table-column(prop='Finger', label='設備指紋')
            // el-table-column(prop='', label='註冊 IP', width='160')
            el-table-column(prop='IP', label='登入 IP', width='130')
            el-table-column(prop='LoginFrom', label='位置', width='200', align='center')
            el-table-column(prop='Status_str', label='登入狀態', width='80', align='center')
            el-table-column(prop='Create_At', label='登入時間', width='170')
            // el-table-column(prop='FailTimes', label='失敗次數', width='90')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    el-dialog(title='標籤管理', :visible.sync='tagDialog', @close="init_dialog('tag_form')")
      el-form.mr-3(:model="tag_form", :rules="tag_rules", ref="tag_form", status-icon)
        el-form-item(label='會員標籤', prop="member_tag", label-width="88px" ,label-position='left')
          el-select.w-100(v-model='tag_form.member_tag', multiple=true, size='medium', placeholder='請選擇標籤', clearable)
            el-option-group(v-for='group in member_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.TagId', :label="item.TagName", :value='item.TagId')
      .dialog-footer(slot='footer')
        el-button(type='danger', @click='update_tag("Delete")',:loading='lock_btn') 刪 除	
        el-button(type='primary', @click='update_tag("Add")',:loading='lock_btn') 新 增
</template>
<script>
export default {
  name: "tgMemberLogin",
  mounted() {
    if (this.$route.query.type) {
      switch (this.$route.query.type) {
        case "1":
          this.search_ip = this.$route.query.content;
          break;
        case "2":
          this.search_finger = this.$route.query.content;
          break;
      }
      this.search_last_log = "1";
      this.toggletosee = true;
    }
    this.get_data(1);
    this.get_member_tag_option();
  },
  data() {
    return {
      tableData: [],
      selected_user: [],
      member_tag_option: [],
      search_login_type: "",
      search_account: "",
      search_login_time: null,
      search_device: "",
      search_status: "",
      search_finger: "",
      search_ip: "",
      search_last_log: "0",
      search_province: "",
      search_city: "",
      now_page: 1,
      page_size: 100,
      total_page: 0,
      tagDialog: false,
      lock_btn: false,
      toggletosee: false,
      tag_form: {
        member_tag: []
      },
      tag_rules: {
        member_tag: [
          {
            type: "array",
            required: true,
            message: "請選擇會員標籤",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    get_member_tag_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {}
      })
        .then(function(response) {
          self.member_tag_option = self.groupBy(
            response.data.data.data_list,
            function(row) {
              return [row.GroupName];
            }
          );
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    groupBy(array, get_group_by_name) {
      let groups = [];
      array.forEach(function(row_data) {
        let group_by_name = get_group_by_name(row_data);
        groups[group_by_name] = groups[group_by_name] || [];
        groups[group_by_name].push(row_data);
      });
      return Object.keys(groups).map(function(group_by_name) {
        return {
          label: group_by_name,
          options: groups[group_by_name]
        };
      });
    },
    get_data(now_page) {
      let self = this;
      self.lock_btn = true;
      if (self.search_login_time == null) {
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

        self.search_login_time = [date_s, date_e];
      }
      var data = new FormData();
      data.append("Date_S", self.search_login_time[0]);
      data.append("Date_E", self.search_login_time[1]);
      data.append("UserName", self.search_account);
      data.append("Status", self.search_status);
      data.append("IP", self.search_ip);
      data.append("Finger", self.search_finger);
      data.append("Device", self.search_device);
      data.append("Province", self.search_province);
      data.append("City", self.search_city);
      data.append("LastLogin", self.search_last_log);
      data.append("LoginType", self.search_login_type);
      data.append("Page", now_page);
      data.append("PageLimit", self.page_size);
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberLoginList",
        data: data
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            switch (item["Device"]) {
              case "0":
                item["Device_str"] = "pc";
                break;
              case "1":
                item["Device_str"] = "MobleIos";
                break;
              case "2":
                item["Device_str"] = "MobileAndroid";
                break;
              case "3":
                item["Device_str"] = "AppIos";
                break;
              case "4":
                item["Device_str"] = "AppAndroid";
                break;
            }
            switch (item["Status"]) {
              case "0":
                item["Status_str"] = "失敗";
                break;
              case "1":
                item["Status_str"] = "成功";
                break;
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
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.tag_form.member_tag = [];
    },
    update_tag(method) {
      let self = this;
      if (self.selected_user.length == 0) {
        self.$message.error("請先選擇會員	");
        return;
      }
      this.$refs["tag_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserTagDataManage/" +
              method,
            data: {
              UserName: self.selected_user.join(","),
              TagId: self.tag_form.member_tag.join(",")
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(1);
                self.$message({
                  message: "更新成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "更新失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.tagDialog = false;
            });
        }
      });
    }
  }
};
</script>