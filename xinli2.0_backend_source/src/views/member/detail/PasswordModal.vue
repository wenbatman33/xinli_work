<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { passwordFormSchema } from './detail.data';
  import { ResetPassword } from '/@/api/member/member';

  export default defineComponent({
    name: 'PasswordModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_) {
      const isUpdate = ref(true);

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: passwordFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        setFieldsValue({
          ...data.record,
        });
        
      });

      const getTitle = computed(() => ('修改密码'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const params = {
            id: Number(values.id),
            password: values.password,
          }
          const ajax = await ResetPassword(params);
          if (ajax !== false){
            otpSuccess();
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      const otpSuccess = () => {
        closeModal();
      }

      return { registerModal, registerForm, getTitle, handleSubmit, otpSuccess };
    },
  });
</script>
