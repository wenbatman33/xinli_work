<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="使用过此装置的会员" @ok="handleSubmit">
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { GetDeviceList } from '/@/api/risk/risk';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { IPcolumns } from './data';

  export default defineComponent({
    name: 'AddCommentModal',
    components: { BasicTable, BasicModal },
    emits: ['register'],
    setup() {
      let device:string = '';
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        device = unref(data.record.registerDevice);
        reload();
      });

      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetDeviceList,
        columns: IPcolumns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        beforeFetch: (info)=>{
          info.device = device;
          return info;
        }
      });

      function handleSubmit(){
        closeModal();
      }


      return { registerModal, registerTable, handleSubmit };
    },
  });
</script>
