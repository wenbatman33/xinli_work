<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 申請清單
    // === main ===
    .row.no-gutters.px-3
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      // table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%')
            el-table-column(prop='Update_At', label='更新時間') 
            //- el-table-column(prop='Date', label='日期', width='120' )
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='RealName', label='聯繫人')
            el-table-column(prop='Phone', label='聯繫電話')
            el-table-column(prop='QQAccount', label='QQ') 
            el-table-column(prop='Content', label='推廣方式描述 ') 
            el-table-column(prop='Status', label='狀態') 
              template(slot-scope='scope') {{applyStatus[scope.row.Status]}}
            el-table-column(prop='Note', label='備註') 
            el-table-column(prop='EditUserId', label='操作人') 
            el-table-column( label='操作')
              template(slot-scope='scope')
                a.links(@click="dialog.note = true;form.note = dataList[scope.$index];") 備註
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      //-- dialog.agencyAdd --
      //-- form.agency --
      el-dialog(title='備註', :visible.sync='dialog.note')
        el-form.mr-3(:model="form.note", :rules="rules.note", ref="form.agency", status-icon,label-suffix="：")
          el-form-item(label="狀態" , prop="Notes" , label-width="150px" )
            el-select(v-model='form.note.Status', size='medium', placeholder='選擇類型')
              el-option(v-for='(value, key)  in applyStatus', :key='key', :label='value', :value='key')
          el-form-item(label="備註" , prop="Note" , label-width="150px" )
            el-input(v-model="form.note.Note" , placeholder='輸入備註' ,type="textarea")
        .dialog-footer(slot='footer')
          el-button(@click='dialog.note = false') 取 消
          el-button(type='primary', @click='submitApplyUpdateNote()', :loading='isLoading') 確 認
</template>
<script>
let Today = new Date();
let year = Today.getFullYear();
let month = Today.getMonth() + 1;
month = ("0" + month).slice(-2);
let StartOfMonth = year + "-" + month + "-01";
let TodayStr = year + "-" + month + "-" + ("0" + Today.getDate()).slice(-2);

export default {
  name: "tgAgencyApply",
  data() {
    return {
      isLoading: false,
      dataList: [],
      applyStatus: { 0: "新增", 1: "已聯繫", 2: "放棄" },
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {},
        note: {}
      },
      rules: {},
      dialog: {
        note: false
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
      formData.append("Page", self.pages.now);
      formData.append("PageLimit", self.pages.size);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetApplyAgencyList/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.pages.total = parseInt(response.data.data.total_rows);
            self.dataList = response.data.data.data_list;
          }
          self.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    setSummaries(param) {
      let self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        sums[index] =
          self.SummariesKeys.indexOf(column.property) >= 0
            ? self.Summaries[column.property]
            : "";
      });
      return sums;
    },

    submitApplyUpdateNote() {
      let self = this;
      this.isLoading = true;
      let updateField = ["Sn", "Note", "Status"];
      let formData = new FormData();
      for (var key in this.form.note) {
        if (self.form.note[key] !== null && updateField.indexOf(key) >= 0) {
          formData.append(key, self.form.note[key]);
        }
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/ApplyAgencyManage/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status) {
            self.$message({
              message: "更新成功",
              type: "success"
            });
          } else {
            self.$message.error("更新失敗： " + response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.dialog.note = false;
          self.isLoading = false;
          self.getData();
        });
    }
  }
};
</script>
