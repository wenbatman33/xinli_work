<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 遊戲日報
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-1.col-12.px-1.py-1
        el-select(size='medium', v-model='search_game_group', placeholder='選擇遊戲平台')
          el-option(v-for='item in game_group_option', :key='item.GroupId', :label='item.GroupName', :value='item.GroupId')
      .col-md-2.col-12.px-1.py-1
        el-select(size='medium', v-model='search_sort_field', placeholder='選擇排序欄位')
          el-option(label='唯一投注人數', value=1)
          el-option(label='投注次數', value=2)
          el-option(label='總流水', value=3)
          el-option(label='殺數', value=4)
          el-option(label='盈利', value=5)
      .col-md-1.col-12.px-1.py-1
        el-select(size='medium', v-model='search_sort', placeholder='選擇排序方式')
          el-option(label='正序', value=1)
          el-option(label='倒序', value=0)
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium", type='primary', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', show-summary='', :summary-method="getSummaries", stripe='', border='', style='width:100%')
            el-table-column(type="index", label='#', width='60', align='center')
            el-table-column(prop='GameName', label='遊戲名稱', align='right')
            el-table-column(prop='TotalBetPeople', label='唯一	投注人數', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBetPeople | commaFormat}}
            el-table-column(prop='TotalBetCount', label='投注次	數', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBetCount | commaFormat}}
            el-table-column(prop='TotalBetAmount', label='總流	水', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBetAmount | commaFormat}}
            el-table-column(prop='KillAvg', label='殺數', align='right')
            el-table-column(prop='TotalBalanceAmount', label='盈利', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalBalanceAmount | commaFormat}}
            el-table-column(label='操作', width='60', align='center')
              template(slot-scope='scope')
                router-link.links(:to='{name:"tgWinner", query:{"Date_S":search_time_range[0], "Date_E":search_time_range[1], "GameGroupId":search_game_group, "GameName":scope.row.GameName}}') 查看
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgGame",
  mounted() {
    let self = this;
    axios
      .post(process.env.VUE_APP_APIHOST + "Web_Page/GameGroup/")
      .then(function(response) {
        response.data.data = response.data.data.filter(function(
          item,
          index,
          array
        ) {
          return item.GroupId != 4;
        });
        self.game_group_option = response.data.data;
      })
      .catch(function(error) {
        self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
      })
      .finally(function() {
        self.get_data();
      });
  },
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d;
    let date_e = y + "-" + m + "-" + d;
    return {
      tableData: [],
      game_group_option: [],
      search_time_range: [date_s, date_e],
      search_game_group: "1",
      search_sort_field: "5",
      search_sort: "1",
      now_page: 1,
      page_size: 100,
      total_page: 1,
      lock_btn: false,
      total: ""
    };
  },
  methods: {
    get_data(now_page) {
      let self = this;
      if (!self.search_game_group) {
        self.$message.error("請選擇遊戲平台");
        return;
      }
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

        self.search_time_range = [date_s, date_e];
      }
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        GameGroupId: self.search_game_group,
        OrderBy: self.search_sort_field,
        OrderByDesc: self.search_sort,
        Page: now_page,
        PageLimit: self.page_size
      };
      this.lock_btn = true;
      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetGameBetReport/", payload)
        .then(function(response) {
          if (response.data.status === 1) {
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = response.data.data.data_list;
            self.total = response.data.data.Total[0];
          } else {
            self.$message.error(response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    getSummaries(param) {
      let self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        sums[index] = self.total[column.property];
        if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
          sums[index] = sums[index]
            .toString()
            .replace(
              /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
              (all, pre, groupOf3Digital) =>
                pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
            );
        }
      });
      return sums;
    }
  }
};
</script>

