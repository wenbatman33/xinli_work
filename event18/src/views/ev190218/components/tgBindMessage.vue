<template lang="pug">
.container-fluid.BindMge
  .row.no-gutters.BindMgeCont
    .col-12
      .row.no-gutters.px-1.py-1
        .col-12.px-1.mb-1.text-left
          span | 
          a(@click.prevent='memberLoginAll') 绑定18新利帐号
  //- Luck綁定
  el-dialog(v-if='isMobile' :visible.sync='luckDialogShow', width='90%', append-to-body)
    tgBindLuck(@luckDialogHide='luckDialogHide', @getBindReback='getBindReback')
  el-dialog(v-else :visible.sync='luckDialogShow', width='40%', append-to-body)
    tgBindLuck(@luckDialogHide='luckDialogHide', @getBindReback='getBindReback')
</template>

<script>
import axios from 'axios';
import tgBindLuck from '@/views/ev190218/components/tgBindLuck.vue';
import { mapState } from 'vuex';

export default {
  components: {
    tgBindLuck,
  },
  data() {
    return {
      isMobile: false,
      luckDialogShow: false,
      bindData: [],
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.getEvBind();
    }
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    ...mapState('index', [
      'siteHost',
    ]),
  },
  methods: {
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    luckDialogHide() {
      this.luckDialogShow = false;
    },
    memberLoginAll() {
      this.luckDialogShow = true;
    },
    getBindReback(success) {
      console.log(success);
      if (success) {
        this.bindData.status = 1;
        this.bindData.message = '帐号已绑定';
        window.location.reload();
      }
    },
    getEvBind() {
      const payload = {};
      const vm = this;
      payload.UserId = this.UserId;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Event/Event021_Bind/`, payload)
        .then((res) => {
          vm.bindData = res.data;
        });
    },
  },
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
  },
};
</script>
<style scoped lang="scss">
.BindMge {
  width: 50%;
  height: auto;
  margin: 0 0 -30px 30px;
  background: transparent;
  position: relative;
  z-index: 20;
  .BindMgeCont {
    width: 100%;
    color: rgba(38,38,38,1);
    font-size: 12px;
    a {
      padding: 0 5px;
      text-decoration: underline;
      cursor: pointer;
    };
  };
}
@media screen and (min-width: 750px) {
  .BindMge {
    margin-left: 0;
    left: 11.5vw
  };
}
</style>
