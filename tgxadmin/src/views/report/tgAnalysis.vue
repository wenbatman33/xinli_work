<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-md-6.col-12.pt-1
        h5(style="display: inline-block;") 即時報表
        el-tooltip(class="item" effect="light" content="本頁數據每10分鐘更新，停留時間超過更新時間，點擊日期旁的更新圖示，可獲取最新數據" placement="right")
          i(class="el-icon-info")
      .col-md-6.col-12
        .row.no-gutters
          .col-11.d-flex.justify-content-center.flex-column.text-right 最後更新：{{LastUpdate_At}}
          .col-1.d-flex.justify-content-center.flex-column
            el-button(size='medium', type='text', icon='el-icon-refresh', @click='get_data("1,null", 1)')
    //--Card
    .row.no-gutters.pt-3.px-3
      .col-md-3.col-12.my-1
        el-card.box-card.chart-single-card(shadow='never')
          .card-text
            i.pr-2.fas.fa-coins
            span 總流水(¥)
          .card-text.mt-2.mb-2
            span.card-number.blue-style {{dataBlock0.BetAmountToday}}
          .bottom.clearfix
            span.card-number-title.card-text 同昨日
            span.pl-2.card-text.error-style(v-if='dataBlock0.BetAmountYesterday && dataBlock0.BetAmountYesterday.replace(/[,]+/g,"") >= 0') {{dataBlock0.BetAmountYesterday}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.BetAmountYesterday}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.BetAmountYesterday && dataBlock0.BetAmountYesterday.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
            br
            span.card-number-title.card-text 同前日
            span.pl-2.card-text.error-style(v-if='dataBlock0.BetAmountWeek && dataBlock0.BetAmountWeek.replace(/[,]+/g,"") >= 0') {{dataBlock0.BetAmountWeek}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.BetAmountWeek}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.BetAmountWeek && dataBlock0.BetAmountWeek.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
      .col-md-3.col-12.my-1.pl-md-2
        el-card.box-card.chart-single-card(shadow='never')
          .card-text
            i.pr-2.fas.fa-money-bill
            span 盈利(¥)
          .card-text.mt-2.mb-2
            span.card-number.blue-style {{dataBlock0.BalanceAmountToday}}
          .bottom.clearfix
            span.card-number-title.card-text 同昨日
            span.pl-2.card-text.error-style(v-if='dataBlock0.BalanceAmountYesterday && dataBlock0.BalanceAmountYesterday.replace(/[,]+/g,"") >= 0') {{dataBlock0.BalanceAmountYesterday}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.BalanceAmountYesterday}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.BalanceAmountYesterday && dataBlock0.BalanceAmountYesterday.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
            br
            span.card-number-title.card-text 同前日
            span.pl-2.card-text.error-style(v-if='dataBlock0.BalanceAmountWeek && dataBlock0.BalanceAmountWeek.replace(/[,]+/g,"") >= 0') {{dataBlock0.BalanceAmountWeek}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.BalanceAmountWeek}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.BalanceAmountWeek && dataBlock0.BalanceAmountWeek.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
      .col-md-3.col-12.my-1.pl-md-2
        el-card.box-card.chart-single-card(shadow='never')
          .card-text
            i.pr-2.fas.fa-trophy
            span 殺數(%)
          .card-text.mt-2.mb-2
            span.card-number.blue-style {{dataBlock0.KillNumber}}%
          .bottom.clearfix
            span.card-number-title.card-text 同昨日
            span.pl-2.card-text.error-style(v-if='dataBlock0.KillNumberYesterday && dataBlock0.KillNumberYesterday.replace(/[,]+/g,"") >= 0') {{dataBlock0.KillNumberYesterday}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.KillNumberYesterday}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.KillNumberYesterday && dataBlock0.KillNumberYesterday.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
            br
            span.card-number-title.card-text 同前日
            span.pl-2.card-text.error-style(v-if='dataBlock0.KillNumberWeek && dataBlock0.KillNumberWeek.replace(/[,]+/g,"") >= 0') {{dataBlock0.KillNumberWeek}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.KillNumberWeek}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.KillNumberWeek && dataBlock0.KillNumberWeek.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
      .col-md-3.col-12.my-1.pl-md-2
        el-card.box-card.chart-single-card(shadow='never')
          .card-text
            i.pr-2.fas.fa-users
            span 投注人數(人)
          .card-text.mt-2.mb-2
            span.card-number.blue-style {{dataBlock0.BetPeopleToday}}人
          .bottom.clearfix
            span.card-number-title.card-text 同昨日
            span.pl-2.card-text.error-style(v-if='dataBlock0.BetPeopleYesterday && dataBlock0.BetPeopleYesterday.replace(/[,]+/g,"") >= 0') {{dataBlock0.BetPeopleYesterday}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.BetPeopleYesterday}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.BetPeopleYesterday && dataBlock0.BetPeopleYesterday.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
            br
            span.card-number-title.card-text 同前日
            span.pl-2.card-text.error-style(v-if='dataBlock0.BetPeopleWeek && dataBlock0.BetPeopleWeek.replace(/[,]+/g,"") >= 0') {{dataBlock0.BetPeopleWeek}}%
            span.pl-2.card-text.sucess-style(v-else) {{dataBlock0.BetPeopleWeek}}%
            i.pl-2.fas.fa-caret-up.error-style(v-if='dataBlock0.BetPeopleWeek && dataBlock0.BetPeopleWeek.replace(/[,]+/g,"") >= 0')
            i.pl-2.fas.fa-caret-down.sucess-style(v-else)
    //--Card 關鍵指標
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header') 
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 關鍵指標
          .col-md-6.col-12.py-1
            el-radio-group(v-model='radioKey', size='small', style='float: right', @change='get_data')
              el-radio-button(label='4,1') 本月
              el-radio-button(label='3,1') 本週
              el-radio-button(label='2,1') 昨日
              el-radio-button(label='1,1') 本日
        .card-text.item.row
          .col-sm-6.col-md-2.d-flex
            .row
              .col-12.card-number-title.card-text
                //i.pr-2.fas.fa-wallet
                span 存款金額(¥)
              span.col-12.mt-1.mb-2.card-number {{dataBlock1.DepositAmount}}
          .col-sm-6.col-md-2.d-flex
            .row
              .col-12.card-number-title.card-text
                //i.pr-2.fas.fa-wallet
                span 紅利金額(¥)
              span.col-12.mt-1.mb-2.card-number {{dataBlock1.OfferAmount}}
          .col-sm-6.col-md-2.d-flex
            .row
              .col-12.card-number-title.card-text
                //i.pr-2.fas.fa-signature
                span 18轉帳金額
              span.col-12.mt-1.mb-2.card-number {{dataBlock1.TransferAmount}}
          .col-sm-6.col-md-2.d-flex
            .row
              .col-12.card-number-title.card-text
                //i.pr-2.fas.fa-signature
                span 存提差(¥)
              span.col-12.mt-1.mb-2.card-number {{dataBlock1.Difference}}
          .col-sm-6.col-md-2.d-flex
            .row
              .col-12.card-number-title.card-text
                //i.pr-2.fas.fa-user
                span 註冊人數(人)
              span.col-12.mt-1.mb-2.card-number {{dataBlock1.RegisterCnt}}人
          .col-sm-6.col-md-2.d-flex
            .row
              .col-12.card-number-title.card-text
                //i.pr-2.el-icon-star-on
                span 存款人數(人)
              span.col-12.mt-1.mb-2.card-number {{dataBlock1.DepositPeople}}人
    //--Card 殺數統計
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card.chart-single-card(shadow='never',style='height:248px;')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 殺數統計
        .item.row
          canvas#Wincanvas.col-12(height='160')
    //--Card 存提差統計
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card.chart-single-card(shadow='never',style='height:248px;')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 存提差統計
          .col-md-6.col-12.py-1
            el-radio-group(v-model='radioDifference', size='small', style='float: right', @change='get_data')
              el-radio-button(label='4,3') 本月
              el-radio-button(label='3,3') 本週
              el-radio-button(label='2,3') 昨日
              el-radio-button(label='1,3') 本日
        .item.row
          canvas#canvas.col-12(height='160')
    //--Card 會員人數統計
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 會員人數統計
          .col-md-6.col-12.py-1
            el-radio-group(v-model='radioMember', size='small', style='float: right', @change='get_data')
              el-radio-button(label='4,4') 本月
              el-radio-button(label='3,4') 本週
              el-radio-button(label='2,4') 昨日
              el-radio-button(label='1,4') 本日
        .card-text.item.row
          .col-sm-6.col-md-4.d-flex
            .row.pl-3
              .col-12.card-number-title.card-text
                i.pr-2.far.fa-smile
                span 註冊人數(人)
              span.col-12.ml-4.mt-1.mb-2.card-number {{dataBlock4.RegisterCnt}}人
          .col-sm-6.col-md-4.d-flex
            .row.pl-3
              .col-12.card-number-title.card-text
                i.pr-2.far.fa-laugh-squint
                span 存款人數(人)
              span.col-12.ml-4.mt-1.mb-2.card-number {{dataBlock4.DepositPeopleCnt}}人
          .col-sm-6.col-md-4.d-flex
            .row.pl-3
              .col-12.card-number-title.card-text
                i.pr-2.far.fa-surprise
                span 註冊存款人數(人)
              span.col-12.ml-4.mt-1.mb-2.card-number {{dataBlock4.RegisterPayCnt}}人
        .item.row.pt-3
          canvas#Membercanvas.col-12(height='300')
    //--Card 流水、盈利統計
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 流水、盈利統計
          .col-md-6.col-12.py-1
            el-radio-group(v-model='radioCash', size='small', style='float: right', @change='get_data')
              el-radio-button(label='4,5') 本月
              el-radio-button(label='3,5') 本週
              el-radio-button(label='2,5') 昨日
              el-radio-button(label='1,5') 本日
        .card-text.item.row
          .col-sm-6.col-md-4.d-flex
            .row.pl-3
              .col-12.card-number-title.card-text
                i.pr-2.far.fa-smile
                span 總流水(¥)
              span.col-12.ml-4.mt-1.mb-2.card-number {{dataBlock5.BetAmountCnt}}
          .col-sm-6.col-md-4.d-flex
            .row.pl-3
              .col-12.card-number-title.card-text
                i.pr-2.far.fa-laugh-squint
                span 杀数(％)
              span.col-12.ml-4.mt-1.mb-2.card-number {{dataBlock5.KillNumberCnt}}%
          .col-sm-6.col-md-4.d-flex
            .row.pl-3
              .col-12.card-number-title.card-text
                i.pr-2.far.fa-grin-stars
                span 盈利(¥)
              span.col-12.ml-4.mt-1.mb-2.card-number {{dataBlock5.BalanceAmountCnt}}
        .item.row
          canvas#Cashcanvas.col-12(height='300')
    //--Card 平台報表
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 平台報表
          .col-md-6.col-12.py-1
            el-radio-group(v-model='radioBrand', size='small', style='float: right', @change='get_data')
              el-radio-button(label='4,6') 本月
              el-radio-button(label='3,6') 本週
              el-radio-button(label='2,6') 昨日
              el-radio-button(label='1,6') 本日
        .card-text.item.row.pl-2.pr-2
          template
            el-table(:data='dataBlock6', style='width: 100%')
              el-table-column(label='遊戲平台', width='120', align='center')
                template(slot-scope='scope')
                  b(v-if='typeof scope.row.GroupName === "undefined"' style='color:#409eff') 合計
                  span(v-else) {{scope.row.GroupName}}
              el-table-column(prop='BetAmount', label='流水(¥)', align='center')
                template(slot-scope='scope')
                  span(v-html='scope.row.BetAmount')
              el-table-column(prop='BalanceAmount', label='盈利(¥)', align='center')
                template(slot-scope='scope')
                  span(v-html='scope.row.BalanceAmount')
              el-table-column(prop='KillNumber', label='殺數(%)', align='center')
                template(slot-scope='scope')
                  span(v-html='scope.row.KillNumber')
              el-table-column(prop='BetPeople', label='唯一投注人數(人)', align='right')
                template(slot-scope='scope')
                  span(v-html='scope.row.BetPeople')
              el-table-column(prop='BetCount', label='投注次數', align='right')
                template(slot-scope='scope')
                  span(v-html='scope.row.BetCount')
              el-table-column(label='平台狀態', width='120', align='center')
                template(slot-scope='scope')
                  span(v-if='typeof scope.row.GroupName === "undefined"') 
                  el-tag(v-else-if='scope.row.Status === "開"' type="success", disable-transitions='') {{scope.row.Status}}
                  el-tag(v-else type="danger", disable-transitions='') 維護
</template>
<script>
import Chart from "chart.js";
export default {
  name: "tgAnalysis",
  mounted() {
    // this.getGameStatusZero();
    this.get_data();
  },
  methods: {
    // getGameStatusZero() {
    //   let vm = this;
    //   axios
    //     .post(process.env.VUE_APP_APIHOST + "Web_Page/GameGroup")
    //     .then(function(res) {
    //       // console.log(res)
    //       if (res.data.status === 1) {
    //         res.data.data.forEach(function(item, index, array) {
    //           if (item["TransferStatus"] == 0) {
    //             vm.gameGroupZeroList.push(item["GroupName"]);
    //           }
    //         });
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    get_data(options = "1,null", Update = null) {
      options = options.split(",");
      if (options[1] != 0) {
        options.forEach(function(item, index, array) {
          if (item == "null") {
            options[index] = null;
          } else {
            options[index] = parseInt(item);
          }
        });
      }
      let self = this;
      let payload = {
        DateType: options[0],
        DataBlock: options[1],
        Update: Update
      };

      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/RealTimeReport", payload)
        .then(function(response) {
          if (response.data.status === 1) {
            let tmpArr = [];

            //最後更新時間
            self.LastUpdate_At = response.data.other.LastUpdate_At;

            //處理資料0
            if (options[1] == null || options[1] == 0) {
              let calcData =
                options[1] != null ? response.data.data : response.data.data[0];
              self.dataBlock0 = calcData;
            }
            //處理資料1
            if (options[1] == null || options[1] == 1) {
              let calcData =
                options[1] != null ? response.data.data : response.data.data[1];
              self.dataBlock1 = calcData;
            }
            //處理資料2
            if (options[1] == null || options[1] == 2) {
              tmpArr = [];
              Object.keys(response.data.data[2].chartjs.KillNumber).forEach(
                function(item, index, array) {
                  tmpArr.push(response.data.data[2].chartjs.KillNumber[item]);
                }
              );
              self.dataBlock2 = tmpArr;
              self.ChartKill();
            }
            //處理資料3
            if (options[1] == null || options[1] == 3) {
              let calcData =
                options[1] != null ? response.data.data : response.data.data[3];
              self.dataBlock3 = self.rebuildData(calcData, options);
              self.ChartDeposit();
            }
            //處理資料4
            if (options[1] == null || options[1] == 4) {
              let calcData =
                options[1] != null ? response.data.data : response.data.data[4];
              self.dataBlock4 = self.rebuildData(calcData, options);
              self.dataBlock4["DepositPeopleCnt"] = calcData["DepositPeople"];
              self.dataBlock4["RegisterCnt"] = calcData["RegisterCnt"];
              self.dataBlock4["RegisterPayCnt"] = calcData["RegisterPayCnt"];
              self.ChartMember();
            }
            //處理資料5
            if (options[1] == null || options[1] == 5) {
              let calcData =
                options[1] != null ? response.data.data : response.data.data[5];
              self.dataBlock5 = self.rebuildData(calcData, options);
              self.dataBlock5["BalanceAmountCnt"] = calcData["BalanceAmount"];
              self.dataBlock5["BetAmountCnt"] = calcData["BetAmount"];
              self.dataBlock5["KillNumberCnt"] = calcData["KillNumber"];
              self.ChartCash();
            }
            //處理資料6
            if (options[1] == null || options[1] == 6) {
              let calcData =
                options[1] != null ? response.data.data : response.data.data[6];
              if (calcData != undefined) {
                tmpArr = [];
                Object.keys(calcData).forEach(function(item, index, array) {
                  if (array.length - 1 == index) {
                    Object.keys(calcData[item]).forEach(function(
                      item1,
                      index1,
                      array1
                    ) {
                      calcData[item][item1] =
                        '<b style="color:#409eff">' +
                        calcData[item][item1] +
                        "</b>";
                    });
                  }
                  let displayedLost = ["WG", "RTG", "PS", "PP"];
                  // let displayedLost = self.gameGroupZeroList;
                  if (displayedLost.indexOf(calcData[item].GroupName) < 0) {
                    tmpArr.push(calcData[item]);
                  }
                });
                self.dataBlock6 = tmpArr;
              } else {
                self.dataBlock6 = [];
              }
            }
          } else {
            self.$message.error(response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        });
    },
    rebuildData(data, options) {
      let tmpArr = [];
      Object.keys(data.chartjs).forEach(function(item, index, array) {
        tmpArr[item] = [];
        tmpArr[item + "label"] = [];
        if (options[0] == 1 || options[0] == 2) {
          Object.keys(data.chartjs[item]).forEach(function(
            item1,
            index1,
            array1
          ) {
            console.log(
              "data.chartjs[item][item1] :",
              data.chartjs[item][item1]
            );
            if (item1.length <= 2) {
              tmpArr[item].push(data.chartjs[item][item1]);
            }
          });
        } else {
          Object.keys(data.chartjs[item]).forEach(function(
            item1,
            index1,
            array1
          ) {
            tmpArr[item + "label"].push(item1);
            tmpArr[item].push(data.chartjs[item][item1]);
          });
        }
      });
      return tmpArr;
    },
    ChartKill() {
      let self = this;
      let ctx = document.getElementById("Wincanvas");
      self.chartKill = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [""],
          datasets: [
            {
              type: "bar",
              label: "本月",
              backgroundColor: "rgba(250,219,22,0.8)",
              borderColor: "#FADB14",
              pointBackgroundColor: "#FADB14",
              borderWidth: 1,
              data: [self.dataBlock2[0]]
              //fill: false,
            },
            {
              type: "bar",
              label: "昨日",
              backgroundColor: "rgba(250,173,20,0.8)",
              borderColor: "#faad14",
              pointBackgroundColor: "#faad14",
              borderWidth: 1,
              data: [self.dataBlock2[1]]
              //fill: false,
            },
            {
              type: "bar",
              label: "本日",
              backgroundColor: "rgba(250,140,22,0.8)",
              borderColor: "#fa8c16",
              pointBackgroundColor: "#fa8c16",
              borderWidth: 1,
              data: [self.dataBlock2[2]]
              //fill: false,
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  display: false,
                  beginAtZero: true
                }
              }
            ]
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          legend: {
            position: "bottom"
          }
        }
      });
    },
    ChartDeposit() {
      let self = this;
      if (self.chartDeposit) {
        self.chartDeposit.destroy();
      }
      let labels;
      if (self.dataBlock3.DepositAmount.length == 24) {
        labels = self.labelsDay;
      } else {
        labels = self.dataBlock3.Differencelabel;
      }

      let ctx = document.getElementById("canvas");
      self.chartDeposit = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              type: "line",
              label: "存提差",
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              pointBackgroundColor: "#1890ff",
              borderWidth: 0.8,
              data: self.dataBlock3.Difference,
              fill: false
            },
            {
              type: "bar",
              label: "存款",
              backgroundColor: "rgba(103,194,58,0.8)",
              //borderColor: '#67c23a',
              pointBackgroundColor: "#67c23a",
              borderWidth: 1,
              data: self.dataBlock3.DepositAmount,
              fill: false
            },
            {
              type: "bar",
              label: "提款",
              backgroundColor: "rgba(250,85,85,0.8)",
              //borderColor: '#fa5555',
              pointBackgroundColor: "#fa5555",
              borderWidth: 1,
              data: self.dataBlock3.WithDrawAmount,
              fill: false
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          legend: {
            position: "bottom"
          }
        }
      });
    },
    ChartMember() {
      let self = this;
      if (self.chartMember) {
        self.chartMember.destroy();
      }
      let labels;
      if (self.dataBlock4.DepositPeople.length == 24) {
        labels = self.labelsDay;
      } else {
        labels = self.dataBlock4.DepositPeoplelabel;
      }

      let ctx = document.getElementById("Membercanvas");
      self.chartMember = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              type: "line",
              label: "註冊存款人數",
              backgroundColor: "rgba(114,46,209,0.6)",
              borderColor: "#722ed1",
              pointBackgroundColor: "#722ed1",
              borderWidth: 1,
              data: self.dataBlock4.RegisterPayCount
              //fill: false,
            },
            {
              type: "line",
              label: "存款人數",
              backgroundColor: "rgba(47,84,235,0.7)",
              borderColor: "#2f54eb",
              pointBackgroundColor: "#2f54eb",
              borderWidth: 1,
              data: self.dataBlock4.DepositPeople
              //fill: false,
            },
            {
              type: "line",
              label: "註冊人數",
              //backgroundColor:'rgba(104,47,235,0.8)',
              //borderColor: '#682feb',
              //pointBackgroundColor: '#682feb',
              backgroundColor: "rgba(24,144,255,0.7)",
              borderColor: "#1890ff",
              pointBackgroundColor: "#1890ff",
              borderWidth: 1,
              data: self.dataBlock4.RegisterCount
              //fill: false,
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          legend: {
            position: "bottom"
          }
        }
      });
    },
    ChartCash() {
      let self = this;
      if (self.chartCash) {
        self.chartCash.destroy();
      }
      let labels;
      if (self.dataBlock5.BalanceAmount.length == 24) {
        labels = self.labelsDay;
      } else {
        labels = self.dataBlock5.BalanceAmountlabel;
      }

      let ctx = document.getElementById("Cashcanvas");
      self.chartCash = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              type: "line",
              label: "盈利",
              backgroundColor: "rgba(82,196,26,0.6)",
              borderColor: "#52c41a",
              pointBackgroundColor: "#52c41a",
              borderWidth: 1,
              data: self.dataBlock5.BalanceAmount
              //fill: false,
            },
            {
              type: "line",
              label: "總流水",
              backgroundColor: "rgba(160,217,17,0.6)",
              borderColor: "#a0d911",
              pointBackgroundColor: "#a0d911",
              borderWidth: 1,
              data: self.dataBlock5.BetAmount
              //fill: false,
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          legend: {
            position: "bottom"
          }
        }
      });
    }
  },
  data() {
    return {
      //區塊資料
      dataBlock0: "",
      dataBlock1: "",
      dataBlock2: "",
      dataBlock3: "",
      dataBlock4: "",
      dataBlock5: "",
      dataBlock6: [],
      LastUpdate_At: "",
      // gameGroupZeroList: [],
      //label
      labelsDay: [
        "0:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      labelsWeek: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"],

      //定義chart
      chartKill: "",
      chartDeposit: "",
      chartMember: "",
      chartCash: "",

      //預設radio
      radioTotal: "1,0",
      radioKey: "1,1",
      radioDifference: "1,3",
      radioMember: "1,4",
      radioCash: "1,5",
      radioBrand: "1,6"
    };
  }
};
</script>