<template>
  <BasicModal
    :title="titleRef"
    @register="createPayGroupModal"
    @ok="handleSubmit"
    @cancel="handleReset"
  >
    <BasicForm @register="createPayGroupForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { createPayGroup, putPayGroup } from '/@/api/payment/payGroup';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(false);
  const currentID = ref(0);
  const name = ref('');
  const nameEn = ref('');
  const titleRef = computed(() =>
    name.value
      ? `银行卡金流组别/ ${name.value} ${nameEn.value} 编辑Edit`
      : '银行卡金流组别/新增银行卡金流组别'
  );

  const accountFormSchema: FormSchema[] = [
    {
      field: 'name',
      label: '组别名称(中)',
      component: 'Input',
      required: true,
      rules: [{ required: true, message: '请输入组别名称' }],
      componentProps: { placeholder: '请输入组别名称' },
      dynamicDisabled: () => name.value === '刚注册' || name.value === '剛註冊',
    },
    {
      field: 'nameEn',
      label: 'GrouopName(EN)',
      component: 'Input',
      required: true,
      rules: [{ required: true, message: 'Input GrouopName' }],
      componentProps: { placeholder: 'Input GrouopName' },
      dynamicDisabled: () => name.value === '刚注册' || name.value === '剛註冊',
    },
    {
      field: 'depositLower',
      label: '存款单笔下限',
      component: 'Input',
      required: true,
      rules: [{ required: true, message: '请输入存款单笔下限' }],
      componentProps: { placeholder: '请输入存款单笔下限' },
    },
    {
      field: 'depositUpper',
      label: '存款单笔上限',
      component: 'Input',
      required: true,
      rules: [{ required: true, message: '请输入存款单笔上限' }],
      componentProps: { placeholder: '请输入存款单笔上限' },
    },
    {
      field: 'remark',
      label: '备注',
      component: 'InputTextArea',
      componentProps: { placeholder: '请输入备注' },
    },
  ];

  const [createPayGroupForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 130,
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });
  const [createPayGroupModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    isUpdate.value = data.isUpdate;
    if (data.isUpdate) {
      currentID.value = data.record.ID;
      name.value = data.record.name;
      nameEn.value = data.record.nameEn;
      setFieldsValue({ ...data.record });
    }
  });

  const handleReset = () => {
    currentID.value = 0;
    name.value = '';
    nameEn.value = '';
    resetFields();
  };
  const handleSubmit = async () => {
    try {
      const payload = await validate();
      setModalProps({ confirmLoading: true });

      if (isUpdate.value) {
        payload.ID = currentID.value;
        const res = await putPayGroup(payload);
        if (res.success) {
          message.success(`成功修改${payload.name}组别`);
          emit('success');
          closeModal();
        }
      } else {
        payload.type = 2;
        const res = await createPayGroup(payload);
        if (res.success) {
          message.success(`成功新增${payload.name}组别`);
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
