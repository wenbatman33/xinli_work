<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 渠道管理
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-10.col-12
        .row.no-gutters
          .col-md-8.col-12.py-1
            el-radio-group(v-model="search_channel_type", size="medium", @change="get_data()")
              el-radio-button(:label='"1"') 銀行卡
              el-radio-button(:label='"2"') 第三方支付
      .col-md-2.col-12.py-1.d-flex.justify-content-end
        el-button(@click='refresh_channel()', size="medium", type='primary') 刷新 FDI {{ (search_channel_type==1)? '銀行卡': '第三方支付' }}
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='PayChannelId', label='渠道編號', width='100', align='center')
            el-table-column(prop='ChannelName', label='渠道名稱', align='center')
            el-table-column(prop='TagName', label='會員標籤', align='center')
            el-table-column(prop='DeviceName', label='使用裝置', align='center')
            el-table-column(prop='TodayMax', label='單日限額', align='center')
            el-table-column(prop='SingleMin', label='單筆最低', align='center')
            el-table-column(prop='SingleMax', label='單筆最高', align='center')
            el-table-column(prop='RateTypeName', label='費率類型', align='center')
            el-table-column(prop='FDIStatusName', label='FDI狀態', width='80', align='center')
              template(slot-scope='scope')
                el-tag(v-if="scope.row.Status == '1'", type="success", disable-transitions='') {{scope.row.FDIStatusName}}
                el-tag(v-else, type="danger", disable-transitions='') {{scope.row.FDIStatusName	}}
            el-table-column(prop='TigerStatusName', label='老虎城狀態', width='100', align='center')
              template(slot-scope='scope')
                el-tag(v-if="scope.row.WebStatus == '1'", type="success", disable-transitions='') {{scope.row.TigerStatusName}}
                el-tag(v-else, type="danger", disable-transitions='') {{scope.row.TigerStatusName	}}
            el-table-column(label='操作', width='80', align='center')
              template(slot-scope='scope')
                a.links(@click='get_channel(scope.row)', type='text') 設定
      el-dialog(title='設定', :visible.sync='updateDialog', @close="update_id = ''" )
        el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
          el-form-item(label='渠道名稱', prop="source", label-width="100px" ,label-position='left')
            span {{form.channel_name}}
          el-form-item(label='商戶編號', prop="merchant_id", label-width="100px" ,label-position='left')
            span {{form.merchant_id}}
          el-form-item(label='老虎城狀態', prop="web_status", label-width="100px" ,label-position='left')
              el-switch(v-model='form.web_status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
          el-form-item(label='啟用裝置', prop="device", label-width="100px" ,label-position='left')
            el-radio-group(v-model='form.device')
              el-radio(:label="'0'") 全部
              el-radio(:label="'1'") Pc
              el-radio(:label="'2'") Mobile
          el-form-item(label='前台提示資訊', prop="message", label-width="100px" ,label-position='left')
            el-input(v-model='form.message', type='textarea')
        .dialog-footer(slot='footer')
          el-button(@click='updateDialog = false') 取 消
          el-button(type='primary', @click='update_channel()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgPayChannel",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      search_channel_type: "1",
      updateDialog: false,
      lock_btn: false,
      update_id: "",
      form: {
        channel_name: "",
        merchant_id: "",
        web_status: "",
        device: ""
      },
      rules: {
        web_status: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇老虎城狀態",
            trigger: "change"
          }
        ],
        device: [
          {
            type: "enum",
            enum: ["0", "1", "2"],
            required: true,
            message: "請選擇啟用裝置",
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
        url: process.env.VUE_APP_APIHOST + "Payment/QueryPayChannel",
        data: {
          Type: self.search_channel_type
        }
      })
        .then(function(response) {
          self.tableData = response.data.data;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_channel(row) {
      let self = this;
      self.update_id = row.PayChannelId;
      self.form.merchant_id = row.MerchantId;
      self.form.channel_name = row.ChannelName;
      self.form.web_status = row.WebStatus;
      self.form.device = row.Device;
      self.form.message = row.Message;
      self.updateDialog = true;
    },
    update_channel() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Payment/PayChannelManage/Edit",
            data: {
              PayChannelId: self.update_id,
              WebStatus: self.form.web_status,
              Device: self.form.device,
              Message: self.form.message
            }
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
    },
    refresh_channel() {
      let self = this;
      let url = "";
      if (this.search_channel_type == 1) {
        url =
          process.env.VUE_APP_APIHOST + "crontab/UpdateMerchantSetting_Bank";
      } else {
        url =
          process.env.VUE_APP_APIHOST +
          "crontab/UpdateMerchantSetting_Thirdpay";
      }
      axios({
        method: "post",
        url: url,
        data: {}
      }).finally(function() {
        self.get_data();
      });
    }
  }
};
</script>	