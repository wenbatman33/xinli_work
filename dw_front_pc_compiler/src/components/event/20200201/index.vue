<template lang="pug">
.container-fluid.p-0.event#event
  .banner.w-100
    img(:src='banner')
  .container
    .row
      .col-12
        span.mr-3
          router-link(to='/event/20200201#target_1') 
            img(:src='btn_1')
        span.mr-3
          router-link(to='/event/20200201#target_2') 
            img(:src='btn_2')
        span.mr-3 
          router-link(to='/event/20200201#target_3') 
            img(:src='btn_3')
        span.mr-3
          router-link(to='/event/20200201#target_4') 
            img(:src='btn_4')
      .col-12
        a#target_1(ref='target_1', name='#target_1')
        .titleBar.px-3.my-3
          i.fas.fa-trophy.mr-3
          b 活动说明
        .dec.text-white.p-3 活动期间内每周结算，投注所有选定赛事即可参与竞赛，每周前三名即可获得相应奖金！
      .col-12
        a#target_2(ref='target_2', name='#target_2')
        .titleBar.px-3.my-3
          i.fas.fa-futbol.mr-3
          b 赛事表
        .eventTable
          table.w-100
            tr.title
              th 类别
              th 时间
              th.text-left  赛事
              th.text-left  参赛队伍
            tr(v-for='(item, index) in GameMatchList')
              td {{item.className}}
              td {{item.dateStart}}
              td.text-left {{item.leagueName}}
              td.text-left {{item.team}}
      .col-12
        a#target_3(ref='target_3', name='#target_3')
        .titleBar.px-3.my-3
          i.fas.fa-user-friends.mr-3
          b 排行榜
          .float-right
            span.weekBtn.mx-2(:class='[weekType===1 ? "weekBtnActive": ""]', @click='getLeaderBoard(1)') 本周排名
            span.weekBtn.mx-2(:class='[weekType===2 ? "weekBtnActive": ""]', @click='getLeaderBoard(2)')  上周排名
        .eventTable
          .w-100.text-center.text-white.p-5(v-if='LeaderBoardList.length<=0') 尚无资料
          table.w-100.gapTabl(v-else)
            tr.title
              th 排名
              th 本周目前排名
              th 目前胜场数
              th 目前投注额
              th 预计获得奖金
            tr(v-for='(item, index) in LeaderBoardList')
              td
                img(:src='pic_num[(item.rank-1)]')
                span {{item.rankName}}
              td {{item.account}}
              td {{item.winCount}}
              td {{item.betAmount}}
              td {{item.bonus}}
          div
            small.text-white 注意：以上排名非即时，每日 00:00 系统会依据赛事投注结果计算排名。
      .col-12
        a#target_4(ref='target_4', name='#target_4')
        .titleBar.px-3.my-3
          i.fas.fa-award.mr-3
          b 奖金榜
        .eventTable
          table.w-100.cupTable
            tr.title
              th 排名
              th 计算方式
              th 赠送奖励
              th 最高奖金
              th 取款要求红利有效流水
            tr
              td
                img.cup(:src='pic_cup_1')
                span 周冠军
              td 胜场数+投注额周排名第一
              td 8% 投注额
              td 888
              td 1 倍
            tr
              td
                img.cup(:src='pic_cup_2')
                span 周亚军
              td 胜场数+投注额周排名第二
              td 4% 投注额
              td 688
              td 1 倍
            tr
              td
                img.cup(:src='pic_cup_3')
                span 周季军
              td 胜场数+投注额周排名第三
              td 2% 投注额
              td 388
              td 1 倍
      .col-12
        .titleBar.px-3.my-3
          i.fas.fa-book.mr-3
          b 活动条款
        .dec.text-white.p-3 
          ol
            li 活动于每日选定特定梦工厂体育赛事，用户须投注所有选定赛事才具备参赛资格，排名以用户胜场数及   投注额决定，参与条件为该帐号周内期间梦工厂体育总投注额达 10,000 以上。参与活动同时，即视同接受本活动之活动内容及相关条款；所有存款、投注与活动时间均以系统数据为准，本活动不可与返水活动同时参与。
            li 仅对产生输赢结果的投注额进行计算，任何平局、赛事取消、提前兑现、无风险投注、免费投注、单场赛事赔率低于欧洲盘 1.70 、香港盘 0.70 的注单都将不计算在有效投注内，赢半输半的投注仅会计算一半为有效流水(通过客服查询审核为准)。
            li 周排名结算后，奖金将自动发放至『 领奖中心 』，请会员在 3 日内至官网申请领取，并于领取后 3 天内完成指定转账倍数金额，否则视同放弃，系统将自动扣除红利金额与期间内产生之盈利。活动一旦申请即无法取消，逾期未申请视同放弃。
            li 非指定梦工厂体育赛事投注将不计算在有效流水内。
            li 活动只适用独立账户的玩家，同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，将保留取消或回收玩家优惠红利及其相关盈利的权利。
            li 优惠皆为玩家而设，若发现任何会员(个人/团体/组织)以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，且不事先作任何通知。
            li 官方禁止未满 18 周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有红利彩金及账户；并有权在不事先通知玩家的情况下，延长、缩短、终止或修改该活动，且为避免个人文字理解差异，官方拥有优惠活动最终解释权。
            li 更多优惠请查看「 梦工厂 」公告，或随时咨询「 在线客服 」。
  .footer.w-100.text-white.text-center Copyright © 2020 版权所有
</template>

<script>
export default {
  data() {
    return {
      banner: `${window.CDN_ASSETS}/static/img/event/20200201/banner-pc.jpg`,
      btn_1: `${window.CDN_ASSETS}/static/img/event/20200201/pic-btm-1.png`,
      btn_2: `${window.CDN_ASSETS}/static/img/event/20200201/pic-btm-2.png`,
      btn_3: `${window.CDN_ASSETS}/static/img/event/20200201/pic-btm-3.png`,
      btn_4: `${window.CDN_ASSETS}/static/img/event/20200201/pic-btm-4.png`,
      pic_num: [`${window.CDN_ASSETS}/static/img/event/20200201/pic-num-1.png`,
        `${window.CDN_ASSETS}/static/img/event/20200201/pic-num-2.png`,
        `${window.CDN_ASSETS}/static/img/event/20200201/pic-num-3.png`,
        `${window.CDN_ASSETS}/static/img/event/20200201/pic-num-4.png`,
        `${window.CDN_ASSETS}/static/img/event/20200201/pic-num-5.png`],
      pic_cup_1: `${window.CDN_ASSETS}/static/img/event/20200201/pic-cup-1.png`,
      pic_cup_2: `${window.CDN_ASSETS}/static/img/event/20200201/pic-cup-2.png`,
      pic_cup_3: `${window.CDN_ASSETS}/static/img/event/20200201/pic-cup-3.png`,
      pic_cup_4: `${window.CDN_ASSETS}/static/img/event/20200201/pic-cup-4.png`,
      pic_cup_5: `${window.CDN_ASSETS}/static/img/event/20200201/pic-cup-5.png`,
      GameMatchList: [],
      LeaderBoardList: [],
      hashName: '',
      weekType: 2,
    };
  },
  methods: {
    activeTab() {
      this.hashName = this.$route.hash;
      const path = this.$route.hash.split('#');
      const Hash = path[1];
      if (Hash) {
        const elementPostiton = window.document.getElementById(Hash).getBoundingClientRect();
        window.document.getElementById('event').scrollTop = elementPostiton.top;
        this.$router.replace({ 'query': null });
      }
    },
    getLeaderBoard(num) {
      this.weekType = num;
      this.LeaderBoardList = [];
      this.$axios.get(`/api/Event0001/Frontend/GetLeaderBoard?weekType=${num}`)
        .then((res) => {
          this.LeaderBoardList = res.data.data;
        });
    },
  },
  watch: {
    $route(to, from) {
      this.activeTab();
    },
  },
  mounted() {
    this.$axios.get('/api/Event0001/Frontend/GetMatch')
      .then((res) => {
        this.GameMatchList = res.data.data;
      });
    // 1:取得 本週排行榜 2:取得 上週排行榜
    this.getLeaderBoard(2);
    this.activeTab();
  },
};
</script>
<style lang="scss" scoped>
.event{
  width: 100%;
  height: 100%;
  background: #000;
  .banner{
    img{ 
      width: 100%;
    }
  }
  .titleBar{
    width: 100%;
    height: 55px;
    line-height: 55px;
    background-image: linear-gradient(left,#00fbfe 0%, rgba(247, 174 ,255, 0.0) 25%);
    box-shadow: 0 1px 0 0 #00fbfe;
    color: #fff;
  }
  ol{
    li{
      font-size: 12px;
      list-style-type: decimal;
    }
  }
  .footer{
    height: 52px;
    line-height: 52px;
    background: #151d2d;
    font-size: 12px;
  }
  .gapTable{
    border-collapse:separate; 
    border-spacing: 0px 10px;
  }
  .cupTable{
    border-collapse:separate; 
    border-spacing: 0px 20px;
  }
  table{
    tr{
      height: 48px;
      line-height: 48px;
      background-image: linear-gradient(to right, rgba(0, 251, 254, 0.5) 2%, rgba(254, 0, 241, 0.5) 100%);
    }
    tr:nth-child(odd){
      height: 48px;
      line-height: 48px;
      background-image: linear-gradient(to right, rgba(0, 251, 254, 0.4) 2%, rgba(254, 0, 241, 0.4) 100%);
    }
    .title{
      height: 48px;
      line-height: 48px;
      background-image: linear-gradient(to right, #00fbfe 2%, #fe00f1 100%);
    }
    th{
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
    td{
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
  }
  .cup{
    margin-top: -10px;
  }
  .weekBtn{
    width: 136px;
    height: 46px;
    border-radius: 4px;
    border: 1px solid #fe00f1;
    background: none;
    color: #fe00f1;
    padding: 10px;
    cursor: pointer;
  }
  .weekBtnActive{
    width: 136px;
    height: 46px;
    border-radius: 4px;
    border: 1px solid #fe00f1;
    background: #fe00f1;
    color: white;
    padding: 10px;
  }
}
</style>
