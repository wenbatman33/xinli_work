<template lang='pug'>
  .tgDeposit.p-1.d-flex
    el-tabs.w-100(v-model='activeName', type='border-card', @tab-click='handleClick')
      el-tab-pane(label='个人资料', name='1')
      el-tab-pane(label='修改密码', name='2')
      router-view
    p.invisible {{getUrlID}}
</template>
<script>
import tgAccount1 from '@/components/tgMember/tgAccount1.vue';
import tgAccount2 from '@/components/tgMember/tgAccount2.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgAccount1,
    tgAccount2,
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
  methods: {
    handleClick(tab, event) {
      const path = this.activeName;
      router.push(`/member/account/${path}`);
    },
  },
  mounted() {
    this.activeName = this.getUrlID;
  },
};
</script>
<style lang="scss">
  .el-tabs__content{
    min-height: 600px;
    margin: 0;
  }
</style>
<style lang="scss" scoped>

  .tgDeposit{
    min-height: 600px;
  }
  .tgDepositMain {
    min-height: 600px;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
  }
</style>
