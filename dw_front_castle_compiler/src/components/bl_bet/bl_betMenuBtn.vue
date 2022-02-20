<template lang="pug">
.col-12.text-center
  .menuBtn.mx-3(v-for='(item, index) in betGameMenuArray', @click='changeCurrentPath(item.path, item.name)' ) 
    .menuBtnRect(:class='{"active": (currentPath===item.path)}')
      .i.fas(:class='item.icon')
    p.text-white {{item.name}}
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['item'],
  data() {
    return {
      currentPath:'',
      betGameMenuArray:[
        { icon:'fas fa-fist-raised', name:'竞猜盘口', path:'/bet' },
        { icon:'fas fa-receipt', name:'投注纪录', path:'/betlog' },
        { icon:'fas fa-exclamation-circle', name:'竞猜规则', path:'/betrule' }],
    };
  },
  methods: {
    changeCurrentPath(path, name){
      this.$matomo_bet_category(name);
      this.$router.push({ path }).catch((err) => {});
    }
  },
  mounted () {
    this.currentPath = this.$route.path;
  }
};
</script>
<style lang='scss' scoped>
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
</style>
