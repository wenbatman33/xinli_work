<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 推廣鏈接管理
    .row.no-gutters.px-3.py-3.d-flex
      el-button( @click='dialog.promotionAdd = true', size="medium", type='primary') 新增素材
    // === main ===
    .row.no-gutters.px-3
      // pages
      //.col-12.py-3.d-flex.justify-content-end  
      //  el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      // table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%')
            el-table-column(prop='Sn', label='序號' width="50px") 
            el-table-column(prop='BannerName', label='素材名稱')
            el-table-column(prop='Link', label='推廣網址')
            el-table-column( label='圖示')
              template(slot-scope='scope')
                img.w-100.h-100(v-if="scope.row.Images", :src="scope.row.Images + '?' + new Date().getTime()")
            el-table-column( label='日期區間')
              template(slot-scope='scope') {{scope.row.StartTime}} ~ {{scope.row.EndTime}}
            el-table-column( label='狀態') 
              template(slot-scope='scope') {{statusType[scope.row.Status]}}
            el-table-column( label='操作')
              template(slot-scope='scope')
                a.links(@click="getPromotionUpdate(scope.$index)") 修改
      // pages
      //.col-12.py-3.d-flex.justify-content-end  
      //  el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      //-- dialog.agencyAdd --
      //-- form.agency --
      el-dialog(title='備註', :visible.sync='dialog.promotionAdd')
        el-form.mr-3(:model="form.promotion", :rules="rules.promotion", ref="form.promotion", status-icon,label-suffix="：")
          el-form-item(label="素材名稱" , prop="BannerName" , label-width="150px" )
            el-input(v-model="form.promotion.BannerName" , placeholder='輸入素材名稱' )
          el-form-item(label="圖片", prop="Images", label-width="150px" )
            el-upload.upload-demo(:http-request="setImageFile", ref="upload", :on-remove="removeImageFile", :file-list="form.promotion.fileList", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
              el-button(slot="trigger" size="medium" type="primary") 選取附件
          el-form-item(label="推廣文案" , prop="Content" , label-width="150px" )
            el-input(v-model="form.promotion.Content" , placeholder='輸入推廣文案' ,type="textarea")
          el-form-item(label="推廣網址" , prop="Link" , label-width="150px" )
            el-input(v-model="form.promotion.Link" , placeholder='輸入推廣網址' )
          el-form-item(label="日期區間" , prop="Time" , label-width="150px" )
            el-date-picker(v-model='form.promotion.Time', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='開始日期', end-placeholder='結束日期', :default-time="['00:00:00', '23:59:59']")
          el-form-item(label="置頂" , prop="TopSet" , label-width="150px" )
            el-radio-group(v-model="form.promotion.TopSet", size="medium")
              el-radio-button(v-for='(value, key)  in topSetType',:label="key") {{value}}
          el-form-item(label="狀態" , prop="Status" , label-width="150px" ) 
            el-radio-group(v-model="form.promotion.Status", size="medium")
              el-radio-button(v-for='(value, key)  in statusType',:label="key") {{value}}
        .dialog-footer(slot='footer')
          el-button(@click='dialog.promotionAdd = false') 取 消
          el-button(type='primary', @click='submitPromotionAdd()', :loading='isLoading') 確 認
      el-dialog(title='備註', :visible.sync='dialog.promotionUpdate',@close='resetForm("form.promotionUpdate")')
        el-form.mr-3(:model="form.promotionUpdate", :rules="rules.promotion", ref="form.promotionUpdate", status-icon,label-suffix="：")
          el-form-item(label="素材名稱" , prop="BannerName" , label-width="150px" )
            el-input(v-model="form.promotionUpdate.BannerName" , placeholder='輸入素材名稱' )
          el-form-item(label="圖片", prop="Images", label-width="150px" )
            el-upload.upload-demo(:http-request="setUploadImageFile", ref="upload", :on-remove="removeUploadImageFile", :file-list="form.promotionUpdate.fileList", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
              el-button(slot="trigger" size="medium" type="primary") 選取附件
          el-form-item(label="推廣文案" , prop="Content" , label-width="150px" )
            el-input(v-model="form.promotionUpdate.Content" , placeholder='輸入推廣文案' ,type="textarea")
          el-form-item(label="推廣網址" , prop="Link" , label-width="150px" )
            el-input(v-model="form.promotionUpdate.Link" , placeholder='輸入推廣網址' )
          el-form-item(label="日期區間" , prop="Time" , label-width="150px" )
            el-date-picker(v-model='form.promotionUpdate.Time', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='開始日期', end-placeholder='結束日期', :default-time="['00:00:00', '23:59:59']")
          el-form-item(label="置頂" , prop="TopSet" , label-width="150px" )
            el-radio-group(v-model="form.promotionUpdate.TopSet", size="medium")
              el-radio-button(v-for='(value, key)  in topSetType',:label="key") {{value}}
          el-form-item(label="狀態" , prop="Status" , label-width="150px" ) 
            el-radio-group(v-model="form.promotionUpdate.Status", size="medium")
              el-radio-button(v-for='(value, key)  in statusType',:label="key") {{value}}
        .dialog-footer(slot='footer')
          el-button(@click='dialog.promotionUpdate = false') 取 消
          el-button(type='primary', @click='submitPromotionUpdate()', :loading='isLoading') 確 認
</template>
<script>
export default {
  name: "tgAgencyAdList",
  data() {
    let valid_type = (rule, value, callback) => {
      if (!value && rule.field == "Images") {
        callback(new Error("請上傳檔案"));
      }

      callback();
    };
    return {
      isLoading: false,
      dataList: [],
      statusType: { 0: "關閉", 1: "開啟" },
      topSetType: { 0: "關閉", 1: "開啟" },
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {},
        promotion: {
          BannerName: "",
          Images: "",
          Content: "",
          Link: "",
          TopSet: 0,
          Status: 0,
          Time: [],
          fileList: []
        },
        promotionUpdate: {}
      },
      rules: {
        promotion: {
          BannerName: [
            {
              required: true,
              message: "請填寫素材名稱",
              trigger: "change"
            }
          ],
          Content: [
            {
              required: true,
              message: "請填寫推廣文案",
              trigger: "change"
            }
          ],
          Link: [
            {
              required: true,
              message: "請填寫推廣網址",
              trigger: "change"
            }
          ],
          Time: [
            {
              required: true,
              message: "請選擇日期區間",
              trigger: "change"
            }
          ],
          Images: [
            {
              required: true,
              message: "請選擇圖片",
              trigger: "change"
            }
          ]
        }
      },
      dialog: {
        promotionAdd: false,
        promotionUpdate: false
      }
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(now_page) {
      let self = this;
      if (now_page) self.pages.now = now_page;
      let formData = new FormData();
      //   formData.append("Page", self.pages.now);
      //   formData.append("PageLimit", self.pages.size);
      return axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Agency_Admin/GetPromotionList/Backend",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            //self.pages.total = parseInt(response.data.data.total_rows);
            self.dataList = response.data.data;
          }
          self.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    resetForm(form) {
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
        this.$refs.upload.clearFiles();
      }
    },
    setImageFile(param) {
      this.form.promotion.Images = param.file;
    },
    removeImageFile() {
      this.form.promotion.Images = "";
    },
    setUploadImageFile(param) {
      this.form.promotionUpdate.Images = param.file;
    },
    removeUploadImageFile() {
      this.form.promotionUpdate.Images = "";
    },
    getPromotionUpdate(index) {
      this.dialog.promotionUpdate = true;
      this.form.promotionUpdate = this.dataList[index];
      this.form.promotionUpdate.fileList = [
        {
          url: this.form.promotionUpdate.Images
        }
      ];

      this.form.promotionUpdate.Time = [
        this.form.promotionUpdate.StartTime,
        this.form.promotionUpdate.EndTime
      ];
    },
    submitPromotionAdd() {
      let self = this;
      this.isLoading = true;
      this.$refs["form.promotion"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in this.form.promotion) {
            if (key == "Time") {
              if (this.form.promotion.Time[0])
                formData.append("StartTime", this.form.promotion.Time[0]);
              if (this.form.promotion.Time[1])
                formData.append("EndTime", this.form.promotion.Time[1]);
            } else if (key == "fileList") {
            } else formData.append(key, this.form.promotion[key]);
          }
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "/Admin/PromotionLinkManage/Add",
            data: formData
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "新增失敗： " + response.data.error_message
                );
              }
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.dialog.promotionAdd = false;
              self.isLoading = false;
              self.getData();
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    },
    submitPromotionUpdate() {
      let self = this;
      this.isLoading = true;
      this.$refs["form.promotionUpdate"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          for (var key in this.form.promotionUpdate) {
            if (key == "Time") {
              if (this.form.promotionUpdate.Time[0])
                formData.append("StartTime", this.form.promotionUpdate.Time[0]);
              if (this.form.promotionUpdate.Time[1])
                formData.append("EndTime", this.form.promotionUpdate.Time[1]);
            } else if (key == "fileList" || key == "EditUserId") {
            } else if (key == "Images") {
              if (typeof this.form.promotionUpdate[key] !== "string") {
                formData.append(key, this.form.promotionUpdate[key]);
              }
            } else if (this.form.promotionUpdate[key])
              formData.append(key, this.form.promotionUpdate[key]);
          }
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST + "/Admin/PromotionLinkManage/Edit",
            data: formData
          })
            .then(function(response) {
              if (response.data.status) {
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
              } else {
                self.$message.error(
                  "新增失敗： " + response.data.error_message
                );
              }
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.dialog.promotionUpdate = false;
              self.isLoading = false;
              self.getData();
            });
        } else {
          this.isLoading = false;
          return false;
        }
      });
    }
  }
};
</script>
