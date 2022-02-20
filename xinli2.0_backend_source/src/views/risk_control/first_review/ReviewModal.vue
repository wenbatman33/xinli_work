<template>
  <BasicModal v-bind="$attrs" :width="'1000px'" :centered="true" @register="registerModal" title="会员审核" @ok="handleSubmit">
    <p class="doubleCheck">审核以下会员？</p>
    <BasicTable 
      rowKey="id" 
      :columns="columns" 
      :showIndexColumn="false" 
      :bordered="true"
      :maxHeight="200"
      @register="registerTable" 
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './data';
  import { SetCheck } from '/@/api/risk/risk';

  export default defineComponent({
    name: 'ReviewModal',
    components: { BasicTable, BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      let records:any[] = [];

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        records = unref(data.record);
        setTableData(records);
      });

      const [registerTable, { setTableData }] = useTable({});

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const params = {
            memberIDs: records.map(li=>li.memberID),
          }
          await SetCheck(params);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerTable, columns, handleSubmit, records };
    },
  });
</script>
<style lang="scss" scoped>
.doubleCheck{
  font-size: 1.5em;
  color: #F0453A;
}
</style>