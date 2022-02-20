<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 使用者權限
    .row.no-gutters.px-3.py-3
      .col-md-4.col-12.px-1.py-1
        el-select(v-model='search_group', slot='prepend', placeholder='選擇使用者群組', @change="get_user_option", clearable)
          el-option(v-for='item in user_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1
        el-select(v-model='search_user', slot='prepend', placeholder='選擇使用者', @change="get_user_auth", clearable)
          el-option(v-for='item in user_option', :key='item.value', :label='item.label', :value='item.value')
    .row.no-gutters.px-3.py-3
      .col-md-2.col-12.px-1.py-1
        h6 使用者群組：{{search_group_name}}
      .col-md-2.col-12.px-1.py-1
        h6 使用者：{{search_user_name}}
    //- 樹狀圖
    .row.no-gutters.px-3
      .col-12
        .tree-container.px-3.py-3
          el-tree.tree-style(:data='authority_tree',ref="tree" , show-checkbox = true, node-key='id', default-expand-all = true, :props={children: "children",label: "label"})
      .col-12.py-3.d-flex.justify-content-end
        // el-button 取 消
        el-button(size="medium", type='primary', @click='handleComfirm',:loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgAuthorityUser",
  mounted() {
    this.init();
  },
  data() {
    return {
      search_group: "",
      search_group_name: "",
      search_user: "",
      search_user_name: "",
      lock_btn: false,
      user_group_option: [],
      user_option: [],
      authority_tree: [],
      tree_data: [],
      user_origin_auth_id: [],
      user_check_auth_id: [],
      is_function_id: []
    };
  },
  computed: {},
  methods: {
    async init() {
      this.get_user_group_option();
      this.get_user_option();
      await this.get_main_group_option();
      await this.get_sub_group_option();
      await this.get_function_option();
      this.authority_tree = this.build_tree(this.tree_data, 0);
      if (this.$route.query.AdminUserId) {
        this.search_user = this.$route.query.AdminUserId;
        this.get_user_auth(this.search_user);
      }
    },
    get_user_group_option() {
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
    get_user_option(selected_id) {
      if (selected_id) {
        let option = {};
        option = this.user_group_option.find(item => {
          return item.value === selected_id;
        });
        this.search_group_name = option.label;
      }

      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryUser/",
        data: {
          UserGroupList: self.search_group
        }
      })
        .then(function(response) {
          self.$refs.tree.setCheckedNodes([]);
          self.search_user = "";
          self.search_user_name = "";
          self.user_option = [];
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
    get_main_group_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryMainFunction",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.tree_data.push({
              id: item.Sn,
              parent: 0,
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
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.tree_data.push({
              id: item.Sn,
              parent: item.ParentNode,
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
    get_function_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryFunction",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.is_function_id.push(item.Sn);
            self.tree_data.push({
              id: item.Sn,
              parent:
                item.SubFunction.length == 0
                  ? item.MainFunction.Sn
                  : item.SubFunction.Sn,
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
    build_tree(tree_data, root) {
      var tree = [];
      for (var i in tree_data) {
        if (tree_data[i].parent == root) {
          var children = this.build_tree(tree_data, tree_data[i].id);

          if (children.length) {
            tree_data[i].children = children;
          }
          tree.push(tree_data[i]);
        }
      }
      return tree;
    },
    get_user_auth(selected_id) {
      if (selected_id) {
        let option = {};
        option = this.user_option.find(item => {
          return item.value === selected_id;
        });
        this.search_user_name = option.label;
      }
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAdminMenu",
        data: {
          UserId: self.search_user
        }
      })
        .then(function(response) {
          self.user_origin_auth_id = [];
          self.set_user_auth(response.data.data);
          self.$refs.tree.setCheckedKeys(self.user_origin_auth_id);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    set_user_auth(user_auth) {
      for (var i in user_auth) {
        if (user_auth[i].Sn == undefined) {
          this.set_user_auth(user_auth[i]);
        } else {
          this.user_origin_auth_id.push(user_auth[i].Sn);
        }
      }
    },
    handleComfirm() {
      let self = this;
      if (!self.search_user) {
        self.$message.error("請先選擇使用者");
        return;
      }
      this.$confirm("確認是否儲存本次異動？", "變更確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.update_user_auth().then(function() {
            self.get_user_auth(self.search_user);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消變更"
          });
        });
    },
    update_user_auth() {
      let self = this;
      let update_sn = [];
      let update_AdminFunction = [];
      let update_AdminUserId = [];
      let update_read_auth = [];
      let update_add_auth = [];
      let update_edit_auth = [];
      let update_delete_auth = [];
      let delete_sn = [];
      let delete_AdminFunction = [];
      let delete_AdminUserId = [];
      let delete_read_auth = [];
      let delete_add_auth = [];
      let delete_edit_auth = [];
      let delete_delete_auth = [];

      self.user_check_auth_id = [];
      let check_node = this.$refs.tree.getCheckedNodes();
      check_node.forEach(function(item, index, array) {
        if (self.is_function_id.indexOf(item.id) !== -1) {
          self.user_check_auth_id.push(item.id);
        }
      });
      self.user_check_auth_id.forEach(function(item, index, array) {
        if (self.user_origin_auth_id.indexOf(item) == -1) {
          update_sn.push("");
          update_AdminFunction.push(item);
          update_AdminUserId.push(self.search_user);
          update_read_auth.push(1);
          update_add_auth.push(1);
          update_edit_auth.push(1);
          update_delete_auth.push(1);
        }
      });
      self.user_origin_auth_id.forEach(function(item, index, array) {
        if (self.user_check_auth_id.indexOf(item) == -1) {
          delete_sn.push("");
          delete_AdminFunction.push(item);
          delete_AdminUserId.push(self.search_user);
          delete_read_auth.push(0);
          delete_add_auth.push(0);
          delete_edit_auth.push(0);
          delete_delete_auth.push(0);
        }
      });

      if (update_AdminFunction.length > 0) {
        axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "Admin/AuthorityManage/Replace",
          data: {
            Sn: update_sn,
            AdminFunction: update_AdminFunction,
            AdminUserId: update_AdminUserId,
            Read_Auth: update_read_auth,
            Add_Auth: update_add_auth,
            Edit_Auth: update_edit_auth,
            Del_Auth: update_delete_auth
          }
        })
          .then(function(response) {
            // console.log(response);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          });
      }
      if (delete_AdminFunction.length > 0) {
        axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "Admin/AuthorityManage/Replace",
          data: {
            Sn: delete_sn,
            AdminFunction: delete_AdminFunction,
            AdminUserId: delete_AdminUserId,
            Read_Auth: delete_read_auth,
            Add_Auth: delete_add_auth,
            Edit_Auth: delete_edit_auth,
            Del_Auth: delete_delete_auth
          }
        })
          .then(function(response) {
            // console.log(response);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          });
      }
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          self.$message({
            message: "修改成功",
            type: "success"
          });
          resolve();
        }, 500);
      });
    }
  }
};
</script>
<style lang='scss'>
.tree-container {
  background-color: rgba(24, 144, 255, 0.04);
  border-radius: 4px;
  border: solid 1px #d9d9d9;
}
.tree-style {
  background-color: rgba(255, 255, 255, 0);
}
.tree-style .el-tree-node__content {
  height: 36px;
}
</style>