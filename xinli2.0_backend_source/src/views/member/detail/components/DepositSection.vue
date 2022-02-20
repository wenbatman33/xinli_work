<template>
  <CollapseContainer title="存款资料">
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
      title= "区间内存款统计"
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
      :customRow="customRow"
      :rowKey="'id'"
    >
      <template #type="{ record }">
        <span :class="record.type === 2 ? 'red':''">
          {{ record.type === 1 ? '系统' : record.type === 2 ? '手动' : record.type === 4 ? '代理' : record.type}}
        </span>
      </template>
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
  import { DepositDetailModel } from '/@/api/member/model/memberModal';

  import { DepositDetail } from '/@/api/member/member';
  import { summarySchema, tableColumn } from './deposit.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable, CollapseContainer, Table, DatePicker, Description },
    setup() {
      const route = useRoute();
      // 此处可以得到用户ID
      const userId = Number(route.params?.id);
      const { createMessage } = useMessage();
      const state = reactive({
        data: {} as DepositDetailModel,
        start: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
      });

      init(state.start, state.end);

      const customRow = (record, index) => {
        return {
          style: {
            // 行背景色
            'background-color': record.type === 2 ? '#f00' : 'transparent',
            'color': record.type === 2 ? '#FFF' : '#000',
          }
        }
      }

      async function init(start:string, end:string){
        if (end < start){
          createMessage.error('存款起始时间必须小于结束时间');
        }else{
          state.data = await DepositDetail(userId, start, end);
        }
      }

      function changeDate(){
        if (state.start && state.end){
          init(state.start, state.end);
        }
      }
      
      return {
        ...toRefs(state), 
        customRow,
        changeDate,
        summarySchema,
        tableColumn,
      };
    },
  });
</script>
