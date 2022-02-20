<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 電話驗證設定
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-10.col-12
        .row.no-gutters
          .col-md-12.col-12.pr-1
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='VertifyType_str', label='驗證類型')
            el-table-column(prop='VertifyName', label='驗證廠商名稱')
            el-table-column(prop='Status', label='狀態')
              template(slot-scope='scope')
                el-tag(v-if='scope.row.Status == "1"' type="success", disable-transitions='') 開
                el-tag(v-else type="danger", disable-transitions='') 關
            el-table-column(prop='EditUserName', label='設定者')
            el-table-column(prop='Update_At', label='設定時間')
            el-table-column(label='操作', width='80')
              template(slot-scope='scope')
                a.links(@click='get_setting(scope.row)', type='text') 設定
      el-dialog(title='設定', :visible.sync='updateDialog', @close="update_id = ''" , width='30%')
        el-form.mr-3(:model="form", :rules="rules", ref="form", status-icon)
          el-form-item(label='驗證類型', label-width="100px" ,label-position='left')
            span {{form.vertify_type}}
          el-form-item(label='驗證廠商', label-width="100px" ,label-position='left')
            span {{form.vertify_name}}
          el-form-item(label='狀態', prop="status", label-width="100px" ,label-position='left')
            el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
        .dialog-footer(slot='footer')
          el-button(@click='updateDialog = false') 取 消
          el-button(type='primary', @click='update_setting()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgVertifyCtrl",
  mounted() {
    this.get_data();
  },
  data() {
    return {
      tableData: [],
      updateDialog: false,
      lock_btn: false,
      update_id: "",
      form: {
        vertify_type: "",
        vertify_name: "",
        status: "1"
      },
      rules: {
        status: [
          {
            type: "enum",
            enum: ["0", "1"],
            required: true,
            message: "請選擇狀態",
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
        url: process.env.VUE_APP_APIHOST + "Admin/VertifyCtrl",
        data: {}
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["VertifyType_str"] = "";
            switch (item["VertifyType"]) {
              case "1":
                item["VertifyType_str"] = "簡訊";
                break;
              case "2":
                item["VertifyType_str"] = "語音";
                break;
            }
          });
          self.tableData = response.data.data;
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
      self.form.vertify_type = row.VertifyType_str;
      self.form.vertify_name = row.VertifyName;
      self.form.status = row.Status;
      self.updateDialog = true;
    },
    update_setting() {
      let self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          var data = new FormData();
          data.append("Sn", self.update_id);
          data.append("Status", self.form.status);
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/VertifyCtrlManage/Edit",
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