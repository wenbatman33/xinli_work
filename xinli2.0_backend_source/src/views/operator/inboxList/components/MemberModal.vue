<template>
  <BasicModal
    :title="getTitle"
    width="500px"
    @register="registerMemberModal"
    cancelText="关闭"
    :showOkBtn="false"
    @cancel="clearMember"
  > 
    <Input v-model:value="account"></Input>
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Input } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getLetterMember } from '/@/api/operator/inbox';

  const searchLetterID = ref(0);
  const record = ref({});
  const members = ref([]);
  const account = ref('');

  const filterMembers = computed(() => {
    if (account.value !== '') {
      return members.value.filter((item) => {
        return item.memberAccount.includes(account.value);
      });
    }else{
      return members;
    }
  });

  const columns = [
    {
      title: '会员帐号',
      dataIndex: 'memberAccount',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
    },
  ]

  const clearMember = () => {
    account.value = '';
    members.value = [];
  }

  const getTitle = computed(() => {
    return record.value.title + ' 的发送清单';
  });

  const fetchData = async() => {
    const data = await getLetterMember({letterSettingId: searchLetterID.value});
    members.value = data.list;
  };

  const [registerTable, { reload }] = useTable({
    title: '',
    dataSource: filterMembers,
    columns,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    searchInfo: { letterSettingId: searchLetterID },
    resizeHeightOffset: 100,
  });

  const [registerMemberModal, { setModalProps, closeModal }] = useModalInner((data) => {
    searchLetterID.value = data.letterSettingId;
    record.value = data;
    fetchData();
  });

</script>
