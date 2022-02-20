<template lang="pug">
  el-form(:model="form", ref="form", label-width="auto", :rules="rules")
    el-form-item(label="代理编号", prop="code")
      span(v-if="isEdit") {{ data.agencyCode }}
      template(v-else)
        el-input(v-model="form.code")
        span 代理編號將使用在推廣網址上
    el-form-item(label="代理帐号", prop="account")
      span(v-if="isEdit") {{ data.agencyAccount }}
      el-input(v-else, v-model="form.account")
    el-form-item(:label="isEdit? '修改密码': '预设密码'", prop="password")
      el-input(v-model="form.password")
    el-form-item(label="代理名称", prop="name")
      el-input(v-model="form.name")
      span 代理名称仅限中文字
    el-form-item(label="信箱", prop="email")
      el-input(v-model="form.email")
    el-form-item(label="手机")
      span(v-if="isEdit") {{ data.agencyPhone }}
      span(v-else) 由代理自行至後台填寫及變更預設密碼
    el-form-item(label="本月平台费 ", prop="product_fee")
      span(v-if='isEdit') {{ form.product_fee }} %
      el-input(v-else, type="number", v-model="form.product_fee", oninput="if(value>=99)value=99;if(value<=1)value=1" ,style="width:200px")
      span.ml-2(v-if='!isEdit') %
    el-form-item(v-if='isEdit', label="下月平台费", prop="product_fee_next")
      el-input(type="number", v-model="form.product_fee_next", oninput="if(value>=99)value=99;if(value<=1)value=1" ,style="width:200px")
      span.ml-2 %
    el-form-item(label="帐号状态", prop="is_frozen")
      el-switch(
        v-model="form.is_frozen",
        active-text="冻结",
        :active-value="true",
        active-color="red",
        inactive-text="开启",
        :inactive-value="false",
        inactive-color="#4091FF"
      )
    el-form-item(label="调整二级代理佣金", prop="secondary_percentage_adjustment")
      el-switch(
        v-model="form.secondary_percentage_adjustment",
        active-text="冻结",
        :active-value="false",
        active-color="red",
        inactive-text="开启",
        :inactive-value="true",
        inactive-color="#4091FF"
      )
    .text-right.mt-3
      el-button(@click="$emit('close')") 取消
      el-button(type="primary", @click="submitForm()") 确认
</template>

<script>
import { addAgencyAPI, editAgencyAPI } from '@/api/agency/agency';

export default {
  data() {
    return {
      isEdit: false,
      returnPercentageZeroDisabled: false,
      form: {
        code: '',
        account: '',
        password: '',
        name: '',
        email: '',
        is_frozen: false,
        secondary_percentage_adjustment: false,
        product_fee: null,
        product_fee_next:null
      },
      rules: {
        code: [
          { required: true, message: '代理编号为必填', trigger: 'submit' }
        ],
        account: [
          { required: true, min: 5, max: 15, message: '长度限制为 5 - 15 个字元', trigger: 'submit' }
        ],
        password: [
          { required: true, min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'submit' }
        ],
        name: [
          { required: true, message: '代理名称为必填', trigger: 'submit' }
        ],
        email: [
          { required: true, message: '信箱为必填', trigger: 'submit' }
        ],
        is_frozen: [
          { required: true, message: '必须选择一种帐号状态', trigger: 'submit' }
        ],
        secondary_percentage_adjustment: [
          { required: true, message: '必须选择是否开放调整二级代理佣金', trigger: 'submit' }
        ],
        product_fee: [],
        product_fee_next: []
      }
    }
  },
  props: ['data'],
  created () {
    // MARK: 后端目前没做权限
    if (Object.keys(this.data).length) {
      // 有 data 但isApply 为 代理/申请清单 执行开通 故为Add
      if (! this.data.isApply) {
        this.rules.code[0].required = false,
        this.rules.account[0].required = false,
        this.rules.password[0].required = false,
        this.isEdit = true;
        // MARK: 规则 - 若有上级代理 该选项不可修改
        if (this.data.agencyUpperId) {
          this.returnPercentageZeroDisabled = true;
        }
      } 
      this.form.code = this.data.agencyCode;
      this.form.account = this.data.agencyAccount;
      this.form.name = this.data.agencyName;
      this.form.email = this.data.agencyEmail;
      this.form.is_frozen = this.data.agencyIsFrozen;
      this.form.secondary_percentage_adjustment = this.data.agencySecondaryPercentageAdjustment;
      // 資料修改時 顯示下月平台费欄位修改
      this.form.product_fee = (this.data.agencyProductFee)? this.data.agencyProductFee:'13';
      this.form.product_fee_next = this.data.agencyProductFeeNext;
      this.rules.product_fee_next=[{ required: true, message: '下月平台费为必填', trigger: 'submit' }]
      this.rules.product_fee = []
    } else {
      // 新增代理時 顯示本月平台费欄位修改
      this.form.product_fee = 13;
      this.rules.product_fee =[{ required: true, message: '本月平台费为必填', trigger: 'submit' }]
      this.rules.product_fee_next = []
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isEdit ? this.handleEdit() : this.handleAdd();
        }
      });
    },
    handleAdd() {
      addAgencyAPI(this.form)
      .then(() => {
        this.$message.success('代理新增成功');
        this.$emit('success');
      });
    },
    handleEdit() {
      const data = {
        name: this.form.name,
        email: this.form.email,
        is_frozen: this.form.is_frozen,
        secondary_percentage_adjustment: this.form.secondary_percentage_adjustment,
        product_fee: this.form.product_fee,
        product_fee_next: this.form.product_fee_next,
      }

      if (this.form.password) {
        data.password = this.form.password;
      }

      editAgencyAPI(this.data.agencyId, data)
      .then(() => {
        this.$message.success('资料修改成功');
        this.$emit('success');
      });
    },
  }
}
</script>
