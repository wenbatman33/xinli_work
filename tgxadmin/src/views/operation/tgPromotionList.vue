<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 優惠活動管理
      .col-6.d-flex.justify-content-end
        el-button(@click='formDialog = true, changeDialog(1)', size="medium",type='primary') 新增優惠活動
    .row.no-gutters.px-3.py-3
      .col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label='"1"') 正常
          el-radio-button(:label='"0"') 停用
      .col-md-4.col-12.py-1
        el-select(v-model='search_group', size='medium', placeholder='選擇群組名稱',@change="get_data()", clearable)
          el-option(label='全部', value="" ,key="")
          el-option(v-for='item in group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-4.col-12.px-2.py-1
        router-link(:to="{name:'tgPromotionGroupList'}")
          el-button(size="medium",type='text') 群組管理
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入活動名稱', v-model='search_content', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='filter_table_data', border='', style='width: 100%')
          el-table-column(prop='Sort', label='排序', width='60', align='center')
          el-table-column(prop='GroupName', label='群組名稱', width='80', align='center')
            template(slot-scope='scope')
              div(v-for="id in scope.row.GroupId") {{group_option_label[id]}}
          el-table-column(prop='PromotionsName', label='活動名稱')
            template(slot-scope='scope')
              a.links(v-if="scope.row.LinkMethod == 1", :href="'https://' + front_host + '/promotion/'", target="_blank") {{scope.row.PromotionsName}}
              a.links(v-if="scope.row.LinkMethod == 2", :href="scope.row.LinkContent", target="_blank") {{scope.row.PromotionsName}}
              a.links(v-if="scope.row.LinkMethod == 3", :href="'https://' + front_host + '/promotionDetail/' + scope.row.Sn", target="_blank") {{scope.row.PromotionsName}}
          el-table-column(prop='StartTime', label='活動日期', width='190')
          el-table-column(prop='LinkMethod_str', label='開啟方式', width='120')
          el-table-column(prop='Images', label='圖示', align='center')
            template(slot-scope='scope')
              img.w-100.h-100(v-if="scope.row.Images", :src="scope.row.Images + '?' + new Date().getTime()")
          el-table-column(prop='Status_str', label='狀態', width='60', align='center')
          el-table-column(label='操作', width='60', align='center')
            template(slot-scope='scope')
              a.links(@click='get_promotion(scope.row.Sn), changeDialog(2)', type='text') 修改
    //--Dialog
    el-dialog(:title='dialogTitle', :visible.sync='formDialog', @open="init_editor", @close="init_dialog('form')" custom-class="dialog-Edit")
      el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
        el-form-item(label='群組選單', prop="search_group", label-width="130px" ,label-position='left')
          el-checkbox-group.limit_platform(v-model='form.search_group')
            el-checkbox(v-for='item in group_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='活動名稱', prop="promotions_name", label-width="130px" ,label-position='left')
          el-input(v-model='form.promotions_name', placeholder='輸入活動名稱', clearable) 
        el-form-item(label='排序值', prop="sort", label-width="130px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable) 
        el-form-item(label='活動日期', prop="time", label-width="130px" ,label-position='left')
          el-date-picker.select-wstyle(v-model='form.time', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
        el-form-item(label='開啟方式', prop="link_method", label-width="130px" ,label-position='left')
          el-select.select-wstyle(v-model='form.link_method', placeholder='選擇開啟方式', clearable)
            el-option(label='popup模式', value="1")
            el-option(label='另開event網址', value="2")
            el-option(label='html編輯器', value="3")
        el-form-item(label='開啟連結內容', prop="link_content", label-width="130px" ,label-position='left')
          el-input(type='textarea', v-model='form.link_content', clearable v-if='form.link_method == 2')
          textarea(name='editor' v-else)
        el-form-item(label='活動內容', prop="content", label-width="130px" ,label-position='left')
          el-input(type='textarea', v-model='form.content', clearable)
        el-form-item(v-if="dialogType == 1", label='圖示', prop="images", label-width="130px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(v-else="dialogType == 2", label='圖示', label-width="130px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='項目狀態', prop="status", label-width="130px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='formDialog = false') 取 消
        el-button(v-if="dialogType == 1", type='primary', @click='add_promotion()',:loading='lock_btn') 確 認      
        el-button(v-if="dialogType == 2", type='primary', @click='update_promotion()',:loading='lock_btn') 確 認      
    // el-pagination.col.mt-3.mb-2.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgPromotionList",
  mounted() {
    this.get_group_option();
    this.get_data();
    this.get_front_host();
  },
  data() {
    return {
      editor: null,
      tableData: [],
      group_option: [],
      group_option_label: [],
      search_status: "",
      search_content: "",
      search_group: "",
      lock_btn: false,
      formDialog: false,
      dialogType: "",
      dialogTitle: "",
      front_host: "",
      update_id: "",
      form: {
        search_group: [],
        promotions_name: "",
        sort: "",
        time: [],
        link_method: "",
        link_content: "",
        content: "",
        images: "",
        file_list: [],
        status: "1"
      },
      rules: {
        search_group: [
          {
            required: true,
            message: "請選擇群組",
            trigger: "change"
          }
        ],
        promotions_name: [
          {
            required: true,
            message: "請填寫活動名稱",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: "請選擇活動日期",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "請填寫活動內容",
            trigger: "change"
          }
        ],
        link_method: [
          {
            required: true,
            message: "請選擇開啟方式",
            trigger: "change"
          }
        ],
        link_content: [
          {
            required: true,
            message: "請填寫開啟連結內容",
            trigger: "change"
          }
        ],
        images: [
          {
            required: true,
            message: "請選擇圖示",
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
  computed: {
    filter_table_data() {
      var self = this;
      return this.tableData.filter(function(item, index, array) {
        if (self.search_status && item.Status != self.search_status) {
          return false;
        }
        if (
          self.search_content &&
          item.PromotionsName.indexOf(self.search_content) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/PromotionsGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.group_option.push({
              value: item.GroupId,
              label: item.GroupName
            });
            self.group_option_label[item.GroupId] = item.GroupName;
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_front_host() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetDomainsList",
        data: {
          Status: 1,
          Type: 1,
          Page: 1,
          PageLimit: 1
        }
      })
        .then(function(response) {
          self.front_host = response.data.data.data_list[0].Domain;
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
        url: process.env.VUE_APP_APIHOST + "Web_Page/PromotionsList",
        data: {
          GroupId: self.search_group
        }
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "開";
            } else {
              item["Status_str"] = "關";
            }
            item["StartTime"] = item["StartTime"] + " ～ " + item["EndTime"];

            item["_mstr"] = "";
            if (item["LinkMethod"] == 1) {
              item["LinkMethod_str"] = "popup模式";
            } else if (item["LinkMethod"] == 2) {
              item["LinkMethod_str"] = "另開event網址";
            } else {
              item["LinkMethod_str"] = "html編輯器";
            }
            item["GroupId"] = item["GroupId"].split(",").sort();
          });
          self.tableData = response.data.data;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    init_dialog(form) {
      if (this.$refs[form]) this.$refs[form].resetFields();
      this.lock_btn = false;
      this.update_id = "";
      this.form.search_group = [];
      this.form.promotions_name = "";
      this.form.sort = "";
      this.form.time = [];
      this.form.link_method = "";
      this.form.link_content = "";
      this.form.content = "";
      this.form.images = "";
      this.form.file_list = [];
      this.form.status = "1";

      // console.log(this.form.link_content);
    },
    set_file(param) {
      this.form.images = param.file;
    },
    remove_file() {
      this.form.images = "";
    },
    add_promotion() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("GroupId", self.form.search_group.join());
          data.append("PromotionsName", self.form.promotions_name);
          data.append("Content", self.form.content);
          data.append("Images", self.form.images);
          data.append("StartTime", self.form.time[0]);
          data.append("EndTime", self.form.time[1]);
          data.append("Sort", self.form.sort);
          data.append("LinkMethod", self.form.link_method);
          data.append("LinkContent", self.form.link_content);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/PromotionsListManage/Add",
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
              self.formDialog = false;
              self.init_dialog();
            });
        }
      });
    },
    get_promotion(promotion_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/PromotionsList",
        data: {
          Sn: promotion_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data[0].Sn;
          self.form.search_group = response.data.data[0].GroupId.split(",");
          self.form.promotions_name = response.data.data[0].PromotionsName;
          self.form.content = response.data.data[0].Content;
          if (response.data.data[0].Images) {
            self.form.file_list.push({
              url: response.data.data[0].Images
            });
          }
          self.form.time = [
            response.data.data[0].StartTime,
            response.data.data[0].EndTime
          ];
          self.form.sort = response.data.data[0].Sort;
          self.form.link_method = response.data.data[0].LinkMethod;
          self.form.link_content = response.data.data[0].LinkContent;
          self.init_editor();
          setTimeout(() => {
            CKEDITOR.instances.editor.setData(
              response.data.data[0].LinkContent
            );
          }, 300);
          self.form.status = response.data.data[0].Status;
          self.formDialog = true;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_promotion() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("GroupId", self.form.search_group.join());
          data.append("PromotionsName", self.form.promotions_name);
          data.append("Content", self.form.content);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          data.append("StartTime", self.form.time[0]);
          data.append("EndTime", self.form.time[1]);
          data.append("Sort", self.form.sort);
          data.append("LinkMethod", self.form.link_method);
          data.append("LinkContent", self.form.link_content);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/PromotionsListManage/Edit",
            data: data
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
              self.formDialog = false;
              self.init_dialog();
            });
        }
      });
    },
    init_editor() {
      let self = this;
      if (self.editor == null) {
        setTimeout(() => {
          self.editor = CKEDITOR.replace("editor", {
            extraPlugins: "uploadimage",
            uploadUrl: process.env.VUE_APP_APIHOST + "Admin/ImagesUpload",
            filebrowserUploadUrl:
              process.env.VUE_APP_APIHOST + "Admin/ImagesUpload",
            on: {
              fileUploadRequest: function(evt) {
                let fileLoader = evt.data.fileLoader;
                let xhr = fileLoader.xhr;
                xhr.setRequestHeader(
                  "Authorization",
                  `Bearer ${window.localStorage.JWT_TOKEN}`
                );
                let formData = new FormData();
                formData.append("FilePath", 2);
                formData.append("Images", fileLoader.file);
                xhr.send(formData);
                evt.stop();
              },
              change: function(evt) {
                self.form.link_content = evt.editor.getData();
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
        }, 300);
      }
    },
    changeDialog(type) {
      this.dialogType = type;
      if (type == 1) {
        this.dialogTitle = "新增活動";
      } else {
        this.dialogTitle = "修改活動";
      }
    }
  }
};
</script>
<style lang="scss">
.ql-container {
  min-height: 10vw;
}
.dialog-Edit {
  margin-top: 3vh !important;
}
</style>
