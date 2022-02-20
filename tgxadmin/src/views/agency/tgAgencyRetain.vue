<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理留存報表
    // === search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" :inline="true",label-suffix="：")
        // radio-button
        el-form-item(label = '類型')
         el-select(v-model='form.search.AgencyType', size='medium', placeholder='選擇類型')
            el-option(label='全部', value="" ,key="")
            el-option(v-for='item in agencyTypeOption', :key='item.value', :label='item.label', :value='item.value')
        //-input
        el-form-item(label = '代理帳號')
          el-input(size='medium', v-model='form.search.AgencyId', clearable='', placeholder='代理帳號')
        // date-picker
        el-form-item(label = '期間')
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='form.search.Time', type='date', placeholder='選擇日期',@change="getData()")
        el-form-item
          el-radio-group(v-model="form.search.RetainType", size="medium",@change="getData()")
            el-radio-button(:label="1") 留存率
            el-radio-button(:label="2") 留存數
        // button
        el-form-item
            el-button.button-wstyle(size="medium", type='primary', @click='submitSearchForm()', :loading='isLoading') 搜 尋
    // === main ===
    .row.no-gutters.px-3
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      // table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%')
            el-table-column(prop='Date', label='日期', width='120' )
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='RegisterNum', label='註冊人數')
            el-table-column(prop='NextLogin', label='1日留存')
            el-table-column(prop='SecondLogin', label='2日留存')
            el-table-column(prop='ThirdLogin', label='3日留存')
            el-table-column(prop='FourthLogin', label='4日留存')
            el-table-column(prop='FifthLogin', label='5日留存')
            el-table-column(prop='SixthLogin', label='6日留存')
            el-table-column(prop='SeventhLogin', label='7日留存')
            el-table-column(prop='FourteenthLogin', label='14日留存')
            el-table-column(prop='ThirtiethLogin', label='30日留存')
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
</template>
<script>
let Today = new Date();
let month = Today.getMonth() + 1;
month = ("0" + month).slice(-2);
let TodayStr =
  Today.getFullYear() + "-" + month + "-" + ("0" + Today.getDate()).slice(-2);
export default {
  name: "tgAgencyRetain",
  data() {
    return {
      isLoading: false,
      dataList: [],
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {
          AgencyId: "",
          RetainType: "1",
          AgencyType: "",
          Time: TodayStr
        }
      },
      agencyTypeOption: [
        { value: "1", label: "佣金" },
        { value: "2", label: "電銷" }
      ],
      rules: {},
      dialog: {}
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
      formData.append("RetainType", self.form.search.RetainType);
      console.log(self.form.search.AgencyType);
      if (self.form.search.AgencyType != "")
        formData.append("AgencyType", self.form.search.AgencyType);
      formData.append("Date_S", self.form.search.Time);
      formData.append("Date_E", self.form.search.Time);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyRetainReport/",
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
    submitSearchForm() {
      this.isLoading = true;
      this.getData(1);
    }
  }
};
</script>
