<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 風險清單
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size='medium', v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
      .col-md-2.col-12.px-1.py-1
        el-select(size='medium', v-model='search_source', placeholder='選擇來源')
          el-option(label='IP', value='1')
          el-option(label='指紋', value='2')
      .col-md-2.col-12.px-1.py-1
        el-select(size='medium', v-model='search_status', placeholder='選擇來源狀態', clearable)
          el-option(label='啟用', value='1')
          el-option(label='凍結', value='0')
      .col-md-1.col-12.px-1.py-1
        el-button(size='medium', type='primary', @click="get_data(1)") 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='LoginType_str', label='來源', width='80', align='center')
            el-table-column(prop='LoginData', label='內容')
            el-table-column(label='來源狀態', width='80', align='center')
              template(slot-scope='scope')
                  el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.TypeStatus_str}}
            el-table-column(prop='LoginCount', label='帳號重複登入數', width='140', align='center')
            el-table-column(prop='Note', label='備註', show-overflow-tooltip='', width='240')
            el-table-column(prop='Update_At', label='操作時間', width='170')
            el-table-column(prop='EditUserName', label='操作人', width='100', align='center')
            el-table-column(label='操作', width='100')
              template(slot-scope='scope')
                a.links(v-if="scope.row.Sn && $store.state.member.user_page_auth.Add_Auth==1", @click='get_risk(scope.row.Sn)', type='text') 設定
                a.links(v-else-if="$store.state.member.user_page_auth.Add_Auth==1", @click='form.source= scope.row.LoginType; form.content= scope.row.LoginData; addDialog=true', type='text') 設定
                router-link.links(:to="{name:'tgMemberLogin', query:{type:scope.row.LoginType, content:scope.row.LoginData}}") 查看
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    //--popup
    el-dialog(title='設定', :visible.sync='addDialog', @close="init_dialog('add_form')" )
      el-form.mr-3(:model="form", :rules="rules", ref="add_form", status-icon)
        el-form-item(label='來源', prop="source", label-width="88px" ,label-position='left')
          el-input(v-model='form.source', :disabled='true')
        el-form-item(label='內容', prop="content", label-width="88px" ,label-position='left')
          el-input(v-model='form.content', :disabled='true')
        el-form-item(label='備註', prop="remark", label-width="88px" ,label-position='left')
          el-input(v-model='form.remark', type='textarea')
        el-form-item(label='來源狀態', prop="status", label-width="88px" ,label-position='left')
            el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='addDialog = false') 取 消
        el-button(type='primary', @click='add_risk()', :loading='lock_btn') 確 認
    el-dialog(title='設定', :visible.sync='updateDialog', @close="init_dialog('update_form')" )
      el-form.mr-3(:model="form", :rules="rules", ref="update_form", status-icon)
        el-form-item(label='來源', prop="source", label-width="88px" ,label-position='left')
          el-input(v-model='form.source', :disabled='true')
        el-form-item(label='內容', prop="content", label-width="88px" ,label-position='left')
          el-input(v-model='form.content', :disabled='true')
        el-form-item(label='備註', prop="remark", label-width="88px" ,label-position='left')
          el-input(v-model='form.remark', type='textarea')
        el-form-item(label='來源狀態', prop="status", label-width="88px" ,label-position='left')
            el-switch(v-model='form.status', active-color='#13ce66', inactive-color='#ff4949', active-value='1' , inactive-value='0')
      .dialog-footer(slot='footer')
        el-button(@click='updateDialog = false') 取 消
        el-button(type='primary', @click='update_risk()', :loading='lock_btn') 確 認
</template>
<script>
export default {
  name: "tgRiskList",
  mounted() {
    this.get_data(1);
  },
  data() {
    return {
      tableData: [],
      search_time_range: null,
      search_source: "1",
      search_status: "",
      page_size: 100,
      now_page: 1,
      total_page: 0,
      addDialog: false,
      updateDialog: false,
      lock_btn: false,
      update_id: "",
      form: {
        source: "",
        content: "",
        remark: "",
        status: "0"
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
  computed: {},
  methods: {
    get_data(now_page) {
      let self = this;
      self.lock_btn = true;
      if (self.search_time_range == null) {
        let today = new Date();
        let last;
        let y = today.getFullYear();
        let m = today.getMonth() + 1;
        let d = today.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        let date_s = y + "-" + m + "-" + d;
        let date_e = y + "-" + m + "-" + d;

        last = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        y = last.getFullYear();
        m = last.getMonth() + 1;
        d = last.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        date_s = y + "-" + m + "-" + d;

        self.search_time_range = [date_s + " 00:00:00", date_e + " 23	:59:59"];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/RiskList",
        data: {
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          LoginType: self.search_source,
          TypeStatus: self.search_status,
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["TypeStatus_str"] = "";
            if (item["TypeStatus"] == 1) {
              item["TypeStatus_str"] = "啟用";
              item["color"] = "success";
            } else {
              item["TypeStatus_str"] = "凍結";
              item["color"] = "danger";
            }
            item["LoginType_str"] = "";
            if (item["LoginType"] == 1) {
              item["LoginType_str"] = "IP";
            } else {
              item["LoginType_str"] = "指紋";
            }
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    init_dialog(form) {
      this.$refs[form].resetFields();
      this.lock_btn = false;
      this.update_id = "";
      this.form.source = "";
      this.form.content = "";
      this.form.remark = "";
      this.form.status = "0";
    },
    get_risk(risk_id) {
      let self = this;
      self.update_id = risk_id;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/RiskList",
        data: {
          Sn: risk_id,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          LoginType: self.search_source
        }
      })
        .then(function(response) {
          if (response.data.data.data_list[0].LoginType == 1) {
            self.form.source = "IP";
          } else {
            self.form.source = "指紋";
          }
          self.form.content = response.data.data.data_list[0].LoginData;
          self.form.remark = response.data.data.data_list[0].Note;
          self.form.status = response.data.data.data_list[0].TypeStatus;
          self.updateDialog = true;
          // console.log(response.data.data[0]);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    add_risk() {
      let self = this;
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Member_All/RiskManage/Add",
            data: {
              LoginType: self.form.source,
              LoginData: self.form.content,
              Note: self.form.remark,
              TypeStatus: self.form.status
            }
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
              self.addDialog = false;
            });
        }
      });
    },
    update_risk() {
      let self = this;
      this.$refs["update_form"].validate(valid => {
        if (valid) {
          self.lock_btn = true;
          axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Member_All/RiskManage/Edit",
            data: {
              Sn: self.update_id,
              Note: self.form.remark,
              TypeStatus: self.form.status
            }
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
