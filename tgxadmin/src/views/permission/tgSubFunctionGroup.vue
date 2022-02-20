<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 次群組管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium",type='primary', @click='newDialog = true') 新增次群組
    .row.no-gutters.px-3.py-3
      .col-12.px-1.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label="'1'") 正常
          el-radio-button(:label="'2'") 測試
          el-radio-button(:label="'0'") 停用
      //--Search
      .col-md-4.col-12.px-1.py-1
        el-select(size="medium" , v-model='form.search_main_group', placeholder='選擇主群組', @change='get_data()', clearable)
          el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-1.py-1
        el-input(size="medium", placeholder='輸入次群組名稱', v-model='search_group', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='Sort', label='排序', width='60', align='center')
          el-table-column(prop='Name', label='次群組名稱')
          el-table-column(prop='Status_str', label='狀態', width='100', align='center')
          el-table-column(label='操作', width='100', align='center')
            template(slot-scope='scope')
              a.links(@click='get_group(scope.row.Sn)', type='text') 修改
    //--Dialog
    el-dialog(title='新增次群組', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='主群組名稱', prop="search_main_group", label-width="100px" ,label-position='left')
          el-select.select-wstyle(v-model='form.search_main_group', placeholder='選擇主群組名稱', clearable)
            el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='次群組名稱', prop="group_name", label-width="100px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='選擇次群組名稱', clearable)
        el-form-item(label='排序', prop="sort", label-width="100px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
        el-form-item(label='項目狀態', prop="status", label-width="100px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_group', :loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改次群組', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='主群組名稱', prop="search_main_group", label-width="100px" ,label-position='left')
          el-select.select-wstyle(v-model='form.search_main_group', placeholder='選擇主群組名稱', clearable)
            el-option(v-for='item in main_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='次群組名稱', prop="group_name", label-width="100px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='選擇次群組名稱', clearable)
        el-form-item(label='排序', prop="sort", label-width="100px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
        el-form-item(label='項目狀態', prop="status", label-width="100px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
  // el-pagination.col.mt-3.mb-4.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgSubFunctionGroup",
  mounted() {
    let self = this;
    this.get_main_group_option().then(function() {
      self.form.search_main_group = self.$route.query.main_group_id;
      self.get_data();
    });
  },
  data() {
    return {
      tableData: [],
      main_group_option: [],
      search_status: "",
      search_group: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        search_main_group: "",
        group_name: "",
        sort: "",
        status: "1"
      },
      rules: {
        search_main_group: [
          {
            required: true,
            message: "請選擇主群組名稱",
            trigger: "change"
          }
        ],
        group_name: [
          {
            required: true,
            message: "請填寫次群組名稱",
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
        if (self.search_group && item.Name.indexOf(self.search_group) == -1) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
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
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QuerySubFunction/",
        data: {
          ParentNode: self.form.search_main_group,
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
      this.form.group_name = "";
      this.form.sort = "";
      this.form.status = "1";
    },
    add_group() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/SubFunctionManage/Add",
            data: {
              ParentNode: self.form.search_main_group,
              Name: self.form.group_name,
              Sort: self.form.sort,
              Status: self.form.status
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
    get_group(group_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QuerySubFunction",
        data: {
          Sn: group_id
        }
      })
        .then(function(response) {
          self.update_id = group_id;
          self.form.search_main_group = response.data.data[0].ParentNode;
          self.form.group_name = response.data.data[0].Name;
          self.form.sort = response.data.data[0].Sort;
          self.form.status = response.data.data[0].Status;
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
            url: process.env.VUE_APP_APIHOST + "Admin/SubFunctionManage/Edit",
            data: {
              Sn: self.update_id,
              Name: self.form.group_name,
              ParentNode: self.form.search_main_group,
              Sort: self.form.sort,
              Status: self.form.status
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