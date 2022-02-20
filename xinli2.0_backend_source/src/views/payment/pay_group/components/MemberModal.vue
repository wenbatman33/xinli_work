<template>
  <BasicModal
    :title="`三方金流组别/${name} ${nameEn} / 加入会员`"
    @register="addMemberGroupModal"
    @ok="handleSubmit"
  >
    <p>组别名称(中): {{ name }}</p>
    <p>GroupName: {{ nameEn }}</p>
    <BasicForm @register="addMemberGroupForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import type { FormSchema } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { postPayGroupsMember } from '/@/api/payment/payGroup';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  const currentID = ref(0);
  const name = ref('');
  const nameEn = ref('');

  const addMemberFormSchema: FormSchema[] = [
    {
      field: 'memberAccounts',
      label: '玩家帐号PlayerAccount (可贴多笔玩家帐号,一行一个)',
      component: 'InputTextArea',
      required: true,
      componentProps: {
        placeholder: '请输入玩家帐号',
      },
    },
  ];
  const [addMemberGroupForm, { resetFields, validate }] = useForm({
    schemas: addMemberFormSchema,
    showActionButtonGroup: false,
  });
  const [addMemberGroupModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    currentID.value = data.record.ID;
    name.value = data.record.name;
    nameEn.value = data.record.nameEn;
  });
  async function handleSubmit() {
    try {
      const payload = await validate();
      payload.payGroupID = currentID.value;
      console.log(payload);
      setModalProps({ confirmLoading: true });

      const result = await postPayGroupsMember(payload);
      if (result.success) {
        message.success(`成功加入会员`);
        emit('success');
        closeModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
