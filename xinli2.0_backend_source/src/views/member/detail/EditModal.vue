<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="编辑帐号" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { userFormSchema } from './detail.data';
  import { UpdateMemberDetail } from '/@/api/member/member';

  export default defineComponent({
    name: 'EditModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: userFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          const params = {
            id: values.id,
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            status: values.status,
            depositLimit: values.depositLimit,
            withdrawLimit: values.withdrawLimit,
          }
          const ajax = await UpdateMemberDetail(params);
          if ( ajax !== false ){
            otpSuccess();
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      const otpSuccess = () => {
        closeModal();
        emit('success');
      }

      return { registerModal, registerForm, handleSubmit, otpSuccess };
    },
  });
</script>
