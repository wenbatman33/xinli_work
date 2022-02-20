<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 群組管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium", type='primary', @click='newDialog = true') 新增群組
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label="'1'") 正常
          el-radio-button(:label="'0'") 停用
      //--Search
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入群組名稱', v-model='search_group', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='GroupId', label='排序', width='60', align='center')
          el-table-column(prop='GroupName', label='群組名稱')
          el-table-column(prop='TagType_str', label='位置分類')
          el-table-column(prop='Status_str', label='狀態')
          el-table-column(label='操作', width='100')
            template(slot-scope='scope')
              el-button(@click='get_group(scope.row.GroupId)', type='text') 修改
    //--Dialog
    el-dialog(title='新增群組', :visible.sync='newDialog', @close="init_dialog('add_form')" )
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='群組名稱', prop="group_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入群組名稱', clearable)
        el-form-item(label='位置分類', prop="tag_type", label-width="88px" ,label-position='left')
          el-select(v-model='form.tag_type',size='medium', placeholder='選擇位置分類', clearable)
            el-option(label='首頁遊戲標籤', value="0")
            el-option(label='其他', value="1")
        el-form-item(label='項目狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_group', :loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改群組', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='群組名稱', prop="group_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入群組名稱', clearable)
        el-form-item(label='位置分類', prop="tag_type", label-width="88px" ,label-position='left')
          el-select(v-model='form.tag_type',size='medium', placeholder='選擇位置分類', clearable)
            el-option(label='首頁遊戲標籤', value="0")
            el-option(label='其他', value="1")
        el-form-item(label='項目狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
    //- el-pagination.col.mt-3.mb-4.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgGameTagGroupList",
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
        tag_type: "0",
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
        tag_type: [
          {
            required: true,
            message: "請選擇位置分類",
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
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagGroup",
        data: {
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
            item["TagType_str"] = "";
            if (item["TagType"] == 1) {
              item["TagType_str"] = "其他";
            } else {
              item["TagType_str"] = "首頁遊戲標籤";
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
      this.form.tag_type = "0";
      this.form.status = "1";
    },
    add_group() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameTagGroupManage/Add",
            data: {
              GroupName: self.form.group_name,
              TagType: self.form.tag_type,
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
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagGroup",
        data: {
          GroupId: group_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data[0].GroupId;
          self.form.group_name = response.data.data[0].GroupName;
          self.form.tag_type = response.data.data[0].TagType;
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
            url: process.env.VUE_APP_APIHOST + "Web/GameTagGroupManage/Edit",
            data: {
              GroupId: self.update_id,
              GroupName: self.form.group_name,
              TagType: self.form.tag_type,
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
