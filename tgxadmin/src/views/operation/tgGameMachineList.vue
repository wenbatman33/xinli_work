<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 包台列表
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium", type='primary') 新增包台 
    .row.no-gutters.px-3.py-3
      .col-md-2.col-12.px-1.py-1
        el-select(size='medium', v-model='search_status', filterable='', placeholder='選擇狀態', @change="get_data()")
          el-option(label='全部', value='')
          el-option(label='上架中', value='1')
          el-option(label='已下架', value='0')
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='Sn', label='序號', width='80', align='center')
            el-table-column(label='狀態', width='80', align='center')
              template(slot-scope='scope')
                el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.Status_str}}
            el-table-column(prop='GameName', label='包台名稱')
            el-table-column(prop='Sort', label='排序', width='80' align='center')
            el-table-column(prop='Open_At', label='開始時間', width='200' align='center')
            el-table-column(prop='Close_At', label='結束時間', width='200' align='center')
            el-table-column(prop='Update_At', label='更新時間', width='200' align='center')
            el-table-column(label='操作', width='80' align='center')
              template(slot-scope='scope')
                a.links(@click="get_machine(scope.row.Sn)", type='text') 修改
    //--Dialog
    el-dialog(title='新增包台', :visible.sync='newDialog', @close="init_dialog('add_form')" )
      el-form.form-style.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='廠商名稱', prop="game_group_id", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_group_id',size='medium', placeholder='選擇廠商名稱', clearable, @change="get_game_option()")
            el-option(v-for='item in game_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='遊戲名稱', prop="game_id", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_id',size='medium', placeholder='選擇遊戲名稱', clearable)
            el-option(v-for='item in game_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='圖示1', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='圖示2', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file2", ref="upload", :on-remove="remove_file2", :file-list="form.file_list2", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='錢包餘額限制', prop="user_cash", label-width="110px" ,label-position='left')
          el-input(v-model='form.user_cash', placeholder='輸入錢包餘額限制', clearable)
        el-form-item(label='會員等級限制', prop="user_level", label-width="110px" ,label-position='left')
          el-input(v-model='form.user_level', placeholder='輸入會員等級限制', clearable)   
        el-form-item(label='啟用時間', prop="open_time", label-width="110px" ,label-position='left')
          el-date-picker.w-100(v-model='form.open_time', type='datetime', placeholder='選擇啟用時間', value-format="yyyy-MM-dd HH:mm:ss")
        el-form-item(label='關閉時間', prop="close_time", label-width="110px" ,label-position='left')
          el-date-picker.w-100(v-model='form.close_time', type='datetime', placeholder='選擇關閉時間', value-format="yyyy-MM-dd HH:mm:ss")
        el-form-item(label='機台數量', prop="count", label-width="110px" ,label-position='left')
          el-input(v-model='form.count', placeholder='輸入機台數量', clearable)
        el-form-item(label='排序', prop="sort", label-width="110px" ,label-position='left')
          el-input(v-model='form.sort', placeholder='輸入機台數量', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_machine()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改包台', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.form-style.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='廠商名稱', prop="game_group_id", label-width="110px" ,label-position='left')
          span {{form.game_group_id}}
        el-form-item(label='遊戲名稱', prop="game_id", label-width="110px" ,label-position='left')
          span {{form.game_id}}
        el-form-item(label='圖示1', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='圖示2', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file2", ref="upload", :on-remove="remove_file2", :file-list="form.file_list2", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='錢包餘額限制', prop="user_cash", label-width="110px" ,label-position='left')
          el-input(v-model='form.user_cash', placeholder='輸入錢包餘額限制', clearable)
        el-form-item(label='會員等級限制', prop="user_level", label-width="110px" ,label-position='left')
          el-input(v-model='form.user_level', placeholder='輸入會員等級限制', clearable)   
        el-form-item(label='啟用時間', prop="open_time", label-width="110px" ,label-position='left')
          el-date-picker.w-100(v-model='form.open_time', type='datetime', placeholder='選擇啟用時間', value-format="yyyy-MM-dd HH:mm:ss")
        el-form-item(label='關閉時間', prop="close_time", label-width="110px" ,label-position='left')
          el-date-picker.w-100(v-model='form.close_time', type='datetime', placeholder='選擇關閉時間', value-format="yyyy-MM-dd HH:mm:ss")
        el-form-item(label='機台數量', label-width="110px" ,label-position='left')
          span {{form.count}}
        el-form-item(label='排序', prop="sort", label-width="110px" ,label-position='left')
          el-input(v-model='form.sort', placeholder='輸入機台數量', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_machine()',:loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgGameMachineList",
  mounted() {
    this.get_game_group_option();
    this.get_data();
  },
  data() {
    return {
      game_group_option: [],
      game_option: [],
      tableData: [],
      search_status: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        game_group_id: "",
        game_id: "",
        images: "",
        file_list: [],
        images2: "",
        file_list2: [],
        user_cash: "",
        user_level: "",
        open_time: "",
        close_time: "",
        count: "",
        sort: ""
      },
      rules: {
        game_group_id: [
          {
            required: true,
            message: "請選擇廠商名稱",
            trigger: "change"
          }
        ],
        game_id: [
          {
            required: true,
            message: "請選擇遊戲名稱",
            trigger: "change"
          }
        ],
        open_time: [
          {
            required: true,
            message: "請填寫啟用時間",
            trigger: "change"
          }
        ],
        close_time: [
          {
            required: true,
            message: "請填寫關閉時間",
            trigger: "change"
          }
        ],
        count: [
          {
            required: true,
            message: "請填寫機台數量",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    get_game_group_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            self.game_group_option.push({
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
    get_game_option() {
      let self = this;
      if (self.form.game_group_id) {
        return axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "Web_Page/GameList",
          data: {
            GroupId: self.form.game_group_id
          }
        })
          .then(function(response) {
            self.game_option = [];
            self.form.game_id = "";
            response.data.data.forEach(function(item, index, array) {
              self.game_option.push({
                value: item.Sn,
                label: item.GameName
              });
            });
            // console.log(response.data.data);
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            // console.log(error);
          });
      }
    },
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/GameMachine",
        data: {
          SortBy: 1,
          Status: self.search_status
        }
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["Status_str"] = "";
            switch (item["Status"]) {
              case "1":
                item["color"] = "success";
                item["Status_str"] = "上架中";
                break;
              case "0":
                item["color"] = "danger";
                item["Status_str"] = "已下架";
                break;
            }
          });
          self.tableData = response.data.data;
          // console.log(response.data.data);
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
      this.form.game_group_id = "";
      this.form.game_id = "";
      this.form.images = "";
      this.form.file_list = [];
      this.form.images2 = "";
      this.form.file_list2 = [];
      this.form.user_cash = "";
      this.form.user_level = "";
      this.form.open_time = "";
      this.form.close_time = "";
      this.form.count = "";
      this.form.sort = "";
    },
    set_file(param) {
      this.form.images = param.file;
    },
    remove_file() {
      this.form.images = "";
    },
    set_file2(param) {
      this.form.images2 = param.file;
    },
    remove_file2() {
      this.form.images2 = "";
    },
    add_machine() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("GameGroupId", self.form.game_group_id);
          data.append("GameSn", self.form.game_id);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          if (self.form.images2) {
            data.append("Images2", self.form.images2);
          }
          data.append("UserCash", self.form.user_cash);
          data.append("UserLevel", self.form.user_level);
          data.append("Open_At", self.form.open_time);
          data.append("Close_At", self.form.close_time);
          data.append("MachineCount", self.form.count);
          data.append("Sort", self.form.sort);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameMachineManage/Add",
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
    get_machine(Sn) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/GameMachine",
        data: {
          Sn: Sn
        }
      })
        .then(async function(response) {
          self.update_id = response.data.data[0].Sn;
          self.form.game_group_id = response.data.data[0].GroupName;
          self.form.game_id = response.data.data[0].GameName;
          if (response.data.data[0].Images) {
            self.form.file_list.push({
              url: response.data.data[0].Images
            });
          }
          if (response.data.data[0].Images2) {
            self.form.file_list2.push({
              url: response.data.data[0].Images2
            });
          }
          self.form.user_cash = response.data.data[0].UserCash;
          self.form.user_level = response.data.data[0].UserLevel;
          self.form.open_time = response.data.data[0].Open_At;
          self.form.close_time = response.data.data[0].Close_At;
          self.form.count = response.data.data[0].Machine.length;
          self.form.sort = response.data.data[0].Sort;
          self.updateDialog = true;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_machine() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          if (self.form.images2) {
            data.append("Images2", self.form.images2);
          }
          data.append("UserCash", self.form.user_cash);
          data.append("UserLevel", self.form.user_level);
          data.append("Open_At", self.form.open_time);
          data.append("Close_At", self.form.close_time);
          data.append("Sort", self.form.sort);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameMachineManage/Edit",
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
    }
  }
};
</script>