<template lang="pug">
.BLOCK.CENTER.d-flex
  .wrap
    .content.px-4.py-2(v-if='myPromotionDetail.length>0')
      .Breadcrumb
        span.highLight
          router-link(to='/my/mypromotion') 我的优惠 
        span / 活动详情
      h4.mt-2 {{myPromotionDetail[0].promotion.data[0].promotionTitle}}
      p.promotionContent {{myPromotionDetail[0].promotion.data[0].promotionSubTitle}}
      el-divider
      .row
        .col-4.my-2(v-for='(item, index) in myPromotionDetail')
          .promotionCrad.d-flex.flex-row.p-3.justify-content-between.align-items-center
            div
              .bonus.my-3
                span {{item.promotion.data[0].promotionType.display}} {{item.promotionBonus}}
              .time.my-3
                i.fas.fa-clock.mr-1
                span {{item.promotionDetailUpdatedAt}}
            div.text-center
              el-button.w-100(type='primary', 
                :class='getButtonColor(item.promotionDetailStatus.value)',
                @click='openPromotionDetal(item, item.promotionDetailStatus.value)') {{item.promotionDetailStatus.display}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    // ...mapState('promotion', [
    //   'myPromotionDetail',
    // ]),
  },
  data() {
    return {
      myPromotionDetail: {},
    };
  },
  methods: {
    getMyPromotionDetail() {
      const vm = this;
      const payload = {};
      payload.promotion_id = this.$route.params.id;
      this.$store.dispatch('promotion/getMyPromotionDetail', payload)
        .then((res) => {
          vm.myPromotionDetail = res.data.data;
        });
    },
    getButtonColor(value) {
      let color;
      if (value === 2) {
        color = 'yBtn';
      } else if (value === 3) {
        color = 'gBtn';
      } else if (value === 1 || value === 4 || value === 5 || value === 6 || value === 7) {
        color = 'grayBtn';
      }
      return color;
    },
    openPromotionDetal(item, value) {
      this.$store.commit('promotion/setCurrentPromotion', item);
      this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_detail_id: item.id } });
    },
  },
  beforeCreate() {
    //  清空PromotionDetail 避免显示前一笔资料
    this.$store.commit('promotion/setMyPromotionDetail', '', { root: true });
  },
  mounted() {
    this.getMyPromotionDetail();
  },
};
</script>
<style lang="scss" scoped>
.promotionContent{
  font-size: 16px;
  color: $garyBlue_Dark; 
}
.Breadcrumb{
  width: 100%;
  height: 64px;
  left: 64px;
  line-height: 64px;
  color: $garyBlue_Dark;
}
.highLight{
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: $DW_Color;
  a{
    text-decoration: none;
    color: $DW_Color;
  }
}
.promotionCrad{
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: solid 1px $garyBlue_lightest;
  background-color: $garyBlue_lightest;
  .bonus{
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    color: $blueDark;
    span{
      font-size: 16px;
      // font-weight: 600;
      line-height: 1;
      color: $blueDark;
    }
  }
  .time{
    font-size: 12px;
    line-height: 1;
    color: $garyBlue_Dark;
  }
}
.noCursor{
  cursor: default;
}
.yBtn{
  background: $DW_yellow;
  border-color: $DW_yellow;
  &:hover,&:active,&:focus{
    background: $DW_yellow;
    border-color: $DW_yellow;
  }
}
.gBtn{
  cursor: pointer!important;
  background: $DW_greenMiddle;
  border-color: $DW_greenMiddle;
  &:hover,&:active,&:focus{
    background: $DW_greenMiddle;
    border-color: $DW_greenMiddle;
  }
}
.grayBtn{
  background: $garyBlue_Dark;
  border-color: $garyBlue_Dark;
  &:hover,&:active,&:focus{
    background: $garyBlue_Dark;
    border-color: $garyBlue_Dark;
  }
}

</style>
