<template lang="pug">
  #gameList.pb-3
    .gameList-item.px-2.pt-2.pb-4.d-flex.flex-column.justify-content-between.align-items-center(
      v-for="(item, index) in data"
      :key="item.eid"
    )
      .title.font-weight-bold.my-1 【 {{ item.cn }} 】
      .game-detail.d-flex.flex-column.justify-content-center.align-items-center.w-100(
        :style="{ backgroundImage: 'url(' + getCircle(index) + ')' }"
      )
        .font-18(:class="colorList[index % 3]") K
        .font-32(:class="colorList[index % 3]") {{ item.total_amount | toMoney2 }}
        .font-18(:class="colorList[index % 3]") 成交量
      .font-16.color-gray.my-1 {{ item.esd }} {{ moment(item.esdt * 1000).format('HH:mm') }}
      .font-16.color-orange.mt-1 {{ filterName(item.cty, cateList) }}
      .font-16.my-2 {{ item.ht }} vs {{ item.ot }}
      button.market-button.font-14.py-1.px-3.mt-1(@click="enterMarket(item)") 进入市场
</template>

<script>
import moment from 'moment';

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

export default {
  props: ['data'],
  data() {
    return {
      circle1: `${process.env.VUE_APP_STATIC}/img/pic-bg-game-1.svg`,
      circle2: `${process.env.VUE_APP_STATIC}/img/pic-bg-game-2.svg`,
      circle3: `${process.env.VUE_APP_STATIC}/img/pic-bg-game-3.svg`,
      tyList,
      cateList,
      colorList: [
        'color-green',
        'color-orange',
        'color-blue',
      ],
    };
  },
  methods: {
    moment,
    filterName(type, typeList) {
      if (typeList.filter((item) => item.value === type)[0] === undefined) return '';
      return typeList.filter((item) => item.value === type)[0].name;
    },
    getCircle(index) {
      return this[`circle${(index % 3) + 1}`];
    },
    enterMarket(game) {
      this.$store.dispatch('admin/checkGameIsOrder', {
        eid: game.eid,
      }).then((res) => {
        if (res.data.data) {
          this.$router.push({ name: 'marketList', query: { id: game.eid } });
        } else {
          this.$message.error('该赛事已停止下单');
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#gameList {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #e1e2e3;
  width: 90%;
  margin: 0 auto;
  max-width: 1600px;

  .gameList-item {
    width: 33.3%;
    text-align: center;

    &:nth-child(2) {
      border-left: 1px solid #e1e2e3;
      border-right: 1px solid #e1e2e3;
    }

    .game-detail {
      height: 200px;
      padding: 20px 0;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    .market-button {
      background-color: #f1433f;
      border: none;
      color: white;
      border-radius: 15px;
    }
  }
}

.color-green {
  color: #22d8da;
}

.color-orange {
  color: #f76b1c;
}

.color-blue {
  color: #1890ff;
}

.color-gray {
  color: #8e8e93;
}
</style>
