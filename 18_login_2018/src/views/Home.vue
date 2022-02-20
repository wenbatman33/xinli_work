<template lang="pug">
  .home
    .container-fluid.h-100(v-if='setting.page=="0" && !admin.logined')
      .h-100.d-flex.justify-content-center.align-items-center.flex-column
        h3.text-center.goldText 18LUCK
        h3.mb-5.text-center.goldText PATRTY
        h5.mb-5.text-center.goldText 報到登錄
        div
          input(v-model='adminForm.name', placeholder="請輸入您的名字")
          .goldButton.m-1.px-3(@click='signin') 登入
    .container-fluid(v-if='setting.page !=="0" && admin.logined')
      el-menu.menu(:default-active='setting.page', mode='horizontal', @select='handleSelect', background-color='#454A60', text-color='#fff', active-text-color='#C7B071')
        el-menu-item(index='1',width='25%') 報到登錄
        el-menu-item(index='3',width='25%') 已報到列表
      .capturer.d-flex.justify-content-between.align-items-stretch.flex-row(v-if='setting.page=="1"')
        .QRCODE
          qrcode-reader(@decode='onDecode', :camera='setting.cameraSettings', :track='false', :paused='setting.paused')
        .QRCODEResult.d-flex.align-items-center.flex-column.pt-5
          p {{member.gid}} {{member.name}}
          p.text-warning {{member.ex}}
          .sendButton(@click='addMember', v-if='member.gid') 
            i.fas.fa-thumbs-up.mx-2
            | 確認報到者資料
          .reCapture(@click='unPauseCamera', v-if='member.logined') 
            i.fas.fa-sync-alt.mx-2
            | 已報到
      .memberWarp(v-if='setting.page=="1"')
        .report.px-3.py-3
          div
            .reportiItem(v-for='user in firestoreMember')
              .row.no-gutters
                .col-1
                  span.grayText
                    i.fas.fa-user.mt-3.mx-2
                .col-11
                  p 
                    span.goldText {{user.member.name}} 
                    span.grayText {{user.member.gid}} 
                  p
                    span {{user.member.ex}} 
                    span.grayText {{user.datetime}}
      .reportTotalData.p-2(v-if='setting.page=="3"')
        .w-100.p-2.text-center
          button(:class='[selectDep === "" ? "wButton" : "gButton"]', @click='selectDep=""')
            span 總人數:{{firestoreMember.length}} 
          button(:class='[selectDep === "ICS" ? "wButton" : "gButton"]', @click='selectDep="ICS"')
            span ICS:{{icsAllMembaer}} 
          button(:class='[selectDep === "HG" ? "wButton" : "gButton"]', @click='selectDep="HG"')
            span HG:{{hgAllMembaer}}  
          button(:class='[selectDep === "HB" ? "wButton" : "gButton"]', @click='selectDep="HB"')
            span HB:{{hbAllMembaer}} 
          button(:class='[selectDep === "LS" ? "wButton" : "gButton"]', @click='selectDep="LS"')
            span LS:{{lsAllMembaer}} 
      .reportRecord(v-if='setting.page=="3"')
        .report.p-3
          .reportiItem(v-for='user in firestoreMemberFilter')
            .row.no-gutters
              .col-1
                span.grayText
                  i.fas.fa-user.mt-3.mx-2
              .col-11
                p
                  span.goldText {{user.member.name}} 
                  span.grayText {{user.member.gid}} 
                p
                  span {{user.member.ex}} 
                  span.grayText {{user.datetime}}
                  span.float-right(@click='deleteMember(user.id)') 刪除
</template>
<script>
import { db } from '../main';

export default {
  data () {
    return {
      selectDep:'',
      firestoreMember:{},
      // firestoreMemberFilter:{},
      adminForm:{ name:''},
      admin:{ device:'',name:'',logined:false},
      member:{ gid:'',name:'',ex:'',logined:false},
      fireData_Member:{member:{},time:'',datetime:'',admin:{}},
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
      firestoreMember: db.collection('member').orderBy('time','desc'),
    }
  },
  computed: {
    firestoreMemberFilter(){
      const vm = this;
      let result;
      // this.selectDep
      if(this.selectDep==='ICS'){
        result = this.firestoreMember.filter(item => item.member.gid.indexOf('ICS')>=0 | item.member.gid.indexOf('XIC')>=0);
      } else if(this.selectDep) {
        result = this.firestoreMember.filter(item => item.member.gid.indexOf( this.selectDep )>=0);
      } else {
        result = this.firestoreMember;
      }
      return result;
    },
    icsAllMembaer(){
      let members = 0
      let filterDepartment = this.firestoreMember.filter(function(item, index, array){
        if (item.member.gid.indexOf('ICS')>=0 | item.member.gid.indexOf('XIC')>=0){
          members +=1;
        }
      });
      return members;
    },
    hgAllMembaer(){
      let members = 0
      let filterDepartment = this.firestoreMember.filter(function(item, index, array){
        if (item.member.gid.indexOf('HG')>=0){
          members +=1;
        }
      });
      return members;
    },
    hbAllMembaer(){
      let members = 0
      let filterDepartment = this.firestoreMember.filter(function(item, index, array){
        if (item.member.gid.indexOf('HB')>=0){
          members +=1;
        }
      });
      return members;
    },
    lsAllMembaer(){
      let members = 0
      let filterDepartment = this.firestoreMember.filter(function(item, index, array){
        if (item.member.gid.indexOf('LS')>=0){
          members +=1;
        }
      });
      return members;
    }
  },
  methods: {
    signin() {
      if(this.adminForm.name){
        window.localStorage.setItem('admin', this.adminForm.name);
        window.localStorage.setItem('loginTime', this.getNowTime());
        this.admin.name = this.adminForm.name;
        this.admin.time = this.getNowTime();
        this.checkAdminLogined();
      }
    },
    checkAdminLogined(){
      if(window.localStorage.admin){
        this.admin.name = window.localStorage.admin;
        this.admin.time = this.getNowTime();
        this.admin.logined= true;
        this.setting.page = '1';
      } else {
        this.logined= false;
        this.setting.page = '0';
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
          // 取得同仁QRCode
          // 判別是否有重複領取ㄋ
          this.member.gid = this.setting.capture.gid;
          this.member.name = this.setting.capture.name;
          this.member.ex = this.setting.capture.ex;
          let result = this.firestoreMember.filter(item => item.member.gid===this.member.gid);
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
      this.fireData_Member.member = null;
      this.setting.capture = null;
      this.setting.paused = false;
      this.member={ gid:'',name:'',ex:'',logined:false};
    },
    // firestore GRUD
    addMember(){
      this.fireData_Member.member = this.member;
      this.fireData_Member.time =  Date.now();
      this.fireData_Member.datetime =  this.getNowTime();
      this.fireData_Member.admin =  this.admin;
      db.collection('member').add(this.fireData_Member).then(() => {
          this.unPauseCamera();
        });
    },
    deleteMember(id) {
      // console.log(id)
      db.collection('member').doc(id).delete();
    },
  },
  mounted () {
    this.admin.device = new MobileDetect(window.navigator.userAgent).ua;
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
.memberWarp{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  padding-top: 266px;
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
  background-image: linear-gradient(-90deg, #3F4457 0%, #3F4457 100%);
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
.wButton{
  outline: 0;
  display: inline-block;
  padding: 4px 6px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 6px;
  color: #3F4457;
  font-size: 16px;
  background: #fff;
  border: 0;
}
.gButton{
  outline: 0;
  display: inline-block;
  padding: 4px 6px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 6px;
  color: #fff;
  font-size: 16px;
  background: #C7B071;
  border: 0;
}
.goldButton{
  outline: 0;
  display: inline-block;
  padding: 4px 6px;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 6px;
  color: #fff;
  font-size: 16px;
  background: #C7B071;
  border: 0;
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
  height: 60px;
  z-index: 2;
  background-image: linear-gradient(-90deg, #3F4457 0%, #3F4457 100%);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
}
</style>