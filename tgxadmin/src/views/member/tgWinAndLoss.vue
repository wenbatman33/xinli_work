<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5(style="display: inline-block;") 輸贏紀錄
        el-tooltip(class="item" effect="light" content="未使用遊戲名稱搜尋時，點擊表單中日期欄位，可顯示該日期的所有遊戲輸贏紀錄" placement="right")
          i(class="el-icon-info")
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-2.col-12.px-1.py-1
        el-input(size='medium', placeholder='輸入會員帳號', v-model='search_user_name')
      .col-md-2.col-12.px-1.py-1
        el-select(size="medium", v-model='search_game_group_id', filterable='', placeholder='選擇遊戲平台')
          el-option(v-for='(item, key) in gameGroup' :label='item.GroupName', :value='item.GroupId', :key='key')
      .col-md-2.col-12.px-1.py-1
        el-input(size='medium', placeholder='輸入遊戲名稱', v-model='search_game', clearable)
      .col-md-1.col-12.px-1.py-1
          el-button(@click='get_data(1)', size="medium", type='primary', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
    .col-12.py-3.d-flex.justify-content-end  
      el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    .col-12 
      template
        el-table(:data='tableData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%')
          el-table-column(prop='Date', label='日期', width='120')
            template(slot-scope='scope')
              el-button(v-if="search_game == '' ", style="font-weight: 500; text-decoration: none;",  type='text', @click="get_bet_log(scope.row.Date)") {{scope.row.Date}}
              span(v-else) {{scope.row.Date}}
          el-table-column(label='會員帳號')
            template(slot-scope='scope')
              router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
          el-table-column(prop='TagName', label='會員分組', align='center')
          el-table-column(prop='BetCount', label='投注次數', sortable='', align='right')
          el-table-column(prop='BetAmount', label='總流水', sortable='', align='right')
          el-table-column(prop='KillNumber', label='殺數', sortable='', align='right')
          el-table-column(prop='BalanceAmount', label='會員輸贏', sortable='', align='right')
    .col-12.py-3.d-flex.justify-content-end  
      el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
    el-dialog(title='投注紀錄', :visible.sync='dialogTableVisible')
      el-table(:data='bet_log_tableData')
        el-table-column(property='GameName', label='遊戲名稱')
        el-table-column(property='BetCount', label='投注次數')
        el-table-column(property='BetAmount', label='總流水')
        el-table-column(property='KillAVG', label='殺數')
        el-table-column(property='BalanceAmount', label='會員輸贏')
</template>
<script>
export default {
  name: "tgWinAndLoss",
  mounted() {
    this.get_game_group();
    if (typeof this.$route.query.UserName == "undefined") {
      this.formInit();
    } else {
      this.InitParams();
      this.get_data(1);
    }
  },
  methods: {
    formInit() {
      this.search_time_range = null;
      this.search_game_group_id = "1";
      this.search_game = "";
      this.search_user_name = "";
    },
    InitParams() {
      this.search_time_range = [
        this.$route.query.Date_S,
        this.$route.query.Date_E
      ];
      this.search_game_group_id = this.$route.query.GameGroupId;
      this.search_game = this.$route.query.GameGroupName;
      this.search_user_name = this.$route.query.UserName;
    },
    get_data(now_page) {
      if (this.search_time_range == null) {
        this.$message.error("請選擇搜尋日期範圍");
        return;
      }
      if (this.search_user_name == "") {
        this.$message.error("請輸入會員帳號");
        return;
      }
      this.lock_btn = true;
      let self = this;
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        GameGroupId: self.search_game_group_id,
        UserName: self.search_user_name
      };
      if (self.search_game) {
        payload.GameName = self.search_game;
      }
      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetWinnerReport/", payload)
        .then(function(response) {
          if (response.data.status === 1) {
            let tmpArr = [];
            Object.keys(response.data.data.WinnerReport).forEach(function(
              item,
              index,
              array
            ) {
              response.data.data.WinnerReport[item].Number = item;
              tmpArr.push(response.data.data.WinnerReport[item]);
            });
            self.total = response.data.data;
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = tmpArr;
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
    get_game_group() {
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
          self.gameGroup = response.data.data;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
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
        if (index === 5) {
          sums[index] = self.total["KillAvg"];
        } else {
          sums[index] = self.total["Total" + column.property];
        }
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
    },
    get_bet_log(search_date_range) {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/UserGameBetReport",
        data: {
          Date_S: search_date_range,
          Date_E: search_date_range,
          GameGroupId: self.search_game_group_id,
          UserName: self.search_user_name
        }
      })
        .then(function(response) {
          self.bet_log_tableData = response.data.data.data_list;
          self.dialogTableVisible = true;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    }
  },
  data() {
    return {
      search_time_range: null,
      search_game_group_id: 1,
      search_game: "",
      search_user_name: "",
      gameGroup: [],
      lock_btn: false,
      dialogTableVisible: false,
      tableData: [],
      bet_log_tableData: [],
      total: "",
      now_page: 1,
      page_size: 100,
      total_page: 0
    };
  }
};
</script>