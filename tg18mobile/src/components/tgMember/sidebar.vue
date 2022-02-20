<template lang='pug'>
  .sidebar.m-1
    el-menu.h-100(:default-active='activeNames', @open='handleOpen', @close='handleClose')
      el-menu-item(index='overview')
        router-link(to="/member/overview")
          span 个人钱包
      el-submenu(index='cashier')
        template(slot='title')
          span 出纳台
        el-menu-item-group
          el-menu-item(index='cashier') 
            router-link(to="/member/cashier/1")
              span 在线存款
          el-menu-item(index='cashier/2') 
            router-link(to="/member/cashier/2")
              span 在线提款
          el-menu-item(index='cashier/3') 
            router-link(to="/member/cashier/3")
              span 钱包转账
      el-submenu(index='bonus')
        template(slot='title')
          span 领奖中心
        el-menu-item-group
          el-menu-item(index='bonus') 
            router-link(to="/member/bonus/1")
              span 返水
          el-menu-item(index='bonus/2') 
            router-link(to="/member/bonus/2")
              span 救援金
          el-menu-item(index='bonus/3') 
            router-link(to="/member/bonus/3")
              span 更多优惠
      el-submenu(index='records')
        template(slot='title')
          span 交易记录
        el-menu-item-group
          el-menu-item(index='records/1') 
            router-link(to="/member/records/1")
              span 资金记录
          el-menu-item(index='records/2') 
            router-link(to="/member/records/2")
              span 洗码记录
      el-submenu(index='account')
        template(slot='title')
          span 账户设置account
        el-menu-item-group
          el-menu-item(index='account/1') 
            router-link(to="/member/account/1")
              span 个人资料
          el-menu-item(index='account/2') 
            router-link(to="/member/account/2")
              span 修改密码
      el-menu-item(index='inbox')
        router-link(to="/member/inbox")
          span 站內信
      
</template>
<script>
export default {
  props: ['porpsActive'],
  data() {
    return {
      activeNames: this.porpsActive,
    };
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
</style>
