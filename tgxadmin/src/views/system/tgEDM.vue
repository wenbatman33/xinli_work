<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 EDM管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium",type='primary', @click='newDialog = true') 新增EDM 
    .row.no-gutters.px-3.py-3
      .col-md-2.col-12.py-1.px-1
        el-input(size='medium', placeholder='輸入信件標題', v-model='search_title', @keyup.enter.native="get_data(1)")
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-1.col-12.py-1.px-1
        el-button(@click='get_data(1)', size="medium", type='primary') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width: 100%')
            el-table-column(prop='Sn', label='流水號', align='center', width="100")
            el-table-column(prop='Title', label='信件標題', align='center')
            el-table-column(prop='UserCt', label='發送人數', align='center', width="150")
            el-table-column(prop='SendCt', label='成功發送數', align='center', width="150")
            el-table-column(prop='OpenCt', label='開啟數', align='center', width="150")
            el-table-column(prop='OpenAvg', label='開啟率(%)', align='center', width="150")
            el-table-column(prop='Exec_At', label='預計派發時間', align='center', width="200")
            el-table-column(prop='Send_At', label='完成派發時間', align='center', width="200")
            el-table-column(label='操作', width='120')
              template(slot-scope='scope')
                a.links(@click='get_EDM(scope.row.Sn)', type='text') 修改
                a.cancel(@click='handleDeleteComfirm(scope.row.Sn)', type='text', style='color:#ff4949') 刪除
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    el-dialog(title='新增EDM', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='EDM標題', prop="title", label-width="88px" ,label-position='left')
          el-input(v-model='form.title', placeholder='輸入EDM標題')
        el-form-item(label='檔案', prop="html_file", label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="text", action="", :limit=1, :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='圖片1', prop="images1", label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file2", ref="upload", :on-remove="remove_file2", :file-list="form.file_list2", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='圖片2', prop="images2", label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file3", ref="upload", :on-remove="remove_file3", :file-list="form.file_list3", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='圖片3', prop="images3", label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file4", ref="upload", :on-remove="remove_file4", :file-list="form.file_list4", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='發送名單', prop="user_file", label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file5", ref="upload", :on-remove="remove_file5", :file-list="form.file_list5", list-type="text", action="", :limit=1 :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='活動日期', prop="exec_at", label-width="88px" ,label-position='left')
          el-date-picker.w-100(v-model='form.exec_at', type='datetime', placeholder='选择日期时间', value-format="yyyy-MM-dd HH:mm:ss")
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_EDM()', :loading='lock_btn') 確 認
    el-dialog(title='修改EDM', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='EDM標題', prop="title", label-width="88px" ,label-position='left')
          el-input(v-model='form.title', placeholder='輸入EDM標題')
        el-form-item(label='檔案', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="text", action="", :limit=1, :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='圖片1', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file2", ref="upload", :on-remove="remove_file2", :file-list="form.file_list2", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='圖片2', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file3", ref="upload", :on-remove="remove_file3", :file-list="form.file_list3", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='圖片3', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file4", ref="upload", :on-remove="remove_file4", :file-list="form.file_list4", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='發送名單', label-width="88px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file5", ref="upload", :on-remove="remove_file5", :file-list="form.file_list5", list-type="text", action="", :limit=1 :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取附件
        el-form-item(label='活動日期', prop="exec_at", label-width="88px" ,label-position='left')
          el-date-picker.w-100(v-model='form.exec_at', type='datetime', placeholder='选择日期时间', value-format="yyyy-MM-dd HH:mm:ss")
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_EDM()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgEDM",
  mounted() {
    this.get_data(1);
  },
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d;
    let date_e = y + "-" + m + "-" + d;

    last = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    y = last.getFullYear();
    m = last.getMonth() + 1;
    d = last.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    date_s = y + "-" + m + "-" + d;
    return {
      tableData: [],
      search_time_range: [date_s + " 00:00:00", date_e + " 23:59:59"],
      search_title: "",
      newDialog: false,
      updateDialog: false,
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: "30",
      update_id: "",
      form: {
        title: "",
        html_file: "",
        file_list: [],
        images1: "",
        file_list2: [],
        images2: "",
        file_list3: [],
        images3: "",
        file_list4: [],
        user_file: "",
        file_list5: [],
        exec_at: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "請輸入EDM標題",
            trigger: "change"
          }
        ],
        html_file: [
          {
            required: true,
            message: "請選擇檔案",
            trigger: "change"
          }
        ],
        user_file: [
          {
            required: true,
            message: "請選擇發送名單",
            trigger: "change"
          }
        ],
        exec_at: [
          {
            required: true,
            message: "請選擇活動日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    get_data(now_page) {
      let self = this;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/DEMList",
        data: {
          Title: self.search_title,
          Start_DT: self.search_time_range[0],
          End_DT: self.search_time_range[1],
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
      this.update_id = "";
      this.form.title = "";
      this.form.html_file = "";
      this.form.file_list = [];
      this.form.images1 = "";
      this.form.file_list2 = [];
      this.form.images2 = "";
      this.form.file_list3 = [];
      this.form.images3 = "";
      this.form.file_list4 = [];
      this.form.user_file = "";
      this.form.file_list5 = [];
      this.form.exec_at = "";
    },
    set_file(param) {
      this.form.html_file = param.file;
    },
    remove_file() {
      this.form.html_file = "";
    },
    set_file2(param) {
      this.form.images1 = param.file;
    },
    remove_file2() {
      this.form.images1 = "";
    },
    set_file3(param) {
      this.form.images2 = param.file;
    },
    remove_file3() {
      this.form.images2 = "";
    },
    set_file4(param) {
      this.form.images3 = param.file;
    },
    remove_file4() {
      this.form.images3 = "";
    },
    set_file5(param) {
      this.form.user_file = param.file;
    },
    remove_file5() {
      this.form.user_file = "";
    },
    add_EDM() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("Title", self.form.title);
          if (self.form.html_file) {
            data.append("HtmlFile", self.form.html_file);
          }
          if (self.form.images1) {
            data.append("Images1", self.form.images1);
          }
          if (self.form.images2) {
            data.append("Images2", self.form.images2);
          }
          if (self.form.images3) {
            data.append("Images3", self.form.images3);
          }
          if (self.form.user_file) {
            data.append("UserFile", self.form.user_file);
          }
          data.append("Exec_At", self.form.exec_at);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/DEMManage/Add",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(1);
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
    get_EDM(edm_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/DEMList",
        data: {
          Sn: edm_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data.data_list[0].Sn;
          self.form.title = response.data.data.data_list[0].Title;
          if (response.data.data.data_list[0].HtmlFile) {
            self.form.file_list.push({
              name: response.data.data.data_list[0].HtmlFile.split("/")
                .pop()
                .split("?")[0],
              url: response.data.data.data_list[0].HtmlFile
            });
          }
          if (response.data.data.data_list[0].Images1) {
            self.form.file_list2.push({
              url: response.data.data.data_list[0].Images1
            });
          }
          if (response.data.data.data_list[0].Images2) {
            self.form.file_list3.push({
              url: response.data.data.data_list[0].Images2
            });
          }
          if (response.data.data.data_list[0].Images3) {
            self.form.file_list4.push({
              url: response.data.data.data_list[0].Images3
            });
          }
          if (response.data.data.data_list[0].UserFile) {
            self.form.file_list5.push({
              name: response.data.data.data_list[0].UserFile.split("/")
                .pop()
                .split("?")[0],
              url: response.data.data.data_list[0].UserFile
            });
          }
          self.form.exec_at = response.data.data.data_list[0].Exec_At;
          self.updateDialog = true;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_EDM() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          let data = new FormData();
          data.append("Sn", self.update_id);
          data.append("Title", self.form.title);
          if (self.form.html_file) {
            data.append("HtmlFile", self.form.html_file);
          }
          if (self.form.images1) {
            data.append("Images1", self.form.images1);
          }
          if (self.form.images2) {
            data.append("Images2", self.form.images2);
          }
          if (self.form.images3) {
            data.append("Images3", self.form.images3);
          }
          if (self.form.user_file) {
            data.append("UserFile", self.form.user_file);
          }
          data.append("Exec_At", self.form.exec_at);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/DEMManage/Edit",
            data: data
          })
            .then(function(response) {
              if (response.data.status) {
                self.get_data(self.now_page);
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
    },
    handleDeleteComfirm(edm_id) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_EDM(edm_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_EDM(edm_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/DEMManage/Delete",
        data: {
          Sn: edm_id
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data(self.now_page);
            self.$message({
              message: "刪除成功",
              type: "success"
            });
          } else {
            self.$message.error("刪除失敗： " + response.data.error_message);
          }
          // console.log(response);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    }
  }
};
</script>
