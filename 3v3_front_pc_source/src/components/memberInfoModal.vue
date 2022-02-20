<template lang="pug">
  #memberInfoModal.py-4
    .d-block.title.text-center.py-2
      | {{ username }}
    .p-4
      .d-flex.px-4.justify-content-around
        .my-4.col-6.text-center(style="border-right: 1px solid #575759")
          .m-0.font-14 本月退水金额
          .m-0.font-20(style="color: #f76b1c") {{ data.last.returnAmount | toMoney }}
        .my-4.col-6.text-center
          .m-0.font-14 前月退水金额
          .m-0.font-20(style="color: #f76b1c") {{ data.now.returnAmount | toMoney }}
      .px-3.py-2.d-block.text-center.font-20
        span 指標明細
      table.tableWrap.w-100.my-4
        thead.head
          tr.font-14.table-border
            th.text-center.py-2(width="180") 选项
            th.text-center.py-2 本月
            th.text-center.py-2 前月
        tbody
          tr.table-border
            td.text-center.py-2.font-14.font-weight-bold 推广等级
            td.text-center.py-2.font-12.color-sky {{ data.last.returnLv }}
            td.text-center.py-2.font-12.color-sky {{ data.now.returnLv }}
          tr.table-border
            td.text-center.py-2.font-14.font-weight-bold 实动会员数
            td.text-center.py-2.font-12.color-sky {{ data.last.subActiveCnt }}
            td.text-center.py-2.font-12.color-sky {{ data.now.subActiveCnt }}
          tr.table-border
            td.text-center.py-2.font-14.font-weight-bold 有效代理数
            td.text-center.py-2.font-12.color-sky {{ data.last.subActiveAgentCnt }}
            td.text-center.py-2.font-12.color-sky {{ data.now.subActiveAgentCnt }}
          tr.table-border
            td.text-center.py-2.font-14.font-weight-bold 团队投注额
            td.text-center.py-2.font-12.color-sky {{ data.last.subBetAmount | toMoney }}
            td.text-center.py-2.font-12.color-sky {{ data.last.subBetAmount | toMoney }}
          tr.table-border
            td.text-center.py-2.font-14.font-weight-bold 团队盈亏
            td.text-center.py-2.font-12.color-sky {{ data.last.subTotalAmount | toMoney }}
            td.text-center.py-2.font-12.color-sky {{ data.last.subTotalAmount | toMoney }}
      .d-flex.justify-content-center
        button.py-2.w-100.mx-4.mt-3.close-button(@click="cancel") 关闭
</template>

<script>
export default {
  name: 'memberInfoModal',
  props: ['data', 'username'],
  methods: {
    cancel() {
      this.$store.dispatch('admin/setMemberInfoModal', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  background: linear-gradient(to right, rgba(0, 237, 221, 0), #00afaf, rgba(0, 237, 221, 0))
}

.tableWrap {
  background-color: black;
  color: white;

  .table-border {
    box-shadow: #575759 0px 1px 0px 0px;
  }
}

.close-button {
  background-color: #00ffeb;
  color: black;
  border: none;
  border-radius: 8px;
}
</style>
