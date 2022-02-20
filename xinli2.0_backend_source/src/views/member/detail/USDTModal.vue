<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="USDT列表" width="800px">
    <BasicTable @register="registerTable" :maxHeight="200">
      <template #tableTitle>
        <Input v-model:value="usdtAddress" style="width: 200px" placeholder="请输入USDT錢包地址" />
        <a-button type="primary" @click="handleAdd"> 新增USDT </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '设为预设',
              onClick: handleDefault.bind(null, record),
              ifShow: record.isDefault === false,
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Input } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { GetUSDT, AddUSDT, DeleteUSDT, SetDefaultUSDT } from '/@/api/member/member';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table';

  export default defineComponent({
    components: { BasicTable, BasicModal, TableAction, Input },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const route = useRoute();
      const userID = Number(route.params?.id);

      const columns: BasicColumn[] = [
        {
          title: 'USDT地址',
          dataIndex: 'address',
          width: 180,
        },
        {
          title: '加入日期',
          dataIndex: 'createdAt',
          width: 180,
        },
        {
          title: '修改日期',
          dataIndex: 'updatedAt',
          width: 180,
        },
      ];

      const usdtAddress = ref('');
      
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });

      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetUSDT,
        searchInfo: {userID},
        columns,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        pagination: false,
        actionColumn: {
          width: 130,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      async function handleAdd(){
        const params = {
          memberID: userID,
          address: usdtAddress.value,
        }
        await AddUSDT(params);
        usdtAddress.value = '';
      }

      async function handleDelete(record){
        await DeleteUSDT(record.id);
      }

      async function handleDefault(record){
        const params = {
          memberID: record.memberID,
          usdtID: record.id,
        }
        await SetDefaultUSDT(params);
      }

      const otpSuccess = () => {
        console.log('success');
        usdtAddress.value = '';
        reload();
      }

      return { registerModal, registerTable, handleAdd, usdtAddress, handleDelete, handleDefault, otpSuccess };
    },
  });
</script>
