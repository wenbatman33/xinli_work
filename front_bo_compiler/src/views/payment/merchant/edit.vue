<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="100px", :rules="rules")
      el-form-item(v-if="fieldPerms.merchantName", label="商户名称")
        span {{ merchant.merchantName }}
      el-form-item(v-if="fieldPerms.merchantSn", label="商户编号")
        span {{ merchant.merchantSn }}
      el-form-item(v-if="fieldPerms.merchantSettlTimeStartTime", label="日切时间", prop="settleTime")
        el-time-picker(
          is-range,
          v-model="formData.settleTime",
          format="HH:mm",
          value-format="HH:mm",
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        )
      el-form-item(label="备注")
        el-input(type="textarea", v-model="formData.remark", :autosize="{ minRows: 2, maxRows: 6}")
      //- 代付
      el-form-item(label="代付")
        el-switch(
          v-model="ap",
          active-text="启用",
          inactive-text="停用",
          inactive-color="red"
        )
      template(v-if="ap")
        el-form-item(label="每笔上下限", prop="ap_lower_limit")
          el-col(:span="8")
            el-input(type="number", v-model="formData.ap_lower_limit", min="0")
          el-col.line(:span="1") -
          el-col(:span="8")
            el-input(type="number", v-model="formData.ap_up_limit", min="0")
        el-form-item(label="每日上限", prop="ap_day_limit")
          el-input(type="number", v-model="formData.ap_day_limit")
        el-form-item(label="手续费", prop="ap_fee")
          el-col(:span="8")
            el-select(v-model="formData.ap_fee_type")
              el-option(label="每千", :value="0")
              el-option(label="每笔", :value="1")
          el-col(:offset="1", :span="15")
            el-input(type="number", v-model="formData.ap_fee")
      //- 结算
      el-form-item(label="结算")
        el-switch(
          v-model="settle",
          active-text="启用",
          inactive-text="停用",
          inactive-color="red"
        )
      template(v-if="settle")
        el-form-item(label="每笔上下限", prop="settle_lower_limit")
          el-col(:span="8")
            el-input(type="number", v-model="formData.settle_lower_limit", min="0")
          el-col.line(:span="1") -
          el-col(:span="8")
            el-input(type="number", v-model="formData.settle_up_limit", min="0")
        el-form-item(label="每日上限", prop="settle_day_limit")
          el-input(type="number", v-model="formData.settle_day_limit")
        el-form-item(label="手续费", prop="settle_fee")
          el-col(:span="8")
            el-select(v-model="formData.settle_fee_type")
              el-option(label="每千", :value="0")
              el-option(label="每笔", :value="1")
          el-col(:offset="1", :span="15")
            el-input(type="number", v-model="formData.settle_fee")
      el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getMerchantAPI, editMerchantAPI } from '@/api/payment/merchant';

export default {
  data() {
    const limitValid = (rule, value, callback) => {
      const prefix = rule.field.split('_')[0];
      if (this.formData[`${prefix}_up_limit`] === '' || this.formData[`${prefix}_lower_limit`] ==='') {
        callback(new Error('每笔上下限为必填'));
      }

      if (this.formData[`${prefix}_lower_limit`] > this.formData[`${prefix}_up_limit`]) {
        callback(new Error('下限不得超过上限'));
      }

      callback();
    }

    const feeValid = (rule, value, callback) => {
      const prefix = rule.field.split('_')[0];
      if (this.formData[`${prefix}_fee_type`] === '') callback(new Error('必须选择一种手续费方式'));
      if (this.formData[`${prefix}_fee`] === '') callback(new Error('手续费为必填'));
      callback();
    }

    return {
      merchant: {},
      merchantSn: '',
      ap: false,
      settle: false,
      formData: {
        settleTime: '',
        remark: '',
        ap_up_limit: 0,
        ap_lower_limit: 0,
        ap_day_limit: 0,
        ap_fee_type: 0,
        ap_fee: 0,
        settle_up_limit: 0,
        settle_lower_limit: 0,
        settle_day_limit: 0,
        settle_fee_type: 0,
        settle_fee: 0,
        status: 1
      },
      rules: {
        settleTime: [
          { required: true, message: '必须选择日切时间' }
        ],
        ap_lower_limit: [
          { required: true , validator: limitValid }
        ],
        settle_lower_limit: [
          { required: true , validator: limitValid }
        ],
        ap_day_limit: [
          { required: true, message: '每日上限为必填' }
        ],
        settle_day_limit: [
          { required: true, message: '每日上限为必填' }
        ],
        ap_fee: [
          { required: true, validator: feeValid }
        ],
        settle_fee: [
          { required: true, validator: feeValid }
        ]
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此商户');
      return;
    }

    getMerchantAPI(this.$route.query.id).then(response => {
      this.initData(response.data.data[0]);
    });
  },
  methods: {
    initData(merchant) {
      this.merchant = merchant;
      if (merchant.merchantSettlTimeEndTime || merchant.merchantSettlTimeStartTime) {
        this.formData.settleTime = [merchant.merchantSettlTimeStartTime, merchant.merchantSettlTimeEndTime];
      } else {
        this.formData.settleTime = '';
      }
      this.formData.remark = merchant.merchantRemark;

      this.ap = merchant.merchantHasAgentPay === 'Y';
      this.formData.ap_up_limit = merchant.merchantAPUpLimit;
      this.formData.ap_lower_limit = merchant.merchantAPLowerLimit;
      this.formData.ap_day_limit = merchant.merchantAPDayLimit;
      this.formData.ap_fee_type = merchant.merchantAPFeeType ? merchant.merchantAPFeeType.value : 0;
      this.formData.ap_fee = merchant.merchantAPFee;

      this.settle = merchant.merchantHasSettle === 'Y';
      this.formData.settle_up_limit = merchant.merchantSettleUpLimit;
      this.formData.settle_lower_limit = merchant.merchantSettleLowerLimit;
      this.formData.settle_day_limit = merchant.merchantSettleDayLimit;
      this.formData.settle_fee_type = merchant.merchantSettleFeeType ? merchant.merchantSettleFeeType.value : 0;
      this.formData.settle_fee = merchant.merchantSettleFee;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          [
            'ap_lower_limit',
            'ap_up_limit',
            'ap_day_limit',
            'ap_fee',
            'settle_lower_limit',
            'settle_up_limit',
            'settle_day_limit',
            'settle_fee'
          ].map(field => {
            this.formData[field] = parseFloat(parseFloat(this.formData[field]).toFixed(2));
          });

          this.formData.settle_stime = this.formData.settleTime[0];
          this.formData.settle_etime = this.formData.settleTime[1];
          if (! this.ap) {
            delete this.formData.ap_lower_limit;
            delete this.formData.ap_up_limit;
            delete this.formData.ap_day_limit;
            delete this.formData.ap_fee;
            delete this.formData.ap_fee_type;
          }

          if (! this.settle) {
            delete this.formData.settle_lower_limit;
            delete this.formData.settle_up_limit;
            delete this.formData.settle_day_limit;
            delete this.formData.settle_fee;
            delete this.formData.settle_fee_type;
          }

          editMerchantAPI(this.merchant.id, this.formData).then(response => {
            this.$message.success('商户 - 修改成功！');
            this.initData(response.data.data[0]);
          });
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

.el-select {
  display: block;
}
</style>
