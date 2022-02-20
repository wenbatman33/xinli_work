<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 標籤清單
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium", type='primary') 新增標籤
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.px-1.py-1
        el-select(size="medium" , v-model='form.search_group', placeholder='選擇群組名稱', @change="get_data()", clearable)
          el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
      //--Search
      .col-md-4.col-12.px-1.py-1
        el-input(size="medium", placeholder='輸入標籤名稱', v-model='search_tag', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='Sort', label='#', width='60',align='center')
          el-table-column(prop='TagName', label='標籤名稱')
          el-table-column(prop='MemberCount', label='會員人數')
          el-table-column(prop='StatusName', label='狀態', width='60', align='center')
          el-table-column(prop='time', label='操作')
            template(slot-scope='scope')
              router-link.links(:to="{name:'tgMemberTag', query:{tag_group : $route.query.group_id, tag_id: scope.row.TagId}}") 查看
              a.links(v-if="read_only_group.indexOf(scope.row.GroupId) == -1 ", @click='get_tag(scope.row.TagId)', type='text') 修改
              a.links(v-if="read_only_group.indexOf(scope.row.GroupId) == -1 ", @click='copy_group(scope.row.TagId)', type='text') 複製
              a.cancel(v-if="read_only_group.indexOf(scope.row.GroupId) == -1 ", @click='handleDeleteComfirm(scope.row.TagId)', type='text') 刪除
      // el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
    //--Dialog
    el-dialog(title='新增標籤', :visible.sync='newDialog', @close="init_dialog('add_form')"  )
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='群組名稱', prop="search_group", label-width="88px" ,label-position='left')
          el-select.formselect.inputselect.pl-1(size="medium" , v-model='form.search_group', placeholder='選擇群組名稱', clearable)
            el-option( v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='標籤名稱', prop="tag_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.tag_name', placeholder='輸入標籤名稱', clearable)  
        el-form-item(label='排序', prop="sort", label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable) 
        el-form-item(label='項目狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='Slack通知', prop="is_notice", label-width="88px" ,label-position='left')
          el-switch(v-model='form.is_notice', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_tag()') 確 認
    //--Dialog
    el-dialog(title='修改標籤', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='群組名稱', prop="search_group" , label-width="88px" ,label-position='left')
          el-select.formselect.inputselect.pl-1(size="medium" , v-model='form.search_group', placeholder='選擇群組名稱', clearable)
            el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='標籤名稱', prop="tag_name" , label-width="88px" ,label-position='left')
          el-input(v-model='form.tag_name', placeholder='輸入標籤名稱', clearable)  
        el-form-item(label='排序', prop="sort" , label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable) 
        el-form-item(label='項目狀態', prop="status" , label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='Slack通知', prop="is_notice" , label-width="88px" ,label-position='left')
          el-switch(v-model='form.is_notice', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_tag()') 確 認
    //--Dialog
    //- el-dialog(title='複製標籤', :visible.sync='copyDialog')
      el-form.mr-3()
        el-form-item(label='群組名稱', label-width="88px" ,label-position='left')
          el-select.formselect.inputselect.pl-1(size="medium" , v-model='form.search_group', placeholder='選擇群組', clearable)
            el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='標籤名稱', label-width="88px" ,label-position='left')
          el-input(v-model='form.tag_name', placeholder='輸入標籤名稱', clearable)  
        el-form-item(label='排序', label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入群組名稱', clearable) 
        el-form-item(label='項目狀態', label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='Slack通知', label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='copyDialog = false') 取 消
        el-button(type='primary', @click='add_tag()') 確 認
</template>
<script>
export default {
  name: "tgGroupList",
  mounted() {
    let self = this;
    this.get_group_option().then(function() {
      self.form.search_group = self.$route.query.group_id;
      self.get_data();
    });
  },
  data() {
    return {
      tableData: [],
      group_option: [],
      read_only_group: ["3", "4", "26"],
      search_tag: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      copyDialog: false,
      update_id: "",
      form: {
        search_group: "",
        tag_name: "",
        sort: "",
        status: "1",
        is_notice: "0"
      },
      rules: {
        search_group: [
          {
            required: true,
            message: "請選擇群組名稱",
            trigger: "change"
          }
        ],
        tag_name: [
          {
            required: true,
            message: "請填寫標籤名稱",
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
        is_notice: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇Slack通知",
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
        if (self.search_tag && item.TagName.indexOf(self.search_tag) == -1) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_group_option() {
      let self = this;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.group_option.push({
              value: item.GroupId,
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
    sort(a, b) {
      if (a.Sort > b.Sort) return -1;
      if (a.Sort < b.Sort) return 1;
      return 0;
    },
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {
          Type: "Detail",
          GroupId: self.form.search_group
        }
      })
        .then(function(response) {
          response.data.data.data_list.sort(self.sort);
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
      this.form.tag_name = "";
      this.form.sort = "";
      this.form.status = "1";
      this.form.is_notice = "0";
    },
    add_tag() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/UserTagListManage/Add",
            data: {
              GroupId: self.form.search_group,
              TagName: self.form.tag_name,
              Sort: self.form.sort,
              Status: self.form.status,
              IsNotice: self.form.is_notice
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
    get_tag(tag_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {
          Type: "Detail",
          TagId: tag_id
        }
      })
        .then(function(response) {
          self.update_id = tag_id;
          self.form.search_group = response.data.data.data_list[0].GroupId;
          self.form.tag_name = response.data.data.data_list[0].TagName;
          self.form.sort = response.data.data.data_list[0].Sort;
          self.form.status = response.data.data.data_list[0].Status;
          self.form.is_notice = response.data.data.data_list[0].IsNotice;
          self.updateDialog = true;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_tag() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/UserTagListManage/Edit",
            data: {
              TagId: self.update_id,
              GroupId: self.form.search_group,
              TagName: self.form.tag_name,
              Sort: self.form.sort,
              Status: self.form.status,
              IsNotice: self.form.is_notice
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
    copy_group(tag_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {
          Type: "Detail",
          TagId: tag_id
        }
      })
        .then(function(response) {
          self.form.search_group = response.data.data.data_list[0].GroupId;
          self.form.tag_name = response.data.data.data_list[0].TagName;
          self.form.sort = response.data.data.data_list[0].Sort;
          self.form.status = response.data.data.data_list[0].Status;
          self.newDialog = true;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    handleDeleteComfirm(tag_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_tag(tag_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_tag(tag_id) {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Member_All/UserTagListManage/Delete",
        data: {
          TagId: tag_id
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
            self.$message.error("刪除失敗： " + response.data.error_message);
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
