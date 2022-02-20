<template lang='pug'>
  div.m-3
    .row.no-gutters.my-3
      el-alert(title="溫馨提示：提供30天内的流水纪录，每个平台的数据有不同的延迟，本纪录仅供参考。" type="warning")
    .row.no-gutters.my-3
      tgRecordsBet
</template>
<script>
import tgRecordsBet from '@/components/tgMember/tgRecordsContent/tgRecordsBet.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgRecordsBet,
  },
  data() {
    return {
    };
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
