<template lang="pug">
  .home
    .container-fluid.h-100(v-if='setting.page=="0" && !admin.logined')
      .h-100.d-flex.justify-content-center.align-items-center.flex-column
        h3.text-center.goldText 18LUCK
        h3.mb-5.text-center.goldText PATRTY
        h5.mb-5.text-center.goldText 領獎登錄
        div
          input(v-model='adminForm.name', placeholder="請輸入密碼")
          .goldButton.m-1.px-3(@click='signin') 登入
    .container-fluid(v-if='setting.page !=="0" && admin.logined')
      el-menu.menu(:default-active='setting.page', mode='horizontal', @select='handleSelect', background-color='#333', text-color='#fff', active-text-color='#C7B071')
        el-menu-item(index='2',width='25%') 領獎登錄
        el-menu-item(index='4',width='25%') 獎項紀錄
      .capturer.d-flex.justify-content-between.align-items-stretch.flex-row(v-if='setting.page=="1"|setting.page=="2" ')
        .QRCODE
          qrcode-reader(@decode='onDecode', :camera='setting.cameraSettings', :track='false', :paused='setting.paused')
        .QRCODEResult.d-flex.align-items-center.flex-column.pt-4
          h3.text-danger {{prizeTitle}}
          p {{member.gid}} {{member.name}}
          p.text-warning {{member.ex}}
          .sendButton(@click='addPrize', v-if='member.gid && prizeTitle') 
            i.fas.fa-thumbs-up.mx-2
            | 確得獎者資料
          .reCapture(@click='unPauseCamera', v-if='member.logined') 
            i.fas.fa-sync-alt.mx-2
            | 已領獎
      .prizeWarp(v-if='setting.page=="2"')
        .report.px-3.py-0
          div
            .goldButton.prizeBtn(@click='prizeTitle="10獎"') 10獎
            .goldButton.prizeBtn(@click='prizeTitle="9獎"') 9獎
            .goldButton.prizeBtn(@click='prizeTitle="8獎"') 8獎
            .goldButton.prizeBtn(@click='prizeTitle="7獎"') 7獎
            .goldButton.prizeBtn(@click='prizeTitle="6獎"') 6獎
            .goldButton.prizeBtn(@click='prizeTitle="5獎"') 5獎
            .goldButton.prizeBtn(@click='prizeTitle="4獎"') 4獎
            .goldButton.prizeBtn(@click='prizeTitle="3獎"') 3獎
            .goldButton.prizeBtn(@click='prizeTitle="2獎"') 2獎
            .goldButton.prizeBtn(@click='prizeTitle="1獎"') 1獎
            .goldButton.prizeBtn(@click='prizeTitle="加碼獎"') 加碼獎
            .goldButton.prizeBtn(@click='prizeTitle="新生買回"') 新生買回
          div
            span.text-white 備註: 
            input(v-model='plusPrize')
      .prizeList(v-if='setting.page=="2"')
        .report
          .reportiItem(v-for='user in firestorePrize')
            .row.no-gutters
              .col-1
                span.grayText
                  i.fas.fa-trophy.mt-3.mx-2
              .col-11
                p
                  span.text-white {{user.prizeTitle}} {{user.plusPrize}}
                  span.goldText {{user.member.name}} 
                  span.grayText {{user.member.gid}} 
                p
                  span {{user.member.ex}} 
                  span.grayText {{user.datetime}}
      .reportTotalData.p-2(v-if='setting.page=="4"')
        .w-100.p-2.text-center
          span.grayText 已領獎人數
          span.goldText.mr-2 {{firestorePrize.length}}
      .reportRecord(v-if='setting.page=="4"')
        .report.p-3
          .reportiItem(v-for='user in firestorePrize')
            .row.no-gutters
              .col-1
                span.grayText
                  i.fas.fa-trophy.mt-3.mx-2
              .col-11
                p
                  span.text-white {{user.prizeTitle}} {{user.plusPrize}}
                  span.goldText {{user.member.name}} 
                  span.grayText {{user.member.gid}} 
                p
                  span {{user.member.ex}} 
                  span.grayText {{user.datetime}}
                  span.float-right(@click='deletePrize(user.id)') 刪除
</template>
<script>
import { db } from '../main';

export default {
  data () {
    return {
      firestorePrize:{},
      adminForm:{ name:''},
      adminPassword: 'wenbatman33',
      admin:{ device:'',name:'',logined:false},
      member:{ gid:'',name:'',ex:'',logined:false},
      prizeTitle:'',
      plusPrize:'',
      fireData_Prize:{member:{},prizeTitle:'',plusPrize:'', time:'',datetime:'',admin:{}},
      setting:{
        page: '0',
        capture:'',
        paused: false,
        cameraSettings: {
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
          }
        },
      },
    }
  },
  firestore () {
    return {
      firestorePrize: db.collection('prize').orderBy('time','desc'),
    }
  },
  methods: {
    signin() {
      if(this.adminForm.name === this.adminPassword){
        window.localStorage.setItem('admin', this.adminForm.name);
        window.localStorage.setItem('loginTime', this.getNowTime());
        this.admin.name = this.adminForm.name;
        this.admin.time = this.getNowTime();
        this.checkAdminLogined();
      }
    },
    checkAdminLogined(){
      if(window.localStorage.admin === this.adminPassword ){
        this.admin.name = window.localStorage.admin;
        this.admin.time = this.getNowTime();
        this.admin.logined= true;
        this.setting.page = '2';
      } else {
        this.logined= false;
        this.setting.page = '0';
        window.localStorage.removeItem('admin');
        window.localStorage.removeItem('loginTime');
      }
      window.localStorage.setItem('loginTime', this.getNowTime());
    },
    // tab 選擇
    handleSelect(key, keyPath) {
      this.setting.page = key;
      this.setting.capture = {};
      this.unPauseCamera ();
    },
    async onDecode (content) {
      try {
        this.setting.capture = JSON.parse(content);
        if(this.setting.capture.hasOwnProperty('gid')){
          // 取得同仁QRCode判別是否有重複領取ㄋ
          this.member.gid = this.setting.capture.gid;
          this.member.name = this.setting.capture.name;
          this.member.ex = this.setting.capture.ex;
          let result = this.firestorePrize.filter(item => item.member.gid===this.member.gid);
          this.check2QRcode();
          if(result.length>0) {
            // this.setting.paused = true;
            this.member.logined = true;
          } else {
            this.member.logined = false;
          }
        } else {
          console.log('未知的QRcode')
        }
      } catch (error) {
        this.errorQRcode = '未知的QRcode';
        // this.pauseCamera();
      }
    },
    getNowTime(){
      const NowDate = new Date();
      let month = (NowDate.getMonth()+1);
      if(month<10) month = "0"+month;
      let day = NowDate.getDate();
      if(day<10) day = "0"+day;
      let h=NowDate.getHours();
      if(h<10) h = "0"+h;
      let m=NowDate.getMinutes();
      if(m<10) m = "0"+m;
      let s=NowDate.getSeconds();
      if(s<10) s = "0"+s;
      return  NowDate.getFullYear()+ "-" + month+ "-"+ day+" "+ h+':'+m+':'+s ;
    },
    check2QRcode(){
      console.log('check2QRcode')
      console.log(this.member.gid )
      if(this.member.gid){
        this.pauseCamera();
      }
    },
    pauseCamera(){
      this.setting.paused = true;
    },
    unPauseCamera () {
      this.fireData_Prize.member = null;
      this.setting.capture = null;
      this.setting.paused = false;
      this.member={ gid:'',name:'',ex:'',logined:false};
      this.prizeTitle = '';
      this.plusPrize = '';
    },
    // firestore GRUD
    addPrize(){
      this.fireData_Prize.member = this.member;
      this.fireData_Prize.prizeTitle = this.prizeTitle;
      this.fireData_Prize.plusPrize = this.plusPrize;
      this.fireData_Prize.time =  Date.now();
      this.fireData_Prize.datetime =  this.getNowTime();
      this.fireData_Prize.admin =  this.admin;
      db.collection('prize').add(this.fireData_Prize).then(() => {
          this.unPauseCamera();
        });
    },
    deletePrize(id) {
      // console.log(id)
      db.collection('prize').doc(id).delete();
    },
  },
  mounted () {
    this.admin.device = new MobileDetect(window.navigator.userAgent).ua;
    //setting.page=
    if(window.localStorage.loginTime){
      let s1 = new Date(window.localStorage.loginTime);
      let s2 = new Date(this.getNowTime());
      let s3 = s2.getTime() - s1.getTime();
      if(s3 > 86400000){
        window.localStorage.removeItem('admin');
        window.localStorage.removeItem('loginTime');
      }
    }
    this.checkAdminLogined()
  }
}
</script>

<style lang='scss' scoped>
.home{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.reportWarp{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  padding-top: 266px;
}
.prizeWarp{
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 450px;
  top: 0;
  overflow: hidden;
  padding-top: 266px;
}
.prizeList{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  padding-top: 450px;
}
.capturer{
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 220px;
  // background: #cfcfcf;
  overflow: hidden;
  .sendButton{
    position: absolute;
    background: rgb(29, 172, 0);
    color: #fff;
    width: 100%;
    height: 45px;
    line-height: 45px;
    z-index: 1;
    bottom: 0px;
    text-align: center;
    cursor: pointer;
  }
  .reCapture{
    position: absolute;
    background: rgb(172, 0, 0);
    color: #fff;
    width: 100%;
    height: 45px;
    line-height: 45px;
    z-index: 1;
    bottom: 0px;
    text-align: center;
    cursor: pointer;
  }
  .QRCODE{
    position: relative;
    width: 40%;
    height: 100%;
    background: #000;
  }
  .QRCODEResult{
    position: relative;
    width: 60%;
    height: 100%;
    background: #000;
    color: #fff;
  }
}
.report{
  height: 100%;
  overflow-y: scroll;
}
.reportiItem{
  padding: 8px 4px;
  color: #fff;
  font-size: 14px;
  margin: 8px 0;
  border-radius: 8px;
  background-image: linear-gradient(-90deg, #333 0%, #222 100%);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  p{
    margin: 0;
  }
}
.el-menu-item{
  width: 50%;
  text-align: center;
}
.el-menu--horizontal>.el-menu-item {
  height: 45px;
  line-height: 45px;
}
.goldText{
  color: #C7B071;
}
.goldButton{
  display: inline-block;
  text-align: center;
  padding: 4px 6px;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 6px;
  color: #fff;
  font-size: 16px;
  background: #C7B071
}
.prizeBtn{
  width: 22%;
  padding: 8px 6px;
}
.grayText{
  color: rgba(255,255,255,0.4);
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.menu{
  position: relative;
  z-index: 3;
}
.reportRecord{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  padding-top: 100px;
}
.reportTotalData{
  position: absolute;
  top:46px;
  width: 100%;
  height: 50px;
  z-index: 2;
  background-image: linear-gradient(-90deg, #333 0%, #222 100%);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
}
</style>