<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 交易管理
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-10.col-12
        .row.no-gutters
          .col-md-12.col-12.pr-1
            el-radio-group(v-model="search_setting_type", size="medium", @change="get_data()")
              el-radio-button(:label='"1"') 存款
              el-radio-button(:label='"2"') 提款
              el-radio-button(:label='"3"') 轉入錢包
              el-radio-button(:label='"4"') 轉出錢包
              //- el-radio-button(:label='"5"') 輸贏		
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='SettingTypeName', label='交易類型', width='100', align='center')
            el-table-column(prop='GameGroupName', label='平台', width='180', align='center')
            el-table-column(prop='TodayMax', label='單日限額', align='right')
            el-table-column(prop='SingleMin', label='單筆最低', align='right')
            el-table-column(prop='SingleMax', label='單筆最高', align='right')
            el-table-column(label='操作', width='80', align='center')
              template(slot-scope='scope')
                a.links(@click='get_setting(scope.row)', type='text') 設定
      el-dialog(title='設定', :visible.sync='updateDialog', @close="update_id = ''" )
        el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
          el-form-item(label='交易類型', label-width="100px" ,label-position='left')
            span {{form.setting_type_name}}
          el-form-item(label='平台', label-width="100px" ,label-position='left')
            span {{form.gmae_group_name}}
          el-form-item(label='單日限額', prop="today_max", label-width="100px" ,label-position='left')
            el-input(v-model='form.today_max', type="number", min="0" placeholder='請輸入單日限額', clearable)
          el-form-item(label='單筆最低', prop="single_min", label-width="100px" ,label-position='left')
            el-input(v-model='form.single_min', type="number", min="0" placeholder='請輸入單筆最高', clearable)
          el-form-item(label='單筆最高', prop="single_max", label-width="100px" ,label-position='left')
            el-input(v-model='form.single_max', type="number", min="0" placeholder='請輸入單筆最低', clearable)
        .dialog-footer(slot='footer')
          el-button(@click='updateDialog = false') 取 消
          el-button(type='primary', @click='update_setting()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgTransaction",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      search_setting_type: "1",
      updateDialog: false,
      lock_btn: false,
      update_id: "",
      form: {
        setting_type_name: "",
        gmae_group_name: "",
        level_group_id: "1",
        today_max: "1",
        single_max: "",
        single_min: ""
      },
      rules: {
        today_max: [
          {
            required: true,
            message: "請輸入單日限額",
            trigger: "change"
          }
        ],
        single_max: [
          {
            required: true,
            message: "請輸入單筆最低",
            trigger: "change"
          }
        ],
        single_min: [
          {
            required: true,
            message: "請輸入單筆最高",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    get_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/GetLevelPaySetting",
        data: {
          LevelGroupId: "1",
          SettingType: self.search_setting_type
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["GameGroupName"] =
              response.data.other.GameGroupIdToName[item["GameGroupId"]];
            if (item["GameGroupId"] == "0") {
              item["GameGroupName"] = "全部";
            }
            item["SettingTypeName"] =
              response.data.other.SettingType[item["SettingType"]];
          });
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_setting(row) {
      let self = this;
      self.update_id = row.Sn;
      self.form.setting_type_name = row.SettingTypeName;
      self.form.gmae_group_name = row.GameGroupName;
      self.form.level_group_id = row.LevelGroupId;
      self.form.today_max = row.TodayMax;
      self.form.single_min = row.SingleMin;
      self.form.single_max = row.SingleMax;
      self.updateDialog = true;
    },
    update_setting() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("LevelGroupId", 1);
          data.append("SingleMax", self.form.single_max);
          data.append("SingleMin", self.form.single_min);
          data.append("TodayMax", self.form.today_max);
          axios({
            method: "post",
            url:
              process.env.VUE_APP_APIHOST +
              "WalletAll/UserLevelPaySetting/Edit",
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
              self.lock_btn = false;
              self.updateDialog = false;
            });
        }
      });
    }
  }
};
</script>	