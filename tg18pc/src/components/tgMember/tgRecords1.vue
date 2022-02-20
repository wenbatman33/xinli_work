<template lang='pug'>
  div.m-3
    .row.no-gutters.mt-3.mb-3
      el-alert(title="温馨提示：全部纪录仅显示交易成功的内容，如需要查询每笔交易状态，请点选下方不同的交易类型按钮。" type="warning")
    .row.no-gutters.mt-3.mb-3
      .col-6
        el-button-group
          el-button(@click='handleClick(1)' :class='[(Method===1) ? "el-button--primary" : ""]') 全部
          el-button(@click='handleClick(2)' :class='[(Method===2) ? "el-button--primary" : ""]') 存款
          el-button(@click='handleClick(3)' :class='[(Method===3) ? "el-button--primary" : ""]') 提款
          el-button(@click='handleClick(4)' :class='[(Method===4) ? "el-button--primary" : ""]') 转账
      .col-6
    .row.no-gutters.mt-3.mb-3(v-if='Method==1')
      tgRecordsAll
    .row.no-gutters.mt-3.mb-3(v-if='Method==2')
      tgRecordsDeposit
    .row.no-gutters.mt-3.mb-3(v-if='Method==3')
      tgRecordsWithdraw
    .row.no-gutters.mt-3.mb-3(v-if='Method==4')
      tgRecordsTrans
</template>
<script>
import tgRecordsAll from '@/components/tgMember/tgRecordsContent/tgRecordsAll.vue';
import tgRecordsDeposit from '@/components/tgMember/tgRecordsContent/tgRecordsDeposit.vue';
import tgRecordsWithdraw from '@/components/tgMember/tgRecordsContent/tgRecordsWithdraw.vue';
import tgRecordsTrans from '@/components/tgMember/tgRecordsContent/tgRecordsTrans.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgRecordsAll,
    tgRecordsDeposit,
    tgRecordsWithdraw,
    tgRecordsTrans,
  },
  data() {
    return {
      activeName: '1',
      Method: Number(this.$route.query.type),
    };
  },
  watch: {
    $route(to, from) {
      this.Method = Number(to.query.type);
    },
  },
  computed: {
    // getUrlID : {
    //   get () {
    //     let path = this.$route.path.split("/")
    //     let parHash = path[3]
    //     this.activeName= "1"
    //     return this.activeName
    //   }
    // }
  },
  methods: {
    handleClick(num) {
      let typeNum;
      if (!num | num > 4) {
        typeNum = 1;
      } else {
        typeNum = num;
      } 
      router.push({
        path: '/member/records/sum',
        query: {
          type: typeNum,
        },
      });
    },
  },
  mounted() {
    this.handleClick(this.Method);
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
