<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 廠商管理
      .col-6.d-flex.justify-content-end
        el-button(size="medium", type='primary', @click='newDialog = true') 新增廠商
    .row.no-gutters.px-3.py-3
      .col-md-8.col-12.py-1
        el-radio-group(v-model="search_status", size="medium")
          el-radio-button(:label="'1'") 正常
          el-radio-button(:label="'0'") 停用
      //--Search
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入廠商編號', v-model='search_group', clearable)
          el-button(slot='append', icon='el-icon-search')
    //--Table
    .row.no-gutters.px-3
      template
        template
          el-table(:data='filter_table_data', border='', style='width: 100%')
            el-table-column(prop='Sort', label='排序', width='60', align='center')
            el-table-column(prop='GroupId', label='廠商編號', width='60', align='center')
            el-table-column(prop='GroupName', label='廠商代號', width='60', align='center')
            el-table-column(prop='CompanyTag', label='廠商公司名', width='70', align='center')
            el-table-column(prop='CompanyName', label='廠商顯示名稱', width='120', align='center')
            el-table-column(prop='Images', label='圖示', align='center')
              template(slot-scope='scope')
                img.w-100.h-100(v-if="scope.row.Images", :src="scope.row.Images + '?' + new Date().getTime()")
            el-table-column(prop='Images2', label='圖示2', align='center')
              template(slot-scope='scope')
                img.w-100.h-100(v-if="scope.row.Images2", :src="scope.row.Images2 + '?' + new Date().getTime()")
            el-table-column(prop='ColorCode', label='色碼', width='75', align='center')
              template(slot-scope='scope')
                el-color-picker(v-if="scope.row.ColorCode" v-model='scope.row.ColorCode', disabled)
            el-table-column(prop='Status_str', label='狀態', width='60', align='center')
            el-table-column(prop='GameType', label='遊戲類型', width='60', align='center')
              template(slot-scope='scope')
                div(v-for='item in scope.row.GameType') {{ item }}
            el-table-column(prop='TransferStatus_str', label='轉帳狀態', width='90', align='center')
            el-table-column(prop='GamePlay_str', label='提供試玩', width='90', align='center')
            el-table-column(prop='Jackpot_str', label='獎池', width='60', align='center')
            el-table-column(prop='JackpotBonus', label='獎池獎金', align='right')
              template(slot-scope='scope')
                span {{scope.row.JackpotBonus | commaFormat}}
            el-table-column(label='操作', width='100', align='center')
              template(slot-scope='scope')
                el-button(@click='get_group(scope.row.GroupId)', type='text') 修改
    //--Dialog
    //----add
    el-dialog(title='新增廠商', :visible.sync='newDialog', @close="init_dialog('add_form')")
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='廠商代號', prop="group_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.group_name', placeholder='輸入廠商代號', clearable)
        el-form-item(label='廠商公司名', prop="company_tag", label-width="110px" ,label-position='left')
          el-input(v-model='form.company_tag', placeholder='輸入廠商公司名', clearable)
        el-form-item(label='廠商顯示名稱', prop="company_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.company_name', placeholder='輸入廠商顯示名稱', clearable)
        el-form-item(label='圖示', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/*", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='圖示2', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file2", ref="upload", :on-remove="remove_file2", :file-list="form.file_list2", list-type="picture", action="", :limit=1, accept="image/*", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
        el-form-item(label='色碼', prop="sort", label-width="110px" ,label-position='left')
          el-input(v-model='form.color_code', placeholder='輸入色碼', clearable)
        el-form-item(label='排序', prop="sort", label-width="110px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
        el-form-item(label='狀態', prop="status", label-width="110px" ,label-position='left')
          el-select(v-model='form.status',size='medium', placeholder='選擇狀態', clearable)
            el-option(label='關', value="0")
            el-option(label='開', value="1")
            el-option(label='維護', value="2")
        el-form-item(label='轉帳狀態', prop="transfer_status", label-width="110px" ,label-position='left')
          el-select(v-model='form.transfer_status',size='medium', placeholder='選擇轉帳狀態', clearable)
            el-option(label='關', value="0")
            el-option(label='開', value="1")
            el-option(label='維護', value="2")
        el-form-item(label='遊戲類型', prop="game_type", label-width="110px" ,label-position='left')
          el-checkbox-group(v-model='form.game_type')
            el-checkbox(v-for='item in game_type_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='提供試玩', prop="game_play", label-width="110px" ,label-position='left')
          el-switch(v-model='form.game_play', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='獎池', prop="jackpot", label-width="110px" ,label-position='left')
          el-switch(v-model='form.jackpot', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        // el-form-item(label='獎池獎金', prop="jackpot_bonus", label-width="110px" ,label-position='left')
        //   el-input(v-model='form.jackpot_bonus', placeholder='輸入獎池獎金')
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_group', :loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改廠商', :visible.sync='updateDialog', @close="init_dialog('update_form')" )
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='廠商代號', label-width="110px" ,label-position='left')
          span {{form.group_name}}
        el-form-item(label='廠商公司名', label-width="110px" ,label-position='left')
          span {{form.company_tag}}
        el-form-item(label='廠商顯示名稱', prop="company_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.company_name', placeholder='輸入廠商顯示名稱', clearable)
        el-form-item(label='圖示', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/*", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='圖示2', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file2", ref="upload", :on-remove="remove_file2", :file-list="form.file_list2", list-type="picture", action="", :limit=1, accept="image/*", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
        el-form-item(label='色碼', prop="sort", label-width="110px" ,label-position='left')
          el-input(v-model='form.color_code', placeholder='輸入色碼', clearable)
        el-form-item(label='排序', prop="sort", label-width="110px" ,label-position='left')
          el-input(v-model='form.sort', type="number", min="0" placeholder='輸入排序', clearable)
        el-form-item(label='狀態', prop="status", label-width="110px" ,label-position='left')
          el-select(v-model='form.status',size='medium', placeholder='選擇狀態', clearable)
            el-option(label='關', value="0")
            el-option(label='開', value="1")
            el-option(label='維護', value="2")
        el-form-item(label='轉帳狀態', prop="transfer_status", label-width="110px" ,label-position='left')
          el-select(v-model='form.transfer_status',size='medium', placeholder='選擇轉帳狀態', clearable)
            el-option(label='關', value="0")
            el-option(label='開', value="1")
            el-option(label='維護', value="2")
        el-form-item(label='遊戲類型', prop="game_type", label-width="110px" ,label-position='left')
          el-checkbox-group(v-model='form.game_type')
            el-checkbox(v-for='item in game_type_option', :label='item.value', :key='item.value') {{item.label}}
        el-form-item(label='提供試玩', prop="game_play", label-width="110px" ,label-position='left')
          el-switch(v-model='form.game_play', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='獎池', prop="jackpot",label-width="110px" ,label-position='left')
          el-switch(v-model='form.jackpot', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        // el-form-item(label='獎池獎金', prop="jackpot_bonus", label-width="110px" ,label-position='left')
        //   el-input(v-model='form.jackpot_bonus', placeholder='輸入獎池獎金', clearable)
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_group()', :loading='lock_btn') 確 認
    //- el-pagination.col.mt-3.mb-4.d-flex.justify-content-end(background='', layout='prev, pager, next', :total='200')
</template>
<script>
export default {
  name: "tgGameGroupList",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      search_status: "",
      search_group: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      game_type_option: [
        { value: "1", label: "拉霸" },
        { value: "2", label: "捕魚" },
        { value: "3", label: "棋牌" },
        { value: "4", label: "街機" }
      ],
      form: {
        group_name: "",
        company_tag: "",
        company_name: "",
        images: "",
        file_list: [],
        images2: "",
        file_list2: [],
        color_code: "",
        sort: "",
        status: "1",
        transfer_status: "1",
        game_play: "1",
        jackpot: "1",
        game_type: []
        // jackpot_bonus: "0"
      },
      rules: {
        group_name: [
          {
            required: true,
            message: "請填寫廠商編號",
            trigger: "change"
          }
        ],
        company_tag: [
          {
            required: true,
            message: "請填寫廠商公司名",
            trigger: "change"
          }
        ],
        company_name: [
          {
            required: true,
            message: "請填寫廠商顯示名稱",
            trigger: "change"
          }
        ],
        status: [
          {
            type: "enum",
            enum: ["0", "1", "2"],
            required: true,
            message: "請選擇狀態",
            trigger: "change"
          }
        ],
        transfer_status: [
          {
            type: "enum",
            enum: ["0", "1", "2"],
            required: true,
            message: "請選擇轉帳狀態",
            trigger: "change"
          }
        ],
        game_play: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇提供試玩",
            trigger: "change"
          }
        ],
        jackpot: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇獎池",
            trigger: "change"
          }
        ],
        game_type: [
          {
            required: true,
            message: "請選擇遊戲類型 ",
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
          self.search_group &&
          item.GroupName.indexOf(self.search_group) == -1
        ) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    get_data() {
      let self = this;
      let game_type_option_label = [];
      this.game_type_option.forEach(function(element) {
        game_type_option_label[element.value] = element.label;
      });
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
        data: {
          Status: self.search_status
        }
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["Status_str"] = "";
            switch (item["Status"]) {
              case "0":
                item["Status_str"] = "關";
                break;
              case "1":
                item["Status_str"] = "開";
                break;
              case "2":
                item["Status_str"] = "維護";
                break;
            }
            item["TransferStatus_str"] = "";
            if (item["TransferStatus"] == 1) {
              item["TransferStatus_str"] = "開";
            } else if (item["TransferStatus"] == 0) {
              item["TransferStatus_str"] = "關";
            } else {
              item["TransferStatus_str"] = "維護";
            }
            item["GamePlay_str"] = "";
            if (item["GamePlay"] == 1) {
              item["GamePlay_str"] = "有";
            } else {
              item["GamePlay_str"] = "無";
            }
            item["Jackpot_str"] = "";
            if (item["Jackpot"] == 1) {
              item["Jackpot_str"] = "有";
            } else {
              item["Jackpot_str"] = "無";
            }
            item["GameType"] = item["GameType"].split(",");
            for (let i = 0; i < item["GameType"].length; i++) {
              //  console.log(item["GameType"][i]);
              item["GameType"][i] = game_type_option_label[item["GameType"][i]];
            }
          });
          self.tableData = response.data.data;
          console.log(response.data.data);
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
      this.form.group_name = "";
      this.form.company_tag = "";
      this.form.company_name = "";
      this.form.images = "";
      this.form.file_list = [];
      this.form.images2 = "";
      this.form.file_list2 = [];
      this.form.color_code = "";
      this.form.sort = "";
      this.form.status = "1";
      this.form.transfer_status = "1";
      this.form.game_play = "1";
      this.form.jackpot = "1";
      this.form.game_type = [];
      // this.form.jackpot_bonus= "0"
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
    add_group() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("GroupName", self.form.group_name);
          data.append("CompanyTag", self.form.company_tag);
          data.append("CompanyName", self.form.company_name);
          data.append("Images", self.form.images);
          data.append("Images2", self.form.images2);
          data.append("ColorCode", self.form.color_code);
          data.append("Sort", self.form.sort);
          data.append("Status", self.form.status);
          data.append("TransferStatus", self.form.transfer_status);
          data.append("GamePlay", self.form.game_play);
          data.append("Jackpot", self.form.jackpot);
          data.append("GameType", self.form.game_type.join(","));
          // data.append("JackpotBonus", self.form.jackpot_bonus);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameGroupManage/Add",
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
    get_group(group_id) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
        data: {
          GroupId: group_id
        }
      })
        .then(function(response) {
          self.update_id = response.data.data[0].GroupId;
          self.form.group_name = response.data.data[0].GroupName;
          self.form.company_tag = response.data.data[0].CompanyTag;
          self.form.company_name = response.data.data[0].CompanyName;
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
          self.form.color_code = response.data.data[0].ColorCode;
          self.form.sort = response.data.data[0].Sort;
          self.form.status = response.data.data[0].Status;
          self.form.transfer_status = response.data.data[0].TransferStatus;
          self.form.game_play = response.data.data[0].GamePlay;
          self.form.jackpot = response.data.data[0].Jackpot;
          self.form.game_type = response.data.data[0].GameType.split(",");
          // self.form.jackpot_bonus = response.data.data[0].JackpotBonus;
          self.updateDialog = true;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_group() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("GroupId", self.update_id);
          data.append("CompanyName", self.form.company_name);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          if (self.form.images2) {
            data.append("Images2", self.form.images2);
          }
          data.append("ColorCode", self.form.color_code);
          data.append("Sort", self.form.sort);
          data.append("Status", self.form.status);
          data.append("TransferStatus", self.form.transfer_status);
          data.append("GamePlay", self.form.game_play);
          data.append("Jackpot", self.form.jackpot);
          data.append("GameType", self.form.game_type.join(","));
          // data.append("JackpotBonus", self.form.jackpot_bonus);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameGroupManage/Edit",
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
    }
  }
};
</script>
