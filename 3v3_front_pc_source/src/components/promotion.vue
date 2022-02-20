<template lang="pug">
.page(style="flex: 1")
  .headBg
  .p-3.d-flex.flex-column.h-100
    //- 標题
    h2.text-white.mt-3
      .icon(:style="`background-image: url(${scanIcon})`")
      span.ml-2 会员推广
    //- 狀態card
    .d-flex.flex-column.flex-fill
      .row.no-gutters.my-4
        .btn.btn-lg.btn-light.mr-2(@click="clickHandle(0)", :class="{active: selectBtnNum===0}")
          span.mr-2
            img(:src="img_letter")
          span 推广链结
        .btn.btn-lg.btn-light.mr-2(@click="clickHandle(1)", :class="{active: selectBtnNum===1}")
          span.mr-2
            img(:src="img_notification")
          span 推广收益
      .main(v-if="selectBtnNum === 0")
        .w-50.text-center
          p 推广代码{{ memberInfo.member_code }}
          qrcode-vue#qrcode.my-4(:value="link" :size="size" level="H" @dblclick.native="download")
          .d-flex.justify-content-center.mt-4
            input.mr-3.text-center.link-input(:value="link" style="width: 250px;" disabled)
            button.link-button.font-12.px-3(@click="copyText") 复制
      .d-flex.flex-fill(v-else)
        .d-flex.flex-column.col-6.pl-0
          .return-block.d-flex.justify-content-between.mb-3
            .p-4.col-6.text-center(style="border-right: 1px solid #ebeef5")
              .mb-2 本月退水金额
              span ¥{{ table.now.returnAmount | toMoney }}
            .p-4.col-6.text-center
              .mb-2 前月退水金额
              span ¥{{ table.last.returnAmount | toMoney }}
          .tableWrap
            .title.font-14.p-3 指标明细
            table.w-100
              thead.head
                tr.font-12
                  th.text-center.py-2 选项
                  th.text-center.py-2 本月
                  th.text-center.py-2 前月
              tbody
                tr.border-bottom
                  td.text-center.py-2.font-14.font-weight-bold 推广等级
                  td.text-center.py-2.font-12.color-sky {{ table.now.returnLv }}
                  td.text-center.py-2.font-12.color-sky {{ table.last.returnLv }}
                tr.border-bottom
                  td.text-center.py-2.font-14.font-weight-bold 实动会员数
                  td.text-center.py-2.font-12.color-sky {{ table.now.subActiveCnt }}
                  td.text-center.py-2.font-12.color-sky {{ table.last.subActiveCnt }}
                tr.border-bottom
                  td.text-center.py-2.font-14.font-weight-bold 有效代理数
                  td.text-center.py-2.font-12.color-sky {{ table.now.subActiveAgentCnt }}
                  td.text-center.py-2.font-12.color-sky {{ table.last.subActiveAgentCnt }}
                tr.border-bottom
                  td.text-center.py-2.font-14.font-weight-bold 团队投注额
                  td.text-center.py-2.font-12.color-sky ¥{{ table.now.subBetAmount | toMoney }}
                  td.text-center.py-2.font-12.color-sky ¥{{ table.last.subBetAmount | toMoney }}
                tr
                  td.text-center.py-2.font-14.font-weight-bold 团队盈亏
                  td.text-center.py-2.font-12.color-sky ¥{{ table.now.subTotalAmount | toMoney }}
                  td.text-center.py-2.font-12.color-sky ¥{{ table.last.subTotalAmount | toMoney }}
        .w-100
          .tableWrap.w-100
            .title.font-14.p-3 下线列表
            table.w-100
              thead.head
                tr.font-12
                  th.text-center.py-2 会员帐号
                  th.text-center.py-2 本月退水金额
                  th.text-center.py-2 前月退水金额
              tbody(v-if="subTable.length")
                tr.border-bottom(v-for="item in subTable" :key="item.username")
                  td.text-center.py-2.font-14.font-weight-bold(
                    style="color: #f76b1c; cursor: pointer;"
                    @click="openModal(item.mid, item.username)"
                  ) {{ item.username }}
                  td.text-center.py-2.font-12.color-sky ¥{{ item.now.returnAmount | toMoney }}
                  td.text-center.py-2.font-12.color-sky
                    span(v-if="item.onlyNow") -
                    span(v-else) ¥{{ item.last.returnAmount | toMoney }}
              tbody(v-else)
                tr
                  td.text-center.py-2.font-14
                  td.text-center.py-2.font-14.font-weight-bold 尚未有下线
                  td.text-center.py-2.font-12.color-sky
  b-modal(
    v-model="memberInfoModalVisible"
    body-class="memberInfo-modal"
    hide-header
    hide-footer
  )
    MemberInfoModal(:data="modalData" :username="modalUsername")
</template>

<script>
import MemberInfoModal from '@/components/memberInfoModal.vue';
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    QrcodeVue,
    MemberInfoModal,
  },
  data() {
    return {
      scanIcon: `${process.env.VUE_APP_STATIC}/img/scan-white.svg`,
      img_letter: `${process.env.VUE_APP_STATIC}/img/letter.svg`,
      img_notification: `${process.env.VUE_APP_STATIC}/img/notification.svg`,
      selectBtnNum: 1,
      link: '',
      size: 200,
      table: {
        now: {},
        last: {},
      },
      subTable: [],
      modalData: {
        now: {},
        last: {},
      },
      modalUsername: '',
    };
  },
  computed: {
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    memberInfoModalVisible: {
      get() {
        return this.$store.state.admin.memberInfoModal;
      },
      set(status) {
        this.$store.dispatch('admin/setMemberInfoModal', status);
      },
    },
  },
  methods: {
    clickHandle(num) {
      this.selectBtnNum = num;
    },
    copyText() {
      this.$copyText(this.link).then(() => {
        this.$message.success('复制成功');
      }).catch(() => {
        this.$message.error('复制失敗');
      });
    },
    download() {
      const qrcode = document.querySelector('#qrcode > canvas').toDataURL();
      const link = document.createElement('a');
      link.href = qrcode;
      link.download = '下載.png';
      link.click();
    },
    openModal(id, username) {
      this.modalUsername = username;
      this.$store.dispatch('admin/getMemberPerformance', {
        mid: id,
      }).then((res) => {
        this.modalData = res.data.data;
        this.$store.dispatch('admin/setMemberInfoModal', true);
      });
    },
    getMemberPromotionLink() {
      this.$store.dispatch('admin/getMemberPromotionLink').then((res) => {
        this.link = res.data.data;
      });
    },
    getMemberPerformance(id) {
      this.$store.dispatch('admin/getMemberPerformance', {
        id,
      }).then((res) => {
        this.table = res.data.data;
      });
    },
    getMemberSubPerformance() {
      this.$store.dispatch('admin/getMemberSubPerformance').then((res) => {
        if (res.data.data.list !== null) {
          this.subTable = res.data.data.list;
        }
      });
    },
    getData() {
      this.getMemberPromotionLink();
      this.getMemberPerformance();
      this.getMemberSubPerformance();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: #ffffff;
  border-color: #f76b1c !important;
  background: #f76b1c !important;

  span {
    color: #ffffff;
  }

  img {
    filter: invert(100%);
  }
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
  border-radius: 8px;

  .link-input {
    border-radius: 4px;
  }

  .link-button {
    border-radius: 4px;
    background-color: #f76b1c;
    color: white;
  }
}

.return-block {
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
}

.tableWrap {
  box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
  border-radius: 8px;
  max-height: 70vh;
  overflow: auto;

  .title {
    color: white;
    background-color: #202020;
    border-radius: 8px 8px 0 0;
  }
  .head {
    color: white;
    background-color: #575759;
  }
}

.color-sky {
  color: #00afaf;
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
  vertical-align: bottom;
}

/deep/ .modal-content {
   background-color: unset;
   border: none;
}

/deep/ .memberInfo-modal {
  background-color: #202020;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.64);
  color: white;
  border-radius: 20px;
  padding: 0;
}
</style>
