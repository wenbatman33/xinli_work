<template lang="pug">
.page
  .headBg
  .pt-3.px-3.d-flex.flex-column.h-100
    //- 標题
    h2.text-white.d-flex.align-items-center.mt-3
      .icon(:style="`background-image: url(${trophyIcon})`")
      .ml-2 市场列表
    .d-flex.flex-fill.overflow-auto.h-100
      .my-4.mr-2.d-flex.flex-column(style="width: 250px;")
        b-button-group.mb-2.px-1
          button.tab.px-3.py-2.col-6(
            @click="type = 'all'"
            style="white-space: nowrap; border-radius: 8px 0px 0px 0px;"
            :class="{ 'active1' : type === 'all' }"
          ) 全部赛事
          button.tab.px-3.py-2.col-6(
            @click="type = 'special'"
            style="white-space: nowrap; border-radius: 0px 8px 0px 0px;"
            :class="{ 'active1' : type === 'special' }"
          ) 选择联盟
        .allTeam.overflow-auto.px-1.h-100(v-if="type === 'all'")
          .sibebar-block(v-for="date in cardData" :key="date.date_time")
            .sidebar-card.mb-2(
              v-for="game in date.sub_item"
              :key="game.eid"
              @click="setActiveCard(game.eid)"
              :class="{ 'active': activeCard === game.eid}"
            )
              .sidebar-card-header.p-2
                .text-center {{ game.esdate }} {{ moment(game.esdt * 1000).format('HH:mm') }}
                .text-center.category {{ filterName(game.cty, cateList) }}
                .text-center(style="word-break: break-word;") {{ game.cn }}
              .sidebar-card-footer.p-2
                .text-center.team1 {{ game.ht }}
                .text-center.vs vs
                .text-center.team2 {{ game.ot }}
        .specialTeam.overflow-auto.px-1.h-100(v-if="type === 'special'" style="flex: 1;")
          div(v-for="(item, index) in selectData" :key="item.cty")
            .tabGroup.px-4.py-2.mb-2(v-b-toggle="`collapse-${index}`" )
              span {{ filterName(item.cty, cateList) }}
              b-icon(icon="chevron-down")
            b-collapse(:id="`collapse-${index}`")
              .sidebar-card.mb-2(
                v-for="game in item.data"
                :key="game.eid"
                @click="setActiveCard(game.eid)"
                :class="{ 'active': activeCard === game.eid}"
              )
                .sidebar-card-header.p-2
                  .text-center {{ game.esdate }} {{ moment(game.esdt * 1000).format('HH:mm') }}
                  .text-center.category {{ filterName(game.cty, cateList) }}
                  .text-center(style="word-break: break-word;") {{ game.cn }}
                .sidebar-card-footer.p-2
                  .text-center.team1 {{ game.ht }}
                  .text-center.vs vs
                  .text-center.team2 {{ game.ot }}
      .d-flex.flex-column.flex-fill
        .title-block.mt-4.p-3.mb-2(v-if="activeCard !== 0")
          .font-20.mb-3.d-flex.justify-content-between
            span {{ title }}
            .font-14 市场列表 {{ countDownTime }} 秒后更新
          .d-flex
            .font-12 {{ team1 }}
            .font-12.mx-2 VS.
            .font-12 {{ team2 }}
            .font-12.mx-2 {{ date }}
            .font-12 {{ time }}
        .d-flex.flex-wrap.flex-fill.overflow-auto
          .table.px-1.pb-3.col-6(v-for="gameType in tableData" :key="gameType.ty")
            template(v-if="gameType.list.length !== 0")
              .table-title.text-white.px-4.py-3
                .ml-2 {{ filterName(gameType.ty, tyList) }}
                .mr-2 成交量: ¥{{ gameType.total_trade_amount | toMoney2 }}
              table.w-100.table-inner
                thead(v-if="activeCard !== 0")
                  tr
                    th.text-center
                    th.text-center 选项
                    th.text-center
                    th.text-center 获利 %
                    th.text-center 可交易量
                    th.text-center
                tbody
                  tr.bg-white(v-for="item in gameType.list" :key="item.wid")
                    td.text-center
                      b-badge.red-tag.px-2.py-1(v-show="item.hot === 1" pill) 热门
                    td.text-center {{ item.name }}
                    td.text-center
                      b-badge.green-tag.px-2.py-1(v-show="item.principal === 1" pill) 保本
                    template(v-if="item.profit === 0 || item.amount === 0")
                      td.text-center
                      td.text-center
                      td.text-center
                        button.play-button.px-3.py-1.disabled 下单
                    template(v-else)
                      td.text-center {{ item.profit | toPercent }}
                      td.text-center ¥{{ item.amount | toMoney2 }}
                      td.text-center
                        button.play-button.px-3.py-1(@click="playGame(item)") 下单
  b-modal(
    v-model="playModalVisible"
    body-class="play-modal"
    hide-header
    hide-footer
  )
    PlayModal(:data="playData" :card="activeCardData" :moneyList="moneyList" @getWaveData="getGameWaveAll")
  b-modal(
    v-model="quickMoneyModalVisible"
    body-class="play-modal"
    hide-header
    hide-footer
  )
    QuickMoneyModal(@update="updateMoneyList")
</template>

<script>
import moment from 'moment';
import PlayModal from '@/components/playModal.vue';
import QuickMoneyModal from '@/components/quickMoneyModal.vue';

const cateList = [
  {
    name: '【 其他联盟 】',
    value: 0,
  },
  {
    name: '【 电竞足球 】',
    value: 1,
  },
  {
    name: '【 真人足球 】',
    value: 2,
  },
  {
    name: '【 虚拟足球 】',
    value: 3,
  },
];

const tyList = [
  {
    name: '上半场波胆',
    value: 1,
  },
  {
    name: '波胆',
    value: 2,
  },
  {
    name: '总得分',
    value: 3,
  },
];

const hotList = [
  {
    name: '普通',
    value: 0,
  },
  {
    name: '热门',
    value: 1,
  },
];

const principalList = [
  {
    name: '普通注单',
    value: 0,
  },
  {
    name: '保本注单',
    value: 1,
  },
];

export default {
  name: 'marketList',
  components: {
    PlayModal,
    QuickMoneyModal,
  },
  data() {
    return {
      trophyIcon: `${process.env.VUE_APP_STATIC}/img/trophy-white.svg`,
      type: 'all',
      imgUrl: `${process.env.VUE_APP_STATIC}/img/pic-transaction.png`,
      activeCard: 0,
      activeCardData: {},
      title: '',
      team1: '',
      team2: '',
      date: '',
      time: '',
      cateList,
      tyList,
      hotList,
      principalList,
      moneyList: {},
      cardData: [],
      tableData: [],
      playData: [],
      tempConnect: null,
      countDownTimer: null,
      initCountDownTime: 60,
      countDownTime: 60,
      onSocket: false,
      nowEid: 0,
    };
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    odds(data) {
      this.wsReceiver(data);
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.admin.isLogin;
    },
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    playModalVisible: {
      get() {
        return this.$store.state.admin.playModal;
      },
      set(status) {
        this.$store.dispatch('admin/setPlayModal', status);
      },
    },
    quickMoneyModalVisible: {
      get() {
        return this.$store.state.admin.quickMoneyModal;
      },
      set(status) {
        this.$store.dispatch('admin/setQuickMoneyModal', status);
      },
    },
    selectData() {
      const temp = [];
      this.cardData.forEach((element) => {
        element.sub_item.forEach((item) => {
          const index = temp.findIndex((indexItem) => indexItem.cty === item.cty);
          if (index > -1) {
            temp[index].data.push(item);
          } else {
            temp.push({
              cty: item.cty,
              data: [item],
            });
          }
        });
      });
      return temp;
    },
  },
  methods: {
    moment,
    filterName(type, typeList) {
      if (typeList.filter((item) => item.value === type)[0] === undefined) return '';
      return typeList.filter((item) => item.value === type)[0].name;
    },
    startCounting(time) {
      this.countDownTime = time;
      this.countDownTimer = setInterval(() => {
        this.countDownTime -= 1;
        if (this.countDownTime === 0) {
          clearInterval(this.countDownTimer);
          this.getData();
          this.startCounting(time);
        }
      }, 1000);
    },
    reStartCounting() {
      clearInterval(this.countDownTimer);
      this.startCounting(this.initCountDownTime);
    },
    playGame(item) {
      if (this.isLogin) {
        this.updateMoneyList();
        this.$store.dispatch('admin/setPlayModal', true);
        this.playData = item;
      } else {
        this.$store.dispatch('admin/setLoginModal', true);
      }
    },
    checkEidExist(eid) {
      const allData = this.cardData.flatMap((v) => v.sub_item);
      const index = allData.findIndex((item) => item.eid === eid);
      let temp;
      if (index > -1) {
        temp = allData[index];
      } else {
        [temp] = allData;
        this.$router.replace({ name: 'marketList' }).catch(() => {});
      }
      return temp;
    },
    setActiveCard(eid) {
      const result = this.checkEidExist(eid);
      if (this.activeCard !== result.eid) {
        this.reStartCounting();
        this.disconnectSocket(eid);
        this.getGameWaveAll(result.eid);
        this.connectSocket(result.eid);
      } else if (!this.onSocket) {
        this.connectSocket(eid);
        this.getGameWaveAll(eid);
      } else {
        this.getGameWaveAll(eid);
      }
      this.activeCard = result.eid;
      this.activeCardData = result;
      this.title = result.cn;
      this.team1 = result.ht;
      this.team2 = result.ot;
      this.date = result.esd;
      this.time = this.moment(result.esdt * 1000).format('HH:mm');
    },
    getGameList() {
      this.$store.dispatch('admin/getGameList', {
        start_date: moment().startOf('day').unix(),
        end_date: moment().endOf('day').subtract(-3, 'd').unix(),
      }).then((res) => {
        this.cardData = res.data.data;
        if (this.$route.query.id) {
          this.activeCard = Number(this.$route.query.id);
          this.setActiveCard(this.activeCard);
        } else if (this.activeCard !== 0) {
          this.setActiveCard(this.activeCard);
        } else {
          this.activeCard = this.cardData[0].sub_item[0].eid;
          this.setActiveCard(this.activeCard);
        }
      });
    },
    getGameWaveAll(eid) {
      this.$store.dispatch('admin/getGameWaveAll', {
        eid,
      }).then((res) => {
        this.tableData = res.data.data.wave.sort((a, b) => a.ty - b.ty);
      });
    },
    updateMoneyList() {
      this.$store.dispatch('admin/getMemberInfo').then((res) => {
        this.moneyList = JSON.parse(`${res.data.data.quick_order_amount}`);
      });
    },
    connectSocket(eid) {
      this.onSocket = true;
      this.$socket.client.emit('eventJoin', eid);
      this.nowEid = eid;
      this.$store.dispatch('admin/setNowEid', this.nowEid);
    },
    disconnectSocket(eid) {
      this.onSocket = false;
      this.$socket.client.emit('eventLeave', eid);
    },
    getData() {
      this.getGameList();
    },
    wsReceiver(e) {
      this.tableData = JSON.parse(e).wave;
    },
  },
  created() {
    this.getData();
    this.startCounting(this.countDownTime);
  },
  beforeDestroy() {
    clearInterval(this.countDownTimer);
    this.disconnectSocket(this.nowEid);
  },
};
</script>

<style lang="scss" scoped>
.tab {
  background-color: white;
  color: black;
  border: none;

  &.active1 {
    background-color: #f76b1c;
    color: white;
  }
}

.sidebar-card {
  display: block;
  text-decoration: none;
  background-color: white;
  border-radius: 8px;
  color: #8e8e93;
  font-size: 12px;
  box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
  cursor: pointer;

  &-header {
    border-bottom: 1px solid #e1e2e3;
  }

  .category {
    color: #f76b1c;
  }

  .team1 {
    color: black;
  }

  .team2 {
    color: black;
  }
}

.sidebar-card.active {
  background-color: #f76b1c;
  color: #ffe41c;
  box-shadow: inset 0 0 4px 0 rgba(0, 172, 171, 0.3);

  &-header {
    border-bottom: 1px solid #f76b1c;
  }

  .category {
    color: #ffe41c;
  }

  .team1 {
    color: white;
  }

  .team2 {
    color: white;
  }
}

.title-block {
  background: linear-gradient(to bottom, #404040, #1e1e1e);
  border-radius: 8px;
  color: white;
}

.table {

  &:nth-child(2) {
    order: -1;
  }

  .table-title {
    background-color: black;
    display: flex;
    justify-content: space-between;
    border-radius: 8px 8px 0 0;
  }
  .table-inner {
    box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
    border-radius: 0 0 8px 8px;

    thead {
    color: white;
      tr {
        background-color: #575759;
      }
    }
  }

  .play-button {
    background-color: #f76b1c;
    border: none;
    box-shadow: 0 0 6px 0 rgba(247, 107, 28, 0.5);
    border-radius: 14px;
    font-size: 10px;
    color: white;

    &.disabled {
      background-color: #575759;
      box-shadow: none;
      cursor: unset;
    }
  }
}

.tabGroup {
  background-color: #f76b1c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

/deep/ .modal-content {
   background-color: unset;
   border: none;
}

/deep/ .play-modal {
  background-color: #202020;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.64);
  color: white;
  border-radius: 20px;
  padding: 0;
}

.red-tag {
  font-size: 8px;
  background: linear-gradient(to right, #c70039, #ff5733);
  box-shadow: 0 0 4px 0 rgba(199, 0, 57, 0.48);
}

.green-tag {
  font-size: 8px;
  background: linear-gradient(to right, #429321, #b4ec51);
  box-shadow: 0 0 4px 0 rgba(66, 147, 33, 0.49);
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
  vertical-align: bottom;
}
</style>
