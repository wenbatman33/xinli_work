<template lang="pug">
  .container-fluid
    .row
      .col-9
        .d-flex.pb-2 订单时间： {{ order.createdAt }}
        .d-flex.pb-2 会员帐号： {{ order.member }}
        .d-flex.pb-2 订单号： {{ order.orderId }}
      .col-3.d-flex.align-items-end
        el-button(v-if="hasGoodsCanShip", type="primary", size="mini", @click="shipAll()") 出货全部商品
    .d-flex.pb-2 订单总额： {{ order.totalPoint | formatMoney }}
    .d-flex.pb-2 订单信息： {{ order.orderNote }}
    div(v-for="goods in order.goodsDetail.data", :key="goods.id")
      hr
      .d-flex.pb-2 商品内容： {{ goods.content }}
      .d-flex.pb-2 数量： {{ goods.quantity }}
      .d-flex.pb-2 金额： {{ goods.totalPoint | formatMoney }}
      template(v-if="shipNoteVisible[goods.id]")
        .d-flex.pb-2.align-items-center
          span(style="white-space: nowrap") 出货备注：
          el-input(v-model="shipNote[goods.id]")
      template(v-else)
        .d-flex.pb-2.align-items-center(:class="goods.status === '备货中' ? 'text-danger' : 'text-success'")
          span 商品状态： {{ goods.status }}
          el-button.ml-2(
            v-if="canShip && shipButtonsVisible[goods.id]",
            type="primary",
            size="mini",
            @click="shipGoods(goods.id)"
          ) 出货此商品
        .d-flex.pb-2 完成时间： {{ goods.successAt }}
        .d-flex.pb-2 出货备注： {{ goods.goodsNote }}
    template(v-if="shipping")
      hr
      .text-danger.text-center.w-100 点击确认后将发站内信通知用户，请确认出货信息无误！
      .text-right.mt-3
        el-button(@click="handleCancel()") 取消
        el-button(type="primary", @click="confirmVisible = true") 确认
    //- 确认出货 dialog
    el-dialog(:visible.sync="confirmVisible", append-to-body, width="30%", title="系统提示")
      .text-danger.text-center.w-100 确认出货？点击确认后将发站内信通知用户，请确认出货信息无误！
      .text-right.mt-3
        el-button(@click="confirmVisible = false") 取消
        el-button(type="primary", @click="handleShip()") 确认
</template>

<script>
import { getOrderDetailAPI, shipGoodsAPI } from '@/api/dreamCity/order';

export default {
  data() {
    return {
      order: {
        goodsDetail: {
          data: []
        }
      },
      shipButtonsVisible: {},
      shipNoteVisible: {},
      shipNote: {},
      confirmVisible: false
    }
  },
  props: {
    orderId : {
      type: String
    },
    canShip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shipping() {
      return Object.values(this.shipNoteVisible).includes(true);
    },
    hasGoodsCanShip() {
      return Object.values(this.shipNoteVisible).includes(false);
    },
  },
  created() {
    getOrderDetailAPI(this.orderId).then(response => {
      this.initOrder(response.data.data[0]);
    });
  },
  methods: {
    initOrder(order) {
      this.shipButtonsVisible = {},
      this.shipNoteVisible = {},
      this.shipNote = {},
      this.order = order;

      this.order.goodsDetail.data.forEach(goods => {
        if (goods.status === '备货中') {
          this.$set(this.shipButtonsVisible, goods.id, true);
          this.$set(this.shipNoteVisible, goods.id, false);
          this.$set(this.shipNote, goods.id, '');
        }
      });
    },
    shipGoods(id) {
      this.shipNoteVisible[id] = true;
    },
    shipAll() {
      Object.keys(this.shipNoteVisible).map(key => {
        this.shipNoteVisible[key] = true;
      });
    },
    handleShip() {
      const shipGoodsData = [];

      Object.keys(this.shipNoteVisible).map(key => {
        if (this.shipNoteVisible[key]) {
          shipGoodsData.push({
            goods_order_detail_id: key,
            note: this.shipNote[key]
          });
        }
      });

      shipGoodsAPI(shipGoodsData).then(response => {
        this.confirmVisible = false;
        this.initOrder(response.data.data[0]);
        this.$emit('ship', response.data.data[0]);
      })
    },
    handleCancel() {
      Object.keys(this.shipNoteVisible).map(key => {
        this.shipNoteVisible[key] = false
        this.shipNote[key] = '';
      });
    }
  }
}
</script>
