<template>
  <BasicModal v-bind="$attrs" :centered="true" @register="registerModal" title="编辑金流群组" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #bankgroup="{ model, field }">
        <ApiSelect
          :api="getPayGroups"
          v-model:value="model[field]"
          :filterOption="false"
          resultField="list"
          labelField="name"
          valueField="ID"
          :params="{type: 2}"
          @change="handleChange"
        />
      </template>
      <template #paygroup="{ model, field }">
        <ApiSelect
          :api="getPayGroups"
          v-model:value="model[field]"
          :filterOption="false"
          resultField="list"
          labelField="name"
          valueField="ID"
          :params="{type: 1}"
          @change="handleChange"
        />
      </template>
    </BasicForm>
    <BasicTable 
      rowKey="id" 
      :columns="loginColumns" 
      :showIndexColumn="false" 
      :bordered="true"
      :maxHeight="300"
      @register="registerTable" 
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { loginColumns, payFormSchema } from './member.data';
  import { setPayGroup, AddBatchComment } from '/@/api/member/member';
  import { getPayGroups } from '/@/api/payment/payGroup';

  export default defineComponent({
    name: 'PayGroupModal',
    components: { BasicTable, BasicModal, BasicForm, ApiSelect },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      let records:any[] = [];
      let memberAccounts:string = '';

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: payFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        records = unref(data.record);
        memberAccounts = records.map(item=>item.account).toString().replaceAll(',',' ');
        setTableData(records);
        redoModalHeight();
        setFieldsValue({
          ...data.record,
        });
      });

      const [registerTable, { setTableData }] = useTable({});

      function handleChange(value, target){
        // payGroupID = value;
        // if (target.type === 1){
        //   //三方金流组别change，清空银行卡组别
        //   setFieldsValue({
        //     bankGroupID: '',
        //   });
        // }else{
        //   //银行卡组别change，清空三方金流组别
        //   setFieldsValue({
        //     payGroupID: '',
        //   });
        // }
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          console.log(values)
          if (values.payGroupID !== undefined){
            // TODO custom api
            const params = {
              payGroupID: values.payGroupID,
              memberAccounts,
            }
            const commentParams = {
              memberIDs: records.map(item=>item.id),
              title: 'edit TP or BC ',
              content: values.comment,
            }
            await AddBatchComment(commentParams);
            await setPayGroup(params);  
          }

          if (values.bankGroupID !== undefined){
            // TODO custom api
            const params = {
              payGroupID: values.bankGroupID,
              memberAccounts,
            }
            const commentParams = {
              memberIDs: records.map(item=>item.id),
              title: 'edit TP or BC ',
              content: values.comment,
            }
            await AddBatchComment(commentParams);
            await setPayGroup(params);  
          }
          
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { 
        registerModal, 
        registerTable, 
        loginColumns, 
        registerForm,  
        handleSubmit, 
        records,
        getPayGroups,
        handleChange,
      };
    },
  });
</script>
