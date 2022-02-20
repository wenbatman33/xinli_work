<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="140px", :rules="rules", status-icon)
      el-form-item(label="户名", prop="bank_cardholder")
        el-input(v-model="formData.bank_cardholder")
      el-form-item(label="银行名称", prop="bank_code")
        el-select(v-model="formData.bank_code")
          el-option(
            v-for="bank in banks",
            :key="bank.bankCode",
            :label="`${bank.bankName} - ${bank.bankCode}`",
            :value="bank.bankCode"
          )
      el-form-item(label="开户城市", prop="province")
        el-cascader(
          v-model="formData.province",
          :options="provinceList",
          :props="{ expandTrigger: 'hover' }"
        )
      el-form-item(label="分行", prop="branch")
        el-input(v-model="formData.branch")
      el-form-item(label="银行卡号", prop="bank_card_no")
        el-input(v-model="formData.bank_card_no")
      el-form-item(label="虚拟卡号", prop="bank_card_virtual_no")
        el-input(v-model="formData.bank_card_virtual_no")
      el-form-item(label="每笔上下限", required)
        el-col(:span="11")
          el-form-item(prop="low_limit")
            el-input(type="number", v-model.number="formData.low_limit", min="0")
        el-col.text-center(:span="2") ~
        el-col(:span="11")
          el-form-item(prop="up_limit")
            el-input(type="number", v-model.number="formData.up_limit", min="0")
      el-form-item(label="每日上限", prop="day_limit")
        el-input(type="number", v-model.number="formData.day_limit", min="0")
      el-form-item(label="备注", prop="remark")
        el-input(type="textarea", v-model="formData.remark", :autosize="{ minRows: 3, maxRows: 6}")

      el-form-item(label="银行卡金流群组", prop="group_id")
        el-select(v-model="formData.group_id")
          el-option(
            v-for="group in groups",
            :key="group.id",
            :label="group.GroupBCardName",
            :value="group.id"
          )
      el-form-item(label="状态", prop="status", required)
        el-switch(
          v-model="formData.status",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="上下架", prop="show", required)
        el-switch(
          v-model="formData.show",
          active-text="上架",
          :active-value="1",
          inactive-text="下架",
          :inactive-value="0",
          inactive-color="red"
        )
      el-divider
      h5 卡商信息
      el-form-item(label="卡商", prop="supplier_id")

        el-select(v-model="formData.supplier_id")
          el-option(
            v-for="item in supplierAllList",
            :key="item.id",
            :label="item.supplier_code",
            :value="item.id"
          )
      el-form-item(label="验卡日期", prop="verify_card_date")
        el-date-picker(
          v-model="formData.verify_card_date",
          type="date",
          value-format= "yyyy-MM-dd",
          placeholder="选择验卡日期")
      el-form-item(label="租用方式", prop="rent_type")
        el-select(v-model="formData.rent_type")
          el-option(
            v-for="item in options",
            :key="item.value",
            :label="item.label",
            :value="item.value",
          )
      el-form-item(label="费用", prop="cost")
        el-input(v-model="formData.cost", style="width:194px")
        span.mx-2(v-if='formData.rent_type===1')  / 次
        span.mx-2(v-if='formData.rent_type===2')  / 30天
      el-form-item(label="起租日期", prop="rent_date")
        el-date-picker(
          v-model="formData.rent_date",
          type="date",
          value-format= "yyyy-MM-dd",
          placeholder="选择起租日期")
      el-form-item(label="保赔金额", prop="claim_amount")
        el-input(v-model="formData.claim_amount", type="number", auto-complete="new-password" style="width:194px")

      el-divider
      h5 网银信息
      el-form-item(label="网银帐号", prop="online_banking_account")
        el-input(v-model="formData.online_banking_account", type="text", show-password)
      el-form-item(label="原始登入密码", prop="original_login_password")
        el-input(type='password', v-model="formData.original_login_password", show-password)
      el-form-item(label="原始U盾密码", prop="original_u_password")
        el-input(type='password', v-model="formData.original_u_password", show-password)
      el-form-item(label="原始取款密码", prop="original_withdrawal_password")
        el-input(type='password', v-model="formData.original_withdrawal_password", show-password)
      el-form-item(label="网银登入密码", prop="online_login_password")
        el-input(type='password', v-model="formData.online_login_password", show-password)
      el-form-item(label="网银U盾密码", prop="online_u_password")
        el-input(type='password', v-model="formData.online_u_password", show-password)
      el-form-item(label="网银取款密码", prop="online_withdrawal_password")
        el-input(type='password', v-model="formData.online_withdrawal_password", show-password)
      el-divider

      h5 开户人信息
      el-form-item(label="身分证件号", prop="identity_number")
        el-input(v-model="formData.identity_number")
      el-form-item(label="身分证件到期日", prop="identity_expire_date")
        el-date-picker(
          v-model="formData.identity_expire_date",
          type="date",
          value-format= "yyyy-MM-dd",
          placeholder="选择验卡日期")
      el-form-item(label="性别", prop="sex")
        el-radio(v-model="formData.sex", :label="0") 女
        el-radio(v-model="formData.sex", :label="1" ) 男
      el-form-item(label="对应手机号", prop="phone_number")
        el-input(v-model="formData.phone_number")
      el-form-item(label="手机号位置", prop="phone_number_location")
        el-input(v-model="formData.phone_number_location")

      el-form-item
        el-button(type="primary", @click="handleSubmit()") 储存
</template>

<script>
import { mapState } from 'vuex';
import { getBanksAPI, getBankCardAPI, addBankCard, editBankCardAPI } from '@/api/payment/bankCard';
import { getBankCardSupplierAPI } from '@/api/payment/bankCardSupplier';
import { getBankCardGroupsAPI } from '@/api/payment/bankCardGroup';

export default {
  data() {
    const checkLowLimit = (rule, value, callback) => {
      if (value > this.formData.up_limit) {
        callback(new Error('下限不得超过上限'));
      }

      callback();
    };

    const checkUpLimit = (rule, value, callback) => {
      if (value < this.formData.low_limit) {
        callback(new Error('上限不得低于下限'));
      }

      callback();
    };

    return {
      banks: [],
      groups: [],
      id: 0,
      formData: {
        bank_cardholder: '',
        bank_code: '',
        province: [],
        branch: '',
        bank_card_no: '',
        bank_card_virtual_no: '',
        low_limit: 0,
        up_limit: 0,
        day_limit: 0,
        remark: '',
        group_id: '',
        status: 1,
        show: 0,
        supplier_id:'',
        verify_card_date:'',
        rent_type: 1,
        rent_date:'',
        cost:'',
        claim_amount:'',
        online_banking_account:'',
        original_login_password:'',
        original_u_password:'',
        original_withdrawal_password:'',
        online_login_password:'',
        online_u_password:'',
        online_withdrawal_password:'',
        identity_number:'',
        sex: 0,
        identity_expire_date:'',
        phone_number:'',
        phone_number_location:'',
      },
      rules: {
        bank_cardholder: [
          { required: true, message: '户名为必填' }
        ],
        bank_code: [
          { required: true, message: '必须选择一间银行' }
        ],
        province: [
          { required: true, message: '必须选择开户城市' }
        ],
        branch: [
          { required: true, message: '分行为必填' }
        ],
        bank_card_no: [
          { required: true, message: '银行卡号为必填' }
        ],
        bank_card_virtual_no: [
          { required: true, message: '虚拟卡号为必填' }
        ],
        low_limit: [
          { required: true, message: '单笔下限为必填' },
          { type: 'number', message: '单笔下限为数字值' },
          { validator: checkLowLimit, trigger: 'submit' }
        ],
        up_limit: [
          { required: true, message: '单笔上限为必填' },
          { type: 'number', message: '单笔上限为数字值' },
          { validator: checkUpLimit, trigger: 'submit' }
        ],
        day_limit: [
          { type: 'number', message: '单笔上限为数字值' },
          { required: true, message: '每日上限为必填' }
        ],
        group_id: [
          { required: true, message: '必须选择银行卡金流群组' }
        ],
        supplier_id: [
          { required: true, message: '必须选择卡商' }
        ],
        verify_card_date: [
          { required: true, message: '验卡日期为必填' }
        ],
        cost: [
          { required: true, message: '费用为必填' }
        ],
        rent_date: [
          { required: true, message: '必须选择起租日期' }
        ],
        claim_amount: [
          { required: true, message: '保赔金额为必填' }
        ],

        online_banking_account: [
          { required: true, message: '网银帐号为必填' }
        ],
        original_login_password: [
          { required: true, message: '原始登入密码为必填' }
        ],
        original_u_password: [
          { required: true, message: '原始U盾密码为必填' }
        ],
        original_withdrawal_password: [
          { required: true, message: '原始取款密码为必填' }
        ],
        online_login_password: [
          { required: true, message: '网银登入密码为必填' }
        ],
        online_u_password: [
          { required: true, message: '网银U盾密码为必填' }
        ],
        online_withdrawal_password: [
          { required: true, message: '网银取款密码为必填' }
        ],

        identity_number: [
          { required: true, message: '身分證件號为必填' }
        ],
        identity_expire_date: [
          { required: true, message: '必须选择身分證件到期日' }
        ],
        phone_number: [
          { required: true, message: '對應手機號为必填' }
        ],
        phone_number_location: [
          { required: true, message: '手機號位置为必填' }
        ],
      },
      supplierAllList:{},
      options: [
        {
          value: 1,
          label: '买断'
        },
        {
          value: 2,
          label: '租用',
        }
      ]
    }
  },
  computed: mapState('common', ['provinceList']),
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getBanksAPI().then(response => {
      this.banks = response.data.data;
    });

    getBankCardGroupsAPI().then(response => {
      this.groups = response.data.data;
    });

    getBankCardSupplierAPI().then(response => {
      this.supplierAllList = response.data.data;
    });

    this.$store.dispatch('common/fetchProvinceList');

    if (this.$route.query.id) {
      getBankCardAPI(this.$route.query.id).then(response => {
        this.initBankCard(response.data.data[0]);
      })
    }
  },
  methods: {
    initBankCard(bankCard) {
      this.id = bankCard.id;
      this.formData.bank_cardholder = bankCard.BCardHolder;
      this.formData.bank_code = bankCard.BCardCode;
      this.formData.province = [bankCard.BCardProvince, bankCard.BCardCity];
      this.formData.branch = bankCard.BCardBranch;
      this.formData.bank_card_no = bankCard.BCardNo;
      this.formData.bank_card_virtual_no = bankCard.BCardVirtualNo;
      this.formData.low_limit = bankCard.BCardLowLimit;
      this.formData.up_limit = bankCard.BCardUplimit;
      this.formData.day_limit = bankCard.BCardLimit;
      this.formData.remark = bankCard.BCardNote;
      this.formData.group_id = bankCard.BCardGroupName ? bankCard.BCardGroupName.value : '';
      this.formData.status = bankCard.BCardStatus ? bankCard.BCardStatus.value : 0;
      this.formData.show = bankCard.BCardShow ? bankCard.BCardShow.value : 0;

      this.formData.supplier_id = bankCard.BCardSupplier.value ? bankCard.BCardSupplier.value : '';
      this.formData.verify_card_date = bankCard.BCardVerifyCardDate ? bankCard.BCardVerifyCardDate : '';
      this.formData.rent_type = bankCard.BCardRentType.value ? bankCard.BCardRentType.value : 1;
      this.formData.rent_date = bankCard.BCardRentDate ? bankCard.BCardRentDate : '';
      this.formData.cost = bankCard.BCardCost ? bankCard.BCardCost : '';
      this.formData.claim_amount = bankCard.BCardClaimSmount ? bankCard.BCardClaimSmount : '';
      this.formData.online_banking_account = bankCard.BCardOnlineBankingSccount ? bankCard.BCardOnlineBankingSccount : '';
      this.formData.original_login_password = bankCard.BCardOriginalLoginPassword ? bankCard.BCardOriginalLoginPassword : '';
      this.formData.original_u_password = bankCard.BCardOriginalUpassword ? bankCard.BCardOriginalUpassword : '';
      this.formData.original_withdrawal_password = bankCard.BCardOriginalWithdrawalPassword ? bankCard.BCardOriginalWithdrawalPassword  : '';
      this.formData.online_login_password = bankCard.BCardOnlineLoginPassword ? bankCard.BCardOnlineLoginPassword : '';
      this.formData.online_u_password = bankCard.BCardOnlineUpassword ? bankCard.BCardOnlineUpassword : '';
      this.formData.online_withdrawal_password = bankCard.BCardOnlineWithdrawalPassword ? bankCard.BCardOnlineWithdrawalPassword : '';
      this.formData.identity_number = bankCard.BCardIdentityNumber ? bankCard.BCardIdentityNumber : '';
      this.formData.sex = bankCard.BCardSex.value ? bankCard.BCardSex.value : 0;
      this.formData.identity_expire_date = bankCard.BCardIdentityExpireDate ? bankCard.BCardIdentityExpireDate : '';
      this.formData.phone_number =  bankCard.BCardPhoneNumber ? bankCard.BCardPhoneNumber : '';
      this.formData.phone_number_location =  bankCard.BCardPhoneNumberLocation ? bankCard.BCardPhoneNumberLocation : '';
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = this.formData;

          data.city = data.province[1];
          data.province = data.province[0];

          this.id === 0 ? this.handleCreate(data) : this.handleUpdate(this.id, data);
        }
      })
    },
    handleCreate(data) {
      addBankCard(data).then(() => {
        this.$message.success('银行卡 - 新增成功！');
        this.$refs.form.resetFields();
      });
    },
    handleUpdate(id, data) {
      editBankCardAPI(id, data).then(response => {
        this.$message.success('银行卡 - 修改成功！');
        this.initBankCard(response.data.data[0]);
      });
    },
  }
}
</script>
