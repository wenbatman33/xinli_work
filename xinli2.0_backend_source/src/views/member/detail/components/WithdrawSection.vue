<template>
  <CollapseContainer title= "提款资料">
    <template #action>
      <div class="dateFilter">
        <DatePicker
          placeholder="选择开始日期"
          format="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          v-model:value="start"
          @change="changeDate"
        />
        -
        <DatePicker
          placeholder="选择结束日期"
          format="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          v-model:value="end"
          @change="changeDate"
        />
      </div>
    </template>
    <Description 
      title= "区间内提款统计"
      :column="2"
      :data="data"
      :schema="summarySchema"
    />
    <Table
      :columns="tableColumn"
      :dataSource="data.list"
      striped="striped"
      border="border"
      :pagination="false"
      :scroll="{ y: 240 }"
      :showIndexColumn="false"
      :ellipsis="false"
      :rowKey="'transactionID'"
    >
    </Table>
  </CollapseContainer>

</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable } from '/@/components/Table';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Table, DatePicker } from 'ant-design-vue';
  import { Description } from '/@/components/Description/index';
  import moment from 'moment';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { WithdrawDetailModel } from '/@/api/member/model/memberModal';

  import { WithdrawDetail } from '/@/api/member/member';
  import { summarySchema, tableColumn } from './withdraw.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable, CollapseContainer, Table, DatePicker, Description },
    setup() {
      const route = useRoute();
      // 此处可以得到用户ID
      const userId = Number(route.params?.id);
      const { createMessage } = useMessage();
      const state = reactive({
        data: {} as WithdrawDetailModel,
        start: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      });

      init(state.start, state.end);

      async function init(start:string, end:string){
        if (end < start){
          createMessage.error('提款起始时间必须小于结束时间');
        }else{
          state.data = await WithdrawDetail(userId, start, end);
        }
      }

      function changeDate(){
        if (state.start && state.end){
          init(state.start, state.end);
        }
      }
      
      return {
        ...toRefs(state), 
        changeDate,
        summarySchema,
        tableColumn,
      };
    },
  });
</script>
