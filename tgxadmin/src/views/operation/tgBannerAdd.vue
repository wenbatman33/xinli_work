<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5(v-if="this.$route.name=='tgBannerAdd'") 新增 Banner
        h5(v-if="this.$route.name=='tgBannerEdit'") 修改 Banner
    //--Table
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.offset-md-2
        el-form(:model="form", :rules="rules", ref="form", status-icon, label-width='100px')
          .row.no-gutters.py-3
            .col-12.py-1
              el-form-item(label='Banner群組', prop="group", label-width="120px")
                el-select(v-model='form.group', placeholder='選擇Banner群組', clearable)
                  el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
            .col-12.py-1
              el-form-item(label='版位標題', prop="banner_name", label-width="120px")
                el-input(v-model='form.banner_name', placeholder='輸入版位標題')
            .col-12.py-1
              el-form-item(label='Banner 類型', prop="banner_type", label-width="120px")
                el-select(v-model='form.banner_type', placeholder='選擇 Banner 類型')
                  el-option(label='圖片', value='1')
                  el-option(label='按鈕', value='2')
            .col-12.py-1
              el-form-item(v-if="this.$route.name=='tgBannerAdd'", label='上傳檔案', prop="images", label-width="120px")
                el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
                  el-button(slot="trigger", size="medium", type="primary") 選取圖片
                  // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
              el-form-item(v-if="this.$route.name=='tgBannerEdit'", label='上傳檔案', label-width="120px")
                el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
                  el-button(slot="trigger", size="medium", type="primary") 選取圖片
                  // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
            .col-12.py-1
              el-form-item(label='圖片連結', prop="link", label-width="120px")
                el-input(v-model='form.link', placeholder='請輸入連結')
            .col-12.py-1
              el-form-item(label='按鈕文字', prop="button_text1", label-width="120px")
                el-input(v-model='form.button_text1', placeholder='輸入按鈕文字')
            .col-12.py-1
              el-form-item(label='按鈕連結', prop="button_link1", label-width="120px")
                el-input(v-model='form.button_link1', placeholder='請輸入連結')
            //- .col-12.py-1
              el-form-item(label='按鈕2 文字', prop="button_text2", label-width="120px")
                el-input(v-model='form.button_text2', placeholder='輸入按鈕文字')
            //- .col-12.py-1
              el-form-item(label='按鈕2 連結', prop="button_link2", label-width="120px")
                el-input(v-model='form.button_link2', placeholder='請輸入連結')
            .col-12.py-1
              el-form-item(label='日期區間', prop="date", label-width="120px")
                el-date-picker(v-model='form.date', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
            .col-12.py-1
              el-form-item(label='版位詳細說明', prop="banner_note", label-width="120px")
                el-input(type='textarea', v-model='form.banner_note')
            .col-12.py-1
              el-form-item(label='排序', prop="sort", label-width="120px")
                el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
            .col-12.py-1
              el-form-item(label='項目狀態', prop="status", label-width="120px")
                el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
            .col-12.py-2
              el-form-item
                el-button(type='primary', @click='add_banner()', v-if="this.$route.name=='tgBannerAdd'") 提 交
                el-button(type='primary', @click='update_banner()', v-if="this.$route.name=='tgBannerEdit'") 提 交
                router-link(tag="el-button", :to="{name:'tgBannerList'}", @click.native="init_dialog()") 取 消
</template>
<script>
export default {
  name: "tgBannerAdd",
  mounted() {
    if (this.$route.query.banner_id) {
      this.get_banner(this.$route.query.banner_id);
    }
    this.get_group_option();
  },
  data() {
    let valid_type = (rule, value, callback) => {
      if (this.form.banner_type == 1) {
        if (this.form.images == "" && rule.field == "images") {
          callback(new Error("請上傳檔案"));
        }
        if (this.form.link == "" && rule.field == "link") {
          callback(new Error("請輸入圖片連結"));
        }
      }
      if (this.form.banner_type == 2) {
        if (this.form.button_text1 == "" && rule.field == "button_text1") {
          callback(new Error("請輸入按鈕文字"));
        }
        if (this.form.button_link1 == "" && rule.field == "button_link1") {
          callback(new Error("請輸入按鈕連結"));
        }
      }
      callback();
    };
    return {
      group_option: [],
      update_id: "",
      form: {
        group: "",
        banner_name: "",
        banner_type: "1",
        images: "",
        file_list: [],
        link: "",
        button_text1: "",
        button_link1: "",
        // button_text2: "",
        // button_link2: "",
        date: "",
        banner_note: "",
        sort: "",
        status: "1"
      },
      rules: {
        group: [
          {
            required: true,
            message: "請選擇Banner群組",
            trigger: "change"
          }
        ],
        banner_name: [
          {
            required: true,
            message: "請填寫版位標題",
            trigger: "change"
          }
        ],
        banner_type: [
          {
            required: true,
            message: "請選擇Banner類型",
            trigger: "change"
          }
        ],
        images: [
          {
            validator: valid_type,
            trigger: "change"
          }
        ],
        link: [
          {
            validator: valid_type,
            trigger: "change"
          }
        ],
        button_text1: [
          {
            validator: valid_type,
            trigger: "change"
          }
        ],
        button_link1: [
          {
            validator: valid_type,
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            message: "請選擇日期區間",
            trigger: "change"
          }
        ],
        status: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇項目狀態",
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
        url: process.env.VUE_APP_APIHOST + "Web_Page/BannerGroup",
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
    set_file(param) {
      this.form.images = param.file;
    },
    remove_file() {
      this.form.images = "";
    },
    init_dialog() {
      this.$store.commit("tab/delete_tabs", this.$route.fullPath);
    },
    add_banner() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          var data = new FormData();
          data.append("GroupId", self.form.group);
          data.append("BannerName", self.form.banner_name);
          data.append("BannerType", self.form.banner_type);
          data.append("Images", self.form.images);
          data.append("Link", self.form.link);
          data.append("ButtonText1", self.form.button_text1);
          data.append("ButtonLink1", self.form.button_link1);
          data.append("StartTime", self.form.date[0]);
          data.append("EndTime", self.form.date[1]);
          data.append("BannerNote", self.form.banner_note);
          data.append("Sort", self.form.sort);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/BannerListManage/Add",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgBannerList" });
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
    get_banner(banner_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/BannerList",
        data: {
          Sn: banner_id
        }
      })
        .then(function(response) {
          self.update_id = banner_id;
          self.form.group = response.data.data[0].GroupId;
          self.form.banner_name = response.data.data[0].BannerName;
          self.form.banner_type = response.data.data[0].BannerType;
          if (response.data.data[0].Images) {
            self.form.file_list.push({
              url: response.data.data[0].Images
            });
          }
          self.form.link = response.data.data[0].Link;
          self.form.button_text1 = response.data.data[0].ButtonText1;
          self.form.button_link1 = response.data.data[0].ButtonLink1;
          // self.form.button_text2 = response.data.data[0].ButtonText2;
          // self.form.button_link2 = response.data.data[0].ButtonLink2;
          self.form.date = [
            response.data.data[0].StartTime,
            response.data.data[0].EndTime
          ];
          self.form.banner_note = response.data.data[0].BannerNote;
          self.form.sort = response.data.data[0].Sort;
          self.form.statu = response.data.data[0].Status;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_banner() {
      let self = this;
      self.$refs["form"].validate(valid => {
        if (valid) {
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("GroupId", self.form.group);
          data.append("BannerName", self.form.banner_name);
          data.append("BannerType", self.form.banner_type);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          data.append("Link", self.form.link);
          data.append("ButtonText1", self.form.button_text1);
          data.append("ButtonLink1", self.form.button_link1);
          data.append("StartTime", self.form.date[0]);
          data.append("EndTime", self.form.date[1]);
          data.append("BannerNote", self.form.banner_note);
          data.append("Sort", self.form.sort);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/BannerListManage/Edit",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.$router.push({ name: "tgBannerList" });
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
