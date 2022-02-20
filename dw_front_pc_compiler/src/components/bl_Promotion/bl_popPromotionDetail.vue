<template lang="pug">
.w-100
  .currentPromotion(v-if='Object.keys(currentPromotion).length>0')
    .promotionTitle {{currentPromotion.promotion.data[0].promotionTitle}}
    .promotionInfo
      .row.no-gutters
        .col-12.p-4
          p 
            b 活动时间 ：
            | {{currentPromotion.promotion.data[0].promotionRuleTimeStart.slice(0,10)}}（北京时间）
          .promotionContent(v-if='currentPromotion.promotion', v-html='currentPromotion.promotion.data[0].promotionContent')
    .promotionFixedButtons.text-center.p-3(v-if='currentPromotion.promotion')
      .row
        div(v-for='(item, index) in currentPromotion.promotion.data[0].promotionApplyMode', :class='[(currentPromotion.promotion.data[0].promotionApplyMode.length>1)?"col-6":"col-12"]')
          el-button.w-100(type="primary", 
          :class='getButtonColor(item.value)',
          :disabled='item.value===2'
          @click='formSubmit') {{item.display}}
  .currentPromotionDetail(v-if='Object.keys(currentPromotionDetail).length>0')
    .promotionTitle 优惠明细
    .promotionInfo
      .row.no-gutters
        .col-12.p-4
          p 
            b 优惠类型 ：
            span {{currentPromotionDetail.promotion.data[0].promotionType.display}}
          p 
            b 优惠奖励 ：
            span ¥ {{currentPromotionDetail.promotionBonus | commaFormat}}
          p 
            b 提款要求 ：
            span 流水达 ¥ {{currentPromotionDetail.promotionWithdrawBetamount | commaFormat}} 元以上
          p 
            b 更新时间 ：
            span {{currentPromotionDetail.promotionDetailUpdatedAt}}
        .col-12.p-4
          el-form.my-3(:model='PromotionDetailForm',v-if='currentPromotionDetail.promotion.data[0].promotionType.value===3', :rules='PromotionDetailFormRules')
            el-form-item(label="收货地址")
              .row
                el-cascader.col-7(:props="props", v-model='addressValue', :placeholder='placeholder', separator=' ')
                el-input.col-5(type='text'
                  v-model.trim='PromotionDetailForm.address'
                  placeholder='输入您的收货地址'
                  name='address')
    .promotionFixedButtons.text-center.p-3(v-if='currentPromotionDetail.promotion')
      .row
        //- p {{currentPromotionDetail.promotionDetailStatus}}
        .col-12
          el-button.w-100.noCursor(type="primary", v-if='currentPromotionDetail.promotionDetailStatus.value===3', @click='getBonus', :class='getButtonColor(currentPromotionDetail.promotionDetailStatus.value)') {{currentPromotionDetail.promotionDetailStatus.display}}
          el-button.w-100.noCursor(type="primary", v-else, :class='getButtonColor(currentPromotionDetail.promotionDetailStatus.value)', disabled) {{currentPromotionDetail.promotionDetailStatus.display}}
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      currentPromotion: {},
      currentPromotionDetail: {},
      addressValue: [],
      PromotionDetailForm: {
        promotion_detail_id: '',
        province: '',
        city: '',
        state: '',
        address: '',
      },
      PromotionDetailFormRules: {
        address: [
          { required: true, message: '输入您的收货地址', trigger: ['blur', 'change'] }, 
        ],
      },
      placeholder: '',
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level === 0) {
            axios.get('/api/Member/Personal/Address')
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.memberProvinceId,
                  label: item.memberProvinceName,
                  leaf: level >= 2,
                }));
                resolve(nodes);
              });
          } else if (level === 1) {
            axios.get(`/api/Member/Personal/Address?province_id=${node.path[0]}`)
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.memberCityId,
                  label: item.memberCityName,
                  leaf: level >= 2,
                }));
                resolve(nodes);
              });
          } else if (level === 2) {
            axios.get(`/api/Member/Personal/Address?province_id=${node.path[0]}&city_id=${node.path[1]}`)
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.memberStateId,
                  label: item.memberStateName,
                  leaf: level >= 2,
                }));
                resolve(nodes);
              });
          }
        },
      },
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
  },
  watch: {
    PersonalDetail(val) {
      this.getAddress();
    },
  },
  methods: {
    getAddress() {
      const vm = this;
      vm.PromotionDetailForm.province = vm.PersonalDetail.memberProvince;
      vm.PromotionDetailForm.city = vm.PersonalDetail.memberCity;
      vm.PromotionDetailForm.state = vm.PersonalDetail.memberState;
      vm.PromotionDetailForm.address = vm.PersonalDetail.memberAddress;
      // 塞回 addressValue
      vm.addressValue[0] = vm.PersonalDetail.memberProvince;
      vm.addressValue[1] = vm.PersonalDetail.memberCity;
      vm.addressValue[2] = vm.PersonalDetail.memberState;
      // 
      if (!vm.PersonalDetail.memberProvince) {
        vm.placeholder = '请选择';
      } else {
        this.$axios.get(`/api/Member/Personal/Address?province_id=${vm.PersonalDetail.memberProvince}&city_id=${vm.PersonalDetail.memberCity}&state_id=${vm.PersonalDetail.memberState}`)
          .then((res) => {
            vm.placeholder = `${res.data.data[0].memberProvinceName} ${res.data.data[0].memberCityName} ${res.data.data[0].memberStateName}`;
          });
      }
    },
    formSubmit() {
      const vm = this;
      console.log(this.currentPromotion.promotion.data[0].promotionType.value);
      if (this.currentPromotion.promotion.data[0].promotionType.value === 1) {
        const payload = { promotion_id: this.$route.query.promotion_id };
        this.$store.dispatch('promotion/getMyPromotionDetail', payload)
          .then((res) => {
            this.$store.dispatch('dialog/closeCommandDialog');
            this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_detail_id: this.$route.query.promotion_id } });
            // vm.currentPromotion = res.data.data[0];
          });
      } else if (this.currentPromotion.promotion.data[0].promotionType.value === 2) {
        vm.$store.dispatch('dialog/closeCommandDialog');
        vm.$router.push({ path: `/my/cycle/${this.currentPromotion.promotion.data[0].id}` });
      } else if (this.currentPromotion.promotion.data[0].promotionType.value === 3) {
        // vm.PromotionDetailForm.promotion_detail_id = vm.$route.query.promotion_detail_id;
        vm.$store.dispatch('dialog/closeCommandDialog');
        vm.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_detail_id: this.currentPromotion.promotion.data[0].id } });
      }
    },
    getBonus() {
      const vm = this;
      vm.PromotionDetailForm.promotion_detail_id = vm.currentPromotionDetail.id;
      vm.PromotionDetailForm.province = vm.addressValue[0];
      vm.PromotionDetailForm.city = vm.addressValue[1];
      vm.PromotionDetailForm.state = vm.addressValue[2];
      console.log(vm.PromotionDetailForm);
      vm.$store.dispatch('promotion/MyPromotionBonus', vm.PromotionDetailForm)
        .then((res) => {
          vm.$message({ message: '领取成功', type: 'success' });
          vm.$store.dispatch('dialog/closeCommandDialog');
        });
    },
    getButtonColor(value) {
      let color;
      if (value === 2) {
        color = 'yBtn';
      } else if (value === 3) {
        color = 'gBtn';
      } else if (value === 1 || value === 4 || value === 5 || value === 6 || value === 7) {
        color = 'grayBtn';
      }
      return color;
    },
  },
  mounted() {
    this.getAddress();
    const vm = this;
    if (this.$route.query.promotion_id) {
      const payload = { promotion_id: this.$route.query.promotion_id };
      this.$store.dispatch('promotion/getMyPromotionDetail', payload)
        .then((res) => {
          vm.currentPromotion = res.data.data[0];
        });
    } else {
      const payload = { promotion_id: this.$route.query.promotion_detail_id };
      console.log(payload);
      this.$store.dispatch('promotion/getMyPromotionDetailShow', payload)
        .then((res) => {
          console.log(res);
          vm.currentPromotionDetail = res.data.data[0];
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.promotionTitle{
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  color: white;
  text-align: center;
  background-image: linear-gradient(274deg, $DW_Color, $DW_ColorDark);
}
.promotionInfo{
  // min-height: 300px;
  height: 420px;
  overflow: auto;
  p{
    line-height: 1.5;
  }
}
.promotionImg{
  width: 100%;
  min-height: 200px;
  background: $gray_eee;
  img{
    width: 100%;
    height: auto;
  }
}

.yBtn{
  background: $DW_yellow;
  border-color: $DW_yellow;
  &:hover,&:active,&:focus{
    background: $DW_yellow;
    border-color: $DW_yellow;
  }
}
.gBtn{
  background: $DW_greenMiddle;
  border-color: $DW_greenMiddle;
  &:hover,&:active,&:focus{
    background: $DW_greenMiddle;
    border-color: $DW_greenMiddle;
  }
}
.grayBtn{
  background: $garyBlue_Dark;
  border-color: $garyBlue_Dark;
  &:hover,&:active,&:focus{
    background: $garyBlue_Dark;
    border-color: $garyBlue_Dark;
  }
}
.noCursor{
  cursor: default;
}
.promotionContent{
  img{
    max-width:100% !important;
  }
}
</style>
