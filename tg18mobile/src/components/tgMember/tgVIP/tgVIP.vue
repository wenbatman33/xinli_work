<template lang='pug'>
  .container-fluid.VIPPage
    .VIPBanner
      img(src='/static/img/vip/vipBanner.jpg')
    .container.pb-5
      .VIPTitle.text-center.my-5
        img(src='/static/img/vip/vipTitle1.png')
      .VIPSectionTable
        swiper.VIPSectionTableSwiper(ref='mySwiper', :options='swiperOption')
          swiper-slide(v-for='item in tableList')
            img.banner(:src='item.Images')
          #swiper-pagination.mt-2.d-flex.justify-content-center(slot="pagination")
      .VIPTitle.text-center.my-5
        img(src='/static/img/vip/vipTitle2.png')
      .VIPSection
        table
          tr
            th 等级名称
            th 说明
          //---------- tr 分隔線 --------------------------
          tr
            td.title(rowspan="3") 会员优惠
            td 每天统计存款额度，满足晋级条件後，当日即时晋级。
          tr
            td 会员晋级後不降等，一次晋级优惠永续。
          tr
            td 存款金额在统计后，达到更高等级时可提前跳级。
          //---------- tr 分隔線 --------------------------
          tr
            td.title 返水优惠
            td 晋级当日即可领取晋级後的返水优惠。
          //---------- tr 分隔線 --------------------------
          tr
            td.title  救援金
            td 晋级当日即可领取晋级後的救援金。
          //---------- tr 分隔線 --------------------------
          tr
            td.title 次存优惠
            td 次存提款流水限制为 20 倍。
          //---------- tr 分隔線 --------------------------
          tr
            td.title(rowspan="2") 晋级礼金
            td 晋级礼金於晋级当日立即派发，一倍流水即可提款。
          tr
            td 跳级晋升的会员只能拿到该等级的晋级礼金，中间跳过的等级无法领取。
          //---------- tr 分隔線 --------------------------
          tr
            td.title(rowspan="2") 生日礼金
            td 生日礼金 1 倍流水即可提款(会员需主动於会员中心设定生日，未设定逾期不补发)
          tr
            td 如生日当月进级可领到新的等级生日礼金。
          //---------- tr 分隔線 --------------------------
          tr
            td.title(rowspan="2") 每月回馈礼金
            td 每月回馈礼金 1 倍流水即可提款。
          tr
            td 派发日期为每月 1 日，上月存款金额需达 100 元以上。
          //---------- tr 分隔線 --------------------------
          tr
            td.title(rowspan="3") 免存款现金
            td 申请免存款现金前需清偿上一次的提领金额。
          tr
            td 需於 7 日内返还已提领的筹码金额。
          tr
            td 申请免存款现金由会员主动联系客服申请。
          //---------- tr 分隔線 --------------------------
          tr
            td.title(rowspan="2") 惊喜放送
            td 不定期推出尊荣礼遇，有钱也买不到的服务，交给老虎城包办。
          tr
            td 会员需连续三个月存款金额达 100 元以上（包含申请当月）。
          //---------- tr 分隔線 --------------------------
      .VIPTitle.text-center.my-5
        img(src='/static/img/vip/vipTitle3.png')
      .VIPSection
        .VIPRule.p-3
          p 1、老虎城 VIP 制度只针对娱乐性质会员，如果发现会员超出一个账户，或其他不正常投注行为，老虎城保留冻结账户盈利及余额的权利。
          p 2、如有会员个人身份认证争议时，老虎城有权要求会员提供识别文件，或其他可以辨别会员身份的方式，这是为了保障双方利益，杜绝身份盗用的行为。
          p 3、晋级计算以存款到账时间为准，每个存款渠道的到账时间不同，晋级前请会员留意存款顺序。
          p 4、所有 VIP 等级优惠如与优惠活动冲突，或其他营运需求产生新的约束，一律以优惠活动页面说明为准，对於相关活动办法，老虎城保留最终解释权和裁决权。
          p 5、老虎城保留 VIP 制度的最终解释权，并可以在没有事先通知的情下修改、中止 VIP 制度及包含的优惠。

</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

const { Swiper } = window;
export default {
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
  data() {
    return {
      submitLoading: false,
      tableList: [
        { Images: '/static/img/vip/table_1.png' },
        { Images: '/static/img/vip/table_2.png' },
        { Images: '/static/img/vip/table_3.png' },
      ],
      swiperOption: {
        notNextTick: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        pagination: {
          el: '#swiper-pagination',
          clickable: true,
        },
        paginationClickable: true,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
  // @import '~swiper/dist/css/swiper.css';
  .swiper-pagination-bullet {
		width: 20px;
		height: 20px;
		display: inline-block;
		border-radius: 100%;
		background: #fff !important;
		opacity: 0.1;
		margin: 0 10px !important;
	}
  .VIPSectionTable{
		width: 100%;
    height: auto;
  }
  .banner{
    width: 100%;
    // background-repeat: no-repeat;
  }
  
  
  .VIPPage{
    background: #000;
    background: url('/static/img/vip/vipBackground.jpg');
    background-repeat: repeat-y;
    background-size: cover;
  }
  .VIPBanner{
    img{
      width: 100%;
    }
  }
  .VIPRule{
    color: #4088C7;
    background: rgba(0,0,0,0.4);
    border-radius: 12px;
    font-size: 12px;
    line-height: 1.5;
  }
  table{
    color: #fff;
    width: 100%;
    border: 1px solid #BA924E;
    border-collapse: collapse;
    text-align: center;
    font-size: 13px;
    font-weight: 200;
    th{
      padding: 12px 5px;
      background-image: linear-gradient(-90deg, #07182E 0%, #03437B 100%);
      border: 1px solid #BA924E;
      vertical-align: middle;
    }
    td{
      padding: 12px 5px;
      background: none;
      border: 1px solid #BA924E;
      vertical-align: middle;
    }
    .title{
      color: #BA924E;
    }
  }
</style>
<style lang='scss'>
.VIPSectionTableSwiper{
  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 100%;
    background: #fff !important;
    opacity: 0.1;
    margin: 0 10px !important;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: rgba(250,219,20,1) !important;
  }
}
@media screen and (max-width: 750px) {
	.swiper-pagination {
		bottom: 4vw !important;
	}
	.swiper-pagination-bullet {
		width: 2.67vw !important;
		height: 2.67vw !important;
		margin: 0 1.33vw !important;
	}
}
</style>
