<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5(v-if="this.$route.name=='tgBulletinAdd'") 新增公告
        h5(v-if="this.$route.name=='tgBulletinEdit'") 修改公告
    //--Table
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.offset-md-2
        el-form(:model="form", :rules="rules", ref="form", status-icon, label-width='90px')
          .row.no-gutters.py-3
            .col-12.py-1
              el-form-item(prop="group_id", label='類型', size="medium")
                el-select(v-model='form.group_id', placeholder='選擇類型', clearable)
                  el-option(v-for='item in news_option', :key='item.value', :label='item.label', :value='item.value')
            .col-12.py-1
              el-form-item(prop="news_name", label='標題', size="medium")
                el-input(v-model='form.news_name', placeholder='輸入標題', clearable)
            .col-12.py-1
              el-form-item(prop="date", label='日期', size="medium")
                el-date-picker(v-model='form.date', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
            //- .col-12.py-1
              el-form-item(label='連結', prop="link")
                el-input(v-model='form.link', placeholder='輸入連結', clearable)
            .col-12.py-1
              el-form-item.textarea-style(label='內文', prop="content")
                //- el-input(type='textarea', v-model='form.content', placeholder='輸入內容')
                textarea(name='editor')
            .col-12.py-2
              el-form-item
                el-button(type='primary', @click='add_news',v-if="this.$route.name=='tgBulletinAdd'") 提 交
                el-button(type='primary', @click='update_news',v-else="this.$route.name=='tgBulletinEdit'") 提 交
                router-link(tag="el-button", :to="{name:'tgBulletinList'}", @click.native="init_dialog()") 取 消
</template>
<script>
export default {
  name: "tgBulletinAdd",
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
          formData.append("FilePath", 1);
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
      if (this.$route.query.news_id) {
        this.get_news(this.$route.query.news_id);
      }
      this.get_news_option();
    }, 300);
  },
  data() {
    return {
      news_option: [],
      update_id: "",
      form: {
        group_id: "",
        news_name: "",
        date: [],
        link: "",
        content: ""
      },
      rules: {
        group_id: [
          {
            required: true,
            message: "請選擇類型",
            trigger: "change"
          }
        ],
        news_name: [
          {
            required: true,
            message: "請填寫標題",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            message: "請選擇日期",
            trigger: "change"
          }
        ],
        link: [
          {
            type: "url",
            required: true,
            message: "請填寫連結",
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
    get_news_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/NewsGroup",
        data: {
          Status: 1
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.news_option.push({
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
    init_dialog() {
      this.$store.commit("tab/delete_tabs", this.$route.fullPath);
    },
    add_news() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = new FormData();
          data.append("GroupId", self.form.group_id);
          data.append("NewsName", self.form.news_name);
          data.append("Content", self.form.content);
          data.append("RelatedLink", self.form.link);
          data.append("StartTime", self.form.date[0]);
          data.append("EndTime", self.form.date[1]);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/NewsListManage/Add",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgBulletinList" });
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
    get_news(news_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/NewsList",
        data: {
          Sn: news_id
        }
      })
        .then(function(response) {
          self.update_id = news_id;
          self.form.group_id = response.data.data.data_list[0].GroupId;
          self.form.news_name = response.data.data.data_list[0].NewsName;
          self.form.date = [
            response.data.data.data_list[0].StartTime,
            response.data.data.data_list[0].EndTime
          ];
          self.form.link = response.data.data.data_list[0].RelatedLink;
          self.form.content = response.data.data.data_list[0].Content;
          CKEDITOR.instances.editor.setData(
            response.data.data.data_list[0].Content
          );
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_news() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("GroupId", self.form.group_id);
          data.append("NewsName", self.form.news_name);
          data.append("Content", self.form.content);
          data.append("RelatedLink", self.form.link);
          data.append("StartTime", self.form.date[0]);
          data.append("EndTime", self.form.date[1]);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/NewsListManage/Edit",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgBulletinList" });
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
