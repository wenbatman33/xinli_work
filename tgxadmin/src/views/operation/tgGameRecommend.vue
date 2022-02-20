<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 推薦遊戲管理
      .col-6.d-flex.justify-content-end
        el-button(@click='newDialog = true', size="medium",type='primary') 新增
    .row.no-gutters.px-3.py-3
    //--Table
    .row.no-gutters.px-3
      template
        el-table(:data='tableData', border='', style='width: 100%')
          el-table-column(prop='Tag', label='區塊代碼', width='', align='center')
          el-table-column(prop='GroupName', label='廠商代碼', width='', align='center')
          el-table-column(prop='GameName', label='遊戲名稱', width='', align='center')
          el-table-column(prop='Images', label='圖示', width='300' align='center')
            template(slot-scope='scope')
              img.w-100.h-100(v-if="scope.row.Images", :src="scope.row.Images")
          el-table-column(prop='Create_At', label='新增時間', width='180', align='center')
          el-table-column(prop='Update_At', label='修改時間', width='180', align='center')
          el-table-column(prop='Status_str', label='狀態', width='', align='center')
          el-table-column(label='操作', width='100', align='center')
            template(slot-scope='scope')
              a.links(@click='get_recommend(scope.row.Sn)', type='text') 修改
              a.cancel(@click='handleDeleteComfirm(scope.row.Sn)', type='text', style='color:#ff4949') 刪除
    //--Dialog
    el-dialog(title='新增推薦遊戲', :visible.sync='newDialog', @close="init_dialog('add_form')" )
      el-form.form-style.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='區塊', prop="block", label-width="120px" ,label-position='left')
          el-select(v-model='form.block',size='medium', placeholder='選擇區塊', clearable)
            el-option(v-if="used_block.indexOf(item.value) == -1" v-for='item in block_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='上傳圖示', prop="images", label-width="120px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='推薦遊戲流水號', prop="game_id", label-width="120px" ,label-position='left')
          el-select(v-model='form.game_id', filterable, remote, :remote-method="get_game_option", :loading='lock_btn', placeholder='選擇推薦遊戲流水號', clearable)
            el-option(v-for='item in game_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='狀態', prop="status", label-width="120px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_recommend()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改推薦遊戲', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.form-style.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='區塊', label-width="120px" ,label-position='left')
          div 區塊{{form.block}}
        el-form-item(label='上傳圖示', label-width="120px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='推薦遊戲流水號', prop="game_id", label-width="120px" ,label-position='left')
          el-select(v-model='form.game_id', filterable, remote, :remote-method="get_game_option", :loading='lock_btn', placeholder='選擇推薦遊戲流水號', clearable)
            el-option(v-for='item in game_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='狀態', prop="status", label-width="120px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')  
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_recommend()',:loading='lock_btn') 確 認
</template>
<script>
import { debounce } from "debounce";
export default {
  name: "tgGameRecommend",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      game_option: [],
      block_option: [
        {
          value: "1",
          label: "區塊1"
        },
        {
          value: "2",
          label: "區塊2"
        },
        {
          value: "3",
          label: "區塊3"
        },
        {
          value: "4",
          label: "區塊4"
        },
        {
          value: "5",
          label: "區塊5"
        },
        {
          value: "6",
          label: "區塊6"
        },
        {
          value: "7",
          label: "區塊7"
        },
        {
          value: "8",
          label: "區塊8"
        }
      ],
      used_block: [],
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        block: "",
        images: "",
        file_list: [],
        game_id: "",
        status: "1"
      },
      rules: {
        block: [
          {
            required: true,
            message: "請選擇區塊",
            trigger: "change"
          }
        ],
        images: [
          {
            required: true,
            message: "請選擇上傳圖示",
            trigger: "change"
          }
        ],
        game_id: [
          {
            required: true,
            message: "請選擇推薦遊戲流水號",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "請選擇狀態",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    get_game_option: debounce(function(query_sn) {
      let self = this;
      if (query_sn) {
        self.lock_btn = true;
        axios({
          method: "post",
          url: process.env.VUE_APP_APIHOST + "Web_Page/GameList",
          data: {
            Sn: query_sn
          }
        })
          .then(function(response) {
            self.game_option = [];
            if (response.data.data == null) {
              response.data.data = [];
            }
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
          })
          .finally(function() {
            self.lock_btn = false;
          });
      }
    }, 450),
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/QueryGameRecommend",
        data: {
          Status: self.search_status
        }
      })
        .then(function(response) {
          self.used_block = [];
          response.data.data.forEach(function(item, index, array) {
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "開";
            } else {
              item["Status_str"] = "關";
            }
            self.used_block.push(item.Tag);
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
      this.form.block = "";
      this.form.images = "";
      this.form.file_list = [];
      this.form.game_id = "";
      this.form.status = "1";
    },
    set_file(param) {
      this.form.images = param.file;
    },
    remove_file() {
      this.form.images = "";
    },
    add_recommend() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Tag", self.form.block);
          data.append("Images", self.form.images);
          data.append("GameSn", self.form.game_id);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameRecommendManage/Add",
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
              self.newDialog = false;
            });
        }
      });
    },
    get_recommend(sn) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/QueryGameRecommend",
        data: {
          Sn: sn
        }
      })
        .then(function(response) {
          self.update_id = response.data.data[0].Sn;
          self.form.block = response.data.data[0].Tag;
          if (response.data.data[0].Images) {
            self.form.file_list.push({
              url: response.data.data[0].Images
            });
          }
          self.get_game_option(response.data.data[0].GameSn);
          self.form.game_id = response.data.data[0].GameSn;
          self.form.status = response.data.data[0].Status;
          self.updateDialog = true;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_recommend() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("Tag", self.form.block);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          data.append("GameSn", self.form.game_id);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameRecommendManage/Edit",
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
              self.updateDialog = false;
            });
        }
      });
    },
    handleDeleteComfirm(sn) {
      let self = this;
      this.$confirm("此動作將永久刪除該項目，確認是否繼續？", "刪除確認", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.del_recommend(sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除"
          });
        });
    },
    del_recommend(sn) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web/GameRecommendManage/Delete",
        data: {
          Sn: sn
        }
      })
        .then(function(response) {
          if (response.data.status) {
            self.get_data();
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