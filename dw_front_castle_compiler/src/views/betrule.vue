<template lang="pug">
.container-fluid
  .container.betGameWarp.mb-5
    //- 切换选单
    .row.no-gutters.my-3
      .col-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 竞猜规则
      bl_betMenuBtn
    .betGameType
      .betBackground
        h5.text-center.my-3 游戏竞猜规则
        .betContent
          p 1、系统每日将开出指定体育赛事盘口，供玩家竞猜。
          p 2、玩家可根据「竞猜盘口」所开出的赛事使用梦基金进行投注。
          p 3、最晚开赛前一小时需投注完成，逾期盘口将会关闭。
          p 4、投注赔率 ：
          p 
            div.text-center.my-3
              img.betGameRuleImg_1(:src='img1')
        .betContent
          p 5、每场竞猜结果我们将会在当日尽快处理。
          p 6、如有任何异议，「梦工厂」保留最终决定权。
          p 7、竞猜介面说明：
        p 
          div.my-3
            img.w-100.betGameRuleImg(:src='img2')
        p.text-center.text-danger ※ 所有赛事不可跨日投注 ※
</template>
<script>
import bl_betMenuBtn from '@/components/bl_bet/bl_betMenuBtn.vue';
import bl_betGameBanner from '@/components/bl_bet/bl_betGameBanner.vue';
import bl_betGameItem from '@/components/bl_bet/bl_betGameItem.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    bl_betMenuBtn,
    bl_betGameBanner,
    bl_betGameItem,
  },
  data () {
    return {
      betGameMenuArray:[
        { icon:'fas fa-fist-raised', name:'竞猜盘口' },
        { icon:'fas fa-receipt', name:'投注纪录', },
        { icon:'fas fa-exclamation-circle', name:'竞猜规则', }],
      img1:`${window.CDN_ASSETS}/static/img/dw/group-14@3x.png`,
      img2:`${window.CDN_ASSETS}/static/img/dw/group-12@3x.png`,
      currentType: 0,
    }
  },
  computed: {
    ...mapState('bet', ['betGameList']),
  },
  methods: {
    changeCurrentType(val){
      this.currentType = val;
    }
  },
  mounted() {
    this.$store.dispatch('bet/getBetGameList');
  },
};
</script>

<style lang="scss" scoped>
.betGameWarp{
  min-height: 500px;
}
.menuBtn{
  display:inline-block;
  p{
    margin-top: 5px;
    font-size: 12px;
  }
}
.menuBtnRect{
  padding: 0 10px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 12px;
  box-shadow: 0 0 20px 0 $DW_ColorAlpha_40;
  background-color: $DW_ColorAlpha_20;
  color: $DW_Color;
  cursor: pointer;
  border: 1px $DW_Color solid;
  
}
.active{
  background: $DW_Color;
  color: white;
}

.betBackground{
  border-radius: 16px;
  box-shadow: 0 0 20px 0 $DW_Color;
  background-color: #ffffff;
  padding: 20px;
  border:  1px solid $whiteAlpha_30;
  .betContent{
    margin: auto auto;
    @include media_xs{
      width: 100%;
    }
    @include media_sm{
      width: 460px;
    }
    @include media_md{
      width: 500px;
    }
    @include media_lg{
      width: 500px;
    }
    @include media_xl{
      width: 500px;
    }
  }
  p{
    font-size: 14px;
    color: $garyBlue_Darkest;
  }
}
.betGameRuleImg_1{
  min-width: 200px;
  max-width: 360px;
  @include media_xs{
    width: 100%;
    height: auto;
  }
  @include media_sm{
    width: 260px;
    height: auto;
  }
  @include media_md{
    width: 360px;
    height: auto;
  }
  @include media_lg{
    width: 360px;
    height: auto;
  }
  @include media_xl{
    width: 360px;
    height: auto;
  }
}
</style>
