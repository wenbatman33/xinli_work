<template>
  <CollapseContainer
    title= "厂商流水"
  >
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
    <Table
      :columns="tableColumn"
      :dataSource="data.list"
      striped="striped"
      border="border"
      :pagination="false"
      :scroll="{ y: 240 }"
      :showIndexColumn="false"
      :ellipsis="false"
      :rowKey="'gameType'"
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
  import moment from 'moment';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BetResultModel } from '/@/api/member/model/memberModal';

  import { BetDetail } from '/@/api/member/member';
  import { tableColumn } from './bet.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable, CollapseContainer, Table, DatePicker },
    setup() {
      const route = useRoute();
      // 此处可以得到用户ID
      const userId = Number(route.params?.id);
      const { createMessage } = useMessage();
      const state = reactive({
        data: {} as BetResultModel,
        start: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      });

      init(state.start, state.end);

      async function init(start:string, end:string){
        if (end < start){
          createMessage.error('厂商流水起始时间必须小于结束时间');
        }else{
          state.data = await BetDetail(userId, start, end);
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
        tableColumn,
      };
    },
  });
</script>
