<template>
  <BasicModal v-bind="$attrs" :width="800" :centered="true" @register="registerModal" title="操作记录" @ok="handleSubmit">
    <BasicTable @register="registerTable" :title="getTitle">
      <template #content="{ record }">
        <div v-html="record.content"></div>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { getPromotionLog } from '/@/api/promotion/list';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';

  const targetID = ref(0);
  const getTitle = ref('优惠名称：');
  const emit = defineEmits(['register']);
  const columns = [
    {
      title: '时间',
      dataIndex: 'updatedAt',
      width: 150,
      sorter: (a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
      },
    },
    {
      title: '操作人',
      dataIndex: 'updatedUser',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 80,
    },
    {
      title: '说明与备注',
      dataIndex: 'content',
      slots: { customRender: 'content' }
    },
  ];
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    targetID.value = data.record.ID;
    getTitle.value = `优惠名称：${data.record.name}`;
    reload();
  });

  const [registerTable, { reload }] = useTable({
    api: getPromotionLog,
    columns,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    immediate: false,
    beforeFetch: (info)=>{
      info.ID = targetID.value;
      return info;
    }
  });

  function handleSubmit(){
    closeModal();
  }
</script>
