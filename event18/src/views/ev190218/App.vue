<template lang="pug">
  .container-fluid
    router-view
    //- iframe.postMsg(:src='mainHost+"/postMsg"' id='postMsg' frameBorder='0')
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
      mainHost: process.env.VUE_APP_HOST,
    };
  },
  computed: {
    ...mapState('index', [
      'Jackpot',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    getMainSiteToken(event) {
      this.loaded = true;
      if (event.origin === this.mainHost) {
        if (event.data.JWT_TOKEN) {
          window.localStorage.setItem('JWT_TOKEN', event.data.JWT_TOKEN);
          this.$store.dispatch('member/MemberLoginStatus');
        }
      }
    },
    getDomains() {
      const payload = {};
      const vm = this;
    },
  },
  mounted() {
    const vm = this;
    this.$store.dispatch('member/MemberLoginStatus');
    $.ajax({
      type: 'get',
      url: `${process.env.VUE_APP_DOMAINS}?now=${new Date()}`,
      dataType: 'json',
      jsonpCallback: 'callback',
      success(res) {
        vm.$store.commit('index/setSiteHost', res[0].link);
      },
      error() {
        console.log('fail');
      },
    });
    if (window.localStorage.JWT_TOKEN_Overdue) {
      this.$message({
        message: window.localStorage.JWT_TOKEN_Overdue,
        type: 'warning',
        onClose() {
          window.localStorage.removeItem('JWT_TOKEN_Overdue');
        },
      });
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/variables.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '@/assets/scss/main.scss';
html, body {
  width: 100%;
  height: 100%;
  padding: 0 !important;
  background: rgba(162,0,8,1);
  ol, ul {
    list-style: none;
  };
  a, img {
    border: none;
    outline: none;
    /*-- For Firefox --*/
    text-decoration: none;
    -webkit-transition: background-color, color 0.2s linear;
    -moz-transition: background-color, color 0.2s linear;
    transition: background-color, color 0.2s linear;
  };
  input, select {
    outline: none;
  };
  .container-fluid {
    width: 100%;
    padding: 0 !important;
  };
}
.postMsg {
  position: absolute;
  top: -9999999px;
  width: 0;
  height: 0;
}
button {
  outline: none !important;
}
.btn {
  padding: 10px 30px;
  background: linear-gradient(90deg, rgba(0,179,255,1), rgba(0,84,217,1));
  color: rgba(255,255,255,1);
  border: none;
  border-radius: 100px;
  position: relative;
  z-index: 100;
}
.linkRed {
  display: inline-block;
  width: 100%;
  padding: 10px 30px;
  background: linear-gradient(90deg, rgba(97,0,0,1), rgba(255,89,0,1));
  color: rgba(255,255,255,1);
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  border: none;
  border-radius: 100px;
  position: relative;
  z-index: 100;
}
.main {
  width: 100%;
}
.search {
  width: 100%;
  background: rgba(255,255,255,1);
  .search_title {
    span {
      color: rgba(94,0,4,1);
    };
  };
  .search_btn {
    width: 100%;
    border-radius: 4px;
    span {
      display: block;
      width: 100%;
      background: rgba(162,0,8,1);
      color: rgba(255,255,255,1);
      border-radius: 4px;
      cursor: pointer;
    };
  };
}
.evPage01, .evPage02, .evNote {
  width: 100%;
  padding: 60px 0;
  color: rgba(255,255,255,1);
  font-size: 16px;
  line-height: 30px;
}
.evPage01{
  background: rgba(241,170,77,1);
}
.evPage02{
  background: rgba(162,0,8,1);
}
.evNote{
  background: rgba(0,39,102,1);
  a.LuckWebSite {
    color: #007bff;
    cursor: pointer;
    &:hover {
      color: #0056b3;
      text-decoration: underline;
    };
  };
}
.evPageLine {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -30px 0;
  position: relative;
  z-index: 50;
  overflow: hidden;
  img {
    width: 100%;
    max-width: fit-content;
  };
}
.evHeader {
  width: 100%;
  padding-bottom: 10px;
  font-size: 20px;
  letter-spacing: 15px;
  .evTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: url('/static/ev190218/title_iconL.png') 17.5% 50% no-repeat, url('/static/ev190218/title_iconR.png') 82.5% 50% no-repeat;
    background-size: contain;
    overflow: hidden;
    img {
      width: 100%;
      max-width: fit-content;
    };
  };
}
.evHeaderBg {
  background: url('/static/ev190218/evHeaderBg.png') 50% 100% no-repeat;
  background-size: contain;
}
.evChapter01 {
  width: 100%;
  padding: 5px;
  background: linear-gradient(0deg, rgba(0,19,50,1), rgba(0,39,102,1)) content-box, linear-gradient(0deg, rgba(240,186,86,1), rgba(250,230,156,1)) padding-box;
}
.evChapter02 {
  width: 100%;
  padding: 5px;
  background: url('/static/ev190218/evChapter02Bg.png') 50% 100% no-repeat , linear-gradient(0deg, rgba(0,19,50,1), rgba(0,39,102,1)) content-box, linear-gradient(0deg, rgba(240,186,86,1), rgba(250,230,156,1)) padding-box;
  background-size: contain;
}
.evCaption, .evContent {
  width: 100%;
  p {
    width: 100%;
  };
}
.evTable01 {
  width: 100%;
  color: rgba(0,0,0,1);
  ul, li {
    display: block;
    float: left;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  ul {
    width: 100%;
    &:first-child {
      border-top: none;
    };
    &:last-child {
      border-right: none;
    };
  };
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 23%;
    margin: 1%;
    background: rgba(255,255,255,1);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    &:last-child {
      width: 48%;
    };
  };
  .th {
    height: auto;
    background: rgba(0,0,0,1) !important;
  };
};
.evTable02 {
  width: 100%;
  color: rgba(0,0,0,1);
  ul, li {
    display: inline-block;
    box-sizing: border-box;
  };
  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    &:first-child {
      border-top: none;
    };
    &:last-child {
      border-right: none;
    };
  };
  li {
    .evCompleteDays {
      width: 100%;
      margin: 15px 0;
      letter-spacing: 2px;
      background: linear-gradient(90deg, rgba(53,132,167,0.1), rgba(53,132,167,1), rgba(53,132,167,0.1));
      color: rgba(255,255,255,1);
      span {
        color: rgba(250,219,20,1);
      };
    };
    .evTable02Content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      background: rgba(255,255,255,1);
      border-radius: 20px;
      position: relative;
      overflow: hidden;
    };
  };
  .th {
    height: auto;
    background: rgba(0,0,0,1) !important;
  };
};
.datalist {
  width: 100%;
  color: rgba(31,45,61,1);
  border-top: 1px solid rgba(224,230,237,1);
  border-left: 1px solid rgba(224,230,237,1);
  overflow: auto;
  ul, li {
    box-sizing: border-box;
  };
  ul {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid rgba(224,230,237,1);
    &:first-child {
      border-top: none;
    };
    &:last-child {
      border-right: none;
    };
  };
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 10px;
    border-right: 1px solid rgba(224,230,237,1);
  };
  .th {
    height: auto;
    background: rgba(239,242,247,1) !important;
    color: rgba(71,86,105,1);
    font-weight: 600;
  };
};
.evComplete {
  width: 100%;
  min-height: 100%;
  padding: 40px 0;
  background: rgba(0,0,0,0.8);
  color: rgba(255,255,255,1);
  position: absolute;
  span {
    display: inline-block;
    width: 100%;
    padding: 10px;
    font-size: 24px;
    letter-spacing: 5px;
  };
  .evCompleteBtn01, .evCompleteBtn02 {
    display: inline-block;
    margin: 10px;
    padding: 5px 30px;
    color: rgba(255,255,255,1);
    border-radius: 50px;
    cursor: pointer;
  };
  .evCompleteBtn01 {
    background: linear-gradient(90deg, rgba(97,0,0,1), rgba(255,89,0,1));
  };
  .evCompleteBtn02 {
    background: linear-gradient(90deg, rgba(0,39,102,1), rgba(0,79,159,1));
  };
};
.evTask {
  width: 100%;
  .evDate {
    float: left;
    width: 100%;
    .evDateLuck, .evDateTiger, .evDateLuckAll, .evDateTigerAll, .evDateMax, .rewardLuck, .rewardTiger, .rewardMax {
      float: left;
      text-align: center;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        max-width: fit-content;
      }
    };
    .evDateLuck, .evDateTiger, .evDateLuckAll, .evDateTigerAll, .evDateMax {
      width: 50%;
      padding: 5px;
    };
    .rewardLuck, .rewardTiger, .rewardMax {
      width: auto;
      min-width: 15%;
      padding: 5px 15px;
      position: absolute;
      top: 0;
      left: 0;
    };
    .evDateLuck, .evDateTiger, .evDateTigerAll, .evDateMax, .rewardLuck, .rewardTiger, .rewardMax {
      border-radius: 0 0 20px 0;
    };
    .evDateLuckAll {
      border-radius: 0 0 0 20px;
    };
    .evDateLuck, .evDateLuckAll, .rewardLuck {
      background: linear-gradient(90deg, rgba(97,0,0,1), rgba(255,89,0,1));
    };
    .evDateTiger, .evDateTigerAll, .rewardTiger {
      background: linear-gradient(90deg, rgba(0,39,102,1), rgba(0,79,159,1));
    };
    .evDateMax, .rewardMax {
      background: linear-gradient(90deg, rgba(0,77,157,1), rgba(181,0,0,1));
    };
    .evDateDay {
      float: left;
      width: 50%;
      padding: 5px 20px;
      text-align: right;
      line-height: 40px;
    };
  };
  .evBouns {
    float: left;
    width: 100%;
    padding: 15px 20px 10px;
    .evBounsWord {
      display: inline-block;
      width: 30%;
      color: rgba(140,140,140,1);
      font-size: 14px;
      text-align: left;
    };
    .evBounsNo, .evBounsNoAll {
      display: inline-block;
      font-family: 'Arial Black';
      font-size: 36px;
      font-weight: 800;
      vertical-align: text-bottom;
    };
    .evBounsNo {
      width: 70%;
      text-align: right;
    };
    .evBounsNoAll {
      width: 100%;
    }
  };
  .evTaskBtn01, .evTaskBtn02, .evTaskWord01, .evTaskWord02 {
    float: left;
    width: 102%;
    padding: 6px 30px;
  };
  .evTaskBtn01, .evTaskWord01 {
    background: linear-gradient(0deg, rgba(213,152,60,1), rgba(191,131,41,1));
    color: rgba(255,255,255,1);
  };
  .evTaskBtn02, .evTaskWord02 {
    background: linear-gradient(0deg, rgba(54,62,88,1), rgba(43,41,68,1));
    color: rgba(191,191,191,1);
  };
  .evTaskBtn01, .evTaskBtn02 {
    cursor: pointer;
  };
}
ul.depiction {
  width: 100%;
  padding-left: 25px;
  list-style: decimal;
  li, p {
    width: 100%;
  };
}
.rewardDialog {
  margin: 0 auto;
  .el-dialog {
    background: rgba(255,255,255,1);
    color: rgba(255,255,255,1);
    border-radius: 20px;
    box-shadow: inset 0 0 20px 10px rgba(255,255,255,0.3);
    overflow: hidden;
  };
  .el-dialog__header {
    padding: 0;
  };
  .el-dialog__body {
    padding: 60px 20px 20px;
  };
  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #909399;
    };
  };
  .rewardTitle {
    color: rgba(38,38,38,1);
    font-size: 20px;
    line-height: 50px;
  };
}
@media screen and (max-width: 1024px) {
  .evTable01 {
    li {
      width: 44%;
      margin: 2% 3%;
      &:last-child {
        width: 94%;
        margin: 2% 3%;
      };
    };
  };
}
@media screen and (max-width: 750px) {
  .evPageLine {
    margin: -4vw 0;
  };
  .evTable01 {
    li {
      width: 94%;
      margin: 2% 3%;
      &:last-child {
        width: 94%;
        margin: 2% 3%;
      };
    };
  };
  .evTask {
    .evBouns {
      .evBounsNo, .evBounsNoAll {
        font-size: 26px;
      };
    };
  };
}
</style>
