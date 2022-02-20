<template lang="pug">
.container-fluid
  .container.betGameWarp.mb-5
    //- 切换选单
    .row.no-gutters.my-3
      .col-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          span 游戏竞猜
      bl_betMenuBtn
    .betGameType
      //- banner
      .row.no-gutters.my-3
        bl_betGameBanner
      //- 暂无赛事
      .row(v-if='betGameList.length<=0')
        .w-100.text-center
          img(:src='img3')
          p.text-white 暂无赛事
      //- 赛事列表
      .row.no-gutters.my-3(v-else)
        bl_betGameItem(v-for='(item, index) in betGameList', :item="item")
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
      img3:`${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
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
  p{
    font-size: 14px;
    color: $garyBlue_Darkest;
  }
}
.betGameRuleImg_1{
  max-width: 360px;
}
</style>
