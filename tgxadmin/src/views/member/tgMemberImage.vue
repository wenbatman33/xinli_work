<template lang="pug">
  .container-fluid
    //--Card 用戶備註
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 用戶備註
          el-button.py-1.float-right(type='text', @click='remarkDialog = true') 新增備註
        .row.card-text.item
          template
            el-table(:data='note_table_data', style='width: 100%')
              el-table-column(prop='Update_At', label='日期', width='170')
              el-table-column(prop='GroupName', label='類型', width='100', align='center')
              el-table-column(prop='Note', label='內容')
              el-table-column(prop='EditUserName', label='建立者', width='100', align='center')
    //--Card 事件紀錄
    .row.no-gutters.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 事件紀錄
          el-button.py-1.float-right(type='text', @click='eventDialog = true') 新增事件
        .row.card-text.item
          template
            el-table(:data='event_table_data', style='width: 100%')
              el-table-column(prop='Create_At', label='日期', width='170')
              el-table-column(prop='GroupName', label='類型', width='100', align='center')
              el-table-column(prop='Status', label='狀態', width='60', align='center')
              el-table-column(prop='EventContent', label='內容')
              el-table-column(prop='EditUserName', label='建立者', width='100', align='center')
              el-table-column(prop='Update_At', label='更新時間', width='170')
              // el-table-column(prop='name', label='處理者', width='100')
              // el-table-column(prop='ReplyContent', label='回覆者', width='100')
              // el-table-column(prop='creator', label='審核者', width='100')
      //--Dialog
      el-dialog(title='新增備註', :visible.sync='remarkDialog', @close="init_dialog('tag_form')")
        el-form.mr-3(:model="form", :rules="rules", ref="tag_form", status-icon)
          el-form-item(label='會員帳號', label-width="88px" ,label-position='left')
            el-input(:value='user_info.UserName', placeholder='輸入會員帳號', :disabled='true', clearable)
          el-form-item(label='備註類型', prop="remark_group" , label-width="88px" ,label-position='left')
            el-select(v-model='form.remark_group', placeholder='請選擇備註類型', clearable)
              el-option(v-for='item in remark_group_option', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(label='備註內容', prop="remark" , label-width="88px" ,label-position='left')
            el-input(v-model='form.remark', placeholder='輸入備註內容', type='textarea', clearable)
        .dialog-footer(slot='footer')
          el-button(@click='remarkDialog = false') 取 消
          el-button(type='primary', @click='add_remark()', :loading='lock_btn') 確 認
      //--Dialog
      el-dialog(title='新增事件', :visible.sync='eventDialog', @close="init_dialog('event_form')")
        el-form.mr-3(:model="event_form", :rules="event_rules", ref="event_form", status-icon)
          el-form-item(label='會員帳號', prop="account", label-width="88px" ,label-position='left')
            el-input(v-model='event_form.account', placeholder='輸入會員帳號',disabled)
          el-form-item(label='事件類型', prop="group", label-width="88px" ,label-position='left')
            el-select.button-wstyle(v-model='event_form.group', placeholder='選擇事件類型', clearable)
              el-option(v-for='item in event_group_option', :key='item.value', :label='item.label', :value='item.value')
          el-form-item(label='事件說明', prop="content", label-width="88px" ,label-position='left')
            el-input.mb-2.textarea-style(v-model='event_form.content', type='textarea')
          el-form-item(label='附件', label-width="88px" ,label-position='left')
            el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
              el-button(slot="trigger" size="small" type="primary") 選取附件
              //- .el-upload__tip(slot='tip') 提示：只能上傳 JPG/PNG 檔案，且檔案大小不超過 500 KB。
        .dialog-footer(slot='footer')
          el-button(@click='eventDialog = false') 取 消
          el-button(type='primary', @click='add_event()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgMemberImage",
  props: ["user_info"],
  watch: {
    UserId(new_value, old_value) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      note_table_data: [],
      event_table_data: [],
      remark_group_option: [],
      event_group_option: [],
      remarkDialog: false,
      eventDialog: false,
      lock_btn: false,
      form: {
        remark_group: "",
        remark: ""
      },
      rules: {
        remark_group: [
          {
            required: true,
            message: "請填寫備註類型",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: true,
            message: "請填寫備註內容",
            trigger: "change"
          }
        ]
      },
      event_form: {
        account: this.user_info.UserName,
        group: "",
        content: "",
        images: "",
        file_list: []
      },
      event_rules: {
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
  computed: {
    UserId: function() {
      return this.user_info.UserId;
    }
  },
  methods: {
    async init() {
      this.get_remark_group_option();
      this.get_event_group_option();
      this.get_note_table_data();
      this.get_event_table_data();
    },
    get_remark_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserNoteGroup",
        data: {
          Status: 1
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.remark_group_option.push({
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
    get_event_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.event_group_option.push({
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
    set_file(param) {
      this.event_form.images = param.file;
    },
    remove_file() {
      this.event_form.images = "";
    },
    get_note_table_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserNoteList",
        data: { UserId: self.user_info.UserId }
      })
        .then(function(response) {
          self.note_table_data = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_event_table_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventList",
        data: { UserId: self.user_info.UserId }
      })
        .then(function(response) {
          self.event_table_data = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    init_dialog(form) {
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
      }
      this.lock_btn = false;
      this.form.remark_group = "";
      this.form.remark = "";
      this.event_form.account = this.user_info.UserName;
      this.event_form.group = "";
      this.event_form.content = "";
      this.event_form.images = "";
      this.event_form.file_list = [];
    },
    add_remark() {
      let self = this;
      this.$refs["tag_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/UserNoteListManage/Add",
            data: {
              GroupId: self.form.remark_group,
              UserName: self.user_info.UserName,
              Note: self.form.remark
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_note_table_data();
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
              self.remarkDialog = false;
            });
        }
      });
    },
    add_event() {
      let self = this;
      this.$refs["event_form"].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("UserName", self.event_form.account);
          data.append("GroupId", self.event_form.group);
          data.append("EventContent", self.event_form.content);
          data.append("Images1", self.event_form.images);
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
                self.get_event_table_data();
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
              self.eventDialog = false;
            });
        }
      });
    }
  }
};
</script>
