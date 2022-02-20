<template lang='pug'>
  .sidebar.m-1
    el-menu.h-100(:default-active='getUrlID', @open='handleOpen', @close='handleClose')
      router-link(to="/member/overview" v-on:click.native='GA_wallet_personwallet')
        el-menu-item(index='/member/overview')
          span 个人钱包
      el-submenu(index='cashier')
        template(slot='title')
          span 出纳台
        el-menu-item-group
          router-link(to="/member/cashier/1")
            el-menu-item(index='/member/cashier/1')
              span 存款
          router-link(to="/member/cashier/3")
            el-menu-item(index='/member/cashier/3')
              span 转账
          router-link(to="/member/cashier/2")
            el-menu-item(index='/member/cashier/2')
              span 提款
      el-submenu(index='bonus')
        template(slot='title')
          span 领奖中心 
          span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.totalCnt>0') {{MemberOfferCount.totalCnt}}
        el-menu-item-group
          router-link(to="/member/bonus/1")
            el-menu-item(index='/member/bonus/1')
              span 返水 
              span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.returnCnt>0') {{MemberOfferCount.returnCnt}}
          router-link(to="/member/bonus/2")
            el-menu-item(index='/member/bonus/2')
              span 救援金 
              span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.rescueCnt>0') {{MemberOfferCount.rescueCnt}}
          router-link(to="/member/bonus/3")
            el-menu-item(index='/member/bonus/3')
              span 红利 
              span.badge.badge-pill.badge-danger.text-white.badgeForTG18(v-if='MemberOfferCount.bonusCnt>0') {{MemberOfferCount.bonusCnt}}
      el-submenu(index='records')
        template(slot='title')
          span 交易纪录
        el-menu-item-group
          router-link(to="/member/records/sum")
            el-menu-item(index='/member/records/sum')
              span 资金纪录
          router-link(to="/member/records/bet")
            el-menu-item(index='/member/records/bet')
              span 流水纪录
      el-submenu(index='account')
        template(slot='title')
          span 会员中心
        el-menu-item-group
          router-link(to="/member/account/1")
            el-menu-item(index='/member/account/1')
              span 个人资料
          router-link(to="/member/account/2")
            el-menu-item(index='/member/account/2')
              span 修改密码
      router-link(to="/member/inbox")
        el-menu-item(index='/member/inbox')
          span 站內信
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['porpsActive'],
  data() {
    return {
      activeNames: this.porpsActive,
    };
  },
  computed: {
    ...mapState('member', [
      'MemberOfferCount',
    ]),
    getUrlID() {
      return this.$route.path;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
  .el-menu{
    width: 180px;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    overflow: hidden;
  }
  .itemLink{
    padding: 10px 0 10px 20px;
  }
  .is-active{
    border-left: 3px solid #0050b3;
    background-color: rgba(0, 80, 179, 0.1);
  }
  .is-opened{
    border-left: none !important;
    background-color: #fff !important;
  }
  .el-submenu__title{
    span{
      font-size: 14px;
      font-weight: 500;
      color: #000;
    }
  }
  .el-menu-item{
    font-size: 14px;
    font-weight: 500;
    color: #000;
    a{
      font-size: 14px;
      font-weight: 500;
      color: #000;
    }
  }
  .el-menu{
    a{
      text-decoration: none;
      &:hover{
        text-decoration: none;
      }
    }
  }
</style>
