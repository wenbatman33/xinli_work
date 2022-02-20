<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="使用过此IP的会员" @ok="handleSubmit">
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { GetIPList } from '/@/api/risk/risk';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { IPcolumns } from './data';

  export default defineComponent({
    name: 'AddCommentModal',
    components: { BasicTable, BasicModal },
    emits: ['register'],
    setup() {
      let ip:string = '';
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        ip = unref(data.record.registerIp);
        reload();
      });

      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetIPList,
        columns: IPcolumns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        beforeFetch: (info)=>{
          info.ip = ip;
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
