<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
    .col-12
      .titleBorder.my-4
        .titleImage
          img(src='/static/ev190327/title_01.png')
        .contentBlock
          p.text-white 北京时间  03/27 00 : 00 ~ 04/10 23 : 59
    .col-12
      .titleBorder.my-4
        .titleImage
          img(src='/static/ev190327/title_02.png')
        .contentBlock
          .d-flex.justify-content-center
            .col-md-10.col-12.evTable.my-3
              table.evTable.w-100
                tr
                  th(colspan="2") 开奖日 ：{{today}}
                tr
                  td.tdTitle 头奖
                  td 
                    .my-2.row.no-gutters(v-for='(item, index) in lotteryNumberList')
                      .col-12.col-sm-12.el-col-md-12.d-md-none
                        span 第 {{Number(index)+1}} 组 
                      .col-12.col-sm-12.col-md-12.col-lg-12
                        span.d-none.d-md-inline-block.mx-2 第 {{Number(index)+1}} 组 
                        span(v-for='(number, key) in item.split("")') 
                          span.blackBall(v-if='key<6') {{number}}
                          span.redBall(v-else) {{number}}
                    p
                      span.text-danger 八个号码
                      span 与上列号码全部相同者奖金
                      span.text-danger 88,888
                tr
                  td.tdTitle 二奖
                  td 
                    span.text-danger 右七码
                    span 与上列号码全部相同者奖金
                    span.text-danger 8,888
                tr
                  td.tdTitle 三奖
                  td 
                    span.text-danger 右六码
                    span 与上列号码全部相同者奖金
                    span.text-danger 888
                tr
                  td.tdTitle 四奖
                  td 
                    span.text-danger 右五码
                    span 与上列号码全部相同者奖金
                    span.text-danger 388
                tr
                  td.tdTitle 五奖
                  td 
                    span.text-danger 右四码
                    span 与上列号码全部相同者奖金
                    span.text-danger 188
                tr
                  td.tdTitle 六奖
                  td 
                    span.text-danger 右三码
                    span 与上列号码全部相同者奖金
                    span.text-danger 88
                tr
                  td.tdTitle 特别奖
                  td 
                    span.text-danger 右二码
                    span 与上列号码全部相同者奖金
                    span.text-danger 18
                
          p 
            img.imgButton(src='/static/ev190327/btn.png', @click='showUserList')
    .col-12(v-if='winnerList')
      .titleBorder.my-4
        .titleImage
          img(src='/static/ev190327/title_05.png')
        .contentBlock
          .d-flex.justify-content-center
            .col-md-10.col-12.evTable.my-3
              table.evTable.w-100
                tr
                  th 得奖帐号
                  th 得奖号码
                  th 获得彩金
                tr(v-for='(item, index) in winnerList')
                  td {{item.UserName}}
                  td {{item.Code}}
                  td.text-danger {{item.Bonus}}
    .col-12
      .titleBorder.my-4
        .titleImage
          img(src='/static/ev190327/title_03.png')
        .contentBlock
          p.text-white 第一重 ：活动期间内每日 0 點会开出得奖号码，每次累積存款满100元，既送一组随机线上彩票，彩票号码与开奖相同即可获得相应红利 ！
          .d-flex.justify-content-center
            .col-md-10.col-12.evTable.my-3
              table.evTable.w-100
                tr
                  th 得奖奖项
                  th 得奖方法
                  th 赠送红利
                  th 最低转出限制
                  th 取款要求红利有效流水
                tr
                  td.tdTitle 头奖
                  td 
                    span.text-danger 八个号码
                    span 全部相同
                  td 
                    span.text-danger 88,888
                  td 444,440
                  td(rowspan="7")  1 倍
                tr
                  td.tdTitle 二奖
                  td 
                    span.text-danger 右七码
                    span 相同
                  td 
                    span.text-danger 8,888
                  td 44,440
                tr
                  td.tdTitle 三奖
                  td 
                    span.text-danger 右六码
                    span 相同
                  td 
                    span.text-danger 888
                  td 4,440
                tr
                  td.tdTitle 四奖
                  td 
                    span.text-danger 右五码
                    span 相同
                  td 
                    span.text-danger 388
                  td 3,880
                tr
                  td.tdTitle 五奖
                  td 
                    span.text-danger 右四码
                    span 相同
                  td 
                    span.text-danger 188
                  td 940
                tr
                  td.tdTitle 六奖
                  td 
                    span.text-danger 右三码
                    span 相同
                  td 
                    span.text-danger 88
                  td 440
                tr
                  td.tdTitle 特别奖
                  td 
                    span.text-danger 右二码
                    span 相同
                  td 
                    span.text-danger 18
                  td 90
          p.text-white 第二重 ：活动期间内，获得超过 3 次以上(含)的 3 奖奖项，额外加码赠送您好礼二选一 ！
          p.my-3
            img.evImg.my-2(src='/static/ev190327/img_1.png')
            img.evImg.my-2(src='/static/ev190327/img_2.png')
    .col-12
      .titleBorder.my-4
        .titleImage
          img(src='/static/ev190327/title_04.png')
        .contentBlock
          div.text-left.px-md-5.px-2.mx-md-5.mx-2
            p.des 1. 彩票上的号码顺序需与中奖号码相同，才符合中奖。参与活动同时，即视同接受本活动之活动内容及相关条款；所有存款、投注与活动时间均以系统数据为准，本活动可与其他活动同时参与。
            p.des 2. 当彩票中奖后，第一重活动红利将自动发放至『 
              a(href="https://www.18tiger.net/member/bonus/3") 领奖中心 
              | 』，请会员在3日内至官网申请领取，并于领取后 3 天内完成指定转账倍数金额，否则视同放弃，系统将自动扣除红利金额与期间内产生之盈利。第二重活动奖励会于达成条件后 48 小时内由专员联系通知，活动一旦申请即无法取消，逾期未申请视同放弃。
            p.des 3. 非指定游戏、多旋转老虎机、老虎机奖金翻倍投注将不计算在有效流水内。红利需达到转账最低限制，才能转回中心钱包。
            p.des 4. 活动只适用独立账户的玩家，同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，将保留取消或回收玩家优惠红利及其相关盈利的权利。
            p.des 5. 优惠皆为玩家而设，若发现任何会员(个人/团体/组织)以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，且不事先作任何通知。
            p.des 6. 官方禁止未满 18 周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有红利彩金及账户；并有权在不事先通知玩家的情况下，延长、缩短、终止或修改该活动，且为避免个人文字理解差异，官方拥有优惠活动最终解释权。
            p.des 7. 更多优惠请查看「 
              a(href="https://www.18tiger.net") 18老虎城 
              | 」公告，或随时咨询「 在线客服 」。
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', :width='DialogWidth', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
  el-dialog(custom-class='roundDialog',:visible.sync='userLotteryListShow', :width='DialogWidth',  append-to-body,style='border-radius: 20px')
    p.dialogTitle 我的彩票纪录
    div.my-2(v-if='userRecordList',v-for='(item, index) in userRecordList')
      table.lotteryListTable.w-100.text-center
        tr
          th(colspan="3") 
            span {{index}} 开奖号码：
            span(v-for='(number, key) in item.Code') {{number}} 
              span(v-if='key<(item.Code.length-1)') , 
        tr
          td.tdTitle 
            b 彩票获得时间
          td.tdTitle 
            b 我的号码
          td.tdTitle 
            b 结果
        tr(v-for='(recordItem, recordkey) in item.Record')
          td {{recordItem.DateTime}}
          td {{recordItem.Code}}
          td(v-if='recordItem.Result=="再接再厉"') {{recordItem.Result}}
          td.text-danger(v-else) {{recordItem.Result}}
</template>
<script>
import axios from 'axios';
import tgHeader from '@/components/tgHeader/tgHeader.vue';
import tgBanner from '@/views/ev190327/components/tgBanner.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  components: {
    tgLogin,
    tgHeader,
    tgBanner,
    tgFooter,
  },
  data() {
    return {
      isMobile: false,
      loginDialogShow: false,
      userLotteryListShow: false,
      winnerList: null,
      lotteryNumberList: null,
      userRecordList: null,
      today:moment(new Date()).format('YYYY.MM.DD'),
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    DialogWidth (){
      return this.isMobile ? '90%' : '600px';
    }
  },
  methods: {
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    loginDialogHide() {
      // console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    showUserList() {
      if (this.MemberLogined) {
        this.userLotteryListShow = true;
      } else {
        this.loginDialogShow = true;
      }
    },
    getWinner(){
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Event109_Lottery_Record`,'')
        .then((res) => {
          if (res.data.status === 1) {
            vm.winnerList = res.data.data;
          } else {
            vm.$message.error(res.data.error_message);
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    getLotteryNumber(){
      const vm = this;
      const payload = {};
      payload.Date  = moment(new Date()).add(-1,'days').format('YYYY-MM-DD');
      // console.log(payload.Date )
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Event109_Lottery_OpenRecord`,payload)
        .then((res) => {
          if (res.data.status === 1) {
            // console.log(res.data.data.length)
            if(res.data.data.length<=0){
              vm.lotteryNumberList = ['敬请期待彩票开奖'];
            } else {
              vm.lotteryNumberList = res.data.data;
            }
          } else {
            vm.$message.error(res.data.error_message);
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    getLottery_Detail(){
      const payload = {};
      const vm = this;
      payload.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event109/Lottery_Detail`,payload)
        .then((res) => {
          if (res.data.status === 1) {
            // console.log(res)
            vm.userRecordList = res.data.data;
          } else {
            vm.$message.error(res.data.error_message);
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    }
  },
  mounted() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
    if (this.MemberLogined) {
      // this.getWinner();
      this.getLottery_Detail();
    }
    this.getLotteryNumber();
    this.getWinner();
  }
};
</script>
<style lang="scss" scoped>
.titleBorder {
  position: relative;
  background: linear-gradient(to right,#6D403E, #FFFFF0, #6D403E);
  // background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  border-radius: 20px;
  padding: 3px;
}

.contentBlock{
  background: #571110;
  border-radius: 20px;
  padding: 40px 0 20px 0;
}
.titleImage{
  position: absolute;
  width: 100%;
  text-align: center;
  top: -28px;
}
.des{
  font-size: 13px;
  line-height: 2.2;
  color: #FFFFFf
}
.evImg{
  max-width: 100%;
}
.evTable{
  table, th, td{
    border: 1px solid #EDD46D;
  }
  th{
    padding: 6px;
    background: #90070F;
    color: #fff;
  }
  .tdTitle{
    background: #90070F;
    color: #fff;
  }
  td{
    padding: 6px;
    vertical-align: middle;
    background: #FFF
    // background: rgba(180,155,200,.24);
  }
}
.lotteryListTable{
  table, th, td{
    border: 1px solid #E0E6ED;
  }
  th{
    padding: 6px;
    background: #002766;
    color: #fff;
  }
  .tdTitle{
    background: #EFF2F7;
    color: #475669;
  }
  td{
    padding: 6px;
    vertical-align: middle;
    background: #FFF
    // background: rgba(180,155,200,.24);
  }
}
.imgButton{
  cursor: pointer;
}

</style>
<style lang="scss">
.roundDialog{
  border-radius: 20px;
  overflow: hidden;
}
.dialogTitle{
  position: absolute;
  background-image: linear-gradient(-90deg, #FF5900 0%, #B50000 71%, #610000 100%);
  border-radius: 0 0 20px 0;
  color: #fff;
  top: 0;
  left: 0;
  padding: 8px 16px;
}
.blackBall{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: #4B4B4B;
  background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.40) 100%);
  color: #fff;
  font-family: Arial Black;
  border-radius:40px;
  line-height: 48px;
  margin: 0 2px;
}
.redBall{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: #E40000;
  background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.40) 100%);
  color: #fff;
  font-family: Arial Black;
  border-radius:40px;
  line-height: 48px;
  margin: 0 2px;
}

@media screen and (max-width: 750px) {
  .blackBall{
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 0 2px;
  }
  .redBall{
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 0 2px;
  }
}

</style>