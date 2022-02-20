<template lang='pug'>
.pageContent.page
  .p-3
    .row.no-gutters
      .col-12.text-center.text-md-left.my-3
        h5 
          .i.fas.fa-gift.mr-2
          | 優惠列表
    .row
      .col-12.col-sm-6.col-md-4.col-lg-3.my-2(v-for='(item, index) in BannerList')
        .promotionItem(@click='gotopromotiondetail(item.id)')
          img(:src='item.bannerImages' width='100%')
          h5.text-center.my-3.px-2 {{item.bannerTitle}}
          p.fs13.Gray_c7.text-center.my-3.px-2 {{item.bannerSubtitle}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('index', ['BannerList']),
  },
  data() {
    return {
    };
  },
  methods: {
    betting() {
      const Card = { component: 'BettingCard', title: '投注單' };
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
    selectSeries(item) {
      this.currentSeries = item;
    },
    gotopromotiondetail(id) {
      this.$router.push(`/promotiondetail?id=${id}`);
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.page{
  background: $gray_f5;
}
.gameList{
  .title{
    border-left: 8px solid #000 ;
    .moreLink{
      cursor: pointer;
      color: $Color_2;
    }
  }
}
.promotionItem{
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
  background-color: #ffffff;
  overflow: hidden;
  .gameInfo{
    font-size: 12px;
    .gameName, .divider{
      color:#fff;
    }
    .moreInfo{
      cursor: pointer;
      color:#fff;
    }
  }
}

.teamName{
  color: #fff;
  overflow : hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teamScore{
  color: #fff;
}
.gameBetBTN{
  cursor: pointer;
  margin: 0px 4px;
  padding: 0 4px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  border-radius: 12px;
  font-size: 12px;
  border: solid 1px #ffffff;
  background-color: rgba(2, 119, 189, 0.15);
  &:hover{
    background-color: rgba(2, 119, 189, 0.5);
  }
  .odds{
    color: $Color_1;
  }
}
.rounddDropdown{
  border-radius: 24px;
  overflow: hidden;
}
.seriesGameName{
  border-left: 8px solid $Color_2 ;
  padding-left: 10px;
  .moreLink{
    cursor: pointer;
    color: $Color_2;
  }
}
.Amount{
  color: white;
  height: 42px;
  line-height: 42px;
  background: $Color_1;
  border-radius: 4px;
}

</style>
