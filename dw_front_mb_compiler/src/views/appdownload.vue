<template lang="pug">
  .d-flex.appdownloadPage.flex-column.justify-content-center.align-content-center.p-5
    .text-center.my-3
      el-button.col.downloadBtn(v-if='iosFileLink', @click='iosDownload') 
        i.fab.fa-apple.mr-2
        span IOS 下载
    .text-center.my-3
      el-button.col.downloadBtn(v-if='androidFileLink', @click='androidDownload') 
        i.fab.fa-android.mr-2
        span ANDROID 下载
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  data () {
    return {
      iosFileLink:'',
      androidFileLink:'',
    }
  },
  computed: {
    ...mapState('index', ['indexJsonData'])
  },
  methods: {
    getAPILink(device_type){
      // platform 平台[1:全站,2:體育APP,3:商城]
      const res = this.indexJsonData[`/api/NewestAppVersion/1/${device_type}`];
      if(device_type===1){
        this.iosFileLink= res.data[0].appVersionFileLocation;
      } else {
        this.androidFileLink= res.data[0].appVersionFileLocation;
      }
    },
    iosDownload() {
      this.$matomo_app_download('iOS');
      if (window.localStorage.agency) {
        this.$copyText(`agency_code=${window.localStorage.agency}`).then((e) => {
          window.location.href = this.iosFileLink;
        });
      } else {
        window.location.href = this.iosFileLink;
      }
    },
    androidDownload() {
      this.$matomo_app_download('Android');
      if (window.localStorage.agency) {
        this.$copyText(`agency_code=${window.localStorage.agency}`).then((e) => {
          window.location.href = this.androidFileLink;
        });
      } else {
        window.location.href = this.androidFileLink;
      }
    },
  },
  mounted () {
    if (this.$route.query.agency) {
      // 暫存代理编号 若agency 編號時註冊同時需要送出agency
      window.localStorage.setItem('agency', this.$route.query.agency);
    }
    this.getAPILink(1);
    this.getAPILink(2);
  }
};
</script>
<style lang="scss" scoped>
.appdownloadPage{
  width: 100%;
  height: 100vh;
}
.downloadBtn{
  height: 40px;
  color: white;
  border: none;
  border-radius: 24px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.17);
  background-image: linear-gradient(to right,rgb(104, 216, 255), rgb(107, 144, 255));
  outline: 0;
  i{
    font-size: 16px;
  }
  &:hover{
    color: white;
    background: #00ccff;
  }
  &:focus{
    color: #32c5ff;
    background: white;
  }
}
</style>