<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5(v-if="this.$route.name=='tgAgencyBulletinAdd'") 新增代理公告
        h5(v-if="this.$route.name=='tgAgencyBulletinEdit'") 修改代理公告
    //--Table
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.offset-md-2
        el-form(:model="form", :rules="rules", ref="form", status-icon, label-width='90px',label-suffix="：")
            el-form-item(prop="news_name", label='標題', size="medium")
                el-input(v-model='form.news_name', placeholder='輸入標題', clearable)
            el-form-item(prop="date", label='日期', size="medium")
                el-date-picker(v-model='form.date', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='開始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
            el-form-item(label="置頂" , prop="TopSet"  )
                el-radio-group(v-model="form.TopSet", size="medium")
                  el-radio-button(v-for='(value, key)  in topSetType',:label="key") {{value}}
            el-form-item(label="狀態" , prop="Status" ) 
                el-radio-group(v-model="form.Status", size="medium")
                  el-radio-button(v-for='(value, key)  in statusType',:label="key") {{value}}
            el-form-item.textarea-style(label='內文', prop="content")
                textarea(name='editor')
            el-form-item
                el-button(type='primary', @click='add_news',v-if="this.$route.name=='tgAgencyBulletinAdd'") 提 交
                el-button(type='primary', @click='update_news',v-else="this.$route.name=='tgAgencyBulletinEdit'") 提 交
                router-link(tag="el-button", :to="{name:'tgAgencyBulletinList'}", @click.native="init_dialog()") 取 消
</template>
<script>
export default {
  name: "tgAgencyBulletinAdd",
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
    }, 300);
  },
  data() {
    return {
      news_option: [],
      update_id: "",
      statusType: { 0: "關閉", 1: "開啟" },
      topSetType: { 0: "關閉", 1: "開啟" },
      form: {
        news_name: "",
        date: [],
        content: "",
        TopSet: 0,
        Status: 0
      },
      rules: {
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
    init_dialog() {
      this.$store.commit("tab/delete_tabs", this.$route.fullPath);
    },
    add_news() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = new FormData();
          data.append("NewsName", self.form.news_name);
          data.append("Content", self.form.content);
          data.append("StartTime", self.form.date[0]);
          data.append("EndTime", self.form.date[1]);
          data.append("TopSet", self.form.TopSet);
          data.append("Status", self.form.Status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/AgencyNewsManage/Add",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgAgencyBulletinList" });
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
        url: process.env.VUE_APP_APIHOST + "Agency_Admin/GetAgencyNewsDetail/",
        data: {
          Sn: news_id
        }
      })
        .then(function(response) {
          self.update_id = news_id;
          self.form.news_name = response.data.data[0].NewsName;
          self.form.date = [
            response.data.data[0].StartTime,
            response.data.data[0].EndTime
          ];
          self.form.content = response.data.data[0].Content;
          self.form.TopSet = response.data.data[0].TopSet;
          self.form.Status = response.data.data[0].Status;

          CKEDITOR.instances.editor.setData(response.data.data[0].Content);
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
          data.append("NewsName", self.form.news_name);
          data.append("Content", self.form.content);
          data.append("StartTime", self.form.date[0]);
          data.append("EndTime", self.form.date[1]);
          data.append("TopSet", self.form.TopSet);
          data.append("Status", self.form.Status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/AgencyNewsManage/Edit",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgAgencyBulletinList" });
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
