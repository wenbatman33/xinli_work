<template lang='pug'>
.container-fluid
	.menu.row.no-gutters.py-4.px-3
		.col-10.offset-1
			.row.d-flex.justify-content-center
				router-link.evbtn(to='/')
					img(src='/static/moon18/btm-index.png')
				a.evbtn(@click.prevent='gotoP1')
					img(src='/static/moon18/btm-share.png')
				a.evbtn(@click.prevent='gotoP2')
					img(src='/static/moon18/btm-friends_register.png')
				a.evbtn(@click.prevent='gotoP3')
					img(src='/static/moon18/btm-receive.png')
				router-link.evbtn(to='/p4')
					img(src='/static/moon18/btm-notice.png')
	el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
		tgLogin(@loginDialogHide='loginDialogHide')
</template>

<script>
import router from '@/views/moon18/router/router';
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
    gotoP2() {
      if (this.MemberLogined) {
        router.push('/p2');
      } else {
        this.loginDialogShow = true;
      }
    },
    gotoP3() {
      if (this.MemberLogined) {
        router.push('/p3');
      } else {
        this.loginDialogShow = true;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.evbtn{
  cursor: pointer;
}
</style>
