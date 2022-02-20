<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 使用者管理
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium", type='primary') 新增使用者
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入公司帳號', v-model='search_account', clearable)
          el-button(slot='append', icon='el-icon-search')
      .col-md-1.col-4.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee', transition="fade") 進階搜尋
          i.el-icon-arrow-down.el-icon--right
      .col-md-5.col-8.py-1.d-flex.justify-content-end
        el-button(size="medium", @click='setDialog = true',    icon='el-icon-setting', plain='')
    //--advance search
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='隸屬群組')
                    el-select(size="medium", v-model='search_group', filterable='', placeholder='選擇隸屬群組', clearable)
                      el-option(v-for='item in user_group_option', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='真實姓名')
                    el-input(size="medium", v-model='search_name', placeholder='輸入真實姓名', clearable)
                .col-md-6.col-12
                  el-form-item(label='主管')
                    el-select(size="medium", v-model='search_supervisor', filterable='', placeholder='選擇主管', clearable)
                      el-option(v-for='item in super_visor_option', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='狀態')
                    el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇狀態', clearable)
                      el-option(label='所有', value="")
                      el-option(label='正常', value="1")
                      el-option(label='凍結', value="0")
                .col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", type='primary', v-on:click='toggletosee = !toggletosee') 關閉
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='AdminUserId', label='排序', width='60', align='center', v-if="show_field.indexOf('排序') !== -1")
          el-table-column(prop='GroupName_str', label='群組名稱', show-overflow-tooltip=true, v-if="show_field.indexOf('群組名稱') !== -1")
          el-table-column(prop='UserName', label='真實姓名', width='150', v-if="show_field.indexOf('真實姓名') !== -1", align='center')
          el-table-column(prop='Account', label='公司帳號', width='200', v-if="show_field.indexOf('公司帳號') !== -1")
          el-table-column(prop='SupervisorName', label='主管', width='150', v-if="show_field.indexOf('主管') !== -1", align='center')
          el-table-column(prop='Status_str', label='狀態', width='60', v-if="show_field.indexOf('狀態') !== -1", align='center')
          el-table-column(label='操作', width='260')
            template(slot-scope='scope')
              a.links(@click='get_user(scope.row.AdminUserId)', type='text') 修改
              router-link.links(:to="{name:'tgAuthorityUser', query:{AdminUserId: scope.row.AdminUserId}}") 權限設定
              router-link.links(:to="{name:'tgChangeLog', query:{username: scope.row.UserName}}") 異動紀錄
              router-link.links(:to="{name:'tgLoginLog', query:{username: scope.row.UserName}}") 登入紀錄
    //--popup
    el-dialog(title='新增使用者', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3.form-style(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='真實姓名', prop="UserName", label-width="100px" ,label-position='left')
          el-input(v-model='form.UserName', placeholder='輸入真實姓名', clearable)
        el-form-item(label='公司帳號', prop="Account", label-width="100px" ,label-position='left')
          el-input(v-model='form.Account', placeholder='輸入公司帳號', clearable)
        el-form-item(label='使用者群組', prop="UserGroupList", label-width="100px" ,label-position='left')
          el-select(multiple size="medium", v-model='form.UserGroupList', filterable='', placeholder='選擇使用者群組', clearable)
            el-option(v-for='item in user_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='主管', prop="Supervisor", label-width="100px" ,label-position='left')
          el-select(size="medium", v-model='form.Supervisor', filterable='', placeholder='選擇主管', clearable)
            el-option(v-for='item in super_visor_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='使用者狀態', prop="Status", label-width="100px" ,label-position='left')
          el-switch(v-model='form.Status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_user', :loading='lock_btn') 確 認 
    //--popup
    el-dialog(title='修改使用者', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3.form-style(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='真實姓名', prop="UserName", label-width="100px" ,label-position='left')
          el-input(v-model='form.UserName', placeholder='輸入姓名', clearable)
        el-form-item(label='公司帳號', prop="Account", label-width="100px" ,label-position='left')
          el-input(v-model='form.Account', placeholder='username@mail.com', clearable)    
        el-form-item(label='使用者群組', prop="UserGroupList", label-width="100px" ,label-position='left')
          el-select(multiple size="medium", v-model='form.UserGroupList', filterable='', placeholder='選擇使用者群組', clearable)
            el-option(v-for='item in user_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='主管', prop="Supervisor", label-width="100px" ,label-position='left')
          el-select(size="medium", v-model='form.Supervisor', filterable='', placeholder='選擇主管', clearable)
            el-option(v-for='item in super_visor_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='使用者狀態', prop="Status", label-width="100px" ,label-position='left')
          el-switch(v-model='form.Status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
    //--popup
    el-dialog(title='設定列表欄位', :visible.sync='setDialog')
      el-form.mr-3
        p 選擇想要在列表呈現的欄位信息
        el-form-item
          el-checkbox-group(v-model='show_field', :min=1)
            el-checkbox(label='排序')
            el-checkbox(label='群組名稱')
            el-checkbox(label='真實姓名')
            el-checkbox(label='公司帳號')
            el-checkbox(label='主管')
            el-checkbox(label='狀態')
            // el-checkbox(label='單位')
            // el-checkbox(label='職位')
      .dialog-footer(slot='footer')
        el-button(@click='setDialog = false, show_field = re_show_field') 取 消
        el-button(type='primary', @click='setDialog = false, re_show_field = show_field') 確 認
    // el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgUserList",
  mounted() {
    this.get_data();
    this.get_group_option();
  },
  data() {
    return {
      user_group_option: [
        {
          value: "",
          label: "所有"
        }
      ],
      super_visor_option: [],
      show_field: ["排序", "群組名稱", "真實姓名", "公司帳號", "主管", "狀態"],
      re_show_field: [
        "排序",
        "群組名稱",
        "真實姓名",
        "公司帳號",
        "主管",
        "狀態"
      ],
      tableData: [],
      search_account: "",
      search_group: "",
      search_name: "",
      search_supervisor: "",
      search_status: "",
      toggletosee: false,
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      setDialog: false,
      update_id: "",
      form: {
        UserName: "",
        Account: "",
        UserGroupList: [],
        Supervisor: "",
        Status: "1"
      },
      rules: {
        UserName: [
          {
            required: true,
            message: "請填寫真實姓名",
            trigger: "change"
          }
        ],
        Account: [
          {
            required: true,
            message: "請填寫公司帳號",
            trigger: "change"
          },
          {
            type: "email",
            message: "請填寫正確的信箱格式",
            trigger: "change"
          }
        ],
        UserGroupList: [
          {
            type: "array",
            required: true,
            message: "請至少選擇一個使用者群組",
            trigger: "change"
          }
        ],
        Status: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇使用者狀態",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    filter_table_data() {
      var self = this;
      return this.tableData.filter(function(item, index, array) {
        if (
          self.search_account &&
          item.Account.search(self.search_account) == -1
        ) {
          return false;
        }
        if (
          self.search_group &&
          item.GroupSn_arr.indexOf(self.search_group) == -1
        ) {
          return false;
        }
        if (
          self.search_name &&
          item.UserName.toLowerCase().search(self.search_name.toLowerCase()) ==
            -1
        ) {
          return false;
        }
        if (
          self.search_supervisor &&
          item.Supervisor != self.search_supervisor
        ) {
          return false;
        }
        if (self.search_status && item.Status != self.search_status) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_data() {
      let self = this;
      self.super_visor_option = [];
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryUser/",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(
            data_item,
            data_index,
            data_array
          ) {
            data_item["Status_str"] = "";
            if (data_item["Status"] == 1) {
              data_item["Status_str"] = "正常";
            } else {
              data_item["Status_str"] = "凍結";
            }
            data_item["GroupSn_arr"] = [];
            data_item["GroupName_str"] = [];
            data_item["UserGroupList"].forEach(function(
              group_item,
              group_index,
              group_array
            ) {
              data_item["GroupSn_arr"].push(group_item["GroupSn"]);
              data_item["GroupName_str"].push(group_item["GroupName"]);
            });
            data_item["GroupName_str"] = data_item["GroupName_str"].join();

            self.super_visor_option.push({
              value: data_item.AdminUserId,
              label: data_item.UserName
            });
          });
          self.tableData = response.data.data;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryUserGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.user_group_option.push({
              value: item.Sn,
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
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.update_id = "";
      this.form.UserName = "";
      this.form.Account = "";
      this.form.UserGroupList = [];
      this.form.Supervisor = "";
      this.form.Status = "1";
    },
    add_user() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/UserManage/Add",
            data: {
              UserName: self.form.UserName,
              Account: self.form.Account,
              UserGroupList: self.form.UserGroupList,
              Supervisor: self.form.Supervisor,
              Status: self.form.Status
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data();
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "新增失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.newDialog = false;
            });
        }
      });
    },
    get_user(user_id) {
      let self = this;
      self.update_id = user_id;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryUser",
        data: {
          AdminUserId: user_id
        }
      })
        .then(function(response) {
          self.form.UserName = response.data.data[0].UserName;
          self.form.Account = response.data.data[0].Account;
          // console.log(self.UserGroupList);
          response.data.data[0].UserGroupList.forEach(function(
            group_item,
            group_index,
            group_array
          ) {
            self.form.UserGroupList.push(group_item["GroupSn"]);
          });
          self.form.Supervisor = response.data.data[0].Supervisor;
          self.form.Status = response.data.data[0].Status;
          self.updateDialog = true;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_group() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/UserManage/Edit",
            data: {
              AdminUserId: self.update_id,
              UserName: self.form.UserName,
              Account: self.form.Account,
              UserGroupList: self.form.UserGroupList,
              Supervisor: self.form.Supervisor,
              Status: self.form.Status
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data();
                self.$message({
                  message: "修改成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "修改失敗： " + response.data.error_message
                );
              }
              // console.log(response);
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
              // console.log(error);
            })
            .finally(function() {
              self.updateDialog = false;
            });
        }
      });
    }
  }
};
</script>
