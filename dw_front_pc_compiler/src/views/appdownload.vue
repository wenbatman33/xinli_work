<template lang="pug">
.d-flex.appdownloadPage.flex-column.justify-content-center.align-content-center.p-5
  .text-center.my-3
    .col-12.text-center.my-5
        el-button.downloadBtn(v-if='iosFileLink', @click='iosDownload') 
          i.fab.fa-apple.mr-2
          span 点击下载 IOS
        el-button.downloadBtn(v-if='androidFileLink', @click='androidDownload') 
          i.fab.fa-android.mr-2 
          span 点击下载 ANDROID
</template>
<script>
export default {
  data() {
    return {
      iosFileLink: '',
      androidFileLink: '',
    };
  },
  methods: {
    getAPILink(device_type) {
      // platform 平台[1:全站,2:體育APP,3:商城]
      this.$axios.get(`/api/NewestAppVersion/1/${device_type}`).then((res) => {
        if (device_type === 1) {
          this.iosFileLink = res.data.data[0].appVersionFileLocation;
        } else {
          this.androidFileLink = res.data.data[0].appVersionFileLocation;
        }
      });
    },
    iosDownload() {
      if (window.localStorage.agency) {
        this.$copyText(`agency_code=${window.localStorage.agency}`).then((e) => {
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
    this.$router.push({ path: '/#app' }).catch((err) => {});
  },
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
