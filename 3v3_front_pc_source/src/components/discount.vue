<template lang="pug">
.page
  .headBg
  .p-3.h-100.d-flex.flex-column
    //- 標题
    h2.text-white.mt-3
      .icon(:style="`background-image: url(${img_gift_white})`")
      span.ml-2 {{ $t('discount.name') }}
    //- 狀態card
    .row.no-gutters.my-4
      .btn.btn-lg.btn-light.mr-2.position-relative.d-flex.active
        .mr-2.d-flex
          img(:src="img_gift_white")
        span {{ $t('discount.type.all') }}
    .d-flex.flex-wrap(style="width: 1200px")
      b-card.mb-4.flex-shrink-0(
        v-for="item in tableData"
        :key="item.id"
        :img-src="item.img"
        img-height="190px"
        img-alt="Card image"
        img-top
        style="width: 380px"
        @click="openDetail(item.id)"
      )
        .title {{ item.name }}
        .subtitle {{ item.desc }}
  b-modal(
    v-model="showModal"
    size="lg"
    hide-header
    hide-footer
  )
    img(:src="promotionDetail.img" width="760px" height="380px")
    .px-4.py-3(style="word-break: break-all;")
      .title.mb-3 {{ promotionDetail.name }}
      .content(v-html="promotionDetail.content")
    .text-center
      b-button.modal-btn.py-2(@click="service") 我要报名
</template>

<script>
export default {
  name: 'discount',
  components: {},
  data() {
    return {
      img_gift_black: `${process.env.VUE_APP_STATIC}/img/gift-black.svg`,
      img_gift_white: `${process.env.VUE_APP_STATIC}/img/gift-white.svg`,
      showModal: false,
      tableData: [],
      promotionDetail: {},
      categoryId: 1,
    };
  },
  methods: {
    service() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_MICHAT"] }] */
      // window._MICHAT.startChat();
      window.LC_API.open_chat_window();
    },
    openDetail(id) {
      this.$store.dispatch('admin/getGamePromotionDetail', {
        category_id: this.categoryId,
        id,
      }).then((res) => {
        this.promotionDetail = res.data.data;
        this.showModal = true;
      });
    },
    getGamePromotion() {
      this.$store.dispatch('admin/getGamePromotion', {
        category_id: this.categoryId,
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
    getData() {
      this.getGamePromotion();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.active{
  color: #ffffff;
  border-color: #f76b1c !important;
  background: #f76b1c !important;
  span{
    color: #ffffff;
  }
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
  vertical-align: bottom;
}

.card {
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: 0 0 8px 0 rgba(0, 172, 171, 0.2);
  margin-right: 20px;
  cursor: pointer;

  img {
    object-fit: cover;
    object-position: center;
  }

  .card-body {
    padding: 16px 20px;
  }

  .title {
    font-size: 14px;
    color: #202020;
  }

  .subtitle {
    font-size: 12px;
    color: #8e8e93;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.modal-body {
  .title {
    color: #202020;
    font-size: 20px;
  }

  .content {
    color: #8e8e93;
    font-size: 14px;
  }

  .modal-btn {
    background-color: #f76b1c;
    color: #ffffff;
    border-radius: 8px;
    width: 180px;
    font-size: 14px;
    border: none;
  }
}
</style>
