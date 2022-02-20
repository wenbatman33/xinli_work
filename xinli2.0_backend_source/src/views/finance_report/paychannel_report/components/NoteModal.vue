<template>
  <BasicModal @register="editNoteModal" :title="titleRef" @ok="handleSubmit">
    <BasicForm @register="editNoteForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { ref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // type
  import type { FormSchema } from '/@/components/Table';
  // api
  import { putPayChannelLogNote } from '/@/api/payment/payChannel';

  const emit = defineEmits(['success', 'register']);
  const currentID = ref(0);
  const titleRef = computed(() => '修改备注');

  const [editNoteModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    currentID.value = data.record.id;
    setFieldsValue({ ...data.record });
    setModalProps({ okText: '确定修改' });
  });

  const handleSubmit = async () => {
    try {
      const payload = await validate();
      payload.id = currentID.value;
      setModalProps({ confirmLoading: true });
      const result = await putPayChannelLogNote(payload);
      result.success ? ResSuccess() : ResError();
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };

  const ResError = () => {
    message.error(`编辑备注失败`);
    emit('success');
    closeModal();
  };
  const ResSuccess = () => {
    message.success(`编辑备注成功`);
    emit('success');
    closeModal();
  };

  const editNoteFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'id',
        label: 'id',
        component: 'Input',
        show: false,
      },
      {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        required: true,
        componentProps: {
          placeholder: '请输入备注',
          rows: 12,
        },
      },
    ];
  });
  const [editNoteForm, { setFieldsValue, resetFields, validate }] = useForm({
    schemas: editNoteFormSchema,
    showActionButtonGroup: false,
    labelWidth: 50,
    actionColOptions: {
      span: 24,
    },
  });
</script>
