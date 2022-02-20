<template lang="pug">
  .transactionLog
    .transactionLog__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/my")
        i.fas.fa-chevron-left
      p 资金纪录
    .transactionLog__function
      el-dropdown(@command="setType" trigger="click")
        .el-dropdown-link.transactionLog__type
          i.fas.fa-filter {{ typeDisplay }}
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(v-for="(item, index) in typeList" :key="item" :command="item", @click.native="changetype(index)") {{ index }}
      .transactionLog__datepicker.p-2
        i.fas.fa-clock.mr-1
        v-date-picker.w-100(ref="calendar" mode="range" v-model="dateValue" color="red" :input-props='{class: "py-0 w-100"}' :available-dates='{ start: start_date, end: end_date }' is-dark, @click.native='$matomo_transactionlog_date')
    .transactionLog__main(v-infinite-scroll="load")
      .transactionLog__nodata(v-if="Object.keys(filterTransactionLog).length === 0")
        img(:src='image1')
        p 暂无资金纪录
      div(v-else v-for="(item, index) in filterTransactionLog" :key="index")
        .transactionLog__main__title {{ index }}
        TransactionLogSection(v-for="log in item" :card="log")
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import TransactionLogSection from '@/components/bl_My/bl_TransactionLog/bl_TransactionLogSection.vue';

export default {
  components: {
    TransactionLogSection,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      image1: `${window.CDN_ASSETS}/static/img/messageNull@3x.png`,
      filterForm: {
        params: {
          type: null,
          status: null,
          start_time: null,
          end_time: null,
          page: null,
          per_page: null,
        },
      },
      start_date: '',
      end_date: new Date(),
      dateValue: {
        end: new Date(),
        start: this.passedDay(14),
      },
      currentPage: 1,
      totalPages: null,
      typeDisplay: '全部',
      typeList: {},
      transactionLog: [],
    };
  },
  methods: {
    changetype(type) {
      this.$matomo_transactionlog_group(type);
    },
    setType(value) {
      if (value === 0) {
        this.filterForm.params.type = null;
      } else {
        this.filterForm.params.type = value;
      }
      // 類型
      const index = Object.values(this.typeList).indexOf(Number(value));
      this.typeDisplay = Object.keys(this.typeList)[index];
      // 重置
      this.init();
      // 重新取資料
      this.$store.dispatch('payment/API_MemberTransactionLog', this.filterForm).then((res) => {
        this.transactionLog = res.data.data;
        this.currentPage = res.data.meta.pagination.current_page;
        this.totalPages = res.data.meta.pagination.total_pages;
      });
    },
    load() {
      if (this.currentPage < this.totalPages) {
        this.filterForm.params.page = this.currentPage + 1;
        this.$store.dispatch('payment/API_MemberTransactionLog', this.filterForm).then((res) => {
          this.transactionLog = this.transactionLog.concat(res.data.data);
          this.currentPage = res.data.meta.pagination.current_page;
          this.totalPages = res.data.meta.pagination.total_pages;
        });
      } else {
        
      }
    },
    init() {
      this.currentPage = 1;
      this.filterForm.params.page = 1;
      this.totalPages = null;
    },
    // 時間轉換
    formatDate(time) {
      const date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      return date;
    },
    // 過去的日期
    passedDay(days) {
      const time = new Date();
      const now = time.getTime();
      const min_time = now - days * 24 * 60 * 60 * 1000;
      return new Date(min_time);
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    filterTransactionLog() {
      const temp = this.transactionLog.reduce((obj, list) => {
        const date = list.createdAt.split(' ')[0];
        Array.isArray(obj[date]) ? obj[date].push(list) : obj[date] = [list];
        return obj;
      }, {});
      return temp;
    },
  },
  watch: {
    dateValue: {
      handler(val) {
        const temp_endTime = new Date(this.dateValue.end.getTime() + (24 * 60 * 60 - 1) * 1000);
        this.filterForm.params.start_time = this.formatDate(this.dateValue.start);
        this.filterForm.params.end_time = this.formatDate(temp_endTime);
        this.init();
        this.$store.dispatch('payment/API_MemberTransactionLog', this.filterForm).then((res) => {
          this.transactionLog = res.data.data;
          this.currentPage = res.data.meta.pagination.current_page;
          this.totalPages = res.data.meta.pagination.total_pages;
        });
      },
    },
  },
  created() {
    // 取得類型
    this.$store.dispatch('payment/API_IndexTransactionLogTypeList').then((res) => {
      const temp = {
        全部: 0,
      };
      Object.assign(temp, res.data.data[0]);
      this.typeList = temp;
      // 如果網址有帶入參數 type
      if (this.$route.query.type) {
        this.setType(this.$route.query.type);
      } else {
        this.$store.dispatch('payment/API_MemberTransactionLog', this.filterForm).then((result) => {
          this.transactionLog = result.data.data;
          this.totalPages = result.data.meta.pagination.total_pages;
        });
      }
    });
    // 預設只能查到90天數據
    this.start_date = this.passedDay(90);
    // 預設顯示14天內數據
    this.filterForm.params.start_time = this.formatDate(this.passedDay(14));
    this.filterForm.params.end_time = this.formatDate(new Date());
  },
};
</script>

<style lang="scss" scoped>
.transactionLog {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    color: white;
    padding: $height-36 $width-24;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;

    a {
      position: absolute;
      left: $width-24;
      color: white;
    }

    p {
      margin: 0;
    }
  }

  &__function {
    display: flex;
    align-items: center;
    padding: $height-20 $width-24 $height-24;

    .transactionLog__type {
      white-space: nowrap;
      padding: $height-12 $width-12;
      border: 1px solid $origin;
      border-radius: 20px;
      background-color: white;
      color: $origin_darkest;
      margin-right: $width-8;
    }

    .transactionLog__datepicker {
      border: 1px solid $origin;
      border-radius: 20px;
      color: $origin_darkest;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      background-color: white;

      input {
        border: none;
        outline: none;
      }
    }
  }

  &__nodata {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 100px;

    img {
      width: 100%;
    }

    p {
      margin: 0;
      color: $origin_dark;
      font-size: $text-16;
    }
  }

  &__main {
    padding: 0 $width-24;
    flex: 1;
    overflow: auto;

    &__title {
      font-size: $text-16;
      color: $origin_darkest;
      margin-bottom: $height-16;
    }
  }

  &__card {
    background-color: white;
    border: 1px solid $origin_light;
    border-radius: 12px;
    width: 100%;
    font-size: $text-16;
    display: flex;
    flex-direction: column;
    margin-bottom: $height-12;

    &__type {
      background-color: rgb(19, 206, 102);
      font-size: $text-12;
      color: white;
      padding: 0 $width-18;
      border-top-left-radius: 4px;
      border-bottom-right-radius: 4px;
      width: fit-content;
      margin-top: -1px;
      margin-left: -1px;
    }

    &__date {
      font-size: $text-14;
      color: $origin;
    }

    &__channel {
      color: $navy_light;
    }

    &__money {
      color: $navy_dark;
    }

    &__status1 {
      color: rgb(19, 206, 102);
    }

    &__status2 {
      color: rgb(255, 73, 73);
    }
  }
}
// date-picker
.vc-reset {
  width: 100%;
}

/deep/ .vc-popover-content-wrapper {
  transform: translate3d(-50%, -50% ,0) !important;
  top: 50% !important;
  left: 50% !important;

  .vc-popover-content {
    margin-top: 0 !important;
  }

  .vc-popover-caret {
    display: none !important;
  }
}
// date-picker
</style>
