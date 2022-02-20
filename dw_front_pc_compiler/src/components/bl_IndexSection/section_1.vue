<template lang="pug">
  .container-fluid.section_1.p-0
    .row.no-gutters.h-100
      .col-6
        .APPImg
          transition(name='slide-fade')
            img(v-if='currentNum==0', :src='APPS[0]')
        .APPImg
          transition(name='slide-fade')
            img(v-if='currentNum==1', :src='APPS[1]')
      .col-6
        h1.text-center 手机客户端扫码下载
        p.mt-5.text-center 为您专属订制，经典体育赛事、电子游艺、真人娱乐一手掌握。
        p.text-center 全年 7 x 24 技术支持，随心所欲指尖畅游，
        p.text-center 最安全友善、纯粹的投注乐趣，伴您抓住每一瞬机会，一触即发！
        //- .switch.d-flex.flex-row
        //-   .switchBtn(@click='currentNum=0', :class='(currentNum==0)?"active":""') 全站APP
        //-   .switchBtn(@click='currentNum=1', :class='(currentNum==1)?"active":""') 体育APP
        .qrcodeWrap.d-flex.flex-row.justify-content-center.my-5
          .qrcodeWrapImg.mx-3
            //- vue-qrcode.qrcode(v-if='currentNum==0 && APPSURL!==""', :value='APPSURL', :options="{ width: 160 }", renderAs='svg')
            qrcode-vue.qrcode(:value="APPSURL" :size="160" level="H")
</template>
<script>
// import VueQrcode from 'vue-qrcode';
import QrcodeVue from 'qrcode.vue';
// import VueQRCodeComponent from 'vue-qrcode-component';

export default{
  components: {
    QrcodeVue,
    // VueQRCodeComponent,
  },
  data() {
    return {
      currentNum: 0,
      bgImage: `${window.CDN_ASSETS}/static/img/appDowloadBg.jpg`,
      APPS: [`${window.CDN_ASSETS}/static/img/dw/app.png`, `${window.CDN_ASSETS}/static/img/dw/app.png`],
      APPSQRCODE: [`${window.CDN_ASSETS}/static/img/dw_qrcode_1.png`, `${window.CDN_ASSETS}/static/img/dw_qrcode_2.png`],
      qrcodeLogo: `${window.CDN_ASSETS}/static/img/QRcodeLogo.png`,
      APPSURL: '',
      // APPSURL: [
      //   'https://dlapp.tgcity18.com/ipa.php',
      //   'https://dlapp.tgcity18.com/apk.php',
      // ],
    };
  },
  methods: {
    changeCurrentNum(num) {
      this.currentNum = num;
      if (num === 0) {
        this.$matomo_ios_qrcode();
      } else {
        this.$matomo_android_qrcode();
      }
    },
  },
  mounted() {
    this.APPSURL = (this.$route.query.agency) ? `${window.CDN_STATIC}/upload/appdownload/index.html?agency=${this.$route.query.agency}` : `${window.CDN_STATIC}/upload/appdownload/index.html`;
  },
};
</script>
<style lang="scss" scoped>
.section_1{
  height: 600px;
  overflow: hidden;
  background-size:cover;
  h1{
    margin-top: 80px;
    color: white;
  }
  p{
    line-height: 1.5;
    color: $garyBlue_lightest;
    i{
      font-size:28px;
      color:#BABDC2;
    }
  }
}
.switch{
  width: 361px;
  height: 58px;
  margin: auto auto;
  padding: 6px;
  border: 2px solid $DW_ColorLight;
  border-radius: 30px;
  border: linear-gradient(to left, $DW_ColorLight, $DW_Color);
  background: white;
  .switchBtn{
    cursor: pointer;
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0;
    font-size: 18px;
  }
  .active{
    color: white;
    width: 180px;
    height: 40px;
    border-radius: 58px;
    background-image: linear-gradient(to right, $DW_ColorDark, $DW_Color);
  }
}
.APPImg{
  position: absolute;
  margin-left: 100px;
  transition: all 0.5s ease;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-300px);
  opacity: 0;
}
.qrcodeWrap{
  .qrcodeWrapBG{
    padding: 30px 0;
  }
  .qrcodeWrapImg{
    position: relative;
    text-align: center;
    width: 160px;
    height: 160px;
  
    img{
      width: 160px;
      height: 160px;
      left: 0;
    }
  
    .qrcodeLogoImg{
      position: absolute;
      z-index: 2;
      top: 64px;
      left: 64px;
      width: 32px;
      height: 32px;
    }
  }
}
.downloadBgtn{
  cursor: pointer;
  margin: 10px auto;
  width: 160px;
  height: 40px;
  line-height: 40px;
  background-image: linear-gradient(180deg, $DW_skyLight_2 0%, $DW_sky_2 100%);
  border-radius: 36.5px;
  text-align: center;
  color: white;
}

.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.qrcode{
  position: absolute;
  border: 8px solid white;
  border-bottom: 4px;
  background: white;
}

</style>
<style lang="scss">
.MAIN_LIGHT{
  .section_1{
    h1{
      color: black;
    }
    p{
      color: $garyBlue_Darkest;
    }
  }
}
</style>
