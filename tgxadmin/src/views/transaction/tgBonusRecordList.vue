<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 優惠紀錄
    .row.no-gutters.px-3.py-3
      .col-md-6.col-12.py-1
        el-input(size='medium', placeholder='輸入使用者名稱', v-model='search_userName', @keyup.enter.native="get_data(1)")
          el-button(slot='append', icon='el-icon-search', @click="get_data(1)", :loading='lock_btn')
      .col-md-1.col-12.py-1.d-flex.justify-content-center
        el-button(size='medium', type="text", v-on:click='toggletosee = !toggletosee, formInit()', transition="fade") 進階搜尋
          i.el-icon-arrow-down.el-icon--right
    //--advance search
    .row.no-gutters.px-3.pb-3.advsearch-style(v-show='toggletosee')
      .col
        .row.px-3.py-3
          .col-12.pb-3 搜尋滿足以下條件的項目：
          .col-12
            el-form(v-show='toggletosee', label-width='80px', label-position='left')
              .row
                .col-md-6.col-12
                  el-form-item(label='優惠類型')
                    el-select(size="medium", v-model='search_type', filterable='', placeholder='選擇優惠類型')
                      el-option(v-for='item in sourceoption', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='優惠狀態')
                    el-select(size="medium", v-model='search_status', filterable='', placeholder='選擇優惠狀態')
                      el-option(v-for='item in statusoption', :key='item.value', :label='item.label', :value='item.value')
                .col-md-6.col-12
                  el-form-item(label='優惠起始')
                    el-date-picker(size="medium", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='至', start-placeholder='開始日期', end-placeholder='結束日期')
                .col-md-6.col-12.d-flex.justify-content-end
                  el-form-item
                    el-button(size="medium", v-on:click='toggletosee = !toggletosee, formInit()') 取消
                    el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%', show-summary='', :summary-method="getSummaries")
            el-table-column(label='會員帳號', width='150')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='OfferName', label='活動名稱')
            el-table-column(prop='CalcDate', label='計算日期', width='100', align='right')
            el-table-column(prop='CalcCash', label='計算金額', width='100', align='right')
            el-table-column(prop='ModifyCash', label='優惠金額', width='100', align='right')
            el-table-column(prop='', label='優惠比例', width='80', align='right')
              template(slot-scope='scope')
                span {{scope.row.OfferRate}}%
            el-table-column(prop='status', label='狀態', width='120', align='center')
              template(slot-scope='scope')
                el-tag(:type="scope.row.color", disable-transitions='') {{scope.row.StateCode_str}}
            el-table-column(prop='Notes', label='備註', align='right', show-overflow-tooltip)
            el-table-column(prop='DeliveryDate', label='派送日期', width='170', align='center')
            el-table-column(prop='Notes2', label='最後狀態備註', width='170', align='center')
            el-table-column(prop='Update_At', label='最後更新時間', width='170', align='center')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')


</template>
<script>
export default {
  name: "tgBonusRecordList",
  mounted() {
    this.formInit();
    this.get_data(1);
  },
  data() {
    return {
      now_page: 1,
      page_size: 100,
      total_page: 0,
      tableData: [],
      sourceoption: [
        { value: "return", label: "反水" },
        { value: "rescue", label: "救援金" },
        { value: "bonus", label: "首存,再存,紅利" }
      ],
      statusoption: [
        { value: "", label: "不限" },
        { value: 1, label: "待審核" },
        { value: 2, label: "未申請" },
        { value: 3, label: "待派發" },
        { value: 4, label: "已拒絕" },
        { value: 5, label: "已派送" },
        { value: 6, label: "已逾期" }
      ],
      statusvalue: "status0",
      toggletosee: true,
      search_time_range: [],
      search_userName: this.$route.query.user_name
        ? this.$route.query.user_name
        : "",
      search_status: "",
      search_type: "return",
      lock_btn: false
    };
  },
  methods: {
    formInit() {
      this.search_status = "";
      this.search_type = "return";

      let today = new Date();
      let date_s = new Date(today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString()
        .replace(/\//g, "-");
      date_s =
        date_s.split("-")[0] +
        "-" +
        (date_s.split("-")[1] < 10
          ? "0" + date_s.split("-")[1]
          : date_s.split("-")[1]) +
        "-" +
        (date_s.split("-")[2] < 10
          ? "0" + date_s.split("-")[2]
          : date_s.split("-")[2]);
      let date_e = today.toLocaleDateString().replace(/\//g, "-");
      date_e =
        date_e.split("-")[0] +
        "-" +
        (date_e.split("-")[1] < 10
          ? "0" + date_e.split("-")[1]
          : date_e.split("-")[1]) +
        "-" +
        (date_e.split("-")[2] < 10
          ? "0" + date_e.split("-")[2]
          : date_e.split("-")[2]);
      this.search_time_range = [date_s, date_e];
    },
    get_data(now_page) {
      this.lock_btn = true;
      let self = this;
      let payload = {
        UserName: self.search_userName,
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        Type: self.search_type,
        Page: now_page,
        PageLimit: self.page_size
      };
      if (this.search_status !== "") {
        payload["Status"] = this.search_status;
      }

      axios
        .post(
          process.env.VUE_APP_APIHOST + "WalletAll/GetOfferLogList",
          payload
        )
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            switch (item["Status"]) {
              case "1":
                item["color"] = "success";
                item["StateCode_str"] = "待審核";
                break;
              case "2":
                item["color"] = "info";
                item["StateCode_str"] = "未申請";
                break;
              case "3":
                item["color"] = "Blue";
                item["StateCode_str"] = "待派發";
                break;
              case "4":
                item["color"] = "danger";
                item["StateCode_str"] = "已拒絕";
                break;
              case "5":
                item["color"] = "warning";
                item["StateCode_str"] = "已派送";
                break;
              case "6":
                item["color"] = "info";
                item["StateCode_str"] = "已逾期";
                break;
            }
            if (item["GameGroupId"] > 0) {
              item["OfferName"] =
                response.data.other.GameGroupIdName[item["GameGroupId"]] +
                " - " +
                item["OfferName"];
            }
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (index === 3 || index === 4) {
              return (parseFloat(prev) + parseFloat(curr)).toFixed(2);
            }
          }, 0);
          if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
            sums[index] = sums[index]
              .toString()
              .replace(
                /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
                (all, pre, groupOf3Digital) =>
                  pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
              );
          }
        }
      });
      return sums;
    }
  }
};
</script>
