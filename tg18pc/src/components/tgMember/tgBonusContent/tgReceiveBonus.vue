<template lang='pug'>
div
  h6.mx-3 请选择使用红利的游戏品牌
  .row.m-3
    .col-3.providerItem.my-2.p-2(v-for="(item, index) in applyBonusArray",v-if='btnShowMore(index)',:key='index',v-bind:class='[activeNum === index ? "active" : "" ]', @click='setApplyBrand(item.CompanyName, item.GroupId, item.GroupName, item.GameType, index)')
      .d-flex
        .providerImage.text-center.mx-2(:style='{background:item.ColorCode}')
          img(:src='item.Images')
        .providerName.text-center {{item.CompanyName}} 
    .col-12.text-center.my-2
      el-button(size='mini', v-if='showMore==false', icon='el-icon-arrow-down',  @click='showMore=true') 更多品牌
  .row.m-3
    el-card.col-12.activeWrap(shadow='never', v-if='CompanyName')
      h5.text-center 
        span 您选择的是 
        span.text-danger {{CompanyName}} 游戏
      p.text-center 
        span 将转入
        span(v-if='applyBonusData.BonusType==1') 存款与红利 
        span(v-if='applyBonusData.BonusType==2') 红利 
        span.text-danger {{applyBonusData.Bonus}} 元
      p.text-center
        span.text-danger {{CompanyName}} 游戏
        span(v-if='applyBonusData.BonusType==1')  流水须满 
        span(v-if='applyBonusData.BonusType==2')  游戏钱包余额须满 
        span.text-danger {{applyBonusData.Limit}} 元 
        span 才能转帐
      p.text-center
        span.text-danger(v-if='applyBonusData.BonusType==2') 领取红利后请于 7日内达成指定转出要求，否则视同放弃领取，期间产生之赢利与优惠红利将会扣除。
        span.text-danger(v-else) 领取红利后请于 3日内达成指定转出要求，否则视同放弃领取，期间产生之赢利与优惠红利将会扣除。
    el-card.col-12(shadow='never', v-else)
      h5.text-center.text-danger 请选择上方游戏品牌
  .row.m-3
    .col-12
      p.text-danger 温馨提示：
      p.text-danger 您已选择的平台余额，将为您转回中心钱包
      p.text-danger 请放心，取消后在存款未使用前，仍然可以在期限内使用这笔红利！
  .row
    .col-12.text-center.my-2(v-if='notyet')
      .text-center.text-danger 请选择上方游戏品牌
    .col-12.text-center
      el-button(@click='applyBonus_dialogHide') 取消
      el-button(type="primary",@click='ApplyOfferConfirm',:loading='loading') 确认领取
</template>
<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['Sn', 'dialogShow', 'applyBonusArray', 'applyBonusData', 'rowData'],
  data() {
    return {
      showMore: false,
      GroupName: '',
      CompanyName: '',
      GroupId: '',
      GameType: '',
      notyet: false,
      activeNum: '',
      loading: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberBonus',
    ]),
  },
  watch: {
    dialogShow(val) {
      if (!val) {
        this.clearApplyData();
      }
    },
  },
  methods: {
    btnShowMore(index) {
      if (index < 8) {
        return true;
      } else if (this.showMore === true) {
        return true;
      }
      return false;
    },
    ApplyOfferConfirm() {
      const vm = this;
      const payload = {};
      payload.Sn = this.Sn;
      payload.UserId = this.UserId;
      payload.Status = 1;
      payload.GroupId = this.GroupId;
      payload.GameType = this.GameType;
      payload.GroupName = this.GroupName;
      if (payload.GroupId === '' || payload.Sn === '') {
        vm.notyet = true;
      } else {
        vm.notyet = false;
        vm.loading = true;
        vm.$emit('ApplyOfferConfirm', payload);
      }
    },
    setApplyBrand(CompanyName, GroupId, GroupName, GameType, index) {
      this.CompanyName = CompanyName;
      this.GroupId = GroupId;
      this.GroupName = GroupName;
      this.GameType = GameType;
      this.notyet = false;
      this.activeNum = index;
    },
    closeApplyBonus_dialog() {
      this.applyBonus_dialogShow = false;
    },
    clearApplyData() {
      this.sn = '';
      this.CompanyName = '';
      this.GroupId = '';
      this.Status = '';
      this.applyBonus_dialogShow = false;
      this.showMore = false;
      this.notyet = false;
      this.activeNum = '';
      this.loading = false;
    },
    applyBonus_dialogHide() {
      this.clearApplyData();
      this.$emit('applyBonus_dialogHide');
    },
  },
};
</script>
<style lang="scss" scoped>
.providerItem{
  cursor: pointer;
  a:hover{
    text-decoration: none;
  }
  &:hover{
    .providerName{
      text-decoration: underline;
    }
  }
}
.providerImage{
  width: 100%;
  margin-right: 0;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  img{
    width: 40px;
    height: 40px;
  }
}
.providerName{
  line-height: 40px;
  color: #000;
  text-decoration: none;
}
.other{
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #fadb14;
}
.active{
  border-radius: 20px;
  border: 1px solid #1890ff;
  background-color: rgba(24,144,255,.12);
}
.activeWrap{
  border: 1px solid #1890ff;
  background-color: rgba(24,144,255,.12);
}
</style>
