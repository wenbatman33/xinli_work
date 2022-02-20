<template lang='pug'>
.container-fluid
  .line
  .menu.row.no-gutters
    .col-12.text-center.py-3
      .evbtn(:class="[getUrlID==='' ? 'active': '']", @click='gotoIndex')
        img(src='/static/ev190118/btn_1.png')
      .vLine.d-none.d-sm-none.d-md-inline-block
      .hLine.d-md-none.d-sm-block
      .evbtn(:class="[getUrlID==='p1' ? 'active': '']" , @click='gotoP1')
        img(src='/static/ev190118/btn_2.png')
      .vLine.d-none.d-sm-none.d-md-inline-block
      .hLine.d-md-none.d-sm-block
      .evbtn(:class="[getUrlID==='p2' ? 'active': '']", , @click='gotoP2')
        img(src='/static/ev190118/btn_3.png')
    el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
      tgLogin(@loginDialogHide='loginDialogHide')
</template>

<script>
import router from '@/views/ev190118/router/router';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loginDialogShow: false,
      now: '',
    };
  },
  components: {
    tgLogin,
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  methods: {
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    gotoIndex() {
      router.push('/');
    },
    gotoP1() {
      if (this.MemberLogined) {
        router.push('/p1');
      } else {
        this.loginDialogShow = true;
      }
    },
    gotoP2() {
      if (this.MemberLogined) {
        router.push('/p2');
      } else {
        this.loginDialogShow = true;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.line {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #00FBFE 0%, #7E00AA 100%);
}
.menu {
  width: 100%;
  background: linear-gradient(90deg, #1C003C 0%, #24004D 51%, #1C003C 100%);
}
.vLine{
  display: inline-block;
  width: 4px;
  height: 70px; 
  line-height: 70px;
  background: linear-gradient(-180deg, rgba(0,251,254,0.00) 1%, #00FBFE 50%, rgba(0,251,254,0.00) 99%);
}
.hLine{
  display: block;
  width: 264px;
  height: 4px; 
  margin: 0 auto;
  background: linear-gradient(90deg, rgba(0,251,254,0.00) 1%, #00FBFE 50%, rgba(0,251,254,0.00) 99%);
}
.evbtn{
  display: inline-block;
  cursor: pointer;
  width: 264px;
  height: 70px; 
  line-height: 70px;
  vertical-align: top;
  &:hover{
    background: url('/static/ev190118/btn--active.png');
  }
}
.active{
  background: url('/static/ev190118/btn--active.png');
}
</style>
