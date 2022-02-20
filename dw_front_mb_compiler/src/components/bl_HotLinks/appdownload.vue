<template lang="pug">
  .container-fluid.my-2
    .row
      el-button.col.downloadBtn(v-if='iosFileLink', @click='iosDownload') 
        i.fab.fa-apple.mr-2
        span IOS 下载
      el-button.col.downloadBtn(v-if='androidFileLink', @click='androidDownload') 
        i.fab.fa-android.mr-2
        span ANDROID 下载
</template>
<script>
import { mapState } from 'vuex';

import axios from 'axios';

export default {
  data() {
    return {
      iosFileLink: '',
      androidFileLink: '',
    };
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
      if (window.localStorage.agency) {
        this.$copyText(`agency_code=${window.localStorage.agency}`).then((e) => {
          console.log(process.env.VUE_APP_IOSAPPDOWNLOADLINK);
          window.location.href = this.iosFileLink;
        });
      } else {
        window.location.href = this.iosFileLink;
      }
    },
    androidDownload() {
      if (window.localStorage.agency) {
        this.$copyText(`agency_code=${window.localStorage.agency}`).then((e) => {
          window.location.href = this.androidFileLink;
        });
      } else {
        window.location.href = this.androidFileLink;
      }
    },
  },
  mounted() {
    if (this.$route.query.agency) {
      // 暫存代理编号 若agency 編號時註冊同時需要送出agency
      window.localStorage.setItem('agency', this.$route.query.agency);
    }
    this.getAPILink(1);
    this.getAPILink(2);
  },
};
</script>
<style lang="scss" scoped>
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
