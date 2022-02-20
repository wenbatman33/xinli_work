<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 事件管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium",type='primary', @click='newDialog = true') 新增事件 
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入會員帳號', v-model='search_account', @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)")
      .col-md-1.col-12.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee', transition="fade") 進階搜尋
          i.el-icon-arrow-down.el-icon--right
    //--advance search
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='事件編號')
                    el-input(size="medium", v-model='search_id', placeholder='輸入事件編號')
                .col-md-6.col-12
                  el-form-item(label='操作人')
                    el-input(size="medium", v-model='search_execer', placeholder='輸入操作人')
                .col-md-6.col-12
                  el-form-item(label='事件類型')
                    el-select(size="medium", v-model='search_type', filterable='', placeholder='選擇事件類型', clearable)
                      el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='事件狀態')
                    el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇事件狀態', clearable)
                      el-option(label='待處理', value="0")
                      el-option(label='處理中', value="1")
                      el-option(label='已結案', value="2")
                .col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='Sn', label='事件編號', width='80', align='center')
            el-table-column(label='事件狀態', width='90', align='center')
              template(slot-scope='scope')
                el-tag(v-if="scope.row.Status == 0", type="danger", disable-transitions='') {{scope.row.StatusName}}
                el-tag(v-if="scope.row.Status == 1", type="warning", disable-transitions='') {{scope.row.StatusName}}
                el-tag(v-if="scope.row.Status == 2", type="success", disable-transitions='') {{scope.row.StatusName}}
            el-table-column(prop='GroupName', label='事件類型', width='90', show-overflow-tooltip=true, align='center')
            el-table-column(label='會員帳號', width='140')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='EventContent', label='說明', show-overflow-tooltip=true)
            el-table-column(prop='Create_At', label='建立時間', width='170')
            el-table-column(prop='Update_At', label='更新時間', width='170')
            el-table-column(prop='EditUserName', label='操作人', width='100')
            el-table-column(label='操作', width='60', align='center')
              template(slot-scope='scope')
                router-link.links(:to="{name:'tgEventInfo', query:{event_id:scope.row.Sn}}") 查看
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--logDialog
    el-dialog(title='新增事件', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='會員帳號', prop="account", label-width="88px" ,label-position='left')
          el-input(v-model='form.account', placeholder='輸入會員帳號')
        el-form-item(label='事件類型', prop="group", label-width="88px" ,label-position='left')
          el-select.button-wstyle(v-model='form.group', placeholder='選擇事件類型', clearable)
            el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='事件說明', prop="content", label-width="88px" ,label-position='left')
          el-input.mb-2.textarea-style(v-model='form.content', type='textarea')
        el-form-item(label='附件', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :before-upload="check_file" :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", multiple, :limit=5, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="medium" type="primary") 選取附件
            .el-upload__tip(slot='tip') 提示：檔案大小不可超過 4MB
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_event()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgEventList",
  mounted() {
    this.get_group_option();
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      group_option: [],
      search_account: "",
      search_id: "",
      search_execer: "",
      search_type: "",
      search_status: "",
      now_page: 1,
      page_size: 100,
      total_page: 0,
      toggletosee: false,
      newDialog: false,
      lock_btn: false,
      form: {
        account: "",
        group: "",
        content: "",
        images: [],
        file_list: []
      },
      rules: {
        account: [
          {
            required: true,
            message: "請輸入會員帳號",
            trigger: "change"
          }
        ],
        group: [
          {
            required: true,
            message: "請選擇事件類型",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "請填寫事件說明",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    get_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
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
    get_data(now_page) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventList",
        data: {
          UserName: self.search_account,
          Sn: self.search_id,
          GroupId: self.search_type,
          EditUserName: self.search_execer,
          Status: self.search_status,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
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
      this.form.account = "";
      this.form.group = "";
      this.form.content = "";
      this.form.images = [];
      this.form.file_list = [];
    },
    set_file(param) {
      this.form.images.push(param.file);
    },
    check_file(file) {
      if (file.size > 4 * 1024 * 1024) {
        this.$message({
          message: "檔案大小不可超過 4MB",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    remove_file(file, fileList) {
      this.form.images.forEach(function(item, index, array) {
        if (item.uid == file.uid) {
          array.splice(index, 1);
        }
      });
    },
    add_event() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("UserName", self.form.account);
          data.append("GroupId", self.form.group);
          data.append("EventContent", self.form.content);
          if (self.form.images[0]) {
            data.append("Images1", self.form.images[0]);
          }
          if (self.form.images[1]) {
            data.append("Images2", self.form.images[1]);
          }
          if (self.form.images[2]) {
            data.append("Images3", self.form.images[2]);
          }
          if (self.form.images[3]) {
            data.append("Images4", self.form.images[3]);
          }
          if (self.form.images[4]) {
            data.append("Images5", self.form.images[4]);
          }
          data.append("Status", 0);
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserEventListManage/Add",
            data: data
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
    }
  }
};
</script>
