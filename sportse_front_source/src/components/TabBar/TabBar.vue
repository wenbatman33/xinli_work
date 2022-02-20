<template lang='pug'>
.tabBar
  .row.no-gutters.d-flex.justify-content-between
    .col.text-center.tabBtn(:class='{"active": $route.path === "/"}')
      router-link(to='/')
        .icon
          .i.fas.fa-home
        .des 首頁
    .col.text-center.tabBtn(:class='{"active": $route.path === "/promotion"}')
      router-link(to='/promotion')
        .icon
          .i.fas.fa-gift
        .des 優惠
    .col.text-center.tabBtn(:class='{"active": $route.path === "/game"}')
      router-link(to='/game')
        .icon
          .i.fas.fa-futbol
        .des 賽事
    .col.text-center.tabBtn(:class='{"active": $route.path === "/betlog"}')
      router-link(to='/betlog')
        .icon
          .i.fas.fa-clipboard-list
        .des 注單
    .col.text-center.tabBtn(:class='{"active": $route.path=== "/my"}')
      router-link(to='/my')
        .icon
          .i.fas.fa-user
        .des 我的
</template>

<script>
export default {
};
</script>
<style lang='scss' scoped>
.tabBar{
  height: 78px;
  width: 100%;
  position: fixed;
  overflow: hidden;
  bottom: 0;
  z-index: 100;
  color: #fff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background-color: $Color_2;
  a{
    color: #fff;
  }
}
.tabBtn{
  cursor: pointer;
  margin-top: 2px;
  .icon{
    font-size: 32px;
  }
  .des{
    font-size: 12px;
  }
  &:hover{
    color: $Color_1;
  }
}
.active{
  color: $Color_1;
  a{
    color: $Color_1;
  }
}
</style>
