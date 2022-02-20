<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 存提速度
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 存款處理時間
          .col-md-6.col-12.py-1
            el-date-picker(size='medium', v-model='timevalue_Deposit', @change='get_data(timevalue_Deposit,1)', value-format='yyyy-MM-dd', style='float: right;width: 160px', type='date', placeholder='選擇報表日期')
        .item.row
          canvas#DepositCanvas.col-12(height='340' responsive='false')
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye 提款處理時間
          .col-md-6.col-12.py-1
            el-date-picker(size='medium', v-model='timevalue_Withdraw', @change='get_data(timevalue_Withdraw,2)', value-format='yyyy-MM-dd', style='float: right;width: 160px', type='date', placeholder='選擇報表日期')
        .item.row
          canvas#WithdrawCanvas.col-12(height='340' responsive='false')
</template>
<script>
import Chart from "chart.js";
Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear() + "-";
  var mm =
    this.getMonth() < 9
      ? "0" + (this.getMonth() + 1) + "-"
      : this.getMonth() + 1 + "-"; // getMonth() is zero-based
  var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  return ""
    .concat(yyyy)
    .concat(mm)
    .concat(dd);
};
export default {
  name: "tgTransactionSpeed",
  data() {
    return {};
  },
  mounted() {
    this.get_data(this.timevalue_Deposit, 1);
    this.get_data(this.timevalue_Withdraw, 2);
  },
  methods: {
    formInit() {
      let today = new Date();
      let day = today.getDate() - 1;
      let date_s = new Date(today.getTime() - day * 24 * 60 * 60 * 1000)
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
    get_data(Now, Type) {
      let self = this;
      let payload = {
        Date_S: Now,
        PayType: Type
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST + "Admin/GetTransactionSpeed/",
          payload
        )
        .then(function(response) {
          if (!response.data.data.product_list) {
            response.data.data.product_list = {
              empty: {
                Name: "尚無資料",
                data_list: {}
              }
            };
          }
          self.setResData(response.data.data.product_list, payload.PayType);
        })
        .catch(function(error) {
          let emptyData = { 0: { Name: "", data_list: [] } };
          self.setResData(emptyData, payload.PayType);
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    setResData(data, PayType) {
      const Data = Object.values(data);
      let tempData = Data.map(function(value, index) {
        return [value];
      });
      for (let index = 0; index < tempData.length; index++) {
        let siez = Object.keys(tempData[index][0].data_list).length;
        let dataArray = [];
        for (let i = 0; i < 24; i++) {
          let less10 = "";
          if (i < 10) {
            less10 = `0${i}`;
          } else {
            less10 = `${i}`;
          }
          if (!tempData[index][0].data_list[less10]) {
            dataArray.push(0);
          } else {
            dataArray.push(Number(tempData[index][0].data_list[less10]));
          }
        }
        tempData[index][0].data_list = dataArray;
      }
      if (PayType === 1) {
        console.log(tempData);
        this.depositChartData = tempData;

        this.DepositChart();
      } else {
        console.log(tempData);
        this.withdrawChartData = tempData;
        this.WithdrawChart();
      }
    },
    DepositChart() {
      let ChartDataSet = [];
      for (let index = 0; index < this.depositChartData.length; index++) {
        let data = {
          label: this.depositChartData[index][0].Name,
          backgroundColor: this.colorSet[index],
          borderColor: this.colorSet[index],
          pointBackgroundColor: this.colorSet[index],
          borderWidth: 1,
          data: this.depositChartData[index][0].data_list,
          fill: false
        };
        ChartDataSet.push(data);
      }

      let self = this;
      // console.log(this.depositChart)
      if (this.depositChart) {
        this.depositChart.destroy();
      }
      let ctx = document.getElementById("DepositCanvas");
      let CHART = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ],
          datasets: ChartDataSet
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          Scale: {
            height: 340
          },
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

      this.depositChart = CHART;
    },
    WithdrawChart() {
      let ChartDataSet = [];
      for (let index = 0; index < this.withdrawChartData.length; index++) {
        let data = {
          label: this.withdrawChartData[index][0].Name,
          backgroundColor: this.colorSet[index + 2],
          borderColor: this.colorSet[index + 2],
          pointBackgroundColor: this.colorSet[index + 2],
          borderWidth: 1,
          data: this.withdrawChartData[index][0].data_list,
          fill: false
        };
        ChartDataSet.push(data);
      }
      let self = this;

      if (this.withdrawChart) {
        this.withdrawChart.destroy();
      }
      let ctx = document.getElementById("WithdrawCanvas");
      self.withdrawChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ],
          datasets: ChartDataSet
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
      timevalue_Deposit: new Date().yyyymmdd(),
      timevalue_Withdraw: new Date().yyyymmdd(),
      depositChart: "",
      withdrawChart: "",
      depositChartData: [],
      withdrawChartData: [],
      colorSet: [
        "#fadb14",
        "#67c23a",
        "#1890ff",
        "#3de0c5",
        "#f7ba2a",
        "#f87b09",
        "#ff4949",
        "#e56aa6",
        "#8e73da",
        "#58b7ff",
        "#58ed9b",
        "#ffd063",
        "#ff8686",
        "#c2aaf2",
        "#1d8ce0",
        "#10ad57",
        "#e3ab29",
        "#e04141",
        "#6b49aa"
      ]
    };
  }
};
</script>
