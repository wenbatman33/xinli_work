<template lang='pug'>
.container-fluid
  .menu.row.no-gutters
    .col-12.text-center
      .evbtnOne.py-2(:class="[getUrlID==='' ? 'active': '']", @click='gotoIndex')
        span.evbtn_time 02.18-02.24
        span.evbtn_cont 第一周任务
        .circle
        .linetime01
      .evbtnTwo.py-2(:class="[getUrlID==='p1' ? 'active': '']" , @click='gotoP1')
        span.evbtn_time 02.25-03.03
        span.evbtn_cont 第二周任务
        .circle
        .linetime02
    el-dialog(v-if='isMobile' :visible.sync='loginDialogShow', width='90%', append-to-body)
      tgLogin(@loginDialogHide='loginDialogHide')
    el-dialog(v-else :visible.sync='loginDialogShow', width='40%', append-to-body)
      tgLogin(@loginDialogHide='loginDialogHide')
</template>

<script>
import router from '@/views/ev190218/router/router';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isMobile: false,
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
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    gotoIndex() {
      router.push('/');
    },
    gotoP1() {
      router.push('/p1');
    },
  },
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
  },
};
</script>
<style scoped lang='scss'>
.menu {
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.4);
  position: relative;
  z-index: 100;
}
.evbtnOne, .evbtnTwo {
  display: inline-block;
  width: 50%;
  color: rgba(255,255,255,1);
  box-shadow: inset 0 -1px 0 0 rgba(255,255,255,0.02);
  vertical-align: top;
  position: relative;
  cursor: pointer;
  &:hover {
    color: rgba(255,212,0,1);
    .circle {
      box-shadow: 0 0 8px 4px rgba(250,219,20,0.8);
    };
  };
  .evbtn_time, .evbtn_cont {
    display: inline-block;
    width: 100%;
    line-height: 25px;
  };
  .evbtn_time {
    font-size: 16px;
  };
  .evbtn_cont {
    font-size: 22px;
  };
  .circle {
    width: 8px;
    height: 8px;
    margin: 0 auto;
    border-radius: 8px;
    background: rgba(250,219,20,1);
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
  };
  .linetime01, .linetime02 {
    width: 50%;
    height: 2px;
    background: rgba(250,219,20,1);
    position: absolute;
  };
  .linetime01 {
    right: 0;
    bottom: 0;
  };
  .linetime02 {
    left: 0;
    bottom: 0;
  };
}
.evbtnOne {
  background: linear-gradient(90deg, rgba(0,79,159,1) 40%, rgba(0,39,102,1) 60%);
}
.evbtnTwo {
  background: linear-gradient(90deg, rgba(209,34,0,1) 40%, rgba(255,44,0,1) 60%);
}
.active {
  color: rgba(255,212,0,1);
  .circle {
    box-shadow: 0 0 8px 4px rgba(250,219,20,0.8);
  };
}
@media screen and (max-width: 750px) {
  .evbtnOne, .evbtnTwo {
    .evbtn_time {
      font-size: 13px;
    };
    .evbtn_cont {
      font-size: 18px;
    };
  };
}
</style>
