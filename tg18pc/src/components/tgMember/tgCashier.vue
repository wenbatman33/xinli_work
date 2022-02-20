<template lang='pug'>
  .tgCashier.p-1.baseHeight
    el-tabs.w-100(v-model='activeName', type='border-card', @tab-click='handleClick')
      el-tab-pane(label='存款', name='1')
      el-tab-pane(label='转账', name='3')
      el-tab-pane(label='提款', name='2')
      router-view
    p.invisible {{getUrlID}}
</template>
<script>
import tgCashier1 from '@/components/tgMember/tgCashier1.vue';
import tgCashier2 from '@/components/tgMember/tgCashier2.vue';
import tgCashier3 from '@/components/tgMember/tgOverview.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgCashier1,
    tgCashier2,
    tgCashier3,
  },
  data() {
    return {
      activeName: '',
    };
  },
  computed: {
    getUrlID: {
      get() {
        const path = this.$route.path.split('/');
        const parHash = path[3];
        return parHash;
      },
    },
  },
  watch: {
    getUrlID(val, oldVal) {
      this.activeName = val;
    },
  },
  mounted() {
    this.activeName = this.getUrlID;
  },
  methods: {
    handleClick(tab, event) {
      const path = this.activeName;
      router.push(`/member/cashier/${path}`);
      if (path === 1 || path === '1') {
        this.GA_cashier_save();
      } else if (path === 2 || path === '2') {
        this.GA_cashier_transfer();
      } else if (path === 3 || path === '3') {
        this.GA_cashier_withdraw();
      }
    },
  },
};
</script>
<style lang="scss">
  .el-tabs__content{
    min-height: 100%;
    margin: 0;
  }
</style>
<style lang="scss" scoped>
  .tgDepositMain {
    min-height: 600px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
  }
  .contenrWrap{
    height: 90%;
  }
</style>
