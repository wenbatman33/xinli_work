<template lang="pug">
  .betting
    .betting__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/my")
        i.fas.fa-chevron-left
      p 我的投注
      v-date-picker(ref="calendar", @click.native="$matomo_mybetting_date" :popover="{ placement: 'bottom', visibility: 'click' }" mode="range" v-model="dateValue" :available-dates='{ start: start_date, end: end_date }' focus:outline-none is-dark)
        el-button.betting__header__date(type="text")
          i.fas.fa-calendar-day
    .betting__function
      el-dropdown(@command="setType" trigger="click" placement="bottom")
        .el-dropdown-link.betting__type {{ typeDisplay }}
          i.el-icon-caret-bottom.ml-1
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(v-for="item in type" :command="item", , @click.native="$matomo_mybetting_id(item.name)") {{ item.name }}
      el-dropdown.w-100(@command="setGame" trigger="click" placement="bottom")
        .el-dropdown-link.betting__type.mr-0 {{ gameDisplay }}
          i.el-icon-caret-bottom.ml-1
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(v-for="item in games" :command="item", @click.native="$matomo_mybetting_companyTag(item.name)") {{ item.name }}
    .betting__time
      i.fas.fa-clock.mr-2
      | {{ form.params.time_start }} ~ {{ form.params.time_end }}
    .betting__main(v-infinite-scroll="load")
      BettingSection(v-for="item in bettingLog" :game="item" :type="form.params.game_type" :company="form.params.company_tag")
</template>

<script>
import { mapState } from 'vuex';
import BettingSection from '@/components/bl_My/bl_Betting/bl_BettingSection.vue';

export default {
  components: {
    BettingSection,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      form: {
        params: {
          game_type: 1,
          company_tag: null,
          time_start: null,
          time_end: null,
          page: 1,
          per_page: 10,
        },
      },
      start_date: '',
      end_date: new Date(),
      dateValue: {
        end: new Date(),
        start: this.passedDay(1),
      },
      currentPage: 1,
      totalPages: null,
      // type: ['体育', '真人', '彩票', '棋牌', '电子'],
      type: [
        { value: 1, name: '体育' },
        { value: 2, name: '真人' },
        { value: 4, name: '彩票' },
        { value: 5, name: '棋牌' },
        { value: 6, name: '电子' }],
      typeDisplay: '体育',
      games: [],
      gameDisplay: '',
      bettingLog: [],
    };
  },
  methods: {
    setType(type) {
      this.typeDisplay = type.name;
      this.form.params.game_type = type.value;
      this.$store.dispatch('member/API_GameGroup', {
        params: {
          game_type: this.form.params.game_type,
        },
      }).then((res) => {
        this.games = res.data.data;
        this.gameDisplay = '请选择游戏';
        this.form.params.company_tag = null;
        this.bettingLog = [];
      });
    },
    setGame(game) {
      this.gameDisplay = game.name;
      this.form.params.company_tag = game.company_tag;
      this.$store.dispatch('member/API_IndexMemberBetList', this.form).then((res) => {
        this.bettingLog = res.data.data;
        this.currentPage = res.data.meta.pagination.current_page;
        this.totalPages = res.data.meta.pagination.total_pages;
      });
    },
    load() {
      if (this.currentPage < this.totalPages) {
        this.form.params.page = this.currentPage + 1;
        this.$store.dispatch('member/API_IndexMemberBetList', this.form).then((res) => {
          this.bettingLog = this.bettingLog.concat(res.data.data);
          this.currentPage = res.data.meta.pagination.current_page;
          this.totalPages = res.data.meta.pagination.total_pages;
        });
      } else {
        
      }
    },
    // 時間轉換
    formatDate(time) {
      const date = `${time.getFullYear()}-${time.getMonth() + 1 < 10 ? '0' : ''}${time.getMonth() + 1}-${time.getDate() < 10 ? '0' : ''}${time.getDate()} ${time.getHours() < 10 ? '0' : ''}${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}:${time.getSeconds() < 10 ? '0' : ''}${time.getSeconds()}`;
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
  },
  watch: {
    dateValue: {
      handler(date) {
        const temp_endTime = new Date(date.end.getTime() + (24 * 60 * 60 - 1) * 1000);
        this.form.params.time_start = this.formatDate(date.start);
        this.form.params.time_end = this.formatDate(temp_endTime);
        this.$store.dispatch('member/API_IndexMemberBetList', this.form).then((res) => {
          this.bettingLog = res.data.data;
          this.currentPage = res.data.meta.pagination.current_page;
          this.totalPages = res.data.meta.pagination.total_pages;
        });
      },
    },
  },
  created() {
    // 預設顯示一天內的資料
    // 先取得類別內的子遊戲
    this.$store.dispatch('member/API_GameGroup', {
      params: {
        game_type: 1,
      },
    }).then((res) => {
      this.games = res.data.data;
      this.gameDisplay = res.data.data[0].name;
      // 取得子遊戲內的 1天內 投注記錄
      this.form.params.company_tag = this.games[0].company_tag;
      this.form.params.time_start = this.formatDate(this.passedDay(1));
      this.form.params.time_end = this.formatDate(new Date());
      this.$store.dispatch('member/API_IndexMemberBetList', this.form).then((result) => {
        this.bettingLog = result.data.data;
        this.totalPages = result.data.meta.pagination.total_pages;
      });
    });
    // 預設只能查到90天數據
    this.start_date = this.passedDay(90);
  },
};
</script>

<style lang="scss" scoped>
.betting {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    color: white;
    padding: $height-36 $width-24;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-size: cover;

    &__date {
      color: white;
      font-size: 20px;
    }

    a {
      color: white;
    }

    p {
      margin: 0;
    }
  }

  &__function {
    display: flex;
    align-items: center;
    padding: $height-20 $width-24;

    .betting__type {
      white-space: nowrap;
      padding: $height-12 $width-12;
      border: 1px solid $origin;
      border-radius: 20px;
      background-color: white;
      color: $origin_darkest;
      margin-right: $width-8;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 18px;
      }
    }
  }

  &__time {
    padding: 0 $width-24;
    margin-bottom: $height-20;
    color: $origin_dark;
    font-size: $text-14;
    text-align: center;
  }

  &__main {
    flex: 1;
    padding: 0 $width-24;
    overflow: auto;
  }
}

// date-picker
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
