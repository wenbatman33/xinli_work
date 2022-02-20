<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.content.py-3
    .col.px-lg-5.py-md-5.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-5.py-3
          ||
          span.px-3 获取专属邀请码
          ||
        .col-12.py-md-2.py-2(v-if='InviteCode')
          h1.InviteCode {{InviteCode}}
        //- .col-12.pb-md-5.py-3(v-if='MemberLogined')
        //-   button.btn.px-4.py-2(type='button' @click.prevent='getCode') 我要申请专属邀请码
      .row.no-gutters.share.py-3.d-flex.flex-column.justify-content-center.text-center(v-if='InviteCode')
        .col-xl-10.offset-xl-1.col-12.py-md-5.py-3
          .row.no-gutters.d-flex.justify-content-center
            //- .col-md-3.col-12.py-md-0.py-2.px-1.d-flex.flex-colum.justify-content-center
            //-   button.wechat(type='button') 立马分享活动到微信
            .col-md-3.col-12.py-md-0.py-2.px-1.d-flex.flex-colum.justify-content-center
              button.weibo(type='button' @click.prevent='btnClick_1') 立马分享活动到微博
            .col-md-3.col-12.py-md-0.py-2.px-1.d-flex.flex-colum.justify-content-center
              button.qq(type='button' @click.prevent='btnClick_2') 立马分享活动到QQ
            .col-md-3.col-12.py-md-0.py-2.px-1.d-flex.flex-colum.justify-content-center
              button.copy(type='button',@click.prevent='btnClick_3') 复制专属码分享到其他平台
  tgFooter
  el-dialog(width="50%",title="复制专属码分享到其他平台",:visible.sync="dialogVisible",append-to-body)
    .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
      el-input.my-3#InviteCode(type="textarea",:rows="5", placeholder="请输入内容", v-model="copytext")
    .row.no-gutters.eventpage.px-3.py-3.d-flex.justify-content-center
      button.btn.col-6.copyBtn(type='button',:data-clipboard-text='copytext') 复制
</el-input>
</template>
<script>
import axios from 'axios';
import router from '../router/router';
import tgHeader from '@/views/moon18/components/tgHeader.vue';
import tgBanner from '@/views/moon18/components/tgBanner.vue';
import tgMenu from '@/views/moon18/components/tgMenu.vue';
import tgFooter from '@/views/moon18/components/tgFooter.vue';
import Clipboard from 'clipboard';
import { mapState } from 'vuex';

let clipboard;
function shareToXl(title, url, picurl) {
  const sharesinastring = `http://v.t.sina.com.cn/share/share.php?title=${title}&url=${url}&content=utf-8`;
  window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
}
function shareToQq(title, url, picurl) {
  const shareqqzonestring = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=${title}&url=${url}`;
  window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
}

export default {
  data() {
    return {
      Logined: false,
      InviteCode: '',
      dialogVisible: false,
      copytext: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
  },
  watch: {
    MemberLogined(value) {
      if (value === true) {
        this.getCode();
      }
    },
  },
  methods: {
    login() {
      this.Logined = true;
    },
    getCode() {
      console.log(this.UserId);
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event001/GetInviteCode/`, paylod)
        .then((res) => {
          vm.InviteCode = res.data.data.InviteCode;
          console.log(res.data.data.InviteCode);
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    // btnClick_1() {
    //   const title = `确认过眼神,是跟我一起玩的人,立马参加活动得奖金！立马注册并首储后回填我的邀请码"${this.InviteCode}" 网址:http://18tgcity.club/moon18`;
    //   shareToXl(title, 'https://tw.yahoo.com/');
    // },
    // btnClick_2() {
    //   const title = `确认过眼神,是跟我一起玩的人,立马参加活动得奖金！立马注册并首储后回填我的邀请码"${this.InviteCode}" 网址:http://18tgcity.club/moon18`;
    //   shareToQq(title, 'https://tw.yahoo.com/');
    // },
    btnClick_1() {
      const title = `新的老虎机平台一起来玩玩看,9/30前注册就送18免费玩,首储后回填我的邀请码 ${this.InviteCode} ,活动网址:http://t.cn/EvezR87`;
      shareToXl(title, 'http://t.cn/EveilXX');
    },
    btnClick_2() {
      const title = `新的老虎机平台一起来玩玩看,9/30前注册就送18免费玩,首储后回填我的邀请码 ${this.InviteCode} ,活动网址:http://t.cn/EvezR87`;
      shareToQq(title, 'http://t.cn/EveilXX');
    },
    btnClick_3() {
      this.dialogVisible = true;
      this.copytext = `新的老虎机平台一起来玩玩看,9/30前注册就送18免费玩,首储后回填我的邀请码 ${this.InviteCode} ,活动网址:http://t.cn/EvezR87`;
    },
  },
  beforeDestroy() {
    clipboard.destroy();
  },
  mounted() {
    const vm = this;
    clipboard = new Clipboard('.copyBtn');
    clipboard.on('success', (e) => {
      vm.$notify({
        title: '成功',
        message: '已复制专属码',
        type: 'success',
        duration: 1000,
      });
    });
    if (this.MemberLogined === true) {
      this.getCode();
    }
  },
};
</script>
<style lang="scss" scoped>
.InviteCode{
  font-size: 32px;
  color: #fff;
}
.copyBtn{
  color: white;
  font-size: 16px;
  background: #2a5298;
  border-radius: 20px;
}
</style>

