<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 關聯設備帳號
    .row.no-gutters.px-3.py-3
      .col-md-3.col-12.py-1
        el-input(size='medium', placeholder='輸入會員帳號', v-model='search_account', @keyup.enter.native="get_data(1)", clearable)
          el-button(slot='append', icon='el-icon-search', @click='get_data(1)')
          i.el-icon-arrow-down.el-icon--right
    //--Table
    .row.no-gutters.px-3
      .col-6
        el-button(size="medium", type='primary', @click='tagDialog = true') 標籤管理
      .col-6.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%', @selection-change="(val) => {selected_user = val.map(row => row.UserName) }")
            el-table-column(type="selection")
            el-table-column(label='會員帳號', width='140')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='RealName', label='姓名', width='120')
            el-table-column(prop='UserStatus_Web_str', label='登入狀態', width='100', align='center')
            el-table-column(prop='TagName', label='標籤', width='150', align='center')
            el-table-column(prop='LoginData[0].Finger', label='設備指紋', width='300')
            el-table-column(prop='LoginData[0].IP', label='登入 IP', width='130')
            el-table-column(prop='LoginData[0].LoginFrom', label='位置', align='center')
            el-table-column(prop='Register_At', label='註冊時間', width='170')
            el-table-column(label='操作', width='60', align='center')
              template(slot-scope='scope')
                a.links(@click='gridData = scope.row.LoginData; dialogTableVisible = true', type='text') 查看
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    el-dialog(title='標籤管理', :visible.sync='tagDialog', @close="init_dialog('tag_form')")
      el-form.mr-3(:model="tag_form", :rules="tag_rules", ref="tag_form", status-icon)
        el-form-item(label='會員標籤', prop="member_tag", label-width="88px" ,label-position='left')
          el-select.w-100(v-model='tag_form.member_tag', multiple=true, size='medium', placeholder='請選擇標籤', clearable)
            el-option-group(v-for='group in member_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.TagId', :label="item.TagName", :value='item.TagId')
      .dialog-footer(slot='footer')
        el-button(type='danger', @click='update_tag("Delete")',:loading='lock_btn') 刪 除	
        el-button(type='primary', @click='update_tag("Add")',:loading='lock_btn') 新 增
    el-dialog(title='指紋紀錄', :visible.sync='dialogTableVisible')
      el-table(:data='gridData')
        el-table-column(prop='Finger', label='設備指紋', width='350')
        el-table-column(prop='IP', label='登入 IP', width='130')
        el-table-column(prop='LoginFrom', label='位置', align='center')
</template>
<script>
export default {
  name: "tgMemberDevice",
  mounted() {
    this.get_member_tag_option();
  },
  data() {
    return {
      tableData: [],
      selected_user: [],
      member_tag_option: [],
      gridData: [],
      search_account: "",
      now_page: 1,
      page_size: 30,
      total_page: 0,
      tagDialog: false,
      dialogTableVisible: false,
      lock_btn: false,
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
      if (self.search_account == "") {
        self.$message.error("請輸入會員帳號");
        return;
      }
      self.lock_btn = true;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/ReferFingerData",
        data: {
          UserName: self.search_account,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            switch (item["UserStatus_Web"]) {
              case "0":
                item["UserStatus_Web_str"] = "凍結";
                break;
              case "1":
                item["UserStatus_Web_str"] = "正常";
                break;
              case "2":
                item["UserStatus_Web_str"] = "登入鎖定";
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