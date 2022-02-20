<template lang="pug">
  div
    .d-flex
      .btn.d-flex.align-items-center.py-3.px-4.mr-2.font-20
        img.mr-2(:src="img_contact1", alt="alt" width="24px")
        | 跨界整合
      .btn.d-flex.align-items-center.py-3.px-4.mr-2.font-20
        img.mr-2(:src="img_contact2", alt="alt" width="24px")
        | 操作自己的获利
      .btn.d-flex.align-items-center.py-3.px-4.mr-2.font-20
        img.mr-2(:src="img_contact3", alt="alt" width="24px")
        | 创新的投资工具
      .btn.d-flex.align-items-center.py-3.px-4.mr-2.font-20
        img.mr-2(:src="img_contact4", alt="alt" width="24px")
        | 稳健的获利模式
    .mt-4.d-flex(style="line-height: 45px")
      img(:src="img_faq5", alt="alt" width="50%")
      .font-20.ml-4(style="width: 50%")
        | PLK是目前英国总公司，首次在亚洲区设置的运动投资型公司，不同于一般市场上的运动投资基金，
        | 都是交给专业经理人去掌控您的损利，而是由会员本身去操作您的获利。本公司主要经营项目以足球为主，
        | 连同国际赛事协会与英国知名的合法交易所公司合作，经过多年的研发，概念革命性地颠覆了传统运动市场，
        | 集合了机率及统计学概论，让足球项目不单单只是博弈，也可以是一种投资工具，进行比股票与基金更稳健的操作模式。
</template>

<script>
export default {
  data() {
    return {
      img_contact1: `${process.env.VUE_APP_STATIC}/img/contact1.png`,
      img_contact2: `${process.env.VUE_APP_STATIC}/img/contact2.png`,
      img_contact3: `${process.env.VUE_APP_STATIC}/img/contact3.png`,
      img_contact4: `${process.env.VUE_APP_STATIC}/img/contact4.png`,
      img_faq5: `${process.env.VUE_APP_STATIC}/img/faq5.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
  .btn {
    border: 1px solid rgb(247, 107, 28);
    border-radius: 8px;
    color: rgb(247, 107, 28);
    background-color: rgba(247, 107, 28, 0.1);

    &:hover {
      color: rgb(247, 107, 28);
    }
  }
</style>
