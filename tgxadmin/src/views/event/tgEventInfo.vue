<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-2.pt-1
        h5 事件編號: {{event_id}}
      .col-10.pt-1
        h5 交易編號: {{info.OrderId}}
    //--Card 事件資訊
    .row.no-gutters.px-3.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 事件資訊
          el-button.mx-2.py-1(size='medium', type='text', @click='show_event_log()') 紀錄
        .row.card-text.item
          span.col-md-4.col-12.py-2 會員帳號：{{info.UserName}}
          span.col-md-4.col-12.py-2 建立時間：{{info.Create_At}}
          span.col-md-4.col-12.py-2 建立者：{{info.EditUserName}}
          span.col-md-4.col-12.py-2 事件類型：{{info.GroupName}}
            el-button.mx-2.py-1(size='medium', type='text', @click='typeDialog = true') 變更
          span.col-md-4.col-12.py-2 事件狀態：{{info.StatusName}}
            el-button.mx-2.py-1(size='medium', type='text', @click='statusDialog = true') 變更
    //--Card 事件說明
    .row.no-gutters.px-3.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 事件說明
          el-button.py-1.float-right(style='float: right; padding: 3px 0', type='text', @click='editDialog = true') 編輯
        .row.card-text.item
          span.col-12.py-2 {{info.EventContent}}
          span.col-12.py-2 附件：
            el-button.mx-2.py-1(v-if="info.Images1", type='text', @click='picDialog1 = true') 附件1
            el-button.mx-2.py-1(v-if="info.Images2", type='text', @click='picDialog2 = true') 附件2
            el-button.mx-2.py-1(v-if="info.Images3", type='text', @click='picDialog3 = true') 附件3
            el-button.mx-2.py-1(v-if="info.Images4", type='text', @click='picDialog4 = true') 附件4
            el-button.mx-2.py-1(v-if="info.Images5", type='text', @click='picDialog5 = true') 附件5
    //--Card 處理說明
    .row.no-gutters.px-3.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 處理說明
          //el-button(style='float: right; padding: 3px 0', type='text', @click='dealDialog = true') 編輯
        .row.card-text.item
          .col-12.py-2
            el-input.textarea-style(v-model='reply_content', type='textarea')
          .col-12.py-2.d-flex.flex-row-reverse
            el-button(size='medium', type='primary', @click='dealDialog=true', :loading='lock_btn') 送 出
    //--Card 處理紀錄
    .row.no-gutters.px-3.pt-3
      el-card.col.box-card(shadow='never')
        .clearfix.cardtitle-stlye(slot='header') 處理紀錄
        .row.card-text.item
          template
            el-table(:data='tableData', style='width: 100%')
              el-table-column(prop='Sn', label='處理序號', width='80', align='center')
              el-table-column(prop='ReplyUserName', label='操作人', width='140')
              el-table-column(prop='ReplyContent', label='處理說明')
              el-table-column(prop='StatusName', label='狀態', width='80', align='center')
              el-table-column(prop='Update_At', label='處理時間', width='170')
    //- popup_typeDialog
    el-dialog(title='變更事件類型', :visible.sync='typeDialog', @close="init_dialog('group_form')")
      el-form.mr-3(:model="group_form", :rules="group_form_rules", ref="group_form", status-icon)
        el-form-item(label='事件類型', prop="event_group", label-width="120px" ,label-position='left')
          el-select(size='medium', v-model='group_form.event_group', placeholder='選擇事件類型', clearable)
            el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
      span(slot='footer')
        el-button(@click='typeDialog=false') 取 消
        el-button(type='primary', @click='innerTypeDialog=true') 下一步
      el-dialog(width='30%', title='變更確認', :visible.sync='innerTypeDialog', append-to-body='')
        span 請確認是否儲存本次變更？
        span(slot='footer')
          el-button(@click='typeDialog = false; innerTypeDialog=false') 取 消
          el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
    //- popup_statusDialog
    el-dialog(title='變更事件狀態', :visible.sync='statusDialog', @close="init_dialog('status_form')")
      el-form.mr-3(:model="status_form", :rules="status_form_rules", ref="status_form", status-icon)
        el-form-item(label='事件狀態', prop="event_status", label-width="120px" ,label-position='left')
          el-radio-group.ml-1.radio-style(v-model='status_form.event_status')
            el-radio(label='0') 待處理
            el-radio(label='1') 處理中
            el-radio(label='2') 已結案
      span(slot='footer')
        el-button(@click='statusDialog=false') 取 消
        el-button(type='primary', @click='innerStatusDialog=true') 下一步
      el-dialog(width='30%', title='變更確認', :visible.sync='innerStatusDialog', append-to-body='')
        span 請確認是否儲存本次變更？
        span(slot='footer')
          el-button(@click='statusDialog=false;innerStatusDialog=false') 取 消
          el-button(type='primary', @click='update_status()', :loading='lock_btn') 確 認
    //- popup_editDialog
    el-dialog(title='編輯事件說明', :visible.sync='editDialog', @close="init_dialog('content_form')")
      el-form.mr-3(:model="content_form", :rules="content_form_rules", ref="content_form", status-icon)
        el-form-item(label='說明內容',prop="event_content", label-width="78px" ,label-position='left')
          el-input.textarea-style(v-model='content_form.event_content', type='textarea')
        el-form-item(label='附件', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="content_form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
            //- .el-upload__tip(slot='tip') 提示：只能上傳 JPG/PNG 檔案，且檔案大小不超過 500 KB。
      span(slot='footer')
        el-button(@click='editDialog = false') 取 消
        el-button(type='primary', @click='innerEditDialog=true') 下一步
      el-dialog(width='30%', title='變更確認', :visible.sync='innerEditDialog', append-to-body='')
        span 請確認是否儲存本次變更？
        span(slot='footer')
          el-button(@click='editDialog=false;innerEditDialog=false') 取 消
          el-button(type='primary', @click='update_content()', :loading='lock_btn') 確 認
    //- popup_dealDialog
    el-dialog(width='30%', top='30vh', :visible.sync='dealDialog', append-to-body='')
      span 請確認是否送出處理說明？
      span(slot='footer')
        el-button(@click='dealDialog = false') 取 消
        el-button(type='primary', @click='add_reply_content()') 確 認
    //- popup_pic
    el-dialog.pic-dialog(title='附件1', :visible.sync='picDialog1', append-to-body='')
      img(style='width:100%', :src="api_host + info.Images1 + '?' + new Date().getTime()")
    el-dialog.pic-dialog(title='附件2', :visible.sync='picDialog2', append-to-body='')
      img(style='width:100%', :src="api_host + info.Images2 + '?' + new Date().getTime()")
    el-dialog.pic-dialog(title='附件3', :visible.sync='picDialog3', append-to-body='')
      img(style='width:100%', :src="api_host + info.Images3 + '?' + new Date().getTime()")
    el-dialog.pic-dialog(title='附件4', :visible.sync='picDialog4', append-to-body='')
      img(style='width:100%', :src="api_host + info.Images4 + '?' + new Date().getTime()")
    el-dialog.pic-dialog(title='附件5', :visible.sync='picDialog5', append-to-body='')
      img(style='width:100%', :src="api_host + info.Images5 + '?' + new Date().getTime()")
    el-dialog(title='事件紀錄', :visible.sync='logDialog')
      el-form.mr-3()
        el-table.mr-3(:data='logData')
          el-table-column(type='index')
          el-table-column(prop='Status', label='狀態')
          el-table-column(prop='Create_At', label='更新時間')
          el-table-column(prop='EditUserName', label='操作人')
</template>
<script>
export default {
  name: "tgEventInfo",
  mounted() {
    if (this.$route.query.event_id) {
      this.event_id = this.$route.query.event_id;
    }
    this.get_event();
    this.get_event_detail();
    this.get_group_option();
  },
  data() {
    return {
      tableData: [],
      group_option: [],
      logData: [],
      event_id: "",
      info: "",
      editDialog: false,
      typeDialog: false,
      statusDialog: false,
      dealDialog: false,
      innerStatusDialog: false,
      innerTypeDialog: false,
      innerEditDialog: false,
      logDialog: false,
      picDialog1: false,
      picDialog2: false,
      picDialog3: false,
      picDialog4: false,
      picDialog5: false,
      lock_btn: false,
      api_host: process.env.VUE_APP_APIHOST,
      group_form: {
        event_group: ""
      },
      group_form_rules: {
        event_group: [
          {
            required: true,
            message: "請填寫說明內容",
            trigger: "change"
          }
        ]
      },
      status_form: {
        event_status: ""
      },
      status_form_rules: {
        event_status: [
          {
            required: true,
            message: "請選擇事件狀態",
            trigger: "change"
          }
        ]
      },
      content_form: {
        event_content: "",
        images: "",
        file_list: []
      },
      content_form_rules: {
        event_content: [
          {
            required: true,
            message: "請選擇事件狀態",
            trigger: "change"
          }
        ]
      },
      reply_content: ""
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
    get_event() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventList",
        data: {
          Sn: self.event_id
        }
      })
        .then(function(response) {
          self.info = response.data.data.data_list[0];
          self.group_form.event_group = self.info.GroupId;
          self.status_form.event_status = self.info.Status;
          self.content_form.event_content = self.info.EventContent;
          if (self.info.Images1) {
            self.content_form.file_list.push({
              url:
                process.env.VUE_APP_APIHOST +
                self.info.Images1 +
                "?" +
                new Date().getTime()
            });
          }
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_event_detail() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserEventReply",
        data: {
          EventSn: self.event_id
        }
      })
        .then(function(response) {
          self.tableData = response.data.data.data_list;
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
      this.group_form.event_group = this.info.GroupId;
      this.status_form.event_status = this.info.Status;
      this.content_form.event_content = this.info.EventContent;
      this.content_form.images = "";
      this.content_form.file_list = [];
      if (this.info.Images1) {
        this.content_form.file_list.push({
          url:
            process.env.VUE_APP_APIHOST +
            this.info.Images1 +
            "?" +
            new Date().getTime()
        });
      }
      this.reply_content = "";
    },
    set_file(param) {
      this.content_form.images = param.file;
    },
    remove_file() {
      this.content_form.images = "";
    },
    update_group() {
      let self = this;
      this.$refs["group_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserEventListManage/Edit",
            data: {
              Sn: self.event_id,
              GroupId: self.group_form.event_group
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_event();
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
              self.innerTypeDialog = false;
              self.typeDialog = false;
            });
        } else {
          self.typeDialog = false;
        }
      });
    },
    update_status() {
      let self = this;
      this.$refs["status_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserEventListManage/Edit",
            data: {
              Sn: self.event_id,
              Status: self.status_form.event_status
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_event();
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
              self.innerStatusDialog = false;
              self.statusDialog = false;
            });
        } else {
          self.statusDialog = false;
        }
      });
    },
    update_content() {
      let self = this;
      this.$refs["content_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          let data = new FormData();
          data.append("Sn", self.event_id);
          data.append("EventContent", self.content_form.event_content);
          data.append("Images1", self.content_form.images);
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "Member_All/UserEventListManage/Edit",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_event();
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
              self.innerEditDialog = false;
              self.editDialog = false;
            });
        } else {
          self.innerEditDialog = false;
        }
      });
    },
    add_reply_content() {
      let self = this;
      if (self.reply_content) {
        self.lock_btn = true;
        axios({
          method: "post",
          url:
            process.env.VUE_APP_APIHOST + "Member_All/UserEventReplyManage/Add",
          data: {
            EventSn: self.event_id,
            ReplyContent: self.reply_content
          }
        })
          .then(function(response) {
            if (response.data.status) {
              self.get_event_detail();
              self.$message({
                message: "新增成功",
                type: "success"
              });
              self.reply_content = "";
            } else {
              self.$message.error("新增失敗： " + response.data.error_message);
            }
            // console.log(response);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          })
          .finally(function() {
            self.dealDialog = false;
            self.lock_btn = false;
          });
      } else {
        self.dealDialog = false;
        self.$message.error("請填寫處理說明");
      }
    },
    show_event_log() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/EventLog",
        data: {
          Sn: self.event_id
        }
      })
        .then(function(response) {
          self.logDialog = true;
          self.logData = response.data.data.data_list;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    }
  }
};
</script>
