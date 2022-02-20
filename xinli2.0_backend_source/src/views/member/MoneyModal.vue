<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <BasicTable 
      rowKey="id" 
      :columns="loginColumns" 
      :showIndexColumn="false" 
      :bordered="true"
      maxHeight="300"
      @register="registerTable" 
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { loginColumns, moneyFormSchema } from './member.data';
  import { SetDepositStatus, SetWithdrawStatus } from '/@/api/member/member';

  export default defineComponent({
    name: 'MoneyModal',
    components: { BasicTable, BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      let records:any[] = [];

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: moneyFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        records = unref(data.record);
        setTableData(records);
        redoModalHeight();
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const [registerTable, { setTableData }] = useTable({});

      const getTitle = computed(() => (!unref(isUpdate) ? '存提设定' : '存提设定'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          const params = {
            memberIDs: unref(records).map(li=>li.id),
            status: values.status,
            comment: values.comment
          }
          if (values.type === 1){
            await SetDepositStatus(params);
          }else{
            await SetWithdrawStatus(params);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerTable, loginColumns, registerForm, getTitle, handleSubmit, records };
    },
  });
</script>
