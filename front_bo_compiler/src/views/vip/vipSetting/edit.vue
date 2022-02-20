<template lang="pug">
  .vipSettingEdit
    el-form(
      :model="ruleForm"
      ref="ruleForm"
      :rules="rules"
      label-width="auto"
      label-position="left"
      class="demo-ruleForm"
    )
      h4.pl-4.py-3 VIP条件与奖励设定
      .d-flex.flex-wrap
        el-form-item(
          label="等级名称"
          prop="name"
        )
          el-input(v-model="ruleForm.name")
        p.ml-5 对应群组：VIP {{ vipLevel }}
      .d-flex.flex-wrap
        el-form-item(
          label="宝石图框"
          prop="vip_image1"
        )
          el-input(v-model="ruleForm.vip_image1" type="file")
      .d-flex.flex-wrap
        el-form-item(
          label="纯宝石图"
          prop="vip_image2"
        )
          el-input(v-model="ruleForm.vip_image2" type="file")
      .d-flex.flex-wrap
        el-form-item(
          label="累计存款"
          prop="deposit_sum"
        )
          el-input(v-model="ruleForm.deposit_sum")
        el-form-item(
          label="累计流水"
          prop="bet_sum"
        )
          el-input(v-model="ruleForm.bet_sum")
        el-form-item(
          label="保级流水"
          prop="keep_bet_sum"
        )
          el-input(v-model="ruleForm.keep_bet_sum")
        el-form-item(
          label="保级流水计算天数"
          prop="keep_day_range"
        )
          el-input(v-model="ruleForm.keep_day_range")
      h4.pl-4.py-3 红利与梦基金奖励
      .d-flex.flex-wrap
        el-form-item(
          label="晋级礼金"
          prop="lv_bonus"
        )
          el-input(v-model="ruleForm.lv_bonus")
        el-form-item(
          label="每月红包"
          prop="monthly_bonus"
        )
          el-input(v-model="ruleForm.monthly_bonus")
        el-form-item(
          label="生日礼金"
          prop="birthday_bonus"
        )
          el-input(v-model="ruleForm.birthday_bonus")
      .d-flex.flex-wrap
        el-form-item(
          label="晋级梦基金"
          prop="lv_fund"
        )
          el-input(v-model="ruleForm.lv_fund")
        el-form-item(
          label="每月梦基金"
          prop="monthly_fund"
        )
          el-input(v-model="ruleForm.monthly_fund")
        el-form-item(
          label="生日梦基金"
          prop="birthday_fund"
        )
          el-input(v-model="ruleForm.birthday_fund")
      .d-flex.flex-wrap
        el-form-item(
          label="春节礼金"
          prop="new_year_bonus"
        )
          el-input(v-model="ruleForm.new_year_bonus")
        el-form-item(
          label="端午礼金"
          prop="dragon_boat_bonus"
        )
          el-input(v-model="ruleForm.dragon_boat_bonus")
        el-form-item(
          label="中秋礼金"
          prop="mid_autumn_bonus"
        )
          el-input(v-model="ruleForm.mid_autumn_bonus")
        el-form-item(
          label="国庆礼金"
          prop="national_day_bonus"
        )
          el-input(v-model="ruleForm.national_day_bonus")
      h4.pl-4.py-3 存提奖励
      .d-flex.flex-wrap
        el-form-item(
          label="提款次数"
          prop="daily_withdraw_count"
        )
          el-input(v-model="ruleForm.daily_withdraw_count")
        el-form-item(
          label="每日提款金额上限"
          prop="daily_withdraw_limit"
        )
          el-input(v-model="ruleForm.daily_withdraw_limit")
      el-form-item(
        label="是否收取存款手续费"
        prop="charge_deposit_fee"
      )
        el-radio-group(v-model="ruleForm.charge_deposit_fee")
          el-radio(:label="1") 是
          el-radio(:label="0") 否
      h4.pl-4.py-3 商品折扣
      el-form-item(
          label="梦之城商品折扣"
          prop="discount"
        )
        el-input(v-model="ruleForm.discount")
          span(slot="append") %
    .d-flex.justify-content-center
      el-button(@click="cancel") 取消
      el-button(@click="submit") 确定
</template>

<script>
import { getVipSetting, patchVipSetting } from '@/api/vip';

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        vip_image1: '',
        vip_image2: '',
        deposit_sum: 0,
        bet_sum: 0,
        keep_bet_sum: 0,
        keep_day_range: 0,
        lv_bonus: 0,
        monthly_bonus: 0,
        birthday_bonus: 0,
        lv_fund: 0,
        monthly_fund: 0,
        birthday_fund: 0,
        new_year_bonus: 0,
        dragon_boat_bonus: 0,
        mid_autumn_bonus: 0,
        national_day_bonus: 0,
        daily_withdraw_count: 0,
        daily_withdraw_limit: 0,
        charge_deposit_fee: 1,
        discount: 0,
      },
      rules: {
        name: [
          { required: true, message: '请输入等级名称', trigger: 'blur' },
        ],
        vip_image1: [
          { required: true, message: '请添加宝石图框', trigger: 'blur' },
        ],
        vip_image2: [
          { required: true, message: '请添加纯宝石图', trigger: 'blur' },
        ],
        deposit_sum: [
          { required: true, message: '请输入累计存款', trigger: 'blur' }
        ],
        bet_sum: [
          { required: true, message: '请输入累計流水', trigger: 'blur' }
        ],
        keep_bet_sum: [
          { required: true, message: '请输入保級流水', trigger: 'blur' }
        ],
        keep_day_range: [
          { required: true, message: '请输入保級流水計算天數', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    vipLevel() {
      return this.$route.query.id - 1;
    },
    openTabs() {
      return this.$store.state.menu.openTabs;
    },
  },
  methods: {
    getData() {
      getVipSetting(this.$route.query.id).then((res) => {
        this.ruleForm.name = res.data.data[0].memberGroupGroup.data.filter((item) => item.id === res.data.data[0].memberGroupListGroup)[0].memberGroupGroupName;
        this.ruleForm.vip_image1 = res.data.data[0].vipImage1;
        this.ruleForm.vip_image2 = res.data.data[0].vipImage2;
        this.ruleForm.deposit_sum = res.data.data[0].vipDepositSum;
        this.ruleForm.bet_sum = res.data.data[0].vipBetSum;
        this.ruleForm.keep_bet_sum = res.data.data[0].vipKeepBetSum;
        this.ruleForm.keep_day_range = res.data.data[0].vipKeepDayRange;
        this.ruleForm.lv_bonus = res.data.data[0].vipLvBonus;
        this.ruleForm.monthly_bonus = res.data.data[0].vipMonthlyBonus;
        this.ruleForm.birthday_bonus = res.data.data[0].vipBirthdayBonus;
        this.ruleForm.lv_fund = res.data.data[0].vipLvFund;
        this.ruleForm.monthly_fund = res.data.data[0].vipMonthlyFund;
        this.ruleForm.birthday_fund = res.data.data[0].vipBirthdayFund;
        this.ruleForm.new_year_bonus = res.data.data[0].vipNewYearBonus;
        this.ruleForm.dragon_boat_bonus = res.data.data[0].vipDragonBoatBonus;
        this.ruleForm.mid_autumn_bonus = res.data.data[0].vipMidAutumnBonus;
        this.ruleForm.national_day_bonus = res.data.data[0].vipNationalDayBonus;
        this.ruleForm.daily_withdraw_count = res.data.data[0].vipDailyWithdrawCount;
        this.ruleForm.daily_withdraw_limit = res.data.data[0].vipDailyWithdrawLimit;
        this.ruleForm.charge_deposit_fee = res.data.data[0].vipChargeDepositFee;
        this.ruleForm.discount = res.data.data[0].vipDiscount;
      });
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          patchVipSetting(this.$route.query.id, this.ruleForm).then((res) => {
            if (res.data.status === 1) {
              this.$message.success('修改成功');
            }
          }).catch(() => {
            this.$message.error('修改失敗！');
          })
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
    },
  },
  created() {
    this.getData();
  }
}
</script>