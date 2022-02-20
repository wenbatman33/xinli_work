<template>
  <BasicModal
    :title="titleRef"
    @register="createBankCardModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="bannerCategoryForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { ref, computed, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { postBannerCategory, putBannerCategory } from '/@/api/operator/banner';

  const emit = defineEmits(['success', 'register']);
  const state = reactive({
    record: {},
  });
  const mode = ref<String>('');
  const currentID = ref(0);
  const titleRef = computed(() => {
    let string = '';
    if (mode.value === 'Create') {
      string = '新增广告分类';
    } else if (mode.value === 'Edit') {
      string = '编辑广告分类';
    }
    return string;
  });

  const bannerCategoryFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'name',
        label: '分类名称',
        component: 'Input',
        required: true,
        componentProps: { placeholder: '请输入分类名称' },
      },
      {
        field: 'description',
        label: '分类说明',
        component: 'Input',
        componentProps: { placeholder: '请输入说明' },
      },
      {
        field: 'hidden',
        label: '是否显示',
        defaultValue: true,
        component: 'Switch',
      },
    ];
  });

  const [bannerCategoryForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
    labelWidth: 80,
    schemas: bannerCategoryFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [createBankCardModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    mode.value = data.mode;
    state.record = data.record;
    currentID.value = data?.record?.id;
    if (mode.value === 'Edit') {
      setFieldsValue({ ...data.record });
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    } else if (mode.value === 'Create') {
      setProps({ disabled: false });
      setModalProps({ okText: '确定新增' });
    }
  });
  const createSubmit = async () => {
    try {
      const payload = await validate();
      currentID.value !== 0 && (payload.ID = currentID.value);
      payload.payBankID = Number(payload.bankCode);
      const result = await postBannerCategory(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const editSubmit = async () => {
    try {
      const payload = await validate();
      currentID.value !== 0 && (payload.id = currentID.value);
      const result = await putBannerCategory(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const handleConfirm = () => {
    if (mode.value === 'Create') {
      createSubmit();
    } else if (mode.value === 'Edit') {
      editSubmit();
    } else if (mode.value === 'ShowRowData') {
      mode.value = 'Edit';
      setProps({ disabled: false });
      setModalProps({ okText: '确定修改' });
    }
  };

  const ResError = () => {
    mode.value === 'Edit' ? message.error(`编辑广告分类失败`) : message.error(`新增广告分类失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    mode.value === 'Edit'
      ? message.success(`编辑广告分类成功`)
      : message.success(`新增广告分类成功`);
    handleModalClose();
  };
  const handleModalClose = () => {
    emit('success');
    currentID.value = 0;
    closeModal();
  };
  const handleReset = () => {
    currentID.value = 0;
    resetFields();
  };
</script>
