<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5(v-if="this.$route.name=='tgInboxAdd'") 發新站內信
        h5(v-if="this.$route.name=='tgInboxEdit'") 修改站內信
    //--Table
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.offset-md-2
        el-form(:model="form", :rules="rules", ref="form", status-icon, label-width='90px')
          .row.no-gutters.py-3
            .col-12.py-1
              el-form-item(label='發送日期', prop="send_time")
                el-date-picker(v-model='form.send_time', value-format="yyyy-MM-dd HH:mm:ss" , type="datetime", placeholder="選擇發送選擇")
            .col-12.py-1
              el-form-item(label='收件群組', prop="group_id", v-if="this.$route.name=='tgInboxAdd'")
                el-select(v-model='form.group_id', :multiple="(this.$route.name =='tgInboxAdd')", filterable, placeholder='選擇收件者', clearable)
                  el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
            .col-12.py-1
              el-form-item(label='收件標籤', prop="tag_id", v-if="this.$route.name=='tgInboxAdd'")
                el-select(v-model='form.tag_id', :multiple="(this.$route.name =='tgInboxAdd')", filterable, placeholder='選擇收件者', clearable)
                  el-option(v-for='item in tag_option', :key='item.value', :label='item.label', :value='item.value')
            .col-12.py-1
              el-form-item(label='收件者', prop="user_id")
                  el-input(type='textarea', :rows='8', placeholder='輸入收件者', v-model='form.user_id')
            .col-12.py-1
              el-form-item(label='信件標題', prop="title")
                el-input(v-model='form.title', placeholder='輸入信件標題', clearable)
            .col-12.py-1
              el-form-item.textarea-style(label='內文', prop="content")
                textarea(name='editor')
            .col-12.py-2
              el-form-item
                el-button(type='primary', @click='add_inbox',v-if="this.$route.name=='tgInboxAdd'") 提 交
                el-button(type='primary', @click='update_inbox',v-else="this.$route.name=='tgBulletinEdit'") 提 交
                router-link(tag="el-button", :to="{name:'tgInboxList'}", @click.native="init_dialog()") 取 消
</template>
<script>
export default {
  name: "tgInboxAdd",
  mounted() {
    let self = this;
    CKEDITOR.replace("editor", {
      extraPlugins: "uploadimage",
      uploadUrl: process.env.VUE_APP_APIHOST + "Admin/ImagesUpload",
      filebrowserUploadUrl: process.env.VUE_APP_APIHOST + "Admin/ImagesUpload",
      on: {
        fileUploadRequest: function(evt) {
          let fileLoader = evt.data.fileLoader;
          let xhr = fileLoader.xhr;
          xhr.setRequestHeader(
            "Authorization",
            `Bearer ${window.localStorage.JWT_TOKEN}`
          );
          let formData = new FormData();
          formData.append("FilePath", 3);
          formData.append("Images", fileLoader.file);
          xhr.send(formData);
          evt.stop();
        },
        change: function(evt) {
          self.form.content = evt.editor.getData();
        }
      }
    });
    CKEDITOR.on("dialogDefinition", function(evt) {
      var diagName = evt.data.name;
      var diagDefn = evt.data.definition;

      if (diagName === "table") {
        var infoTab = diagDefn.getContents("info");

        var width = infoTab.get("txtWidth");
        width["default"] = "100%";
      }
    });
    setTimeout(() => {
      if (this.$route.query.inbox_id) {
        this.get_inbox(this.$route.query.inbox_id);
      }
      this.get_group_option();
      this.get_tag_option();
    }, 300);
  },
  data() {
    let has_user = (rule, value, callback) => {
      if (
        this.form.group_id.length +
          this.form.tag_id.length +
          this.form.user_id.length ==
        0
      ) {
        callback(new Error("請至少選擇一種收件對象"));
      } else {
        callback();
      }
    };
    return {
      group_option: [],
      tag_option: [],
      user_option: [],
      lock_btn: false,
      update_id: "",
      form: {
        send_time: "",
        group_id: [],
        tag_id: [],
        user_id: "",
        title: "",
        content: ""
      },
      rules: {
        send_time: [
          {
            required: true,
            message: "請選擇發送日期",
            trigger: "change"
          }
        ],
        group_id: [
          {
            validator: has_user,
            trigger: "change"
          }
        ],
        tag_id: [
          {
            validator: has_user,
            trigger: "change"
          }
        ],
        user_id: [
          {
            validator: has_user,
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "請填寫信件標題",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "請填寫內文",
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
    get_tag_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserTagList",
        data: {}
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.tag_option.push({
              value: item.TagId,
              label: item.TagName
            });
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    init_dialog() {
      this.$store.commit("tab/delete_tabs", this.$route.fullPath);
    },
    add_inbox() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/MemberInboxBatchSend",
            data: {
              TagGroupList: self.form.group_id.join(","),
              TagIdList: self.form.tag_id.join(","),
              UserNameList: self.form.user_id,
              Title: self.form.title,
              Content: self.form.content,
              SendTime_At: self.form.send_time,
              Status: "0"
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgInboxList" });
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
                self.init_dialog();
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
            });
        }
      });
    },
    get_inbox(inbox_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/MemberInbox",
        data: {
          Type: "Detail",
          Sn: inbox_id
        }
      })
        .then(function(response) {
          self.update_id = inbox_id;
          self.form.user_id = response.data.data.data_list[0].UserName;
          self.form.title = response.data.data.data_list[0].Title;
          self.form.content = response.data.data.data_list[0].Content;
          CKEDITOR.instances.editor.setData(
            response.data.data.data_list[0].Content
          );
          self.form.send_time = response.data.data.data_list[0].SendTime_At;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_inbox() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "Member_All/MemberInboxManage/Edit",
            data: {
              Sn: self.update_id,
              TagGroupList: self.form.group_id,
              TagIdList: self.form.tag_id,
              UserName: self.form.user_id,
              Title: self.form.title,
              Content: self.form.content,
              SendTime_At: self.form.send_time
            }
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgInboxList" });
                self.$message({
                  message: "修改成功",
                  type: "success"
                });
                self.init_dialog();
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
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.ql-container {
  min-height: 10vw;
}
</style>
