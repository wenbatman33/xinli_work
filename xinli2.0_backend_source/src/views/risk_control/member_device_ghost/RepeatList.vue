<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="3日内多重装置记录" @ok="handleSubmit" width="1000px">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查询此装置',
              onClick: handleSubmit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, toRaw } from 'vue';
  import { GetRepeatList } from '/@/api/risk/risk';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { devices_columns } from './data';

  export default defineComponent({
    name: 'RepeatListModal',
    components: { BasicTable, BasicModal, TableAction },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });

      const [registerTable, {}] = useTable({
        title: '',
        api: GetRepeatList,
        columns: devices_columns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 130,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleSubmit(record = false){
        if (record){
          emit('success', toRaw(record));
        }
        closeModal();
      }


      return { registerModal, registerTable, handleSubmit };
    },
  });
</script>
