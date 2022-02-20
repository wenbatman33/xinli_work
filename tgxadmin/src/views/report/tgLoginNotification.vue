<template>
  <!-- -vue 套件限定使用 html tag -->
  <div class="container-fluid">
    <div class="row no-gutters px-3 py-3 border-bottom">
      <div class="col-md-6 col-12 pt-1">
        <h5>登入警示</h5>
      </div>
      <div class="col-md-6 col-12 text-right">
        <el-date-picker
          v-model="calcDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="changeHandle"
        ></el-date-picker>
      </div>
    </div>
    <div class="row no-gutters px-3 py-3 d-flex justify-content-between">
      <div class="col-md-10 col-12">
        <div class="row no-gutters">
          <div class="col-md-6 col-12 px-1 py-1">
            <el-radio-group v-model="tableSwitch" size="medium" @change="changeSwitch">
              <el-radio-button class="radio-style" label="1">註冊數</el-radio-button>
              <el-radio-button class="radio-style" label="2">登入數</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="row no-gutters px-3 py-3">
      <div class="col-12" ref="chertWrap">
        <v-chart :forceFit="false" :width="chartWidth" :height="chartHeight">
          <v-tooltip :showTitle="false"/>
          <v-legend data-key="trend" position="left"/>
          <v-view :data="geoData" :scale="scale">
            <v-polygon
              :position="view1Opts.position"
              :vStyle="view1Opts.style"
              :tooltip="view1Opts.tooltip"
            />
          </v-view>
          <v-view :data="data" :scale="userDataScale">
            <v-polygon
              :position="view2Opts.position"
              :vStyle="view2Opts.style"
              :label="view2Opts.label"
              :opacity="view2Opts.opacity"
              :color="view2Opts.color"
              :animate="view2Opts.animate"
              :tooltip="view2Opts.tooltip"
            />
          </v-view>
        </v-chart>
      </div>
    </div>
    <div class="row no-gutters px-3 py-3">
      <div class="col-12 des">
        <span>說明</span>
        <br>
        <small>成長率：(平均值-今日)/平均值</small>
        <br>
        <small>平均值為前三日數據合計後的均值</small>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import viserVue from "viser-vue";
Vue.use(viserVue);
let tabTitle = "註冊數";
const scale = [
  {
    dataKey: "longitude",
    sync: true
  },
  {
    dataKey: "latitude",
    sync: true
  }
];

const userDataScale = [
  {
    dataKey: "trend",
    alias: "GrowthRate"
  }
];

const view1Opts = {
  quickType: "polygon",
  position: "longitude*latitude",
  style: {
    fill: "#fff",
    stroke: "#ccc",
    lineWidth: 1
  },
  tooltip: false
};

let view2Opts = {
  quickType: "polygon",
  position: "longitude*latitude",
  opacity: "value",
  color: ["trend", ["#FC466B", "#3F5EFB"]],
  label: [
    "name",
    {
      textStyle: {
        fill: "#000000",
        fontSize: 10
      }
    }
  ],
  style: {
    stroke: "#fff",
    lineWidth: 1
  },
  tooltip: "省份*" + tabTitle + "*成長率*前一日*前二日*前三日",
  animate: {
    leave: {
      animation: "fadeOut"
    }
  }
};

export default {
  name: "tgLoginNotification",
  methods: {
    changeHandle(value) {
      this.getMap(this.tableSwitch);
    },
    handleResize() {
      this.chartWidth = this.$refs.chertWrap.offsetWidth;
      this.chartHeight = this.$refs.chertWrap.offsetWidth * 0.7;
    },
    changeSwitch(value) {
      if (value === 1) {
        tabTitle = "註冊數";
      } else {
        tabTitle = "登入數";
      }
      (view2Opts.tooltip = "省份*" + tabTitle + "*成長率*前一日*前二日*前三日"),
        (this.tableSwitch = value);
      this.getMap(value);
    },
    getMap(mapType) {
      let vm = this;
      vm.dataList = [];
      vm.$data.data = null;
      let payload = {};
      payload.Type = vm.tableSwitch;
      payload.calcDate = vm.calcDate;
      axios
        .get(this.MapJson)
        .then(res => {
          const mapList = res.data.features;
          if (Object.keys(vm.$data.geoData).length === 0) {
            mapList.map(obj => {
              vm.stateList.push(obj.properties.name);
            });
          }
          const worldMap = new DataSet.View().source(res.data, {
            type: "GeoJSON"
          });
          axios
            .post(this.DataJson, payload)
            .then(res => {
              const dataArray = res.data.data;
              dataArray.map((obj, index) => {
                let arrayTitle = tabTitle;
                obj["省份"] = obj["name"];
                obj["前一日"] = obj["-1day"];
                obj["前二日"] = obj["-2day"];
                obj["前三日"] = obj["-3day"];
                obj["成長率"] = obj["GrowthRate"] + "%";
                obj[arrayTitle] = obj["Today"];
                // delete obj['name'];
                // delete obj['GrowthRate'];
                delete obj["Today"];
                delete obj["-1day"];
                delete obj["-2day"];
                delete obj["-3day"];
              });
              vm.stateList.map((obj, index) => {
                let result = dataArray
                  .map((item, index) => item.省份)
                  .indexOf(obj);
                if (result < 0) {
                  // console.log(tabTitle)
                  let newObject = {
                    name: obj,
                    省份: obj,
                    前一日: "0",
                    前二日: "0",
                    前三日: "0",
                    成長率: "0%",
                    GrowthRate: "0",
                    [tabTitle]: "0"
                  };
                  vm.dataList.push(newObject);
                } else {
                  vm.dataList.push(dataArray[result]);
                }
              });
              const userDv = new DataSet.View()
                .source(vm.dataList)
                .transform({
                  geoDataView: worldMap,
                  field: "name",
                  type: "geo.region",
                  as: ["longitude", "latitude"],
                  lineWidth: 10
                })
                .transform({
                  type: "map",
                  callback: obj => {
                    obj.trend = obj.GrowthRate;
                    return obj;
                  }
                });
              vm.$data.data = userDv;
            })
            .catch(error => {
              console.log(error);
            });
          vm.$data.geoData = worldMap;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    let data_set = document.createElement("script");
    data_set.setAttribute(
      "src",
      "https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.9.6/dist/data-set.min.js"
    );
    document.head.appendChild(data_set);
    setTimeout(() => {
      this.getMap(1);
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }, 300);
  },
  data() {
    let today = new Date();
    let last = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
    let y = last.getFullYear();
    let m = last.getMonth() + 1;
    let d = last.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d;
    return {
      calcDate: date_s,
      stateList: [],
      dataList: [],
      tableSwitch: 1,
      chartWidth: 0,
      chartHeight: 0,
      MapJson: "./china.json",
      DataJson: process.env.VUE_APP_APIHOST + "/Admin/LoginAndRegisterMap/",
      data: [],
      geoData: [],
      scale,
      userDataScale,
      view1Opts,
      view2Opts
    };
  }
};
</script>
