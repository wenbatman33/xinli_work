<template  lang="pug">
.registerDialog.row.no-gutters
  .tab-group.w-100.d-flex.flex-row
    .tab-button.w-50(@click='changeTab(1)', :class='[tabActive==1 ? "active" : "" ]') 存款
    .tab-button.w-50(@click='changeTab(2)', :class='[tabActive==2 ? "active" : "" ]') 提款
  .w-100.row.no-gutters.p-3
    component(:is='targetComponents')
    //- bl_DepositFrom
  //- .w-100.row.no-gutters.p-3(v-if='tabActive === 2')
  //-   bl_WithdrawForm
</template>
<script>
import bl_DepositFrom from '@/components/bl_Transaction/bl_DepositFrom.vue';
import bl_WithdrawForm from '@/components/bl_Transaction/bl_WithdrawForm.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'bl_Transaction',
  components: {
    bl_DepositFrom,
    bl_WithdrawForm,
  },
  computed: {
    ...mapState('member', [
      'memberLogined',
    ]),
    ...mapState('dialog', [
      'commandDialogWidth',
      'commandDialogComponent',
      'tabActive',
    ]),
  },
  data() {
    return {
      targetComponents: '',
      checkMemberData: false,
    };
  },
  watch: {
    // tabActive(val) {
    //   this.seTabActive(val);
    // },
  },
  methods: {
    changeTab(num) {
      if (num === 2) {
        const vm = this; 
        this.$matomo_my_recylingAllWallet();
        this.$store.dispatch('wallet/recylingAllWallet')
          .then((res) => {
            vm.$store.dispatch('wallet/getMemberWallet');
          });
      }
      this.$store.commit('dialog/setTabActive', num);
      this.seTabActive(num);
    },
    seTabActive(val = 1) {
      const vm = this;
      if (val === 1) {
        this.targetComponents = 'bl_DepositFrom';
        this.$router.push({ path: this.$route.fullPath, query: { type: 'deposit' } });
      } else if (val === 2) {
        // 提款 先检查会员资料是否完善
        const vm = this;
        this.$store.dispatch('wallet/getMemberBankCard')
          .then((res) => {
            vm.targetComponents = 'bl_WithdrawForm';
            vm.$router.push({ path: this.$route.fullPath, query: { type: 'withdraw' } });
          })
          .catch((error) => {
            vm.$store.dispatch('dialog/openCommandDialog', { component: 'bl_BindingPhoneForm' });
          });
      }
    },
  },
  mounted() {
    const vm = this;
    if (vm.$route.query.type === 'withdraw') {
      vm.changeTab(2);
    } else {
      vm.changeTab(1);
      vm.$router.push({ path: vm.$route.fullPath, query: { type: 'deposit' } });
    }
  },
};
</script>
