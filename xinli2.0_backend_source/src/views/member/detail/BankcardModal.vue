<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="银行卡列表" width="800px">
    <BasicTable @register="registerTable" :maxHeight="200">
      <template #tableTitle>
        <Input v-model:value="cardNum" :maxlength="22" style="width: 200px" placeholder="请输入银行卡卡号" />
        <a-button :disabled="cardNum.length === 0" type="primary" @click="cardNumCheck"> 新增银行卡 </a-button>
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
  import { defineComponent, ref, watch } from 'vue';
  import { Input } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { GetBankcard, AddBankcard, DeleteBankcard, SetDefaultBankcard } from '/@/api/member/member';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: { BasicTable, BasicModal, TableAction, Input },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const route = useRoute();
      const userID = Number(route.params?.id);
      const { createMessage } = useMessage();

      const columns: BasicColumn[] = [
        {
          title: '卡号',
          dataIndex: 'bankNo',
          width: 180,
          customRender: ({record}) => {
            return record.isDefault ? `${record.bankNo}(预设)` : record.bankNo;
          }
        },
        {
          title: '银行名',
          dataIndex: 'bankCode',
          width: 100,
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

      const cardNum = ref('');
      
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });

      const [registerTable, { reload }] = useTable({
        title: '',
        api: GetBankcard,
        searchInfo: {userID},
        columns,
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
      function cardNumCheck() {
        /^\d{18,22}$/.test(cardNum.value) ? handleAdd() : createMessage.error('请输入正确的银行卡卡号');
      }
      async function handleAdd(){
        const params = {
          memberID: userID,
          bankNo: cardNum.value,
        }
        await AddBankcard(params);
      }

      async function handleDelete(record){
        await DeleteBankcard(record.id);
      }

      async function handleDefault(record){
        const params = {
          memberID: record.memberID,
          bankCardID: record.id,
        }
        await SetDefaultBankcard(params);
      }

      const otpSuccess = () => {
        cardNum.value = '';
        reload();
      }

      return { registerModal, registerTable, cardNum, handleDelete, handleDefault, cardNumCheck, otpSuccess };
    },
  });
</script>
