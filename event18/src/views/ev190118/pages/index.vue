<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.main.py-3
    .col.px-md-5.py-md-2.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-3.py-3
          span
            img(src='/static/ev190118/title_1.png')
        .col-12.eventcaption.py-md-3.py-3
          p.text-white 北京时间  01/18 00 : 00 ～ 01/31 23 : 59 活动期间内不论新老用户，推荐人于「 活动网页 」输入邀请好友的账号与手机，
          p.text-white 只要该好友首次单笔充值 100 元以上，则推荐人可以获得最高 38 元奖励！且好友账号依然享有其他存款优惠！
        .col-12.eventcontent.py-md-3.py-3
          .row.no-gutters.d-flex.justify-content-center
            .col-md-10.col-12.evTable
              table.w-100
                tr
                  th 邀请推荐人数量
                  th 好友存款金额
                  th 推荐人获得彩金
                  th 提款要求流水
                tr
                  td(rowspan="2") 
                    span 前 
                    span.highlight 688 
                    span 名邀请会员 
                    br
                    span 额满前无邀请上限
                  td 100 元以上
                  td 18 元
                  td(rowspan="2") 15 倍
                tr
                  td 500 元以上
                  td 38 元
          .col-12.eventcaption.py-md-3.py-3
            p.purpleLight ※每个会员账号仅能申请一次，且邀请成功后推荐人无法再推荐该好友。
            p.purpleLight ※邀请账号须为完整账号 (手机、邮箱与银行卡绑定)。
            p.purpleLight ※此优惠限该好友账号的首次存款，次存将不列入活动条件，每位好友的存款金额亦分开计算。
          .col-12.eventtitl.py-md-3.py-3
            span
              img(src='/static/ev190118/title_2.png')
          .col-12.pt-md-3.pt-3
            div.text-left.px-md-5.px-2.mx-md-5.mx-2
              p.des 1. 好友帐号需为2019/1/18以后注册完成之完整账号(绑定手机、邮箱与银行卡)，邀请人需曾经单笔存款100元(含)以上；不分邀请前后，只要好友完成指定金额首存推荐人即可领取彩金。
              p.des 2. 活动页面每 30 分钟更新一次，活动期间内好友账号若达成活动资格，推荐人彩金将立即显示于官网首页右上方『 
                a(href='https://www.18tiger.net/member/bonus/3') 领奖中心 
                | 』，申请后48小时内审核发放，超时视同放弃资格。红利一领取即无法取消，逾期未申请将视同放弃。所有存款和投注情况均由系统自动统计，若有任何异议，以派送记录为准。
              p.des 3. 有效流水仅计算经典老虎机、电动吃角子，其余老虎机或非老虎机游戏不计算在内。
              p.des 4. 每个会员账号只能被邀请一次，且同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，18老虎城将保留或取消玩家优惠彩金的权利。若两者账号为同一人行为，官方有权取消此优惠资格以及所有红利、盈利所得、返水、救援金等。
              p.des 5. 18老虎城 的所有优惠为玩家而设，若发现任何会员 [ 个人/团体/组织 ] 以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，并不事先作任何通知。
              p.des 6. 18老虎城 官方有权在无通知的情况下，更改、终止或取消活动的权利，且为避免个人文字理解差异，官方拥有所有优惠最终解释与裁决权。
              p.des 7. 更多 18老虎城 优惠请随时咨询「 在线客服 」或查看「 
                a(href='https://www.18tiger.net/news') 18老虎城 
                | 」公告。
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import { mapState } from 'vuex';
import tgHeader from '@/components/tgHeader/tgHeader.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgMenu from '@/views/ev190118/components/tgMenu.vue';
import tgBanner from '@/views/ev190118/components/tgBanner.vue';
import router from '../router/router';


export default {
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
    tgLogin,
    
  },
  data() {
    return {
      loginDialogShow: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    gotoP1() {
      if (this.MemberLogined) {
        router.push('/p1');
      } else {
        this.loginDialogShow = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.main{
  background: url('/static/ev190118/bgImg.png')50% bottom no-repeat, url('/static/ev190118/bg.jpg') 50% 0 repeat;
  background-size: 100% auto;
}
.eventpage{
  background: rgba(0,0,0,0.14);
}
.eventcontent {
  color: rgba(255,255,255,1);
  font-size: 18px;
  img {
    width: 100%;
    max-width: fit-content;
    height: auto;
  }
  .datalist {
    width: 100%;
    color: rgba(255,255,255,1);
    font-size: 14px;
    border: 1px solid rgba(255,255,255,1);
    ul, li {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ul {
      border-bottom: 1px solid rgba(255,255,255,1);
      &:first-child {
        background: rgba(217,217,217,0.1);
      }
      &:last-child {
        border-bottom: none;
      }
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: 1px solid rgba(255,255,255,1);
      &:last-child {
        border-right: none;
      }
    }
  }
}
.evTable{
  table, th, td{
    border: 1px solid #fff;
  }
  th{
    padding: 6px;
    background: rgba(180,155,200,.24);
  }
  td{
    padding: 6px;
    vertical-align: middle;
    // background: rgba(180,155,200,.24);
  }
}
.highlight{
  font-size: 36px;
  font-weight: bold;
  color: #FAE62D;
  font-family: Arial Black;
}
.purpleLight{
  color: #B49BC8;
}
.des{
  font-size: 13px;
  line-height: 2.2;
}

</style>
