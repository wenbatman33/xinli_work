<template>
  <BasicModal
    :title="titleRef"
    :width="600"
    @register="createUModal"
    @ok="handleSubmit"
    @cancel="handleReset"
  >
    <BasicForm @register="createUForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { createUcard, editUcard } from '/@/api/payment/payU';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(false);
  const currentID = ref(0);
  const titleRef = computed(() =>
    isUpdate.value
      ? `金流资料管理 / U帐户管理 / 编辑U帐户`
      : `金流资料管理 / U帐户管理 / 新增U帐户`
  );

  const accountFormSchema: FormSchema[] = [
    {
      field: 'name',
      label: '帐户名称',
      component: 'Input',
      required: true,
      componentProps: { placeholder: '请输入帐户名称' },
      colProps: { span: 12 },
    },
    {
      field: 'type',
      label: '钱包类型',
      component: 'RadioGroup',
      required: true,
      defaultValue: 2,
      componentProps: {
        options: [
          { label: 'ERC', value: 2 },
          { label: 'TRC', value: 3 },
        ],
      },
      colProps: { span: 12 },
    },
    {
      field: 'useType',
      label: '用途',
      component: 'RadioGroup',
      required: true,
      defaultValue: 0,
      componentProps: {
        options: [
          { label: '无', value: 0 },
          { label: '出款', value: 1 },
          { label: '结算', value: 2 },
          { label: '中转', value: 3 },
          { label: '仓库', value: 4 },
        ],
      },
      colProps: { span: 24 },
    },
    {
      field: 'address',
      label: '地址',
      component: 'Input',
      required: true,
      componentProps: { placeholder: '输入虚拟提领地址' },
      colProps: { span: 24 },
    },
    {
      field: 'originalAmount',
      label: '初始金额',
      component: 'Input',
      required: true,
      componentProps: { placeholder: '请输入初始金额' },
      colProps: { span: 24 },
      suffix: '设定完成后不可再编辑'
    },
  ];

  const [createUForm, { updateSchema, setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 130,
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });
  const [createUModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    isUpdate.value = data.isUpdate;
    if (data.isUpdate) {
      currentID.value = data.record.id;
      setFieldsValue({ ...data.record });
      updateSchema(
        {field: 'originalAmount', componentProps: {disabled: true}}
      );
    }else{
      updateSchema(
        {field: 'originalAmount', componentProps: {disabled: false}}
      );
    }
  });

  const handleReset = () => {
    currentID.value = 0;
    resetFields();
  };
  const handleSubmit = async () => {
    try {
      const payload = await validate();
      setModalProps({ confirmLoading: true });

      if (isUpdate.value) {
        payload.id = currentID.value;
        // if (payload.address.includes('*')){
        //   delete payload.address;
        // }
        const res = await editUcard(payload);
        if (res.success) {
          message.success(`成功修改${payload.name}`);
          emit('success');
          closeModal();
        }
      } else {
        payload.originalAmount = Number(payload.originalAmount);
        const res = await createUcard(payload);
        if (res.success) {
          message.success(`成功新增${payload.name}`);
          emit('success');
          closeModal();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
<style lang="scss" scoped>
::v-deep(#originalAmount){
  .suffix{
    color: #F00;
  }
}
</style>