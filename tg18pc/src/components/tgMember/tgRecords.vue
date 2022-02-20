<template lang='pug'>
  .tgDeposit.p-1.d-flex
    el-tabs.w-100(v-model='activeName', type='border-card', @tab-click='handleClick')
      el-tab-pane(label='资金纪录', name='sum')
      el-tab-pane(label='流水纪录', name='bet')
      router-view
    p.invisible {{getUrlID}}
</template>
<script>
import tgRecords1 from '@/components/tgMember/tgRecords1.vue';
import tgRecords2 from '@/components/tgMember/tgRecords2.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgRecords1,
    tgRecords2,
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
      console.log('this.activeName', this.activeName);
    },
  },
  methods: {
    handleClick(tab, event) {
      const path = this.activeName;
      router.push(`/member/records/${path}`);
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
