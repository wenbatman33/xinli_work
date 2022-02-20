<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="140px", :rules="rules")
      el-form-item(v-if="fieldPerms.gateSn", label="通道编号")
        span {{ gateSn }}
      el-form-item(v-if="fieldPerms.gateName", label="通道编号")
        span {{ gateName }}
      el-form-item(v-if="fieldPerms.gateServiceCode", label="交易方式")
        span {{ gateService }}
      el-form-item(prop="deposit_fee")
        template(slot="label")
          span 存款手续费
          el-tooltip
            i.el-icon-info.ml-1(style="font-size: 1.2rem")
            span(slot="content") 交易金额的％
        el-input(v-model.number="formData.deposit_fee")
          span(slot="append") %
      el-form-item(label="每笔上下限", prop="lower_limit")
        el-col(:span="8")
          el-input(type="number", v-model="formData.lower_limit", min="0")
        el-col.line(:span="1") -
        el-col(:span="8")
          el-input(type="number", v-model="formData.up_limit", min="0")
      el-form-item(label="每日上限", prop="day_limit")
        el-input(type="number", v-model="formData.day_limit")
      el-form-item(label="手续费", prop="fee")
        el-col(:span="8")
          el-select(v-model="formData.fee_type")
            el-option(label="每千", :value="0")
            el-option(label="每笔", :value="1")
        el-col(:offset="1", :span="15")
          el-input(type="number", v-model="formData.fee")
      el-form-item(v-if="formData.fee_type === 0", label="额外手续费", prop="sub_fee")
        el-input(type="number", v-model="formData.sub_fee")
      el-form-item(label="备注")
        el-input(type="textarea", v-model="formData.note", :autosize="{ minRows: 2, maxRows: 6}")
      el-form-item(label="金流群组" prop="groups")
        el-select(v-model="formData.groups", multiple)
          el-option(v-for="group in groups", :key="group.id", :value="group.id", :label="group.GPMerchantName || group.id")
      el-form-item(label="状态")
        el-switch(
          v-model="formData.status",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="前台显示")
        el-switch(
          v-model="formData.show",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="排序", prop="sort")
        el-input(v-model.number="formData.sort")
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getChannelAPI, editChannelAPI } from '@/api/payment/payChannel';
import { getPaymentGroupsAPI } from '@/api/payment/paymentGroup';

export default {
  data() {
    const limitValid = (rule, value, callback) => {
      if (this.formData.up_limit === '' || this.formData.lower_limit ==='') callback(new Error('每笔上下限为必填'));
      if (this.formData.lower_limit > this.formData.up_limit) callback(new Error('下限不得超过上限'));
      callback();
    }

    const feeValid = (rule, value, callback) => {
      if (this.formData.fee_type === '') callback(new Error('必须选择一种手续费方式'));
      if (this.formData.fee === '') callback(new Error('手续费为必填'));
      callback();
    }

    return {
      gateSn: '',
      gateName: '',
      gateService: '',
      id: 0,
      formData: {
        lower_limit: 0,
        up_limit: 0,
        day_limit: '',
        fee_type: '',
        fee: 0,
        note: 0,
        status: 1,
        show: 1,
        groups: [],
        sub_fee: 0,
        sort: 1,
        deposit_fee: 0,
      },
      groups: [],
      rules: {
        lower_limit: [
          { required: true , validator: limitValid }
        ],
        day_limit: [
          { required: true, message: '每日上限为必填' }
        ],
        fee: [
          { required: true, validator: feeValid }
        ],
        sub_fee: [
          { required: true, message: '额外手续费为必填' }
        ],
        sort: [
          { required: true, min: 1, type: 'integer', message: '排序必须大于1', trigger: 'submit' }
        ],
        deposit_fee : [
          { required: true, min: 0, type: 'integer', message: '存款手续费必须大于等于0', trigger: 'submit' }
        ]
      },
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此通道');
      return;
    }

    getPaymentGroupsAPI().then(response => {
      this.groups = response.data.data;
    });

    getChannelAPI(this.$route.query.id).then(response => {
      this.initData(response.data.data[0]);
    })
  },
  methods: {
    initData(channel) {
      this.id = channel.id;
      this.gateSn = channel.gateSn;
      this.gateName = channel.gateName;
      this.gateService = channel.gateService ? channel.gateService.display : '';

      this.formData.lower_limit = channel.gateLowerLimit;
      this.formData.up_limit = channel.gateUpLimit;
      this.formData.day_limit = channel.gateDayLimit;
      this.formData.fee_type = channel.gateFeeType ? channel.gateFeeType.value : 0;
      this.formData.fee = channel.gateFee;
      this.formData.sub_fee = channel.gateSubFee;
      this.formData.note = channel.gateNote;
      this.formData.status = channel.gateStatus ? channel.gateStatus.value : 0;
      this.formData.show = channel.gateShow ? channel.gateShow.value : 0;
      this.formData.groups = channel.gateGroupIDs || [];
      this.formData.sort = channel.gateSort || 1;
      this.formData.deposit_fee = channel.gateDepositFee || 0;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const needParse = ['lower_limit', 'up_limit', 'day_limit', 'fee', 'deposit_fee'];
          needParse.map(field => {
            this.formData[field] = parseFloat(parseFloat(this.formData[field]).toFixed(2));
          });

          editChannelAPI(this.id, this.formData).then((response) => {
            this.$message.success('通道 - 修改成功！');
            this.initData(response.data.data[0]);
          });
        }
      });
    }
  }
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

