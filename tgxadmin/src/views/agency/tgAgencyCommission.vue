<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理佣金報表
    .row.no-gutters.px-3.py-3.d-flex
      el-button( @click='dialog.transferVertify = true,getTransferData()', size="medium", type='primary') 審核佣金
    // === search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" , status-icon,label-suffix="：" ,:inline="true",@change="getData()")
        el-form-item(label = '月份')
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月", value-format="yyyy-MM", v-model='form.search.Ym', type='month',placeholder='選擇月份',@change="getData()")
        el-form-item(label = '代理帳號')
          el-input(size='medium', v-model='form.search.AgencyId', clearable='', placeholder='代理帳號')
        el-form-item(label = '代理類型')
          el-select(v-model='form.search.AgencyType', size='medium', placeholder='選擇類型')
            el-option(label='全部', value="" ,key="")
             el-option(v-for='(value, key)  in agencyType', :key='key', :label='value', :value='key')
        br
        el-form-item(label = '狀態')
          el-select(v-model='form.search.Status', size='medium', placeholder='選擇狀態')
            el-option(label='全部', value="" ,key="")
            el-option(v-for='(value, key)  in commissionStatus', :key='key', :label='value', :value='key')
        el-form-item(label = '排序')
          el-select(v-model='form.search.Sort', size='medium', placeholder='選擇類型')
            el-option(v-for='(value, key)  in sortOption', :key='key', :label='value', :value='key')
        el-form-item
          el-radio-group(v-model="form.search.SortBy", size="medium",@change="getData()")
            el-radio-button(:label="0") 正序
            el-radio-button(:label="1") 倒序
        // button
        el-form-item
            el-button.button-wstyle(size="medium", type='primary', @click='isLoading = true,getData(1)', :loading='isLoading') 搜 尋
    // === main ===
    .row.no-gutters.px-3
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      // table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%',:summary-method="setSummaries",    show-summary)
            el-table-column(prop='Date', label='日期', width='120' )
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='ActiveNum', label='活躍人數')
            el-table-column(prop='BettingAmount', label='總流水',width="110px")
            el-table-column(prop='BalanceAmount', label='公司輸贏',width="110px") 
            el-table-column(prop='BonusAmount', label='總紅利',width="110px") 
            el-table-column(prop='PlatformFee', label='平台費',width="110px") 
            el-table-column(prop='Fee', label='存提手續費',width="110px") 
            el-table-column(prop='NetEarnings', label='公司淨盈利',width="110px") 
            el-table-column(prop='Level', label='佣金等級')
            el-table-column(prop='TotalBalance', label='輸贏結餘')
            el-table-column(prop='BelowAmount', label='二級代理佣金')
            el-table-column(prop='Commission', label='本月佣金')
            el-table-column(prop='Status', label='狀態')
              template(slot-scope='scope') {{commissionStatus[scope.row.Status]}}
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      //-=== dialog ==
      el-dialog(title='審核佣金列表', :visible.sync='dialog.transferVertify',width="70%")
        .row.no-gutters.px-3.py-3.d-flex
          el-button(v-if="$store.state.member.user_page_auth.Add_Auth==1" @click='SubmitTransfer(2)', size="medium", type='primary',:loading='isLoading') 全部通過
          el-button(v-if="$store.state.member.user_page_auth.Add_Auth==1" @click='SubmitTransfer(1)', size="medium", type='primary',:loading='isLoading') 審核確認
          el-button(v-if="$store.state.member.user_page_auth.Add_Auth==1" @click='SubmitTransfer(3)', size="medium", type='primary',:loading='isLoading') 派發佣金
        .row.no-gutters.px-3.py-3.d-flex
          el-form(ref="form.transferSearch" :model="form.transferSearch" , status-icon,label-suffix="：" ,:inline="true")
            el-form-item(label = '代理帳號')
              el-input(size='medium', v-model='form.transferSearch.AgencyId', clearable='', placeholder='代理帳號')
            el-form-item(label = '狀態')
              el-select(v-model='form.transferSearch.Status', size='medium', placeholder='選擇狀態')
                  el-option(label='全部', value="" ,key="")
                  el-option(v-for='(value, key)  in commissionStatus', :key='key', :label='value', :value='key')
            el-form-item
              el-button.button-wstyle(size="medium", type='primary', @click='isLoading = true,getTransferData()', :loading='isLoading') 搜 尋
        .row.no-gutters.px-3.py-3.d-flex
          span 審核中:{{dialog.transferVertifyContent[1]}}人  通過:{{dialog.transferVertifyContent[3]}}人  拒絕:{{dialog.transferVertifyContent[4]}}人
        .row.no-gutters.px-3.py-3.d-flex
        template
          el-table(:data='dataTransferList', stripe='', border='', style='width:100%')
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='NetEarnings', label='公司淨盈利') 
            el-table-column(prop='TotalBalance', label='輸贏結餘')
            el-table-column(prop='AgencyCash', label='二級代理佣金')
            el-table-column(prop='BelowAmount', label='本月佣金')
            el-table-column(prop='Status', label='狀態')
              template(slot-scope='scope') {{commissionStatus[scope.row.Status]}}
            el-table-column(label='操作', width='260')
              template(slot-scope='scope')
                span(v-if="scope.row.Status==3") 已派發
                a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1 && (scope.row.Status==1 || scope.row.Status==4)",@click="SubmitTransfer(2,scope.row.AgencyId)") 通過
                a.links(v-if="$store.state.member.user_page_auth.Add_Auth==1 && (scope.row.Status==1 || scope.row.Status==2)",@click="SubmitTransfer(4,scope.row.AgencyId)") 拒絕
        .dialog-footer(slot='footer')
          el-button(@click='dialog.transferVertify = false,isLoading=false') 關 閉
</template>
<script>
let Today = new Date();
let year = Today.getFullYear();
let month = Today.getMonth() + 1;

export default {
  name: "tgAgencyCommission",
  data() {
    return {
      isLoading: false,
      dataList: [],
      dataTransferList: [],
      Summaries: [],
      SummariesKeys: [],
      commissionStatus: [],
      sortOption: {
        Commission: "本月佣金",
        ActiveNum: "活躍人數",
        BalanceAmount: "公司輸贏",
        BettingAmount: "流水",
        NetEarnings: "淨盈利",
        Level: "佣金等級"
      },
      agencyType: { 1: "佣金", 2: "電銷" },
      //   agencyTypeLabel: [],
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {
          AgencyType: "",
          AgencyId: "",
          Status: "",
          Sort: "Commission",
          SortBy: 1,
          Ym: year + "-" + month
        },
        transferSearch: {
          Status: "",
          AgencyId: ""
        }
      },
      rules: {},
      dialog: {
        transferVertifyContent: {},
        transferVertify: false
      }
    };
  },
  mounted() {
    let self = this;
    // this.statusOption.forEach(function(element) {
    //   self.statusLabel[element.value] = element.label;
    // });
    this.getData(1);
  },
  methods: {
    getData(now_page) {
      let self = this;
      if (now_page) self.pages.now = now_page;
      let formData = new FormData();
      formData.append("Page", self.pages.now);
      formData.append("PageLimit", self.pages.size);
      if (self.form.search.AgencyId != "")
        formData.append("AgencyId", self.form.search.AgencyId);

      if (self.form.search.AgencyType != "")
        formData.append("AgencyType", self.form.search.AgencyType);
      if (self.form.search.Status != "")
        formData.append("Status", self.form.search.Status);
      formData.append("Ym", self.form.search.Ym);
      let sortBy = "desc";
      if (self.form.search.SortBy == "0") {
        sortBy = "asc";
      }
      formData.append("SortBy", sortBy);
      formData.append("Sort", self.form.search.Sort);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyCommissionReport/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.pages.total = parseInt(response.data.data.total_rows);
            self.dataList = response.data.data.data_list;
            self.Summaries = response.data.data.total_data;
            if (typeof self.Summaries === "object" && self.Summaries !== null) {
              self.SummariesKeys = Object.keys(self.Summaries);
            }

            if (response.data.other && self.commissionStatus.length == 0) {
              self.commissionStatus = response.data.other;
            }
          }
          self.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTransferData() {
      let self = this;
      let formData = new FormData();

      if (self.form.transferSearch.Status != "")
        formData.append("Status", self.form.transferSearch.Status);
      if (self.form.transferSearch.AgencyId != "")
        formData.append("AgencyId", self.form.transferSearch.AgencyId);
      formData.append("Ym", self.form.search.Ym);

      return axios({
        method: "post",
        url:
          process.env.VUE_APP_APIHOST + "Agency_WalletAll/GetTransferVertify",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.dataTransferList = response.data.data.data_list;

            self.dialog.transferVertifyContent = { 1: 0, 2: 0, 3: 0, 4: 0 };
            self.dataTransferList.forEach(function(element) {
              self.dialog.transferVertifyContent[element.Status]++;
            });
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
    SubmitTransfer(status, AgencyId) {
      let self = this;
      this.isLoading = true;
      let statusStr = "";
      let statusStr2 = "";
      let updateList = [];

      statusStr = self.commissionStatus[status];

      if (AgencyId) {
        statusStr2 = "此資料";
        updateList.push({ AgencyId: AgencyId });
      } else {
        updateList = self.dataTransferList;
        statusStr2 = "全部資料";
      }

      this.$confirm(
        "將修改" + statusStr2 + "狀態為" + statusStr,
        "變更狀態為" + statusStr,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          axios
            .all(
              updateList.map(item =>
                self.updateTransfer(item.AgencyId, status, self.form.search.Ym)
              )
            )
            .then(
              axios.spread((...res) => {
                self.$message({
                  message: "更新完成",
                  type: "success"
                });
              })
            )
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.getData();
              self.getTransferData();
              self.isLoading = false;
            });
        })
        .catch(() => {
          self.isLoading = false;
        });
    },
    updateTransfer(AgencyId, status, ym) {
      let formData = new FormData();
      formData.append("AgencyId", AgencyId);
      formData.append("Ym", ym);
      formData.append("VertifyStatus", status);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_WalletAll/TransferVertify",
        data: formData
      })
        .then(function(response) {
          if (response.data.status) {
            return true;
          } else {
            return false;
          }
        })
        .catch(function(error) {
          return false;
        });
    }
  }
};
</script>
