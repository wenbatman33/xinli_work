<template>
  <BasicModal
    v-bind="$attrs"
    :width="'1200px'"
    :centered="true"
    @register="registerModal"
    :title="'佣金派发审核'"
    @ok="handleSubmit"
  >

    <Description :title="getTitle" :column="3" :data="summaryDetail" :schema="summarySchema" />
    <BasicTable
      :showIndexColumn="false"
      :pagination="false"
      :bordered="true"
      @register="registerTable"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Description } from '/@/components/Description/index';
  import { message } from 'ant-design-vue';
  import { checkTableSchema } from './tableData';
  import moment from 'moment';
  import type { CommissionModel } from '/@/api/agency/model/agencyModel';
  import { ReviewCommission, ReviewChildrenCommission } from '/@/api/agency/agency';

  const emit = defineEmits(['register', 'success']);

  const dataSource = ref<CommissionModel[]>([]);
  const children = ref(false);
  const date = ref('');

  const getTitle = computed(() => {
    const dateStr = moment(date.value).format('YYYY年MM月');
    return `${dateStr} ${children.value === true ? '二级' : '一级'}代理佣金派发以下内容，请确认`;
  });

  const summarySchema = computed(() => {
    return [{
      label: '派发人数',
      field: 'num',
      contentMinWidth: 150,
    },{
      label: '当月总佣金',
      field: 'amount',
      contentMinWidth: 150,
    },{
      label: '当月总尊享福利',
      field: 'amount2',
      contentMinWidth: 150,
      show: () => children.value,
    }];
  });
  const summaryDetail = ref({});

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    dataSource.value = data.record;
    summaryDetail.value = data.summary;
    children.value = data.children;
    date.value = data.date;
    setTableData(dataSource.value.filter(item => item.setStatus === 2));
  });

  const [registerTable, { setTableData }] = useTable({
    dataSource: [],
    columns: checkTableSchema,
    showIndexColumn: false,
    bordered: true,
    pagination: false,
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      // TODO custom api
      const params = {
        date: date.value,
        agreeIDs: dataSource.value.filter(item => item.setStatus === 2).map(item=>item.id).toString(),
        denyIDs: dataSource.value.filter(item => item.setStatus === 3).map(item=>item.id).toString(),
      }
      
      if (children.value === true) {
        await ReviewChildrenCommission(params);
      } else {
        await ReviewCommission(params);
      }
      closeModal();
      message.success('派发佣金成功');
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
