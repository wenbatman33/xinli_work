<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 標籤管理
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium",type='primary') 新增群組
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label='"正常"') 正常
          el-radio-button(:label='"停用"') 停用
      //--Search
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入群組名稱', v-model='search_group', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='GroupId', label='#', width='60', align='center')
          el-table-column(prop='GroupName', label='群組名稱', width='120')
          el-table-column(prop='TagName', label='標籤', show-overflow-tooltip='')
          el-table-column(prop='StatusName', label='狀態', width='80')
          el-table-column(prop='Update_At', label='建立時間', width='170')
          el-table-column(prop='EditUserName', label='設定者', width='120')
          el-table-column(label='操作', width='140')
            template(slot-scope='scope')
              router-link.links(:to="{name:'tgGroupList', query:{group_id: scope.row.GroupId}}") 查看
              a.links(v-if="read_only_group.indexOf(scope.row.GroupId) == -1 ", @click='get_group(scope.row.GroupId)', type='text') 修改
              //a(@click='copyDialog = true', type='text') 複製
              a.cancel(v-if="read_only_group.indexOf(scope.row.GroupId) == -1 ", @click='handleDeleteComfirm(scope.row.GroupId)', type='text') 刪除
    //--Dialog
    el-dialog(title='新增群組', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='群組名稱', prop="group_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入群組名稱', clearable)  
        el-form-item(label='項目狀態', prop="status", label-width="110px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='限制唯一標籤', prop="status", label-width="110px" ,label-position='left')
          el-switch(v-model='form.unique_tag', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_group()', :loading='lock_btn') 確 認 
    //--Dialog
    el-dialog(title='修改群組', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='群組名稱', prop="group_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入群組名稱', clearable)  
        el-form-item(label='項目狀態', prop="status", label-width="110px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='限制唯一標籤', prop="status", label-width="110px" ,label-position='left')
          el-switch(v-model='form.unique_tag', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
    //- el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgMemberGroup",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      read_only_group: ["3", "4", "24", "25", "26"],
      search_status: "",
      search_group: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        group_name: "",
        status: "1",
        unique_tag: "0"
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
        ],
        unique_tag: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇限制唯一標籤",
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
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagGroup",
        data: {
          Type: "Detail"
        }
      })
        .then(function(response) {
          response.data.data.data_list = response.data.data.data_list.sort(
            function(a, b) {
              return a.GroupId > b.GroupId ? -1 : b.GroupId > a.GroupId ? 1 : 0;
            }
          );
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
              process.env.VUE_APP_APIHOST + "Member_All/UserTagGroupManage/Add",
            data: {
              GroupName: self.form.group_name,
              Status: self.form.status,
              UniqueTag: self.form.unique_tag
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
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagGroup",
        data: {
          Type: "Detail",
          GroupId: group_id
        }
      })
        .then(function(response) {
          self.update_id = group_id;
          self.form.group_name = response.data.data.data_list[0].GroupName;
          self.form.status = response.data.data.data_list[0].Status;
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
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserTagGroupManage/Edit",
            data: {
              GroupId: self.update_id,
              GroupName: self.form.group_name,
              Status: self.form.status,
              UniqueTag: self.form.unique_tag
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
          self.del_group(group_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_group(group_id) {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Member_All/UserTagGroupManage/Delete",
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