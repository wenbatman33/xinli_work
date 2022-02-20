<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 遊戲標籤管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium",type='primary', @click='newDialog = true') 新增標籤
    .row.no-gutters.px-3.py-3
      .col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label='"1"') 正常
          el-radio-button(:label='"0"') 停用
      .col-md-4.col-12.py-1
        el-select(v-model='form.search_tag_group', size='medium', placeholder='選擇群組名稱',@change="get_data()" , clearable)
          el-option(v-for='item in tag_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-2.py-1
        router-link(:to="{name:'tgGameTagGroupList'}")
          el-button(size="medium", type='text') 群組管理
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入標籤名稱', v-model='search_content', clearable)
          el-button(slot='append', icon='el-icon-search', @click="get_data()")
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='Sort', label='排序', width='60', align='center')
          el-table-column(prop='GroupName', label='群組名稱')
          el-table-column(prop='TagName', label='標籤名稱')
          el-table-column(prop='Status_str', label='狀態', width='120', align='center')
          el-table-column(label='操作', width='120', align='center')
            template(slot-scope='scope')
              el-button(type='text', @click='get_tag(scope.row.Sn)') 
              router-link(:to="{name:'tgGameTag', query:{group_id: scope.row.GroupId, tag_id: scope.row.Sn}}") 
                el-button(type='text') 查看
              el-button(type='text', @click='get_tag(scope.row.Sn)') 修改
              // el-button(type='text') 排序
    //--Dialog
    el-dialog(title='新增標籤名稱', :visible.sync='newDialog', @close="init_dialog('add_form')" )
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='群組名稱', prop="search_tag_group", label-width="88px" ,label-position='left')
          el-select(v-model='form.search_tag_group',size='medium', placeholder='選擇群組名稱', clearable)
            el-option(v-for='item in tag_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='標籤名稱', prop="tag_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.tag_name', placeholder='輸入標籤名稱', clearable)
        el-form-item(label='標籤排序', prop="sort", label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入標籤排序', clearable)
        el-form-item(label='項目狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_tag()', :loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改標籤名稱', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='群組名稱', prop="search_tag_group", label-width="88px" ,label-position='left')
          el-select(v-model='form.search_tag_group',size='medium', placeholder='選擇群組名稱', clearable)
            el-option(v-for='item in tag_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='標籤名稱', prop="tag_name", label-width="88px" ,label-position='left')
          el-input(v-model='form.tag_name', placeholder='輸入標籤名稱', clearable)
        el-form-item(label='標籤排序', prop="sort", label-width="88px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入標籤排序', clearable)
        el-form-item(label='項目狀態', prop="status", label-width="88px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_tag()', :loading='lock_btn') 確 認
    // el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgGameTagList",
  mounted() {
    this.get_tag_group_option();
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      tag_group_option: [
        {
          value: "",
          label: "全部"
        }
      ],
      search_status: "",
      search_content: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        search_tag_group: "",
        tag_name: "",
        sort: "",
        status: "1"
      },
      rules: {
        search_tag_group: [
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
          self.search_content &&
          item.TagName.indexOf(self.search_content) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_tag_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.tag_group_option.push({
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
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagList",
        data: {
          GroupId: self.form.search_tag_group,
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
      this.form.tag_name = "";
      this.form.sort = "";
      this.form.status = "1";
    },
    add_tag() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameTagListManage/Add",
            data: {
              GroupId: self.form.search_tag_group,
              TagName: self.form.tag_name,
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
    get_tag(tag_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagList",
        data: {
          Sn: tag_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data[0].Sn;
          self.form.search_tag_group = response.data.data[0].GroupId;
          self.form.tag_name = response.data.data[0].TagName;
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
    update_tag() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameTagListManage/Edit",
            data: {
              Sn: self.update_id,
              GroupId: self.form.search_tag_group,
              TagName: self.form.tag_name,
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