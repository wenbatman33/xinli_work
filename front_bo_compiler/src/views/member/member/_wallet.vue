<template lang="pug">
  el-card.mt-3(v-if="show", shadow="always")
    div(slot="header") 玩家资金
      template(v-if="wallet")
        el-button.mx-2(v-if="canAdjustCash", size="mini", @click="addAdjustCash()") 资金调整
        el-button.mx-2(v-if="canAdjustPoint", size="mini", @click="addAdjustPoint()") 点数调整
    template(v-if="wallet")
      .row.my-2
        .col-4 总资金： {{ (wallet.cash + wallet.gameCash) | formatMoney }}
          |  (中心钱包：{{ wallet.cash | formatMoney }}
          |  游戏钱包： {{ wallet.gameCash | formatMoney }}
          el-tooltip(v-if="wallet.gameCashDetail.length")
            div(slot="content")
              p 仅显示游戏钱包内有馀额的项目
              p(v-for="gameCashObj in wallet.gameCashDetail", :key="gameCashObj.gameGroupId")
                | {{ gameCashObj.gameGroupName }} : {{ gameCashObj.amount | formatMoney }}
                i.el-icon-refresh.ml-3.c-pointer(@click="refreshGameCash(gameCashObj)")
            i.el-icon-info.ml-2
          | )
        .col-4 冻结资金：{{ wallet.lockCash | formatMoney }}
        .col-4 梦基金钱包：{{ wallet.point | formatMoney }}
      .row.my-2
        .col-12 资金调整总额： {{ wallet.adjust.total | formatMoney }}
          span.mx-2 ( 存单错误： {{ wallet.adjust.deposit | formatMoney }},
          span.mx-2 优惠调整： {{ wallet.adjust.discount | formatMoney }},
          span.mx-2 红利送出： {{ wallet.adjust.bonus | formatMoney }},
          span.mx-2 不当得利扣回： {{ wallet.adjust.illegal | formatMoney }},
          span.mx-2 内部使用： {{ wallet.adjust.inside | formatMoney }} )
      .row.my-2
        .col-4 总输赢：{{ wallet.winAmount | formatMoney }}
        .col-4 总流水：{{ wallet.betAmount | formatMoney }}
        .col-4 总返水：{{ wallet.returnAmount | formatMoney }}
      .row.my-2
        .col-4 总存款：{{ wallet.depositAmount | formatMoney }}
        .col-4 总提款：{{ wallet.withdrawAmount | formatMoney }}
        .col-4 总优惠：{{ wallet.bonusAmount | formatMoney }}
      .row.my-2
        .col-4 存款 》最高金额：{{ wallet.depMaxAmount | formatMoney }}
        .col-4 次数：{{ wallet.depCount }}
        .col-4 平均金额：{{ wallet.depAvgAmount | formatMoney }}
      .row.my-2
        .col-4 提款 》最高金额：{{ wallet.witMaxAmount | formatMoney }}
        .col-4 次数：{{ wallet.witCount }}
        .col-4 平均金额：{{ wallet.witAvgAmount | formatMoney }}
    .row.my-2.align-items-center(v-if="limitation")
      .col-4 存款限制：{{ limitation.depMin | formatMoney }} ~ {{ limitation.depMax | formatMoney }}
      .col-4 提款单笔限制： {{ limitation.withSingleMin | formatMoney }} ~ {{ limitation.withSingleMax | formatMoney }}
        el-button.ml-1(v-if="canEditWithSingle", size="mini", @click="editWithSingle()") 修改
      .col-4 提款单日上限限制： {{ limitation.withDayMax | formatMoney }}
        el-button.ml-1(v-if="canEditWithDay", size="mini", @click="editWithDay()") 修改
    //- 修改单笔提款 dialog
    el-dialog(title="修改单笔提款上下限", :visible.sync="withSingleDialog.visible")
      el-form(label-width="100px")
        el-form-item(label="上下限")
          el-col(:span="8")
            el-input(type="number", v-model="withSingleDialog.min", min="0")
          el-col.text-center(:span="1") ~
          el-col(:span="8")
            el-input(type="number", v-model="withSingleDialog.max", min="0")
        el-form-item
          el-button(@click="handleEditWithSingle()") 储存
    //- 修改单日提款 dialog
    el-dialog(title="修改单日提款上下限", :visible.sync="withDayDialog.visible")
      el-form(label-width="100px")
        el-form-item(label="单日上限")
          el-input(type="number", v-model="withDayDialog.max", min="0")
        el-form-item
          el-button(@click="handleEditWithDay()") 储存
    template(v-if="wallet")
      //- 资金调整 dialog
      el-dialog(
        title="玩家资金调整",
        :visible.sync="adjustDialog.visible"
      )
        el-form(:model="adjustDialog.data", ref="adjustForm", label-width="auto", :rules="adjustRules")
          el-form-item(label="帐号")
            span {{ account }}
          el-form-item(label="目前玩家总资金")
            span {{ wallet.cash | formatMoney }}
          el-form-item(label="类型", prop="modify_type", required)
            el-select(v-model="adjustDialog.data.modify_type")
              el-option(v-for="(type, key) in modifyTypes", :key="key", :label="type", :value="+key")
          el-form-item(label="扣分或上分", required)
            el-radio-group(v-model="adjustDialog.data.sign_type")
              el-radio(:label="0") 扣分
              el-radio(:label="1") 上分
          el-form-item(label="调整金额", prop="amount")
            el-input(type="number",v-model.number="adjustDialog.data.amount", step="0.01", min="0.01")
          el-form-item(label="流水限制", prop="widthdraw_limit")
            el-input(type="number",v-model.number="adjustDialog.data.widthdraw_limit")
          el-form-item(label="备注内容", prop="note")
            el-input(type="textarea", v-model="adjustDialog.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
          el-form-item
            el-button(@click="confirmAdjust()") 确认
      //- 确认资金调整 dialog
      el-dialog(title="系统提示", :visible.sync="confirmAdjustDialogVisible", center)
        h3.text-center 新增玩家资金调整 是否送出？
        .bg-light.col-10.offset-1.mt-4.p-3
          .p-1 玩家帐号: {{ account }}
            span(v-if="wallet")  (调整前资金: {{ wallet.cash | formatMoney }} 调整后资金: {{ wallet.cash + (adjustDialog.data.amount * (adjustDialog.data.sign_type === 0 ? -1: 1)) | formatMoney }})
          .p-1 类型: {{ modifyTypes[adjustDialog.data.modify_type] }}
          .p-1.text-danger(v-if="adjustDialog.data.sign_type === 0") 调整金额: {{ adjustDialog.data.amount * -1 }}
          .p-1(v-else) 调整金额: {{ adjustDialog.data.amount }}
          .p-1 流水限制: {{ adjustDialog.data.widthdraw_limit }}
          .p-1 备注: {{ adjustDialog.data.note }}
        .text-center.mt-4
          el-button(@click="confirmAdjustDialogVisible = false") 取消
          el-button(type="primary", @click="handleAdjust()") 送出审核
      //- 梦基金点数调整 dialog
      //- MARK: [v-if] 原因 https://github.com/ElemeFE/element/issues/17617
      el-dialog(
        v-if="adjustPointDialog.visible",
        title="玩家梦基金点数调整",
        :visible.sync="adjustPointDialog.visible"
      )
        el-form(:model="adjustPointDialog.data", ref="adjustPointForm", label-width="auto", :rules="adjustPointRules")
          el-form-item(label="帐号")
            span {{ account }}
          el-form-item(label="目前玩家梦基金点数")
            span {{ wallet.point | formatMoney }}
          el-form-item(label="扣分或上分", required)
            el-radio-group(v-model="adjustPointDialog.data.sign_type")
              el-radio(:label="0") 扣分
              el-radio(:label="1") 上分
          el-form-item(label="调整金额", prop="point")
            el-input(type="number",v-model.number="adjustPointDialog.data.point", step="0.01", min="0.01")
          el-form-item(label="备注内容", prop="note")
            el-input(type="textarea", v-model="adjustPointDialog.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
          el-form-item
            el-button(@click="handleAdjustPoint()") 确认
</template>

<script>
import { addAdjustAPI, addAdjustPointAPI } from '@/api/member/cashAdjust.js';
import { editMemberWithAPI, refreshGameCashAPI } from '@/api/member/member.js';

export default {
  data() {
    const validateWidthdrawLimit = (rule, value, callback) => {
      if (Math.sign(value) !== 1) return callback(new Error('必须为正数'));
      value < this.adjustDialog.data.amount ? callback(new Error('不得小于调整金额')) : callback() ;
    }

    return {
      withSingleDialog: {
        visible: false,
        min: 0,
        max: 0
      },
      withDayDialog: {
        visible: false,
        max: 0
      },
      modifyTypes: {
        1: '红利送出',
        2: '不当得利扣回',
        3: '内部使用'
      },
      adjustDialog: {
        visible: false,
        data: {
          modify_type: 1,
          sign_type: 0,
          amount: '',
          widthdraw_limit: '',
          note: '',
        },
      },
      confirmAdjustDialogVisible: false,
      adjustRules: {
        amount: [
          { required: true, min: 0.01, type: 'number', message: '金额必须大于0.01' },
        ],
        widthdraw_limit: [
          { required: true, type: 'number', message: '流水限制为数字值', trigger: 'submit'},
          { validator: validateWidthdrawLimit, trigger: 'submit'},
        ],
        note: [{ required: true, message: '备注为必填' }],
      },
      adjustPointDialog: {
        visible: false,
        data: {
          sign_type: 1,
          point: '',
          note: '',
        }
      },
      adjustPointRules: {
        point: [{ required: true, min: 0.01, type: 'number', message: '金额必须大于0.01' }],
        note: [{ required: true, message: '备注为必填' }],
      },
    }
  },
  props: {
    wallet: {
      required: true,
    },
    limitation: {
      required: true,
    },
    account: {
      type: String,
    },
    show: {
      type: Boolean,
      default: true,
    },
    canAdjustCash: {
      type: Boolean,
      default: false,
    },
    canAdjustPoint: {
      type: Boolean,
      default: false,
    },
    canEditWithSingle: {
      type: Boolean,
      default: false,
    },
    canEditWithDay: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    editWithSingle() {
      this.withSingleDialog.min = this.limitation.withSingleMin;
      this.withSingleDialog.max = this.limitation.withSingleMax;
      this.withSingleDialog.visible = true;
    },

    handleEditWithSingle() {
      editMemberWithAPI(this.$route.query.id, {
        single_min: Math.min(this.withSingleDialog.min, this.withSingleDialog.max),
        single_max: Math.max(this.withSingleDialog.min, this.withSingleDialog.max)
      })
      .then(response => {
        this.$emit('updateLimitation', {
          withSingleMin: response.data.data[0].singleMin,
          withSingleMax: response.data.data[0].singleMax,
        });
        this.withSingleDialog.visible = false;
        this.$message.success('修改单笔提款上下限成功');
      });
    },

    editWithDay() {
      this.withDayDialog.max = this.limitation.withDayMax;
      this.withDayDialog.visible = true;
    },

    handleEditWithDay() {
      editMemberWithAPI(this.$route.query.id, {
        day_max: this.withDayDialog.max
      })
      .then(response => {
        this.$emit('updateLimitation', { withDayMax: response.data.data[0].dayMax });
        this.withDayDialog.visible = false;
        this.$message.success('修改单日提款上限成功');
      });
    },

    addAdjustCash() {
      this.adjustDialog.data.modify_type = 1;
      this.adjustDialog.data.sign_type = 0;
      this.adjustDialog.data.amount = '';
      this.adjustDialog.data.widthdraw_limit = '';
      this.adjustDialog.data.note = '';
      this.adjustDialog.visible = true;
      this.$nextTick(() => {
        this.$refs.adjustForm.resetFields();
      });
    },

    confirmAdjust() {
      this.$refs.adjustForm.validate(valid => {
        if (valid) this.confirmAdjustDialogVisible = true;
      });
    },

    handleAdjust() {
      addAdjustAPI({
        member_id: this.$route.query.id,
        ...this.adjustDialog.data
      })
      .then(() => {
        this.adjustDialog.visible = false;
        this.confirmAdjustDialogVisible = false;
        this.$message.success('资金调整申请已成功送出');
      })
    },

    addAdjustPoint() {
      this.adjustPointDialog.data.sign_type = 1;
      this.adjustPointDialog.data.point = '';
      this.adjustPointDialog.data.note = '';
      this.adjustPointDialog.visible = true;
      this.$nextTick(() => {
        this.$refs.adjustPointForm.resetFields();
      });
    },

    handleAdjustPoint() {
      this.$refs.adjustPointForm.validate(valid => {
        if (valid) {
          addAdjustPointAPI({
            member_id: this.$route.query.id,
            ...this.adjustPointDialog.data
          })
          .then(() => {
            this.$message.success('已成功调整梦基金');
            this.$emit('getMember');
            this.adjustPointDialog.visible = false;
          })
        }
      });
    },

    refreshGameCash(gameCashObj) {
      refreshGameCashAPI({
        gameGroupId: gameCashObj.gameGroupId,
        memberId: this.$route.query.id,
      })
      .then(response => {
        gameCashObj.amount = response.data.data[0];
      });
    },
  }
}
</script>
