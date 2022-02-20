<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.content.py-3
    .col.px-md-5.py-md-5.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-5.py-3
          ||
          span.px-3 活动说明
          ||
        .col-12.eventcaption.pt-md-0.pt-2
          p 2018 / 9 / 22 12：00 ～ 2018 / 9 / 30 23：59（ GMT＋8 ）
          p 邀请好友大吉大利，好友首储后可与好友共享 20% 吃机金回馈，好友越多吃机金就越多，返还无上限！
        .col-10.offset-1.eventcontent.py-md-4.py-2
          .row.no-gutters
            .col-md-3.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src='/static/moon18/pic-compaign-1.png')
              span 步骤一
              span 分享活动给好友
            .col-md-3.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src='/static/moon18/pic-compaign-2.png')
              span 步骤二
              span 好友注册帐号并储值
            .col-md-3.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src='/static/moon18/pic-compaign-3.png')
              span 步骤三
              span 好友回填专属邀请码
            .col-md-3.col-12.py-1.px-1.d-flex.flex-column.align-items-center
              img(src='/static/moon18/pic-compaign-4.png')
              span 步骤四
              span 领取奖金
        .col-12.pb-md-5.py-3
          button.btn.px-4.py-2.mx-2(type='button', @click.prevent='gotoP1') 我要分享活动
          router-link.evbtn(to='/p5')
            button.btn.px-4.py-2.mx-2(type='button') 受邀好友怎么玩
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import { mapState } from 'vuex';
import tgHeader from '@/views/moon18/components/tgHeader.vue';
import tgBanner from '@/views/moon18/components/tgBanner.vue';
import tgMenu from '@/views/moon18/components/tgMenu.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/moon18/components/tgFooter.vue';
import router from '../router/router';


export default {
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
    tgLogin,
    
  },
  data() {
    return {
      loginDialogShow: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    gotoP1() {
      if (this.MemberLogined) {
        router.push('/p1');
      } else {
        this.loginDialogShow = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/moon18/moon18.scss';
</style>
