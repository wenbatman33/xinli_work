<template lang="pug">
  .container-fluid
    .vipBanner.w-100
      img.w-100(:src="vipImg")
    .vipConditionWrap(:style='{backgroundImage: "url("+vipConditionWrapBg+")"}')
      .vipConditionTitle
        img.mb-3(:src="vipConditionTitle")
      .container.vipCondition
        .flipCard(v-for='(item, index) in vipData')
          .front(:style='{backgroundImage: "url("+flipCardfront[index]+")"}') 
          .back(:style='{backgroundImage: "url("+flipCardBack+")"}')
            p.mt-5.mb-3
              img(:src="flipCardBackTitle")
            p 累计存款 / {{ item.vipDepositSum }} 元
            p 累计有效投注 / {{ item.vipBetSum }} 元
            p 保级流水要求 / {{ item.vipKeepBetSum }} 元
    .vipPromotionWrap(:style='{backgroundImage: "url("+vipPromotionWrapBg+")"}')
      .vipPromotionTitle
        img.mb-3(:src="vipPromotionTitle")
      .container
        .row.vipPromotionbTable.pr-5
          .vipPromotionbTableTitle.col
            p.my-3.mb-4.vipLevel VIP等级
            p.my-3 晋级礼金
            p.my-3 每月红包
            p.my-3 生日礼金
            p.my-3 春节礼金
            p.my-3 端午礼金
            p.my-3 中秋礼金
            p.my-3 国庆礼金
            p.my-3 晋级梦基金
            p.my-3 每月梦基金
            p.my-3 生日梦基金
          .vipColumn.col.text-center.text-white(v-for='(item, index) in vipData')
            p.my-3.mb-4
              img.vipIcon(:src="item.vipImage1")
            p.my-3 {{ item.vipLvBonus }}
            p.my-3 {{ item.vipMonthlyBonus }}
            p.my-3 {{ item.vipBirthdayBonus }}
            p.my-3 {{ item.vipNewYearBonus }}
            p.my-3 {{ item.vipDragonBoatBonus }}
            p.my-3 {{ item.vipMidAutumnBonus }}
            p.my-3 {{ item.vipNationalDayBonus }}
            p.my-3 {{ item.vipLvFund }}
            p.my-3 {{ item.vipMonthlyFund }}
            p.my-3 {{ item.vipBirthdayFund }}
    .vipTermsWrap(:style='{backgroundImage: "url("+vipTermsWrapBg+")"}')
      .vipTermsTitle
        img.mb-3(:src="vipTermsTitle")
      .container
        .row.vipTerms.p-3(:style='{backgroundImage: "url("+vipTermsBg+")"}')
          .col-12(v-html='vipDataStatement')
            //- P 1、晋升标准：会员的累计存款以及累计流水达到相应级别的要求，即可在次日凌晨四点晋级相应 VIP 等级。
            //- P 2、晋升顺序：VIP 等级达到相应的要求可每天晋升一级，但 VIP 等级不可越级晋升。
            //- P 3、保级要求：会员在达到某 VIP 等级后，90 天内投注需要完成保级要求。如果在此期间完成晋升，保级要求重新按照当前等级计算。
            //- P 4、降级标​​准：如果会员在一个季度( 90 天计算)内没有完成相应的保级要求流水，系统会自动降级一个等级，相应的返水及其他优惠也会随之调整至降级后的等级。
            //- P 5、晋级礼金：升级礼金在会员达到该会员级别后系统自动派发，每个级别的升级礼金每位会员仅能获得一次。 (升级礼金 1 倍流水即可提款)
            //- P 6、生日礼金：会员在注册三个月内过生日，今年将不能领取生日礼金。另注册时间大于三个月的会员需在生日当天的 VIP 页面进行自动领取，每年可领取一次。 (生日彩金 1 倍流水即可提款)
            //- P 7、每月红包：会员在上个月有过至少1次的成功存款，即可在每月 1 号获得上个月相应等级的每月红包彩金。 (每月红包彩金 1 倍流水即可提款)
            //- P 8、节庆礼金：会员在上个月有过至少 1 次的成功存款，即可在每月 1 号获得上个月相应等级的节庆彩金。 (节庆彩金 1 倍流水即可提款)
            //- P 9、VIP 优惠：晋级优惠可在VIP 页面自助领取，领取晋级优惠活动后开始计算活动有效流水；此优惠不与平台其他优惠共享，仅与返水优惠共享；每个等级的VIP 晋级优惠仅支持指定类型游戏申请。(只可申请符合当前等级的晋级优惠)
            //- P 10、梦工厂保留对活动的修改、停止及最终解释权。
    .footer.w-100.text-white.text-center Copyright © 2020 版权所有

</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      vipData: [],
      vipDataStatement: '',
      vipImg: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-banner@2x.jpg`,
      vipConditionWrapBg: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-1.png`,
      vipPromotionWrapBg: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-2.png`,
      vipTermsWrapBg: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-3.png`,
      // 
      flipCardfront: [
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-1.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-2.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-3.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-4.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-5.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-6.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-7.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-8.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-9.png`,
        `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-10.png`,
      ],
      flipCardBack: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-bg.png`,
      flipCardBackTitle: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-card-title-mb.png`,
      
      vipConditionTitle: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-title-1@2x.png`,
      vipPromotionTitle: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-title-2@2x.png`,
      vipTermsTitle: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-title-3@2x.png`,
      vipTermsBg: `${window.CDN_ASSETS}/static/img/vip/pic-vip-camp-bg-4-all-pc.png`,
    };
  },
  mounted() {
    this.$axios.get('/api/Vip')
      .then((res) => {
        this.vipData = res.data.data;
      });
    this.$axios.get('/api/Vip/Statement')
      .then((res) => {
        this.vipDataStatement = res.data.data[0].vipStatement;
      });
  },
};
</script>
<style lang="scss" scoped>
.vipConditionWrap{
  position: relative;
  width: 100%;
  min-height: 624px;
  background: #262626;
  background-position: center center;
  background-repeat: no-repeat;
}
.vipPromotionWrap{
  position: relative;
  width: 100%;
  min-height: 624px;
  background: #262626;
  background-position: center center;
  background-repeat: no-repeat;
}
.vipConditionTitle, .vipPromotionTitle, .vipTermsTitle{
  text-align: center;
  padding: 60px 0 40px 0;
  img{
    height: 280px;
    height: 40px;    
  }
}
.vipCondition{
  height: 440px;
  overflow: hidden;
}

.flipCard {
  position: relative;
  cursor: pointer;
  width: 200px;
  height: 200px;
  margin: 10px;
  float: left; 
}
.flipCard > .front{
    position: absolute;
    transform: perspective(400px) rotateY(0deg);
    width: 200px;
    height: 200px;
    color: white;
    background: #ccc;
    border-radius: 10px;
    backface-visibility: hidden; 
    transition: transform .3s linear 0s;
}

.flipCard > .back{
    position: absolute;
    transform: perspective(400px) rotateY(180deg);
    background: #fff;
    color: #ba924e;
    font-size: 12px;
    text-align: center;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    padding: 5px;
    backface-visibility: hidden; 
    transition: transform .3s linear 0s;
}

.flipCard:hover > .front{
  transform: perspective(400px) rotateY(-180deg);
}

.flipCard:hover > .back{
  transform: perspective(400px) rotateY(0deg);
}

.vipPromotionbTableTitle{
  width: 130px;
  background: #3b3b3b;
  color: #ba924e;
  font-size: 12px;
  text-align: center;
}
.vipColumn{
  font-size: 12px;
  background: #262626;
  &:nth-child(odd) {
    background: #3b3b3b;
  }
}
.vipLevel{
  text-align: center;
  line-height: 60px;
}
.vipIcon{
  width: 50px;
  height: 60px;
}
.footer{
  height: 34px;
  line-height: 34px;
  background: #000;
  font-size: 12px;
}
.vipTermsWrap{
  background: #fff;
  min-height: 650px
}
.vipTerms{
  width: 1200px;
  height: 416px;
  color: #ba924e;
  font-size: 14px;
  overflow: auto;
  line-height: 28px;
}

</style>
