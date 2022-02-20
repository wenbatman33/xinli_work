<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 遊戲管理
      .col-6.d-flex.justify-content-end
        el-button(v-if="$store.state.member.user_page_auth.Add_Auth==1" @click='newDialog = true', size="medium", type='primary') 新增遊戲
    .row.no-gutters.px-3.py-3
      .col-2.py-1
        el-select(v-model='search_status', size='medium', placeholder='選擇狀態', @change="get_data(1)")
          el-option(label='全部', value="0,1,2")
          el-option(label='開', value="1")
          el-option(label='關', value="0")
          el-option(label='維護', value="2")
      .col-md-4.col-12.py-1.pl-1
        el-select(v-model='form.search_game_group', size="medium", placeholder='選擇廠商名稱', clearable, @change="get_data(1)")
          el-option(v-for='item in game_group_option', :key='item.value', :label='item.label', :value='item.value')
      .col-md-2.col-12.px-2.py-1
        router-link.links(:to="{name:'tgGameGroupList'}")
          el-button( v-if="$store.state.member.user_page_auth.Add_Auth==1" size="medium", type='text') 廠商管理
      //--Search
      .col-md-4.col-12.py-1
        el-input(size="medium", placeholder='輸入遊戲名稱', v-model='search_content', clearable, @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)")
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='Sn', label='流水號', width='80', align='center')
            el-table-column(prop='GroupName', label='廠商名稱', width='80', align='center')
            el-table-column(prop='GameName', label='遊戲名稱')
            el-table-column(prop='GameId', label='遊戲原廠代號', width='110')
            el-table-column(prop='GameCode', label='遊戲代碼', width='80')
            el-table-column(prop='Images', label='圖示')
              template(slot-scope='scope')
                img.w-100.h-100(v-if="scope.row.Images", :src="scope.row.Images + '?' + new Date().getTime()")
            el-table-column(prop='Popular', label='熱門度', width='65', align='center')
            el-table-column(prop='TagName', label='標籤')
            el-table-column(prop='Status_str', label='狀態', width='55', align='center')
            el-table-column(prop='ReturnType_str', label='計算流水', width='80', align='center')
            el-table-column(prop='GamePlay_str', label='提供試玩', width='80', align='center')
            el-table-column(prop='JackpotTag', label='獎池代碼')
            el-table-column(prop='JackpotBonus', label='獎池獎金', align='right')
            el-table-column(prop='H5Game_str', label='H5遊戲', width='70', align='center')
            el-table-column(label='操作', width='60', align='center')
              template(slot-scope='scope')
                el-button.button-tablestlye(v-if="$store.state.member.user_page_auth.Add_Auth==1" @click='get_game(scope.row)', type='text') 修改
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--Dialog
    el-dialog(title='新增遊戲', :visible.sync='newDialog', @close="init_dialog('add_form')" )
      el-form.form-style.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='廠商名稱', prop="search_game_group", label-width="110px" ,label-position='left')
          el-select(v-model='form.search_game_group',size='medium', placeholder='選擇廠商名稱', clearable)
            el-option(v-for='item in game_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='遊戲名稱', prop="game_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.game_name', placeholder='輸入遊戲名稱', clearable)
        el-form-item(label='遊戲原廠代號', prop="game_id", label-width="110px" ,label-position='left')
          el-input(v-model='form.game_id', placeholder='輸入遊戲原廠代號', clearable)
        el-form-item(label='遊戲代碼', prop="game_code", label-width="110px" ,label-position='left')
          el-input(v-model='form.game_code', placeholder='輸入遊戲代碼', clearable)
        el-form-item(v-if="gmaeGroupList.indexOf(game_group_name_to_tag[form.search_game_group]) >=0", label='手機遊戲代碼', prop="mobile_game_code", label-width="110px" ,label-position='left')
          el-input(v-model='form.mobile_game_code', placeholder='輸入手機遊戲代碼', clearable)
        el-form-item(label='遊戲類型', prop="game_type", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_type', size='medium', placeholder='選擇遊戲類型', clearable)
            el-option(label='老虎機', value='1')
            el-option(label='捕魚', value='2')
            el-option(label='棋牌', value='3')
            el-option(label='街機', value='4')
        el-form-item(label='計算流水', prop="h5game", label-width="110px" ,label-position='left')
          el-switch(v-model='form.return_type', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='上傳圖示', prop="images", label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='熱門度', prop="popular", label-width="110px" ,label-position='left')
          el-input(v-model='form.popular', placeholder='輸入熱門度', clearable)
        el-form-item(label='標籤', prop="game_tag", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_tag', multiple=true, size='medium', placeholder='選擇標籤', clearable)
            el-option-group(v-for='group in game_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.Sn', :label='item.TagName', :value='item.Sn')
        el-form-item(label='項目狀態', prop="status", label-width="110px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='提供試玩', prop="gameplay", label-width="110px" ,label-position='left')
          el-switch(v-model='form.gameplay', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='獎池代碼', prop="jackpot_tag", label-width="110px" ,label-position='left')
          el-input(v-model='form.jackpot_tag', placeholder='輸入獎池代碼', clearable)
        // el-form-item(label=' prop="jackpot_bonus",獎池獎金', label-width="110px" ,label-position='left')
        //   el-input(v-model='form.jackpot_bonus', placeholder='輸入獎池獎金', clearable)
        el-form-item(label='H5遊戲', prop="h5game", label-width="110px" ,label-position='left')
          el-switch(v-model='form.h5game', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='遊戲營運', prop="game_mod", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_mod', size='medium', placeholder='選擇遊戲營運', clearable)
            el-option(label='全部', value="0")
            el-option(label='WEB', value="1")
            el-option(label='手機', value="2")
      .dialog-footer(slot='footer')
        el-button(@click='newDialog = false') 取 消
        el-button(type='primary', @click='add_game()',:loading='lock_btn') 確 認
    //--Dialog
    el-dialog(title='修改遊戲', :visible.sync='updateDialog', @close="init_dialog('update_form')")
      el-form.form-style.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='廠商名稱', prop="search_game_group", label-width="110px" ,label-position='left')
          el-select(v-model='form.search_game_group',size='medium', placeholder='選擇廠商名稱', clearable)
            el-option(v-for='item in game_group_option', :key='item.value', :label='item.label', :value='item.value')
        el-form-item(label='遊戲名稱', prop="game_name", label-width="110px" ,label-position='left')
          el-input(v-model='form.game_name', placeholder='輸入遊戲名稱', clearable)
        el-form-item(label='遊戲原廠代號', prop="game_id", label-width="110px" ,label-position='left')
          el-input(v-model='form.game_id', placeholder='輸入遊戲原廠代號', clearable)
        el-form-item(label='遊戲代碼', prop="game_code", label-width="110px" ,label-position='left')
          el-input(v-model='form.game_code', placeholder='輸入遊戲代碼', clearable)
        el-form-item(v-if="gmaeGroupList.indexOf(game_group_name_to_tag[form.search_game_group]) >=0", label='手機遊戲代碼', prop="mobile_game_code", label-width="110px" ,label-position='left')
          el-input(v-model='form.mobile_game_code', placeholder='輸入手機遊戲代碼', clearable)
        el-form-item(label='遊戲類型', prop="game_type", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_type', size='medium', placeholder='選擇遊戲類型', clearable)
            el-option(label='老虎機', value='1')
            el-option(label='捕魚', value='2')
            el-option(label='棋牌', value='3')
            el-option(label='街機', value='4')
        el-form-item(label='計算流水', prop="h5game", label-width="110px" ,label-position='left')
          el-switch(v-model='form.return_type', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='上傳圖示', label-width="110px" ,label-position='left')
          el-upload.upload-demo(:http-request="set_file", ref="upload", :on-remove="remove_file", :file-list="form.file_list", list-type="picture", action="", :limit=1, accept="image/jpeg,image/gif,image/png", :on-exceed="(files, fileList) => { $message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`) }")
            el-button(slot="trigger" size="small" type="primary") 選取圖片
            // .el-upload__tip(slot='tip') 提示：最多上傳 2 張且為 JPG/PNG 檔案，檔案大小不超過 500 KB。
        el-form-item(label='熱門度', prop="popular", label-width="110px" ,label-position='left')
          el-input(v-model='form.popular', placeholder='輸入熱門度', clearable)
        el-form-item(label='標籤', prop="game_tag", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_tag', multiple=true, size='medium', placeholder='選擇標籤', clearable)
            el-option-group(v-for='group in game_tag_option', :key='group.label', :label='group.label')
              el-option(v-for='item in group.options', :key='item.Sn', :label='item.TagName', :value='item.Sn')
        el-form-item(label='項目狀態', prop="status", label-width="110px" ,label-position='left')
          el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='提供試玩', prop="gameplay", label-width="110px" ,label-position='left')
          el-switch(v-model='form.gameplay', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        el-form-item(label='獎池代碼', prop="jackpot_tag", label-width="110px" ,label-position='left')
          el-input(v-model='form.jackpot_tag', placeholder='輸入獎池代碼', clearable)
        // el-form-item(label='獎池獎金', prop="jackpot_bonus", label-width="110px" ,label-position='left')
        //   el-input(v-model='form.jackpot_bonus', placeholder='輸入獎池獎金', clearable)
        el-form-item(label='H5遊戲', prop="h5game", label-width="110px" ,label-position='left')
          el-switch(v-model='form.h5game', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')   
        el-form-item(label='遊戲營運', prop="game_mod", label-width="110px" ,label-position='left')
          el-select(v-model='form.game_mod', size='medium', placeholder='選擇遊戲營運', clearable)
            el-option(label='全部', value="0")
            el-option(label='WEB', value="1")
            el-option(label='手機', value="2")       
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_game()',:loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgGameList",
  mounted() {
    this.get_game_group_option();
    this.get_game_tag_option();
    this.get_data(1);
    console.log(this.$store.state.member.user_page_auth);
  },
  data() {
    return {
      gmaeGroupList: ["IM", "AG"],
      tableData: [],
      now_page: 1,
      page_size: 30,
      total_page: 0,
      game_group_option: [],
      game_tag_option: [],
      game_group_name_to_tag: [],
      search_status: "0,1,2",
      search_content: "",
      lock_btn: false,
      newDialog: false,
      updateDialog: false,
      update_id: "",
      form: {
        search_game_group: "",
        game_name: "",
        game_id: "",
        game_code: "",
        mobile_game_code: "",
        game_type: "",
        return_type: "1",
        images: "",
        file_list: [],
        popular: "",
        game_tag: [],
        status: "1",
        gameplay: "1",
        jackpot_tag: "",
        jackpot_bonus: "",
        h5game: "1",
        game_mod: "0"
      },
      rules: {
        search_game_group: [
          {
            required: true,
            message: "請選擇廠商名稱",
            trigger: "change"
          }
        ],
        game_name: [
          {
            required: true,
            message: "請填寫遊戲名稱",
            trigger: "change"
          }
        ],
        game_id: [
          {
            required: true,
            message: "請填寫遊戲原廠代號",
            trigger: "change"
          }
        ],
        game_code: [
          {
            required: true,
            message: "請填寫遊戲代碼",
            trigger: "change"
          }
        ],
        game_type: [
          {
            required: true,
            message: "請選擇遊戲類型",
            trigger: "change"
          }
        ],
        return_type: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇計算流水",
            trigger: "change"
          }
        ],
        images: [
          {
            required: true,
            message: "請上傳圖示",
            trigger: "change"
          }
        ],
        popular: [
          {
            required: true,
            message: "請填寫熱門度",
            trigger: "change"
          }
        ],
        game_tag: [
          {
            type: "array",
            required: true,
            message: "請選擇標籤",
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
        ],
        gameplay: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇提供試玩狀態",
            trigger: "change"
          }
        ],
        h5game: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇H5遊戲狀態",
            trigger: "change"
          }
        ],
        game_mod: [
          {
            required: true,
            message: "請選擇遊戲營運狀態",
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
          self.game_group_name_to_tag = [];
          response.data.data.forEach(function(item, index, array) {
            self.game_group_option.push({
              value: item.GroupId,
              label: item.GroupName
            });
            self.game_group_name_to_tag[item.GroupId] = item.CompanyTag;
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_game_tag_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameTagList",
        data: {}
      })
        .then(function(response) {
          self.game_tag_option = self.groupBy(response.data.data, function(
            row
          ) {
            return [row.GroupName];
          });
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    groupBy(array, get_group_by_name) {
      let groups = [];
      array.forEach(function(row_data) {
        let group_by_name = get_group_by_name(row_data);
        groups[group_by_name] = groups[group_by_name] || [];
        groups[group_by_name].push(row_data);
      });
      return Object.keys(groups).map(function(group_by_name) {
        return {
          label: group_by_name,
          options: groups[group_by_name]
        };
      });
    },
    get_data(now_page) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameList",
        data: {
          GroupId: self.form.search_game_group,
          GameName: self.search_content,
          Status: self.search_status,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          if (response.data.data.data_list == null) {
            response.data.data.data_list = [];
          }
          response.data.data.data_list.forEach(function(item, index, array) {
            item["ReturnType_str"] = "";
            if (item["ReturnType"] == 1) {
              item["ReturnType_str"] = "開";
            } else {
              item["ReturnType_str"] = "關";
            }
            item["Status_str"] = "";
            if (item["Status"] == 1) {
              item["Status_str"] = "開";
            } else if (item["Status"] == 0) {
              item["Status_str"] = "關";
            } else {
              item["Status_str"] = "維護";
            }
            item["GamePlay_str"] = "";
            if (item["Status"] == 1) {
              item["GamePlay_str"] = "有";
            } else {
              item["GamePlay_str"] = "無";
            }
            item["H5Game_str"] = "";
            if (item["H5Game"] == 1) {
              item["H5Game_str"] = "是";
            } else {
              item["H5Game_str"] = "不是";
            }
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
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
      this.form.game_name = "";
      this.form.game_id = "";
      this.form.game_code = "";
      this.form.mobile_game_code = "";
      this.form.return_type = "1";
      this.form.images = "";
      this.form.file_list = [];
      this.form.popular = "";
      this.form.game_tag = [];
      this.form.status = "1";
      this.form.gameplay = "1";
      this.form.jackpot_tag = "";
      this.form.jackpot_bonus = "";
      this.form.h5game = "1";
      this.form.game_mod = "0";
    },
    set_file(param) {
      this.form.images = param.file;
    },
    remove_file() {
      this.form.images = "";
    },
    add_game() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("GroupId", self.form.search_game_group);
          data.append("GameName", self.form.game_name);
          data.append("GameId", self.form.game_id);
          data.append("GameCode", self.form.game_code);
          data.append("MobileGameCode", self.form.mobile_game_code);
          data.append("GameType", self.form.game_type);
          data.append("ReturnType", self.form.return_type);
          data.append("Images", self.form.images);
          data.append("Popular", self.form.popular);
          data.append("GameTag", self.form.game_tag.join(","));
          data.append("Status", self.form.status);
          data.append("GamePlay", self.form.gameplay);
          if (self.form.jackpot_tag) {
            data.append("JackpotTag", self.form.jackpot_tag);
          }
          data.append("H5Game", self.form.h5game);
          data.append("GameMode", self.form.game_mod);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameListManage/Add",
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
    get_game(row) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Web_Page/GameList",
        data: {
          Sn: row.Sn,
          Status: row.Status
        }
      })
        .then(function(response) {
          self.update_id = response.data.data[0].Sn;
          self.form.search_game_group = response.data.data[0].GroupId;
          self.form.game_name = response.data.data[0].GameName;
          self.form.game_id = response.data.data[0].GameId;
          self.form.game_code = response.data.data[0].GameCode;
          self.form.mobile_game_code = response.data.data[0].MobileGameCode;
          self.form.game_type = response.data.data[0].GameType;
          self.form.return_type = response.data.data[0].ReturnType;
          if (response.data.data[0].Images) {
            self.form.file_list.push({
              url: response.data.data[0].Images
            });
          }
          self.form.popular = response.data.data[0].Popular;
          self.form.game_tag = response.data.data[0].GameTag.split(",");
          self.form.status = response.data.data[0].Status;
          self.form.gameplay = response.data.data[0].GamePlay;
          self.form.jackpot_tag = response.data.data[0].JackpotTag;
          self.form.h5game = response.data.data[0].H5Game;
          self.form.game_mod = response.data.data[0].GameMode;
          self.updateDialog = true;
          // console.log(response.data.data.data_list[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    update_game() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("GroupId", self.form.search_game_group);
          data.append("GameName", self.form.game_name);
          data.append("GameId", self.form.game_id);
          data.append("GameCode", self.form.game_code);
          data.append("MobileGameCode", self.form.mobile_game_code);
          data.append("GameType", self.form.game_type);
          data.append("ReturnType", self.form.return_type);
          if (self.form.images) {
            data.append("Images", self.form.images);
          }
          data.append("Popular", self.form.popular);
          data.append("GameTag", self.form.game_tag.join(","));
          data.append("Status", self.form.status);
          data.append("GamePlay", self.form.gameplay);
          if (self.form.jackpot_tag) {
            data.append("JackpotTag", self.form.jackpot_tag);
          }
          data.append("H5Game", self.form.h5game);
          data.append("GameMode", self.form.game_mod);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Web/GameListManage/Edit",
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