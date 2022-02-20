<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 功能管理
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium", type='primary') 新增功能
    .row.no-gutters.px-3.py-3
      .col-12.px-1.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label="'1'") 正常
          el-radio-button(:label="'2'") 測試
          el-radio-button(:label="'0'") 停用
      .col-md-4.col-12.px-1.py-1
        el-select(size="medium", v-model='form.search_main_group', placeholder='選擇主群組', @change='get_sub_group_option(), get_data()', clearable)
          el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1
        el-select(size="medium" , v-model='form.search_sub_group', placeholder='選擇次群組', @change='get_data()', clearable)
          el-option(v-for='item in sub_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1
        el-input(size="medium", placeholder='輸入功能名稱', v-model='search_function', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%') 
          el-table-column(prop='Sort', label='排序', width='60', align='center')
          el-table-column(prop='MainFunction.Name', label='主群組')
          el-table-column(prop='SubFunction.Name', label='次群組')
          el-table-column(prop='Name', label='功能名稱')
          el-table-column(prop='Path', label='功能路徑')
          el-table-column(prop='Status_str', label='狀態', width='60', align='center')
          el-table-column(label='操作', width='200')
            template(slot-scope='scope')
              a.links(@click='get_group(scope.row.Sn)', type='text') 修改
              router-link.links(:to="{name:'tgAuthorityList', query:{main_group_id: scope.row.MainFunction.Sn, sub_group_id: scope.row.SubFunction.Sn, function_id: scope.row.Sn}}") 權限管理
              router-link.links(:to="{name:'tgChangeLog', query:{}}") 異動紀錄
    //--Dialog
    el-dialog(title='新增功能', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='主群組', prop="search_main_group", label-width="88px" ,label-position='left')
          el-select(v-model='form.search_main_group',size='medium', placeholder='選擇主群組', @change="get_sub_group_option()", clearable)
            el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='次群組', prop="search_sub_group", label-width="88px" ,label-position='left')
          el-select(v-model='form.search_sub_group', size='medium', placeholder='選擇次群組', clearable)
            el-option(v-for='item in sub_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='功能名稱', prop="name", label-width="88px" ,label-position='left')
          el-input(v-model='form.name', placeholder='輸入功能名稱', clearable)
        el-form-item(label='排序', prop="sort", label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
        el-form-item(label='路徑', prop="path", label-width="88px" ,label-position='left')
          el-input.mt-2(v-model='form.path', placeholder='輸入路徑', clearable)
        el-form-item(label='狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='目錄選單', prop="menu", label-width="88px" ,label-position='left')
          el-switch(v-model='form.menu', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_function()', :loading='lock_btn') 確 認 
    //--Dialog
    el-dialog(title='修改功能', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='主群組', prop="search_main_group", label-width="88px" ,label-position='left')
          el-select(v-model='form.search_main_group',size='medium', placeholder='選擇主群組', @change="get_sub_group_option()", clearable)
            el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='次群組', prop="search_sub_group", label-width="88px" ,label-position='left')
          el-select(v-model='form.search_sub_group', size='medium', placeholder='選擇次群組', clearable)
            el-option(v-for='item in sub_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='功能名稱', prop="name", label-width="88px" ,label-position='left')
          el-input(v-model='form.name', placeholder='輸入功能名稱', clearable)
        el-form-item(label='排序', prop="sort", label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
        el-form-item(label='路徑', prop="path", label-width="88px" ,label-position='left')
          el-input.mt-2(v-model='form.path', placeholder='輸入路徑', clearable)
        el-form-item(label='狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='目錄選單', prop="menu", label-width="88px" ,label-position='left')
          el-switch(v-model='form.menu', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_function()', :loading='lock_btn') 確 認
    // el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgFunctionList",
  mounted() {
    this.get_main_group_option();
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      main_group_option: [],
      sub_group_option: [],
      search_status: "",
      search_function: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      form: {
        search_main_group: "",
        search_sub_group: "",
        name: "",
        path: "",
        sort: "",
        status: "1",
        menu: "1"
      },
      rules: {
        search_main_group: [
          {
            required: true,
            message: "請選擇主群組",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "請填寫功能名稱",
            trigger: "change"
          }
        ],
        path: [
          {
            required: true,
            message: "請填寫路徑",
            trigger: "change"
          }
        ],
        status: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇狀態",
            trigger: "change"
          }
        ],
        menu: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇目錄選單",
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
        if (self.search_status && item.Status != self.search_status) {
          return false;
        }
        if (
          self.search_function &&
          item.Name.indexOf(self.search_function) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_main_group_option() {
      let self = this;
      axios({
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
          ParentNode: self.form.search_main_group
        }
      })
        .then(function(response) {
          self.sub_group_option = [];
          self.form.search_sub_group = "";
          response.data.data.forEach(function(item, index, array) {
            self.sub_group_option.push({
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
    get_data() {
      let self = this;
      let parent_node;
      if (self.form.search_sub_group) {
        parent_node = self.form.search_sub_group;
      } else {
        parent_node = self.form.search_main_group;
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryFunction/",
        data: {
          Node: parent_node,
          Status: self.search_status
        }
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "正常";
            } else {
              item["Status_str"] = "停用";
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
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.update_id = "";
      this.form.name = "";
      this.form.path = "";
      this.form.sort = "";
      this.form.status = "1";
    },
    add_function() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          let parent_node;
          if (self.form.search_sub_group) {
            parent_node = self.form.search_sub_group;
          } else {
            parent_node = self.form.search_main_group;
          }
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/FunctionManage/Add",
            data: {
              Name: self.form.name,
              Path: self.form.path,
              ParentNode: parent_node,
              Sort: self.form.sort,
              Status: self.form.status,
              Menu: self.form.menu
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
    get_group(function_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryFunction",
        data: {
          Sn: function_id
        }
      })
        .then(async function(response) {
          self.update_id = function_id;
          self.form.name = response.data.data[0].Name;
          self.form.path = response.data.data[0].Path;
          self.form.search_main_group = response.data.data[0].MainFunction.Sn;
          await self.get_sub_group_option();
          self.form.search_sub_group = response.data.data[0].SubFunction.Sn;
          self.form.sort = response.data.data[0].Sort;
          self.form.statu = response.data.data[0].Status;
          self.form.menu = response.data.data[0].Menu;
          self.updateDialog = true;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_function() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          let parent_node;
          if (self.form.search_sub_group) {
            parent_node = self.form.search_sub_group;
          } else {
            parent_node = self.form.search_main_group;
          }
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/FunctionManage/Edit",
            data: {
              Sn: self.update_id,
              Name: self.form.name,
              Path: self.form.path,
              ParentNode: parent_node,
              Sort: self.form.sort,
              Status: self.form.status,
              Menu: self.form.menu
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
