<template lang='pug'>
	header
		// --------------- 回首頁 ---------------
		div.gohome(v-if='getUrlID == "member" && getUrlID2 == null' @click='goHome')
		// --------------- 回上頁 ---------------
		div.previous(v-else-if='getUrlID2 != "recordsdetail" && timeSwitch != true' @click="goBack")
		div.previous(v-else-if='timeSwitch == true ' @click="goBet")
		// --------------- 客服图 ---------------
		div.service(@click='GA_home_servicemobile(MemberLogined)')
		//- div.service(v-if='getUrlID != "faqs"' @click='GA_home_servicemobile(MemberLogined)')
		// --------------- 時鐘图 ---------------
		//- div.icon_clock(v-if='getUrlID2 == "bonus" || getUrlID2 == "records" || getUrlID2 == "betrecords" && timeSwitch == false' @click='showDatePicker')
		// --------------- 垃圾桶 ---------------
		//- div.icon_trash(v-if='getUrlID2 == "inbox"' @click='showInboxDelBtn')
		.memberhder {{$route.meta.title}}
		.header_hr
</template>
<script>
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  props: {
    timeSwitch: '',
  },
  computed: {
    ...mapState('index', [
      'routerFrom',
    ]),
    ...mapState('member', [
      'MemberLogined',
    ]),
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
    getUrlID2() {
      const path = this.$route.path.split('/');
      const parHash = path[2];
      return parHash;
    },
  },
  methods: {
    goBet() {
      this.$emit('changeSwitch', false);
    },
    // showInboxDelBtn() {
    //   if (this.$store.state.member.MemberShowInboxDelBtn === true) {
    //     this.$store.state.member.MemberShowInboxDelBtn = false;
    //   } else {
    //     this.$store.state.member.MemberShowInboxDelBtn = true;
    //   }
    // },
    showDatePicker() {
      if (this.$store.state.member.MemberShowDatePicker === true) {
        this.$store.state.member.MemberShowDatePicker = false;
      } else {
        this.$store.state.member.MemberShowDatePicker = true;
      }
    },
    goBack() {
      if (this.getUrlID === 'forget') {
        if (this.$store.state.member.MemberForgetSteps > 1) {
          this.$store.state.member.MemberForgetSteps -= 1;
        } else {
          this.$router.push('/login');
        }
      } else if (this.getUrlID === 'promotionDetail') {
        this.$router.go(-1);
      } else if (this.getUrlID === 'member') {
        if (this.getUrlID2 === null) {
          this.$router.push('/');
        } else if (this.getUrlID2 === 'cashier' || this.getUrlID2 === 'records' || this.getUrlID2 === 'bonus') {
          if (this.routerFrom.matched[0].path === '/member/cashier') {
            this.$router.go(-1);
          }
          this.$router.push('/member');
        } else if (this.getUrlID2 === 'inbox' || this.getUrlID2 === 'overview' || this.getUrlID2 === 'inboxdetail' || this.getUrlID2 === 'recordsdetail') {
          this.$router.go(-1);
        } else {
          this.$router.go(-1);
        }
      } else {
        this.$router.push('/');
      }
    },
    goHome() {
      this.$router.push('/');
    },
    deletesInbox() {
			
    },
  },
  mounted() {
    // console.log(this.routerFrom)
  },
};
</script>
<style lang="scss">
</style>
