<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 功能權限管理
      .col-6.d-flex.justify-content-end
        el-button(@click='check_function()', size="medium", type='primary') 新增使用者
    .row.no-gutters.px-3.py-3
      .col-md-3.col-12.px-1.py-1
        el-select(v-model='search_main_group', size='medium', placeholder='選擇主群組', @change='get_sub_group_option()', clearable)
          el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-3.col-12.px-1.py-1
        el-select(v-model='search_sub_group', size='medium', placeholder='選擇次群組', @change='get_function_option()', clearable)
          el-option(v-for='item in sub_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-3.col-12.px-1.py-1
        el-select(v-model='search_function', size='medium', placeholder='選擇功能', @change='get_data()', filterable, clearable)
          el-option(v-for='item in function_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-3.col-12.px-1.py-1
        el-input(size="medium", placeholder='輸入使用者', v-model='search_content', clearable)
          //- el-button(slot='append', icon='el-icon-search',  @click='get_data()')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(label='使用者', align='center')
            template(slot-scope='scope')
              router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
          el-table-column(prop='Read_Auth', label='讀取/權限1', align='center')
            template(slot-scope='scope')
              el-checkbox(:checked="scope.row.Read_Auth == '1'", @change="scope.row.Read_Auth = (parseInt(scope.row.Read_Auth) + 1) % 2;")
          el-table-column(prop='Add_Auth', label='新增/權限2', align='center')
            template(slot-scope='scope')
              el-checkbox(:checked="scope.row.Add_Auth == '1'", @change="scope.row.Add_Auth = (parseInt(scope.row.Add_Auth) + 1) % 2;")
          el-table-column(prop='Edit_Auth', label='修改/權限3', align='center')
            template(slot-scope='scope')
              el-checkbox(:checked="scope.row.Edit_Auth == '1'", @change="scope.row.Edit_Auth = (parseInt(scope.row.Edit_Auth) + 1) % 2;")
          el-table-column(prop='Del_Auth', label='刪除/權限4', align='center')
            template(slot-scope='scope')
              el-checkbox(:checked="scope.row.Del_Auth == '1'", @change="scope.row.Del_Auth = (parseInt(scope.row.Del_Auth) + 1) % 2;")
          el-table-column(label='操作')
            template(slot-scope='scope')
              a.links(@click='update_auth(scope.row)', type='text') 修改 
              a.cancel(@click='handleDeleteComfirm(scope.row)', type='text') 刪除 
    //--Dialog
    el-dialog(title='新增使用者', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='使用者', prop="user_id", label-width="88px" ,label-position='left') 
          el-select.form-style(size="medium", v-model='form.user_id', filterable='', placeholder='選擇使用者',multiple )
            el-option(v-for='item in user_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='讀取', prop="read_auth", label-width="88px" ,label-position='left')
          el-radio-group(v-model='form.read_auth')  
            el-radio(:label="'1'") 開啟權限
            el-radio(:label="'0'") 關閉權限
        el-form-item(label='新增', prop="add_auth", label-width="88px" ,label-position='left')
          el-radio-group(v-model='form.add_auth')  
            el-radio(:label="'1'") 開啟權限
            el-radio(:label="'0'") 關閉權限
        el-form-item(label='修改', prop="edit_auth", label-width="88px" ,label-position='left')
          el-radio-group(v-model='form.edit_auth')  
            el-radio(:label="'1'") 開啟權限
            el-radio(:label="'0'") 關閉權限
        el-form-item(label='刪除', prop="delete_auth", label-width="88px" ,label-position='left')
          el-radio-group(v-model='form.delete_auth')  
            el-radio(:label="'1'") 開啟權限
            el-radio(:label="'0'") 關閉權限
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_author()', :loading='lock_btn') 確 認 
</template>
<script>
export default {
  name: "tgAuthorityList",
  mounted() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      main_group_option: [],
      sub_group_option: [],
      function_option: [],
      user_option: [],
      search_main_group: "",
      search_sub_group: "",
      search_function: "",
      search_content: "",
      lock_btn: false,
      newDialog: false,
      form: {
        user_id: [],
        read_auth: "1",
        add_auth: "1",
        edit_auth: "1",
        delete_auth: "1"
      },
      rules: {
        user_id: [
          {
            type: "array",
            required: true,
            message: "請至少選擇一個使用者",
            trigger: "change"
          }
        ],
        read_auth: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇讀取權限",
            trigger: "change"
          }
        ],
        add_auth: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇新增權限",
            trigger: "change"
          }
        ],
        edit_auth: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇修改權限",
            trigger: "change"
          }
        ],
        delete_auth: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇刪除權限",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    filter_table_data() {
      let self = this;
      return this.tableData.filter(function(item, index, array) {
        if (
          self.search_content &&
          item.UserName.indexOf(self.search_content) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    async init() {
      let self = this;
      self.get_user_option();
      await self.get_main_group_option();
      self.search_main_group = self.$route.query.main_group_id;
      await self.get_sub_group_option();
      self.search_sub_group = self.$route.query.sub_group_id;
      await self.get_function_option();
      self.search_function = self.$route.query.function_id;
      if (self.search_function) {
        self.get_data();
      }
    },
    get_main_group_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryMainFunction",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.main_group_option.push({
              value: item.Sn,
              label: item.Name
            });
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_sub_group_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QuerySubFunction",
        data: {
          ParentNode: self.search_main_group
        }
      })
        .then(function(response) {
          self.search_sub_group = "";
          self.sub_group_option = [];
          self.search_function = "";
          self.function_option = [];
          response.data.data.forEach(function(item, index, array) {
            self.sub_group_option.push({
              value: item.Sn,
              label: item.Name
            });
          });
          if (response.data.data.length == 0) {
            self.get_function_option();
          }
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_function_option() {
      let self = this;
      let parent_node;
      if (self.search_sub_group) {
        parent_node = self.search_sub_group;
      } else {
        parent_node = self.search_main_group;
      }
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryFunction",
        data: {
          Node: parent_node
        }
      })
        .then(function(response) {
          self.function_option = [];
          self.search_function = "";
          response.data.data.forEach(function(item, index, array) {
            self.function_option.push({
              value: item.Sn,
              label: item.Name
            });
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_user_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryUser/",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.user_option.push({
              value: item.AdminUserId,
              label: item.UserName
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
        url: process.env.VUE_APP_APIHOST + "Admin/QueryAuthority",
        data: {
          AdminFunction: self.search_function
        }
      })
        .then(function(response) {
          self.tableData = [];
          self.tableData = response.data.data;
          self.search_content = " ";
          setTimeout(() => {
            self.search_content = "";
          }, 1);
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
      this.form.user_id = [];
      this.form.read_auth = "1";
      this.form.add_auth = "1";
      this.form.edit_auth = "1";
      this.form.delete_auth = "1";
    },
    check_function() {
      if (this.search_function) {
        this.newDialog = true;
      } else {
        this.$message.error("請先選擇功能");
        this.newDialog = false;
      }
    },
    add_author() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          let sn = [];
          let adminfunction = [];
          let read_auth = [];
          let add_auth = [];
          let edit_auth = [];
          let delete_auth = [];
          self.form.user_id.forEach(function(item, index, array) {
            sn.push("");
            adminfunction.push(self.search_function);
            read_auth.push(self.form.read_auth);
            add_auth.push(self.form.add_auth);
            edit_auth.push(self.form.edit_auth);
            delete_auth.push(self.form.delete_auth);
          });
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/AuthorityManage/Replace",
            data: {
              Sn: sn,
              AdminFunction: adminfunction,
              AdminUserId: self.form.user_id,
              Read_Auth: read_auth,
              Add_Auth: add_auth,
              Edit_Auth: edit_auth,
              Del_Auth: delete_auth
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
    update_auth(row) {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/AuthorityManage/Replace",
        data: {
          Sn: [""],
          AdminFunction: [row.AdminFunction],
          AdminUserId: [row.AdminUserId],
          Read_Auth: [row.Read_Auth],
          Add_Auth: [row.Add_Auth],
          Edit_Auth: [row.Edit_Auth],
          Del_Auth: [row.Del_Auth]
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
            self.$message.error("修改失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    handleDeleteComfirm(row) {
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del_auth(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_auth(row) {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/AuthorityManage/Delete",
        data: {
          Sn: [row.Sn],
          AdminFunction: [row.AdminFunction],
          AdminUserId: [row.AdminUserId],
          Read_Auth: [row.Read_Auth],
          Add_Auth: [row.Add_Auth],
          Edit_Auth: [row.Edit_Auth],
          Del_Auth: [row.Del_Auth]
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
        })
        .finally(function() {
          self.lock_btn = false;
        });
    }
  }
};
</script>
