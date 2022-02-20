<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 事件群組管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium", type='primary', @click='newDialog = true') 新增群組 
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label="'1'") 正常
          el-radio-button(:label="'0'") 停用
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入主群組名稱', v-model='search_group', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(ref='multipleTable', :data='filter_table_data', border='', style='width: 100%')
            //- el-table-column(type='selection', width='40')
            el-table-column(prop='GroupId', label='#', align='center', width='60')
            el-table-column(prop='GroupName', label='群組名稱', align='center')
            el-table-column(prop='Status_str', label='狀態', align='center')
            el-table-column(prop='EditUserName', label='建立者', align='center')
            el-table-column(prop='Update_At', label='建立日期', width='200')
            el-table-column(label='操作', width='120')
              template(slot-scope='scope')
                a.links(@click='get_group(scope.row.GroupId)', type='text') 修改
                a.cancel(@click='handleDeleteComfirm(scope.row.GroupId)', type='text', style='color:#ff4949') 刪除
    //- .col-12.py-3.d-flex.justify-content-end
      el-pagination(background='', layout='prev, pager, next', :current-page='now_page', :page-size='10', :total='total_page', @current-change='get_data')
    //--logDialog
    el-dialog(title='新增群組', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='群組名稱', prop="group_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入群組名稱', clearable)
        el-form-item(label='狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_group()', :loading='lock_btn') 確 認
    //--logDialog
    el-dialog(title='修改群組', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='群組名稱', prop="group_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入群組名稱', clearable)
        el-form-item(label='狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgEventGroupList",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      search_status: "",
      search_group: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        group_name: "",
        status: "1"
      },
      rules: {
        group_name: [
          {
            required: true,
            message: "請填寫群組名稱",
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
        if (
          self.search_group &&
          item.GroupName.indexOf(self.search_group) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "正常";
            } else {
              item["Status_str"] = "停用";
            }
          });
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
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
      this.form.status = "1";
    },
    add_group() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserEventGroupManage/Add",
            data: {
              GroupName: self.form.group_name,
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
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventGroup",
        data: {
          GroupId: group_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data.data_list[0].GroupId;
          self.form.group_name = response.data.data.data_list[0].GroupName;
          self.form.status = response.data.data.data_list[0].Status;
          self.updateDialog = true;
          // console.log(response.data.data.data_list[0]);
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
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserEventGroupManage/Edit",
            data: {
              GroupId: self.update_id,
              GroupName: self.form.group_name,
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
    },
    handleDeleteComfirm(group_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_tag(group_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_tag(group_id) {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST +
          "Member_All/UserEventGroupManage/Delete",
        data: {
          GroupId: group_id
        }
      })
        .then(function(response) {
          self.$message({
            type: "success",
            message: "刪除成功!"
          });
          self.get_data();
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          self.lock_btn = false;
          self.$message({
            type: "info",
            message: "刪除失敗!"
          });
          // console.log(error);
        });
    }
  }
};
</script>
