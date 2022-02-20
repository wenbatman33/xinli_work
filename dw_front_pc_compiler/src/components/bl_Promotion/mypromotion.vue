<template lang="pug">
.BLOCK.CENTER.d-flex
  .wrap
    .content.p-4
      .row.mb-4
        .col-12
          el-button(:type='(currentIndex == 0)?"primary":""', round, @click='getMyPromotionList(0)') 未完成
          el-button(:type='(currentIndex == 1)?"primary":""', round, @click='getMyPromotionList(1)') 已完成
          el-button.float-right(type='primary',@click='isGiveUpMode=!isGiveUpMode') 放弃
      .row
        //- 没有优惠状态
        .col-12.mb-4(v-if='myPromotionList.length<=0')
          .col-12.d-flex.justify-content-center.align-items-center.nullPoromotion
            .text-center
              img(:src='nullPoromotion')
              p 暂无优惠
        //- 若有优惠时显示
        .col-4.mb-4(v-else, v-for='(item, index) in myPromotionList', :key='index')
          .promotionCard
            .giveUpBtn(v-if='isGiveUpMode', @click='giveUpPrompt(item, item.promotion.data[0].promotionApplyMethod.value)')
              i.fas.fa-times
            .promotionCardTop.p-4(@click='opentContentDetal(item)')
              .title {{item.promotion.data[0].promotionTitle}} 
              .des {{item.promotion.data[0].promotionContent | noneHtmlCode}}
              .status 
                span 
                  i.fas.fa-calendar-check.mr-1(v-if='item.promotion.data[0].promotionApplyMethod.value===1')
                  i.fas.fa-hourglass-half.mr-1(v-else)
                span.mr-4 {{item.promotion.data[0].promotionApplyMethod.display}}参与
                span 
                  i.fas.fa-clock.mr-1
                span {{item.promotion.data[0].promotionRuleTimeStart.slice(0,10)}} ~ {{item.promotion.data[0].promotionRuleTimeEnd.slice(0,10)}}
            .promotionCardSub 
              .px-4.py-2
                //- 周期性活动
                .row(v-if='item.promotion.data[0].promotionApplyMode.length>1')
                  div(v-for='(subItem, index) in item.promotionApplyMode', 
                    :key='index', :class='[(item.promotion.data[0].promotionApplyMode.length <= 1)? "col-12": "col-6"]')
                    el-button.w-100(type='primary', :class='getButtonColor(subItem.value)', @click='cyclePage(item.promotionId)') 
                      span {{subItem.display}} 
                      //- 状态长度大于 1
                      span(v-if='item.promotionApplyMode.length>1') ({{subItem.statusCnt}})
                //- 非周期性活动
                .row(v-else)
                  .col-12(v-for='(subItem, index) in item.promotionApplyMode', :key='index')
                    el-button.w-100(type='primary', :class='getButtonColor(subItem.value)', @click='openPromotionDetal(item)')
                      span {{subItem.display}} 
    el-dialog(title='确认放弃', :visible.sync='dialogVisible', width='30%',center)
      p.text-center.m-0 {{giveUpPromotionMsg}}
      span.dialog-footer(slot='footer')
        el-button(@click='dialogVisible = false') 取 消
        el-button(v-if='giveUpPromotionType == 2', type='primary', @click='giveUp') 确 定
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isGiveUpMode: false,
      currentIndex: 0,
      dialogVisible: false,
      giveUpPromotionItem: {},
      giveUpPromotionMsg: '',
      giveUpPromotionType: 0,
      nullPoromotion: `${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
    };
  },
  computed: {
    ...mapState('promotion', ['myPromotionList']),
  },
  methods: {
    // 取得我的优惠
    getMyPromotionList(index) {
      const payload = {};
      payload.status = index;
      this.currentIndex = index;
      this.$store.dispatch('promotion/getMyPromotionList', payload);
      if (index === 0) {
        this.$matomo_my_myPromotionType('未完成');
      } else {
        this.$matomo_my_myPromotionType('已完成');
      }
    },
    cyclePage(id) {
      console.log('cyclePagecyclePage');
      this.$router.push({ path: `/my/cycle/${id}` }).catch((err) => {});
    },
    // 上方开启优惠明细判别
    opentContentDetal(item) {
      // promotionLinkMethod.value===2 時跳新頁籤
      if (item.promotion.data[0].promotionLinkMethod.value === 2) {
        window.open(item.promotion.data[0].promotionLinkPc, '_blank');
      } else {
        this.$matomo_my_myPromotionId(item.promotion.data[0].id);
        // promotion_id
        this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_id: item.promotion.data[0].id } });
      }
    },
    // 开启优惠明细
    openPromotionDetal(item) {
      this.$matomo_my_myPromotionId(item.promotion.data[0].id);
      // promotion_detail_id
      this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_detail_id: item.promotion.data[0].id } });
    },
    // 按钮颜色
    getButtonColor(value) {
      let color;
      if (value === 2) {
        color = 'yBtn';
      } else if (value === 3) {
        color = 'gBtn';
      } else if (value === 1 || value === 4 || value === 5) {
        color = 'grayBtn';
      }
      return color;
    },
    // 放弃优惠提示
    giveUpPrompt(item, applyMethod) {
      this.dialogVisible = true;
      this.giveUpPromotionItem = item;
      this.giveUpPromotionType = applyMethod;
      if (applyMethod === 2) {
        this.giveUpPromotionMsg = '亲～放弃后就无法再申请哟';
      } else {
        this.giveUpPromotionMsg = '亲～自动申请的优惠无法放弃哟';
      }
    },
    // 放弃优惠
    giveUp() {
      const vm = this;
      const payload = {
        promotion_id: vm.giveUpPromotionItem.promotion.data[0].id,
      };
      this.$store.dispatch('promotion/promotionGiveUp', payload)
        .then((res) => {
          vm.dialogVisible = false;
          vm.getMyPromotionList(vm.currentIndex);
        });
    },

  },
  mounted() {
    this.getMyPromotionList(0);
  },
};
</script>
<style lang="scss" scoped>
.promotionCard{
  min-height: 152px;
  border-radius: 6px;
  border: solid 1px $garyBlue_light;
  background-color: white;
  // width: 100%;
  min-width: 100%;
  max-width: 100%;
  overflow: hidden;
  .status{
    font-size: 12px;
    line-height: 2;
    color: $garyBlue_Darkest;
  }
  .promotionCardTop{
    cursor: pointer;
    .title{
      font-size: 16px;
      // font-weight: 600;
      line-height: 2;
      color: $blueDark;
      max-width: 300px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .des{
      font-size: 14px;
      line-height: 2;
      color: $garyBlue_Darkest;
      max-width: 300px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
  .promotionCardSub{
    text-align: center;
    line-height: 44px;
    border-top: 1px solid $garyBlue_light;
  }
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
.nullPoromotion{
  min-height: 500px;
  color: $garyBlue_lightest;
}
.giveUpBtn{
  position: absolute;
  cursor: pointer;
  right: 16px;
  top: 0;
  width: 32px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  border-radius: 4px;
  background-color: $DW_orange;
  color: white;
}
</style>
