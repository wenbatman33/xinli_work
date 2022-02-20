<template>
  <BasicModal
    :title="titleRef"
    width="50%"
    @register="lockBankCardModal"
    @ok="handleConfirm"
    @cancel="handleReset"
  >
    <BasicForm @register="LockPayBankCardForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import type { FormSchema } from '/@/components/Table';
  import { lockBankCard, unlockBankCard } from '/@/api/payment/payBankCard';

  const mode = ref<String>('');
  const currentID = ref<Number>(0);
  const titleRef = computed(() => (mode.value === 'lock' ? '冻结金额' : '解除冻结'));

  const emit = defineEmits(['success', 'register']);

  const [lockBankCardModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    mode.value = data.mode;
    currentID.value = data.record.ID;
  });
  const lockBankcardFormSchema = computed<FormSchema[]>(() => {
    return [
      {
        field: 'amount',
        label: '金额',
        component: 'InputNumber',
        required: true,
        componentProps: { placeholder: '请输入金额' },
      },
      {
        field: 'note',
        label: '备注',
        component: 'InputTextArea',
        required: true,
        componentProps: {
          placeholder: '请输入备注',
          rows: 8,
        },
      },
    ];
  });
  const [LockPayBankCardForm, { resetFields, validate }] = useForm({
    labelWidth: 60,
    schemas: lockBankcardFormSchema,
    showActionButtonGroup: false,
  });
  const handleConfirm = async () => {
    try {
      const payload = await validate();
      payload.bankcardID = currentID.value;
      if (mode.value === 'lock') {
        const result = await lockBankCard(payload);
        result.success ? ResSuccess() : ResError();
      } else {
        const result = await unlockBankCard(payload);
        result.success ? ResSuccess() : ResError();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const ResError = () => {
    mode.value === 'lock' ? message.error(`冻结金额失败`) : message.error(`解除冻结金额失败`);
    handleModalClose();
  };
  const ResSuccess = () => {
    mode.value === 'lock' ? message.success(`冻结金额成功`) : message.success(`解除冻结金额成功`);
    handleModalClose();
  };
  const handleReset = () => {
    resetFields();
  };
  const handleModalClose = () => {
    emit('success');
    currentID.value = 0;
    closeModal();
  };
</script>
