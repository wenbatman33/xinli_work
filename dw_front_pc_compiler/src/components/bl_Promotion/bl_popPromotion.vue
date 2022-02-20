<template lang="pug">
.w-100
  .currentPromotion(v-if='Object.keys(currentPromotion).length>0')
    .promotionTitle {{currentPromotion.promotionTitle}}
    .promotionInfo
      .row.no-gutters
        .col-12.p-4
          p 
            b 活动时间 ：
            | {{currentPromotion.promotionRuleTimeStart.slice(0,10)}}（北京时间）
          .promotionContent(v-html='currentPromotion.promotionContent')
    .promotionFixedButtons.text-center.p-3(v-if='currentPromotion.promotionApplyMode')
      .row
        div(v-for='(item, index) in currentPromotion.promotionApplyMode', :class='[(currentPromotion.promotionApplyMode.length>1)?"col-6":"col-12"]')
          el-button.w-100(type="primary", 
          :class='getButtonColor(item.value)',
          @click='formSubmit') {{item.display}}
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      currentPromotion: {},
      placeholder: '',
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
      'memberLogined',
    ]),
  },
  watch: {
    PersonalDetail(val) {
      this.getAddress();
    },
  },
  methods: {
    formSubmit() {
      const vm = this;
      console.log(this.currentPromotion.promotionApplyMode.length > 1);
      console.log(this.currentPromotion.promotionApplyMode[0]);
      if (this.currentPromotion.promotionApplyMode.length > 1) {
        // showCyclePage
        vm.$store.dispatch('dialog/closeCommandDialog');
        vm.$router.push({ path: `/my/cycle/${this.currentPromotion.id}` });
      } else if (this.currentPromotion.promotionApplyMode[0].value === 0 || this.currentPromotion.promotionApplyMode[0].value === 6) {
        // applyPromotion
        if (this.memberLogined) {
          console.log(this.currentPromotion.id);
          const payload = {
            'promotion_id': this.currentPromotion.id,
            'check_apply': 1,
          };
          this.$store.dispatch('promotion/promotionApply', payload)
            .then((res) => {
              if (res.status === 200 && res.data.status === 1) {
                console.log(res);
                this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_id: this.currentPromotion.id } });
                this.$message({ message: '參加成功', type: 'success' });
              }
            });
        } else {
          this.$store.dispatch('dialog/closeCommandDialog');
          this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
        }
      } else {
        const payload = { promotion_id: this.$route.query.promotion_id | this.$route.query.id };
        this.$store.dispatch('promotion/getMyPromotionDetail', payload)
          .then((res) => {
            this.$store.dispatch('dialog/closeCommandDialog');
            this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_detail_id: res.data.data[0].id } });
            vm.currentPromotion = res.data.data[0];
          });
        // this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_id: this.currentPromotion.id } });
      }
      // 
      // 
      // 
      // 
      // if (this.currentPromotion.promotion.data[0].promotionType.value === 1 || this.currentPromotion.promotion.data[0].promotionApplyMode[0].value===2) {
      //   const payload = { promotion_id: this.$route.query.promotion_id | this.$route.query.id};
      //   console.log(payload)
      //   this.$store.dispatch('promotion/getMyPromotionDetail', payload)
      //     .then((res) => {
      //       this.$store.dispatch('dialog/closeCommandDialog');
      //       console.log(res.data.data[0].id )
      //       this.$router.push({ query: { card: 'bl_popPromotionDetail', promotion_detail_id: res.data.data[0].id } });
      //       vm.currentPromotion = res.data.data[0];
      //     });
      // } else if (this.currentPromotion.promotion.data[0].promotionType.value === 2) {
      //   vm.$store.dispatch('dialog/closeCommandDialog');
      //   vm.$router.push({ path: `/my/cycle/${this.currentPromotion.promotion.data[0].id}` });
      // } else if (this.currentPromotion.promotion.data[0].promotionType.value === 3) {
      //   vm.PromotionDetailForm.promotion_detail_id = vm.currentPromotion.id;
      //   vm.PromotionDetailForm.province = vm.addressValue[0];
      //   vm.PromotionDetailForm.city = vm.addressValue[1];
      //   vm.PromotionDetailForm.state = vm.addressValue[2];
      //   this.$store.dispatch('promotion/MyPromotionBonus', vm.PromotionDetailForm)
      //     .then((res) => {
      //       vm.$message({ message: res.message, type: 'success' });
      //       vm.$store.dispatch('dialog/closeCommandDialog');
      //     });
      // }
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
    const vm = this;
    if (this.$route.query.id) {
      const payload = { id: this.$route.query.id };
      this.$store.dispatch('promotion/getCurrentPromotion', payload)
        .then((res) => {
          vm.currentPromotion = res.data.data[0];
          console.log(vm.currentPromotion);
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
<style lang="scss">
.promotionContent{
  // min-height: 160px;
  img{
    max-width: 100% !important;
  }
  p{
    img{
      max-width: 100% !important;
    }
  }
  table{
    border: 1px solid #333333 !important;
    td{
      border: 1px solid #333333 !important;
    }
  }
}
</style>
